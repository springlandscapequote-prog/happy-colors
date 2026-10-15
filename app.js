const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg';let pic,sel=1,filled,sc=1,tx=0,ty=0;
const key=id=>'hc_'+id,mem={},load=id=>{if(id in mem)return mem[id];try{return JSON.parse(localStorage.getItem(key(id))||'[]')}catch(e){return[]}},save=(id,v)=>{mem[id]=v;try{localStorage.setItem(key(id),JSON.stringify(v))}catch(e){}},erase=id=>{mem[id]=[];try{localStorage.removeItem(key(id))}catch(e){}};let yayT;
let lastFire=0;
// Works with touch, mouse, pen and keyboard: fires on pointerup (if the finger stayed put) or on click, never twice, and swallows the ghost click that follows
document.addEventListener('click',e=>{if(Date.now()-lastFire<250){e.stopPropagation();e.preventDefault()}},true);
function press(el,fn){let sx,sy,id=null;el.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;id=e.pointerId});
 el.addEventListener('pointerup',e=>{if(id!==e.pointerId)return;id=null;if(Math.abs(e.clientX-sx)<12&&Math.abs(e.clientY-sy)<12){lastFire=Date.now();e.stopPropagation();fn(e);lastFire=Date.now()}});
 el.addEventListener('pointercancel',()=>{id=null});el.addEventListener('click',e=>{e.stopPropagation();fn(e)})}
function ensureUI(){const B=document.body;
 if(!$('#ask')){const d=document.createElement('div');d.id='ask';d.innerHTML='<div class="box"><div class="q">Start over?</div><p>This will erase your coloring on <b id="askname"></b>.</p><button type="button" id="askyes" class="big yes">Yes, start over</button><button type="button" id="askno" class="big no">No, keep it</button></div>';B.appendChild(d)}
 if(!$('#again')){const b=document.createElement('button');b.type='button';b.id='again';b.className='big';b.textContent='🎨 Color again';const ok=$('#ok');ok.parentNode.insertBefore(b,ok);ok.parentNode.insertBefore(document.createTextNode(' '),ok)}}
if(!$('#welcome')&&!/[?&]r=/.test(location.search)){location.replace(location.pathname+'?r='+Date.now())}
ensureUI();let askAt=0;
function mk(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e}
function center(d){const s=mk('svg',{style:'position:absolute;visibility:hidden'},document.body),p=mk('path',{d},s),b=p.getBBox();s.remove();return[b.x+b.width/2,b.y+b.height/2,Math.min(b.width,b.height)]}
let curCat=null;
function pct(p){const f=load(p.id);return f.length&&f.length>=p.regions.length}
function welcome(){clearTimeout(yayT);$('#yay').style.display='none';$('#game').style.display='none';$('#home').style.display='none';$('#welcome').style.display='';curCat=null;
 const C=$('#cats');C.innerHTML='';const cats=CATEGORIES.slice(),known=new Set(cats.map(c=>c.id));
 if(PICTURES.some(p=>!known.has(p.cat)))cats.push({id:'_more',name:'More Fun',emoji:'⭐',color:'#f06595'});
 cats.forEach(c=>{const ps=PICTURES.filter(p=>c.id=='_more'?!known.has(p.cat):p.cat==c.id),done=ps.filter(pct).length,b=document.createElement('button');b.type='button';b.className='tile'+(ps.length?'':' empty');b.style.background=c.color;
  b.innerHTML='<span class="em">'+c.emoji+'</span><span class="nm"></span><span class="ct"></span>';b.querySelector('.nm').textContent=c.name;
  b.querySelector('.ct').textContent=ps.length?(done+' of '+ps.length+' done'):'Coming soon!';press(b,()=>home(c.id));C.appendChild(b)});
 const mb=document.createElement('button');mb.type='button';mb.className='tile math';mb.innerHTML='<span class="em">🧮</span><span class="mt"><span class="nm">Math Colors</span><span class="ct"></span></span>';mb.querySelector('.ct').textContent='Solve it, then color! ⭐ '+mathStarsTotal()+' stars';press(mb,()=>home('_math'));C.appendChild(mb);scrollTo(0,0)}
