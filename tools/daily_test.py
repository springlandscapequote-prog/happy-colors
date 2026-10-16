# Daily test for new Happy Colors pictures.
# usage: python3 daily_test.py <base_url> <outdir> '<json list of [cat,name,Level,id]>' [quick]
# e.g.   python3 daily_test.py http://localhost:8777/ daily/2026-10-15 '[["holidays","Happy Snowman","Easy","snowman"]]'
# Per viewport (iPhone13 WebKit 390x664 & 375x553, Pixel7 Chromium 390x664 & 375x553 with 4x CPU slowdown, real touch taps):
# category list shows the card+badge, region count vs level rule, every region has a label, label overlap check, taps fill EVERY region,
# completion popup, math mode, old pictures still open, console errors. Screenshots (iPhone 390x664): picker, unfilled, partly-filled, finished.
import sys,asyncio,json,time,os
from playwright.async_api import async_playwright
URL,D=sys.argv[1],sys.argv[2].rstrip('/')+'/';NEW=json.loads(sys.argv[3]);quick=len(sys.argv)>4
os.makedirs(D,exist_ok=True)
CFG=[('webkit','iPhone 13',390,664),('webkit','iPhone 13',375,553),('chromium','Pixel 7',390,664),('chromium','Pixel 7',375,553)]
if quick:CFG=CFG[:1]
RULE={'Easy':(1,35),'Medium':(36,80),'Hard':(81,999)}
EVAL="""(e)=>{const s=(e[0]+e[1]).replace(/\\u00d7/g,'*').replace(/\\u00f7/g,'/').replace(/\\u2212/g,'-');return Function('return '+s)()}"""
PTS="""()=>{const A=document.querySelector('#art'),m=A.getScreenCTM(),pt=A.createSVGPoint();return [...A.querySelectorAll('text')].map(t=>{pt.x=+t.getAttribute('x');pt.y=+t.getAttribute('y');const s=pt.matrixTransform(m);const i=+t.id.slice(1);const sp=[...t.querySelectorAll('tspan')].map(x=>x.textContent);return [i,s.x,s.y,+document.querySelector('#art path[data-i="'+i+'"]').dataset.number,sp[0]||'',sp[1]||'']})}"""
OVER="""()=>{const T=[...document.querySelectorAll('#art text')].map(t=>{const b=t.getBBox();return [t.id,b.x,b.y,b.x+b.width,b.y+b.height]});let o=[];for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++){const a=T[i],b=T[j];const w=Math.min(a[3],b[3])-Math.max(a[1],b[1]),h=Math.min(a[4],b[4])-Math.max(a[2],b[2]);if(w>0.3&&h>0.3)o.push([a[0],b[0],+w.toFixed(1),+h.toFixed(1)])}return o}"""
fails=[]
def chk(c,msg):
 if not c:fails.append(msg);print('  FAIL:',msg,flush=True)