function home(c){if(typeof c=='string')curCat=c;if(curCat===null)return welcome();if(curCat=='_math')return mathHome();$('#mlv').style.display='none';clearTimeout(yayT);$('#yay').style.display='none';$('#game').style.display='none';$('#welcome').style.display='none';$('#home').style.display='';
 const cat=CATEGORIES.find(x=>x.id==curCat)||{name:'More Fun',emoji:'⭐'},known=new Set(CATEGORIES.map(x=>x.id)),list=PICTURES.filter(p=>curCat=='_more'?!known.has(p.cat):p.cat==curCat).map((p,i)=>[p,i]).sort((x,y)=>((LEVELS[x[0].level]||{order:0}).order-(LEVELS[y[0].level]||{order:0}).order)||x[1]-y[1]).map(x=>x[0]);$('#htitle').textContent=cat.emoji+' '+cat.name;const P=$('#picker');P.innerHTML='';
 if(!list.length){P.innerHTML='<div class="soon"><span>'+cat.emoji+'</span>More pictures coming soon!</div>'}
 list.forEach(p=>{const c=document.createElement('div');c.className='card';const f=new Set(load(p.id));const s=mk('svg',{viewBox:p.viewBox},c);
 p.regions.forEach((r,i)=>{const at={d:r.d,fill:f.has(i)?p.palette[r.n-1]:'#fff',stroke:p.soft&&f.has(i)?p.palette[r.n-1]:(p.soft?'#aaa':'#999'),'stroke-width':p.soft?(p.k||1)*.5:.6};if(p.fr)at['fill-rule']='evenodd';mk('path',at,s)});
 const nm=document.createElement('span');nm.className='cardname';nm.textContent=p.name+(f.size==p.regions.length?' ✅':'');c.appendChild(nm);const L=LEVELS[p.level]||LEVELS.easy,lv=document.createElement('span');lv.className='lv '+(p.level||'easy');lv.textContent=L.stars+' '+L.name;lv.setAttribute('aria-label','Level: '+L.name);c.appendChild(lv);c.onclick=e=>{if(e.target.closest&&e.target.closest('.so'))return;open(p)};
 if(f.size){const b=document.createElement('button');b.className='so';b.type='button';b.innerHTML='<span class="ar">↻</span> Start over';press(b,()=>ask(p));c.appendChild(b)}P.appendChild(c)});scrollTo(0,0)}
function ask(p,again){if($('#ask').style.display=='flex')return;askAt=Date.now();$('#askname').textContent=p.name+(p.math?' (Math Level '+p.math+')':'');$('#ask').style.display='flex';askYes=()=>{if(Date.now()-askAt<450)return;$('#ask').style.display='none';wipe(p);if(again)open(p);else home()};askNo=()=>{if(Date.now()-askAt<450)return;$('#ask').style.display='none'}}
let askYes,askNo;
function open(p){clearTimeout(yayT);mathReset(p);clearTimeout(yayT);$('#yay').style.display='none';delete document.body.dataset.complete;moved=false;pic=p;filled=new Set(load(p.id));$('#home').style.display='none';$('#game').style.display='flex';const A=$('#art');A.innerHTML='';A.setAttribute('viewBox',p.viewBox);A.classList.toggle('soft',!!p.soft);
 const W=$('#wrap'),sz=Math.min(W.clientWidth,W.clientHeight);A.setAttribute('width',sz);A.setAttribute('height',sz);sc=1;tx=(W.clientWidth-sz)/2;ty=(W.clientHeight-sz)/2;xf();
 p.regions.forEach((r,i)=>{const at={d:r.d,'data-number':r.n,'data-i':i,fill:filled.has(i)?p.palette[r.n-1]:'#fff'};if(p.fr)at['fill-rule']='evenodd';const e=mk('path',at,A);if(p.soft&&filled.has(i))e.style.stroke=p.palette[r.n-1];e.onclick=()=>tap(e,i,r.n)});
 const L=labels(A,p);p.regions.forEach((r,i)=>{if(!filled.has(i)&&L[i]){const[x,y,m]=L[i],t=mk('text',{x,y,id:'t'+i},A);const kk=p.k||1;if(p.math){mlabel(t,p.eq[i],m,kk)}else{t.textContent=r.n;const fs=Math.min(9*kk,Math.max(2.5*kk,m*1.1));t.style.fontSize=fs+'px';if(m<5*kk)t.classList.add('sm')}}});
 const pal=$('#pal');pal.innerHTML='';p.palette.forEach((c,i)=>{const b=document.createElement('div');b.className='sw';b.style.background=c;b.textContent=i+1;b.style.color=lum(c)?'#000':'#fff';b.style.setProperty('--c',c);lum(c)&&b.classList.add('light');b.onclick=()=>{pick(i+1);sparkle(b,c)};pal.appendChild(b)});pick(1);prog();requestAnimationFrame(fit)}
function fit(){if(!pic||$('#game').style.display=='none')return;const W=$('#wrap'),A=$('#art'),sz=Math.min(W.clientWidth,W.clientHeight);A.setAttribute('width',sz);A.setAttribute('height',sz);sc=1;tx=(W.clientWidth-sz)/2;ty=(W.clientHeight-sz)/2;xf()}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,300));
// Label at the visible point of each region farthest from its edges (handles rings, covered backgrounds)
const LC={};
function labels(A,p){const K=p.lid||p.id;if(LC[K])return LC[K];if(p.regions.every(r=>r.lx!=null))return LC[K]=p.regions.map(r=>[r.lx,r.ly,r.lm]);return LC[K]=labels0(A,p)}
function labels0(A,p){const vb=p.viewBox.split(/[ ,]+/).map(Number),S=1,G=Math.ceil(vb[2]/S),H=Math.ceil(vb[3]/S),own=new Int16Array(G*H).fill(-1),P=[...A.querySelectorAll('path')],BB=P.map(e=>{const b=e.getBBox();return[b.x,b.y,b.x+b.width,b.y+b.height]}),pt=A.createSVGPoint();
 for(let y=0;y<H;y++)for(let x=0;x<G;x++){pt.x=vb[0]+(x+.5)*S;pt.y=vb[1]+(y+.5)*S;for(let k=P.length-1;k>=0;k--){const b=BB[k];if(pt.x>=b[0]&&pt.x<=b[2]&&pt.y>=b[1]&&pt.y<=b[3]&&P[k].isPointInFill(pt)){own[y*G+x]=k;break}}}
 const d=new Float32Array(G*H),I=1e9;for(let j=0;j<G*H;j++)d[j]=I;const at=(x,y)=>x<0||y<0||x>=G||y>=H?-2:own[y*G+x];
 for(let y=0;y<H;y++)for(let x=0;x<G;x++){const o=own[y*G+x];if(at(x-1,y)!=o||at(x+1,y)!=o||at(x,y-1)!=o||at(x,y+1)!=o)d[y*G+x]=1}
 const r2=Math.SQRT2;for(let y=0;y<H;y++)for(let x=0;x<G;x++){const j=y*G+x,o=own[j];if(x&&own[j-1]==o)d[j]=Math.min(d[j],d[j-1]+1);if(y&&own[j-G]==o)d[j]=Math.min(d[j],d[j-G]+1);if(x&&y&&own[j-G-1]==o)d[j]=Math.min(d[j],d[j-G-1]+r2);if(y&&x<G-1&&own[j-G+1]==o)d[j]=Math.min(d[j],d[j-G+1]+r2)}
 for(let y=H-1;y>=0;y--)for(let x=G-1;x>=0;x--){const j=y*G+x,o=own[j];if(x<G-1&&own[j+1]==o)d[j]=Math.min(d[j],d[j+1]+1);if(y<H-1&&own[j+G]==o)d[j]=Math.min(d[j],d[j+G]+1);if(x<G-1&&y<H-1&&own[j+G+1]==o)d[j]=Math.min(d[j],d[j+G+1]+r2);if(y<H-1&&x&&own[j+G-1]==o)d[j]=Math.min(d[j],d[j+G-1]+r2)}
 const best=[];for(let j=0;j<G*H;j++){const o=own[j];if(o>=0&&(!best[o]||d[j]>best[o][2]))best[o]=[vb[0]+(j%G+.5)*S,vb[1]+((j/G|0)+.5)*S,d[j]*S]}return best}