async def main():
 async with async_playwright() as p:
  for bt,dev,vw,vh in CFG:
   b=await getattr(p,bt).launch();o=dict(p.devices[dev]);o['viewport']={'width':vw,'height':vh}
   nm=f'{bt}-{vw}x{vh}';shots=(nm=='webkit-390x664');c=await b.new_context(**o);pg=await c.new_page();errs=[]
   pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
   await pg.goto(URL,wait_until='networkidle');await pg.evaluate('localStorage.clear()');await pg.reload(wait_until='networkidle')
   if bt=='chromium':
    cdp=await c.new_cdp_session(pg);await cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
   cats=await pg.evaluate("CATEGORIES.map(c=>c.id)")
   if shots:print('\n'.join(await pg.evaluate("CATEGORIES.map(c=>c.name+': '+['easy','medium','hard'].map(l=>l[0].toUpperCase()+':'+PICTURES.filter(p=>p.cat==c.id&&p.level==l).length).join(' '))")))
   async def isvis(sel):return await pg.evaluate("s=>{const e=document.querySelector(s);return !!e&&getComputedStyle(e).display!='none'}",sel)
   async def tap_until(loc,cond,tries=4):
    for _ in range(tries):
     await loc.tap(timeout=5000);await pg.wait_for_timeout(700)
     if await cond():return True
    return False
   async def go_welcome():await tap_until(pg.locator('#hback'),lambda:isvis('#welcome'))
   async def show_cat(cid):
    await tap_until(pg.locator('.tile').nth(cats.index(cid)),lambda:isvis('#home'))
   async def open_card(name,lv):
    idx=await pg.evaluate("([n,l])=>[...document.querySelectorAll('.card')].findIndex(c=>c.querySelector('.cardname').textContent.replace(' ✅','')==n&&c.querySelector('.lv').textContent.indexOf(l)>=0)",[name,lv])
    if idx<0:return False
    await pg.locator('.card').nth(idx).scroll_into_view_if_needed();await pg.locator('.card').nth(idx).tap();await pg.wait_for_function("document.querySelector('#art path')");return True
   async def back_to_welcome():
    await pg.evaluate("document.querySelector('#yay').style.display='none'");await tap_until(pg.locator('#back'),lambda:isvis('#home'));await go_welcome()
   for cid,name,lv,pid in NEW:
    await show_cat(cid);await pg.wait_for_timeout(300)
    ok=await open_card(name,lv) if False else None
    # picker screenshot with the new card in view
    idx=await pg.evaluate("([n,l])=>[...document.querySelectorAll('.card')].findIndex(c=>c.querySelector('.cardname').textContent.replace(' ✅','')==n&&c.querySelector('.lv').textContent.indexOf(l)>=0)",[name,lv])
    chk(idx>=0,f'{nm} {pid}: card "{name}" with badge {lv} not in category list')
    if idx<0:await go_welcome();continue
    await pg.locator('.card').nth(idx).scroll_into_view_if_needed();await pg.wait_for_timeout(300)
    if shots:await pg.screenshot(path=D+f'{pid}-picker.png')
    await open_card(name,lv);await pg.wait_for_timeout(300)
    n_paths=await pg.evaluate("document.querySelectorAll('#art path').length");pal=await pg.locator('.sw').count()
    pts=await pg.evaluate(PTS);lo,hi=RULE[lv]
    chk(lo<=n_paths<=hi,f'{nm} {pid}: {n_paths} regions outside {lv} range {lo}-{hi}')
    chk(len(pts)==n_paths,f'{nm} {pid}: {n_paths-len(pts)} regions have no number label (fully covered)')
    ov=await pg.evaluate(OVER);vis=await pg.evaluate("[...document.querySelectorAll('#art text')].filter(t=>getComputedStyle(t).display!='none').length")
    chk(len(ov)==0,f'{nm} {pid}: overlapping number labels {ov[:6]}')
    if shots:await pg.screenshot(path=D+f'{pid}-unfilled.png')
    t0=time.time();pts.sort(key=lambda x:x[3]);cur=0;half=len(pts)//2;bad=[]
    for k,(i,x,y,n,a,bb) in enumerate(pts):
     if n!=cur:await pg.locator('.sw').nth(n-1).tap();cur=n
     await pg.touchscreen.tap(x,y)
     good=await pg.evaluate("([i,n])=>document.querySelector('#art path[data-i=\"'+i+'\"]').getAttribute('fill')==pic.palette[n-1]",[i,n])
     if not good:bad.append(i)
     if k==half and shots:
      await pg.wait_for_timeout(150);await pg.screenshot(path=D+f'{pid}-partly-colored.png')
    await pg.wait_for_timeout(700)
    filled=await pg.evaluate("[...document.querySelectorAll('#art path')].filter(p=>p.getAttribute('fill')!='#fff'&&p.getAttribute('fill')).length")
    yay=await pg.evaluate("getComputedStyle(document.querySelector('#yay')).display")
    if shots:await pg.screenshot(path=D+f'{pid}-finished.png')
    chk(not bad,f'{nm} {pid}: wrong fills {bad[:8]}');chk(filled==n_paths,f'{nm} {pid}: filled {filled}/{n_paths}');chk(yay=='flex',f'{nm} {pid}: completion popup display={yay}')
    print(nm,pid,lv,'regions',n_paths,'labels',len(pts),'visible@1x',vis,'colors',pal,'overlaps',len(ov),'misfills',len(bad),'filled',filled,'yay',yay,'tap_s',round(time.time()-t0,1),flush=True)
    await back_to_welcome()
   async def fresh():
    await pg.evaluate('localStorage.clear()');await pg.reload(wait_until='networkidle')
    if bt=='chromium':
     cdp2=await c.new_cdp_session(pg);await cdp2.send('Emulation.setCPUThrottlingRate',{'rate':4})
   await fresh()
   # zoomed shot of each new pic
   for cid,name,lv,pid in NEW:
    await show_cat(cid);await open_card(name,lv);await pg.wait_for_timeout(300);await pg.evaluate("zoom(3)");await pg.wait_for_timeout(300)
    if shots:await pg.screenshot(path=D+f'{pid}-zoomed.png')
    await back_to_welcome()
   await fresh()
   # math mode pass (all 4 levels would be slow; use rotating level)
   for k,(cid,name,lv,pid) in enumerate(NEW):
    lvl=[2,3,1,4][k%4]
    await tap_until(pg.locator('.tile.math'),lambda:isvis('#mlv'));await pg.locator('.lvbtn').nth(lvl-1).tap();await pg.wait_for_timeout(500)
    ok=await open_card(name,lv);chk(ok,f'{nm} {pid}: not in Math section');
    if not ok:await go_welcome();continue
    await pg.wait_for_timeout(300);pts=await pg.evaluate(PTS);mism=0
    for (i,x,y,n,a,bb) in pts:
     if await pg.evaluate(EVAL,[a,bb])!=n:mism+=1
    pts.sort(key=lambda x:x[3]);cur=0
    for (i,x,y,n,a,bb) in pts:
     if n!=cur:await pg.locator('.sw').nth(n-1).tap();cur=n
     await pg.touchscreen.tap(x,y)
    await pg.wait_for_timeout(700)
    filled=await pg.evaluate("[...document.querySelectorAll('#art path')].filter(p=>p.getAttribute('fill')!='#fff'&&p.getAttribute('fill')).length")
    chk(mism==0 and filled==len(pts),f'{nm} {pid} math L{lvl}: eq mismatch {mism}, filled {filled}/{len(pts)}')
    print(nm,'MATH L%d'%lvl,pid,'labels',len(pts),'eq_mismatch',mism,'filled',filled,flush=True)
    await back_to_welcome()
   # all old + new pictures still open and every region has a label (no console errors)
   await pg.evaluate('localStorage.clear()')
   res=await pg.evaluate("""()=>PICTURES.map(p=>{open(p);const n=document.querySelectorAll('#art path').length,t=document.querySelectorAll('#art text').length;return [p.id,n,t,p.regions.length]}).filter(r=>r[1]!=r[3]||r[2]!=r[1])""")
   chk(not res,f'{nm}: pictures with missing paths/labels {res}');print(nm,'ALL PICTURES open; problems:',res,flush=True)
   chk(not errs,f'{nm}: console errors {errs[:4]}');print(nm,'ERRORS',errs,flush=True)
   await b.close()
 print('RESULT:','PASS' if not fails else 'FAIL',len(fails),'failures');[print(' -',f) for f in fails]
asyncio.run(main())