function sparkle(b,c){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=b.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
 for(let k=0;k<10;k++){const s=document.createElement('i'),a=k/10*6.283+Math.random()*.5,d=34+Math.random()*18;s.className='spk';s.style.cssText=`left:${x}px;top:${y}px;background:${k%2?c:'#fff'};box-shadow:0 0 6px ${c};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px`;document.body.appendChild(s);setTimeout(()=>s.remove(),600)}}
function lum(c){const n=parseInt(c.slice(1),16);return((n>>16)*.3+(n>>8&255)*.59+(n&255)*.11)>140}
function pick(n){sel=n;[...$('#pal').children].forEach((b,i)=>b.classList.toggle('sel',i+1==n))}
function tap(e,i,n){if(moved||filled.has(i))return;if(pic.math){lastTap=i;if(hintArm){hintArm=false;mhint(i);return}if(n!=sel){mwrong(e,i);return}}else if(n!=sel){const t=$('#t'+i);t&&(t.style.fill='#d6336c',setTimeout(()=>t.style.fill='',700));
 document.querySelectorAll(`#art path[data-number="${sel}"]`).forEach(x=>{if(!filled.has(+x.dataset.i)){x.classList.remove('hint');void x.offsetWidth;x.classList.add('hint')}});return}
 filled.add(i);e.classList.remove("hint");e.setAttribute('fill',pic.palette[n-1]);if(pic.soft)e.style.stroke=pic.palette[n-1];{const t=$('#t'+i);t&&t.remove()};save(pic.id,[...filled]);prog()}
function prog(){const t=pic.regions.length,p=Math.round(filled.size/t*100);$('#fill').style.width=p+'%';$('#pct').textContent=p+'%';
 pic.palette.forEach((c,k)=>$('#pal').children[k].classList.toggle('done',pic.regions.every((r,i)=>r.n!=k+1||filled.has(i))));
 if(filled.size==t){if(pic.math)mfinish();document.body.dataset.complete=pic.id;yayT=setTimeout(()=>$('#yay').style.display='flex',300)}}
function xf(){const A=$('#art');A.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`;A.classList.toggle('zoomed',sc>=2);$('#reset').style.display=sc>1.02?'':'none';if(pic&&pic.math)mathVis()}
function zoom(f,cx,cy){const W=$('#wrap').getBoundingClientRect();if(cx==null)cx=W.width/2;if(cy==null)cy=W.height/2;const n=Math.min((pic&&pic.zmax)||6,Math.max(1,sc*f));tx=cx-(cx-tx)*n/sc;ty=cy-(cy-ty)*n/sc;sc=n;xf()}
let pts=new Map(),moved=false,last;const W=$('#wrap');
W.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);moved=false;last=null});
W.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const o=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
 if(pts.size==2){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(last){const r=W.getBoundingClientRect();zoom(d/last,(a[0]+b[0])/2-r.left,(a[1]+b[1])/2-r.top)}last=d;moved=true}
 else{const dx=e.clientX-o[0],dy=e.clientY-o[1];if(Math.abs(dx)+Math.abs(dy)>2&&sc>1){tx+=dx;ty+=dy;xf();moved=true}}});
['pointerup','pointercancel'].forEach(t=>W.addEventListener(t,e=>{pts.delete(e.pointerId);if(!pts.size)setTimeout(()=>moved=false,50)}));
W.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.2:1/1.2)});
$('#reset').onclick=fit;$('#reset').addEventListener('pointerdown',e=>e.stopPropagation());$('#zin').onclick=()=>zoom(1.4);$('#zout').onclick=()=>zoom(1/1.4);$('#back').onclick=()=>home();press($('#hback'),()=>welcome());press($('#again'),()=>{$('#yay').style.display='none';wipe(pic);open(pic)});press($('#ok'),()=>{$('#yay').style.display='none';home()});press($('#askyes'),()=>askYes&&askYes());press($('#askno'),()=>askNo&&askNo());$('#ask').addEventListener('click',e=>{if(e.target===$('#ask')&&askNo)askNo()});

// ---- Math Colors (own section; same drawings, equations instead of numbers) ----
const MLEVELS=[null,{n:'Tiny Sums',e:'➕',d:'Add and take away up to 10'},{n:'Number Ninja',e:'🥷',d:'Up to 20, plus two-step'},{n:'Times Table Pals',e:'✖️',d:'Multiplication facts'},{n:'Math Master',e:'🧠',d:'+  −  ×  ÷  all mixed up'}];
let mathLvl=1,ms={m:0,h:0,s:0},mTexts=[],lastTap=-1,hintArm=false,wrongBy={},hinted={},toastT,mlastSc=0;const msMem={};
function mget(k,def){if(k in msMem)return msMem[k]&&msMem[k].__d?def:msMem[k];try{const v=localStorage.getItem(k);return v===null?def:JSON.parse(v)}catch(e){return def}}
function mset(k,v){msMem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function mdel(k){msMem[k]={__d:1};try{localStorage.removeItem(k)}catch(e){}}
function msStat(id){const v=mget('hc_ms_'+id,null);return v&&typeof v=='object'?v:{m:0,h:0,s:0}}
function msSave(id,o){mset('hc_ms_'+id,o)}
function wipe(p){erase(p.id);if(p.math){mdel('hc_ms_'+p.id);mset('hc_mseed_'+p.id,(+mget('hc_mseed_'+p.id,0)||0)+1)}}
function mathStarsTotal(l){let s=0;PICTURES.forEach(p=>{for(let k=1;k<=4;k++)if(!l||l==k)s+=(msStat('m'+k+'_'+p.id).s||0)});return s}
function mrng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function mhash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function mathPic(p,l){return Object.assign({},p,{id:'m'+l+'_'+p.id,lid:p.id,base:p,math:l})}
// Each equation is two short lines (stacked) whose value is the region's real color number n
function genEq(n,l,rnd){const ri=(a,b)=>a+Math.floor(rnd()*(b-a+1)),M='\u2212',X='\u00d7',D='\u00f7';
 const add=mx=>{const lo=Math.max(1,n-mx),hi=Math.min(mx,n-1);if(n<2||lo>hi)return null;const a=ri(lo,hi);return[''+a,'+'+(n-a)]};
 const sub=mx=>{if(n+1>mx)return null;const a=ri(n+1,mx);return[''+a,M+(a-n)]};
 const mul=()=>{const P=[];for(let a=2;a<=10;a++)if(n%a==0&&n/a>=2&&n/a<=10)P.push(a);if(!P.length)return null;const a=P[ri(0,P.length-1)];return[''+a,X+(n/a)]};
 const mul1=()=>n<=10?(rnd()<.5?[''+n,X+'1']:['1',X+n]):null;
 const mulc=()=>{const C=[];for(let a=2;a<=9;a++)for(let b=2;b<=9;b++){const c=n-a*b;if(c!=0&&Math.abs(c)<=9)C.push([a,b,c])}if(!C.length)return null;const q=C[ri(0,C.length-1)];return[q[0]+X+q[1],(q[2]>0?'+':M)+Math.abs(q[2])]};
 const div=()=>{const B=[];for(let b=2;b<=10;b++)if(n*b<=100)B.push(b);if(!B.length)return null;const b=B[ri(0,B.length-1)];return[''+(n*b),D+b]};
 const two=()=>{if(rnd()<.5){const mx=20-n;if(mx<1)return null;const c=ri(1,Math.min(9,mx)),s=n+c,a=ri(1,s-1);return[a+'+'+(s-a),M+c]}if(n<2)return null;const c=ri(1,Math.min(9,n-1)),d=n-c,bm=20-d;if(bm<1)return null;const b=ri(1,bm);return[(d+b)+M+b,'+'+c]};
 let c=[];if(l==1)c=[add(10),sub(10)];else if(l==2)c=[add(20),sub(20),two(),two()];else if(l==3){const m=mul();c=[m||mul1()||mulc()]}else c=[add(20),sub(30),mul(),div(),div()];
 c=c.filter(x=>x);const e=c.length?c[ri(0,c.length-1)]:[''+n,'+0'];return{a:e[0],b:e[1],k:e[0]+e[1]}}
function genAll(p,l){const rnd=mrng(mhash(p.id)+(+mget('hc_mseed_'+p.id,0)||0)*7919),used={},out=[];p.regions.forEach(r=>{let e;for(let t=0;t<30;t++){e=genEq(r.n,l,rnd);if(!used[e.k])break}used[e.k]=1;out.push([e.a,e.b])});return out}
function mathReset(p){lastTap=-1;hintArm=false;wrongBy={};hinted={};mTexts=[];mlastSc=0;clearTimeout(toastT);const T=$('#toast');if(T)T.style.display='none';$('#yaystars').style.display='none';
 $('#hintbtn').style.display=p.math?'':'none';$('#pct').style.display=p.math?'none':'';
 if(p.math){ms=msStat(p.id);p.eq=genAll(p,p.math)}}
function mlabel(t,e,m,kk){const c=Math.max(e[0].length,e[1].length),fs=Math.min(8*kk,2*m/Math.sqrt(.36*c*c+4.84)),x=t.getAttribute('x');t.classList.add('mq');t.style.fontSize=fs+'px';
 const a=mk('tspan',{x:x,dy:'-.55em'},t),b=mk('tspan',{x:x,dy:'1.15em'},t);a.textContent=e[0];b.textContent=e[1];mTexts.push({t:t,fs:fs})}
function mathVis(force){if(!mTexts.length)return;if(!force&&Math.abs(sc-mlastSc)<.005)return;mlastSc=sc;const A=$('#art'),vw=+pic.viewBox.split(/[ ,]+/)[2],ppu=(+A.getAttribute('width')||1)/vw;mTexts.forEach(o=>{o.t.style.display=o.fs*ppu*sc>=7?'':'none'})}
function toast(msg,hintI){const T=$('#toast');clearTimeout(toastT);T.innerHTML='';const s=document.createElement('span');s.textContent=msg;T.appendChild(s);
 if(hintI!=null){const b=document.createElement('button');b.type='button';b.className='tbtn';b.textContent='💡 Show me';b.addEventListener('pointerdown',e=>e.stopPropagation());press(b,()=>mhint(hintI));T.appendChild(b)}
 T.style.display='flex';toastT=setTimeout(()=>{T.style.display='none'},hintI!=null?5000:2400)}
function mwrong(e,i){ms.m++;msSave(pic.id,ms);wrongBy[i]=(wrongBy[i]||0)+1;const t=$('#t'+i);
 if(t){t.classList.remove('shake');void t.getBBox();t.classList.add('shake');t.style.fill='#d6336c';setTimeout(()=>{t.style.fill='';t.classList.remove('shake')},700)}
 e.classList.remove('bad');void e.getBBox();e.classList.add('bad');setTimeout(()=>e.classList.remove('bad'),600);
 toast('Not quite, try again!',wrongBy[i]>=2?i:null)}
function mhint(i){if(i==null||i<0||filled.has(i))return;const n=pic.regions[i].n,q=pic.eq[i];if(!hinted[i]){hinted[i]=1;ms.h++;msSave(pic.id,ms)}
 const P=$('#pal'),b=P.children[n-1];if(b){P.scrollLeft=b.getBoundingClientRect().left-P.getBoundingClientRect().left+P.scrollLeft-(P.clientWidth-b.offsetWidth)/2;b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse');setTimeout(()=>b.classList.remove('pulse'),2600)}
 toast(q[0]+q[1]+' = '+n+'  → use color '+n)}
function hintPress(){if(!pic||!pic.math)return;if(lastTap>=0&&!filled.has(lastTap))mhint(lastTap);else{hintArm=true;toast('Tap a space and I will help! 💡')}}
function mfinish(){if(!ms.s){ms.s=ms.m<=2&&ms.h==0?3:(ms.m<=6&&ms.h<=2?2:1);msSave(pic.id,ms)}const y=$('#yaystars');y.textContent=starStr(ms.s)+'  '+ms.s+' star'+(ms.s>1?'s':'')+'!';y.style.display='block'}
function starStr(s){return'⭐⭐⭐'.slice(0,s)+'☆☆☆'.slice(0,3-s)}
function mathHome(){clearTimeout(yayT);$('#yay').style.display='none';$('#game').style.display='none';$('#welcome').style.display='none';$('#home').style.display='';curCat='_math';
 $('#htitle').textContent='🧮 Math Colors';const M=$('#mlv');M.style.display='';M.innerHTML='';const g=document.createElement('div');g.className='lvgrid';
 [1,2,3,4].forEach(l=>{const q=MLEVELS[l],b=document.createElement('button');b.type='button';b.className='lvbtn'+(l==mathLvl?' on':'');b.innerHTML='<span class="le"></span><span class="ln"></span><span class="ld"></span><span class="ls"></span>';
  b.querySelector('.le').textContent=q.e+' Level '+l;b.querySelector('.ln').textContent=q.n;b.querySelector('.ld').textContent=q.d;b.querySelector('.ls').textContent='⭐ '+mathStarsTotal(l)+' of '+PICTURES.length*3;press(b,()=>{mathLvl=l;mset('hc_mlevel',l);mathHome()});g.appendChild(b)});
 M.appendChild(g);const tip=document.createElement('div');tip.className='mtip';tip.textContent='Solve each sum, then color the space with the answer!';M.appendChild(tip);
 const P=$('#picker');P.innerHTML='';const list=PICTURES.map((p,i)=>[p,i]).sort((x,y)=>((LEVELS[x[0].level]||{order:0}).order-(LEVELS[y[0].level]||{order:0}).order)||x[1]-y[1]).map(x=>x[0]);
 list.forEach(bp=>{const p=mathPic(bp,mathLvl),c=document.createElement('div');c.className='card';const f=new Set(load(p.id)),st=msStat(p.id),s=mk('svg',{viewBox:p.viewBox},c);
  p.regions.forEach((r,i)=>{const at={d:r.d,fill:f.has(i)?p.palette[r.n-1]:'#fff',stroke:p.soft&&f.has(i)?p.palette[r.n-1]:(p.soft?'#aaa':'#999'),'stroke-width':p.soft?(p.k||1)*.5:.6};if(p.fr)at['fill-rule']='evenodd';mk('path',at,s)});
  const done=f.size==p.regions.length,nm=document.createElement('span');nm.className='cardname';nm.textContent=p.name+(done?' ✅':'');c.appendChild(nm);
  const L=LEVELS[p.level]||LEVELS.easy,lv=document.createElement('span');lv.className='lv '+(p.level||'easy');lv.textContent=L.stars+' '+L.name;c.appendChild(lv);
  const sr=document.createElement('div');sr.className='stars'+(done?' got':'');sr.textContent=starStr(done?(st.s||1):0);c.appendChild(sr);
  c.onclick=e=>{if(e.target.closest&&e.target.closest('.so'))return;open(p)};
  if(f.size){const b=document.createElement('button');b.className='so';b.type='button';b.innerHTML='<span class="ar">↻</span> Start over';press(b,()=>ask(p));c.appendChild(b)}P.appendChild(c)});scrollTo(0,0)}
(function(){const lv=mget('hc_mlevel',1);if(lv>=1&&lv<=4)mathLvl=+lv;
 if(!$('#hintbtn')){const b=document.createElement('button');b.type='button';b.id='hintbtn';b.setAttribute('aria-label','Hint');b.textContent='💡';b.style.display='none';$('#top').insertBefore(b,$('#zin'))}
 if(!$('#toast')){const t=document.createElement('div');t.id='toast';t.style.display='none';$('#wrap').appendChild(t)}
 if(!$('#mlv')){const m=document.createElement('div');m.id='mlv';m.style.display='none';$('#picker').parentNode.insertBefore(m,$('#picker'))}
 if(!$('#yaystars')){const y=document.createElement('div');y.id='yaystars';y.style.display='none';const ag=$('#again');ag.parentNode.insertBefore(y,ag)}
 press($('#hintbtn'),hintPress)})();
// ---- Suggest a picture ----
const SG_CHIPS=[['animals','🐶 Animals'],['nature','🌈 Nature'],['vehicles','🚗 Vehicles'],['holidays','🎄 Holidays'],['fantasy','🏰 Fantasy'],['space','🚀 Space'],['other','✨ Something else']],SG_KEY='hc_suggestions';
let sgPick='',sgAt=0,sgMem=null;
function sgLoad(){if(sgMem)return sgMem;try{const v=JSON.parse(localStorage.getItem(SG_KEY)||'[]');return Array.isArray(v)?v:[]}catch(e){return[]}}
function sgSave(list){sgMem=list;try{localStorage.setItem(SG_KEY,JSON.stringify(list))}catch(e){}}
function sgClean(t){return String(t||'').replace(/<[^>]*>/g,'').replace(/[<>]/g,'').replace(/\s+/g,' ').trim().slice(0,60)}
function sgBuild(){if($('#sug'))return;const d=document.createElement('div');d.id='sug';
 d.innerHTML='<div class="box"><div id="sugForm"><div class="q">What should we color next?</div><div class="hint2">Pick one, and add an idea if you want!</div><div class="chips" id="sugChips"></div><input id="sugText" type="text" maxlength="60" placeholder="Optional: like a dinosaur" autocomplete="off" autocapitalize="sentences" aria-label="Your idea (optional)"><div id="sugNudge"></div><button type="button" id="sugSend" class="big">Send it! 🚀</button><button type="button" id="sugClose" class="big">Never mind</button></div><div id="sugThanks"><div class="em">🎉</div><div class="q">Thanks!</div><p style="font-size:20px;margin:6px 0">We\'ll try to draw it.</p><button type="button" id="sugOk" class="big" style="background:#51cf66;color:#fff">OK</button></div></div>';
 document.body.appendChild(d);const C=$('#sugChips');
 SG_CHIPS.forEach(([id,label])=>{const b=document.createElement('button');b.type='button';b.className='chip';b.textContent=label;b.setAttribute('data-id',id);press(b,()=>{if(Date.now()-sgAt<450)return;sgPick=sgPick==id?'':id;[...C.children].forEach(x=>x.classList.toggle('on',x.getAttribute('data-id')==sgPick));$('#sugNudge').textContent=''});C.appendChild(b)});
 const closeIt=()=>{if(Date.now()-sgAt<450)return;d.style.display='none'};
 press($('#sugClose'),closeIt);press($('#sugOk'),closeIt);d.addEventListener('click',e=>{if(e.target===d)closeIt()});
 press($('#sugSend'),()=>{if(Date.now()-sgAt<450)return;const text=sgClean($('#sugText').value);if(!sgPick&&!text){$('#sugNudge').textContent='Pick one or type an idea!';return}
  const item={when:new Date().toISOString(),category:sgPick,text:text};const list=sgLoad().slice(-199);list.push(item);sgSave(list);
  try{if(typeof SUGGEST_URL!='undefined'&&SUGGEST_URL&&typeof fetch=='function'){const q=fetch(SUGGEST_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(item)});q&&q.catch&&q.catch(()=>{})}}catch(e){}
  $('#sugForm').style.display='none';$('#sugThanks').style.display='block';sgAt=Date.now();sgList()})}
function sgOpen(){sgBuild();sgPick='';sgAt=Date.now();$('#sugText').value='';$('#sugNudge').textContent='';[...$('#sugChips').children].forEach(x=>x.classList.remove('on'));$('#sugForm').style.display='block';$('#sugThanks').style.display='none';$('#sug').style.display='flex';$('#sug').scrollTop=0}
function sgList(){const L=$('#sugList');if(!L)return;if(!/[?&]suggestions=1(&|$)/.test(location.search)){L.style.display='none';return}
 L.style.display='block';L.innerHTML='';const h=document.createElement('h2');h.textContent='Saved ideas on this device';L.appendChild(h);const list=sgLoad();
 if(!list.length){const r=document.createElement('div');r.className='row';r.textContent='No ideas saved yet.';L.appendChild(r)}
 list.slice().reverse().forEach(it=>{const r=document.createElement('div');r.className='row';const sm=document.createElement('small');sm.textContent=String(it.when||'').replace('T',' ').slice(0,16)+' · '+(it.category||'(no category)');r.appendChild(sm);r.appendChild(document.createElement('br'));r.appendChild(document.createTextNode(it.text||'(no text)'));L.appendChild(r)})}
if($('#sugBtn'))press($('#sugBtn'),sgOpen);
welcome();sgList();