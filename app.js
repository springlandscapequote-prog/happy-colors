const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg';let pic,sel=1,filled,sc=1,tx=0,ty=0;
const key=id=>'hc_'+id,mem={},load=id=>{if(id in mem)return mem[id];try{return JSON.parse(localStorage.getItem(key(id))||'[]')}catch(e){return[]}},save=(id,v)=>{mem[id]=v;try{localStorage.setItem(key(id),JSON.stringify(v))}catch(e){}},erase=id=>{mem[id]=[];try{localStorage.removeItem(key(id))}catch(e){}};let yayT;
let lastFire=0;
// Works with touch, mouse, pen and keyboard: fires on pointerup (if the finger stayed put) or on click, never twice, and swallows the ghost click that follows
document.addEventListener('click',e=>{if(Date.now()-lastFire<350){e.stopPropagation();e.preventDefault()}},true);
function press(el,fn){let sx,sy,id=null;el.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY;id=e.pointerId});
 el.addEventListener('pointerup',e=>{if(id!==e.pointerId)return;id=null;if(Math.abs(e.clientX-sx)<12&&Math.abs(e.clientY-sy)<12){lastFire=Date.now();e.stopPropagation();fn(e)}});
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
  b.querySelector('.ct').textContent=ps.length?(done+' of '+ps.length+' done'):'Coming soon!';press(b,()=>home(c.id));C.appendChild(b)});scrollTo(0,0)}
function home(c){if(typeof c=='string')curCat=c;if(curCat===null)return welcome();clearTimeout(yayT);$('#yay').style.display='none';$('#game').style.display='none';$('#welcome').style.display='none';$('#home').style.display='';
 const cat=CATEGORIES.find(x=>x.id==curCat)||{name:'More Fun',emoji:'⭐'},known=new Set(CATEGORIES.map(x=>x.id)),list=PICTURES.filter(p=>curCat=='_more'?!known.has(p.cat):p.cat==curCat).map((p,i)=>[p,i]).sort((x,y)=>((LEVELS[x[0].level]||{order:0}).order-(LEVELS[y[0].level]||{order:0}).order)||x[1]-y[1]).map(x=>x[0]);$('#htitle').textContent=cat.emoji+' '+cat.name;const P=$('#picker');P.innerHTML='';
 if(!list.length){P.innerHTML='<div class="soon"><span>'+cat.emoji+'</span>More pictures coming soon!</div>'}
 list.forEach(p=>{const c=document.createElement('div');c.className='card';const f=new Set(load(p.id));const s=mk('svg',{viewBox:p.viewBox},c);
 p.regions.forEach((r,i)=>{const at={d:r.d,fill:f.has(i)?p.palette[r.n-1]:'#fff',stroke:p.soft&&f.has(i)?p.palette[r.n-1]:(p.soft?'#aaa':'#999'),'stroke-width':p.soft?(p.k||1)*.5:.6};if(p.fr)at['fill-rule']='evenodd';mk('path',at,s)});
 const nm=document.createElement('span');nm.className='cardname';nm.textContent=p.name+(f.size==p.regions.length?' ✅':'');c.appendChild(nm);const L=LEVELS[p.level]||LEVELS.easy,lv=document.createElement('span');lv.className='lv '+(p.level||'easy');lv.textContent=L.stars+' '+L.name;lv.setAttribute('aria-label','Level: '+L.name);c.appendChild(lv);c.onclick=e=>{if(e.target.closest&&e.target.closest('.so'))return;open(p)};
 if(f.size){const b=document.createElement('button');b.className='so';b.type='button';b.innerHTML='<span class="ar">↻</span> Start over';press(b,()=>ask(p));c.appendChild(b)}P.appendChild(c)});scrollTo(0,0)}
function ask(p,again){if($('#ask').style.display=='flex')return;askAt=Date.now();$('#askname').textContent=p.name;$('#ask').style.display='flex';askYes=()=>{if(Date.now()-askAt<450)return;$('#ask').style.display='none';erase(p.id);if(again)open(p);else home()};askNo=()=>{if(Date.now()-askAt<450)return;$('#ask').style.display='none'}}
let askYes,askNo;
function open(p){clearTimeout(yayT);$('#yay').style.display='none';delete document.body.dataset.complete;moved=false;pic=p;filled=new Set(load(p.id));$('#home').style.display='none';$('#game').style.display='flex';const A=$('#art');A.innerHTML='';A.setAttribute('viewBox',p.viewBox);A.classList.toggle('soft',!!p.soft);
 const W=$('#wrap'),sz=Math.min(W.clientWidth,W.clientHeight);A.setAttribute('width',sz);A.setAttribute('height',sz);sc=1;tx=(W.clientWidth-sz)/2;ty=(W.clientHeight-sz)/2;xf();
 p.regions.forEach((r,i)=>{const at={d:r.d,'data-number':r.n,'data-i':i,fill:filled.has(i)?p.palette[r.n-1]:'#fff'};if(p.fr)at['fill-rule']='evenodd';const e=mk('path',at,A);if(p.soft&&filled.has(i))e.style.stroke=p.palette[r.n-1];e.onclick=()=>tap(e,i,r.n)});
 const L=labels(A,p);p.regions.forEach((r,i)=>{if(!filled.has(i)&&L[i]){const[x,y,m]=L[i],t=mk('text',{x,y,id:'t'+i},A);t.textContent=r.n;const kk=p.k||1,fs=Math.min(9*kk,Math.max(2.5*kk,m*1.1));t.style.fontSize=fs+'px';if(m<5*kk)t.classList.add('sm')}});
 const pal=$('#pal');pal.innerHTML='';p.palette.forEach((c,i)=>{const b=document.createElement('div');b.className='sw';b.style.background=c;b.textContent=i+1;b.style.color=lum(c)?'#000':'#fff';b.style.setProperty('--c',c);lum(c)&&b.classList.add('light');b.onclick=()=>{pick(i+1);sparkle(b,c)};pal.appendChild(b)});pick(1);prog();requestAnimationFrame(fit)}
function fit(){if(!pic||$('#game').style.display=='none')return;const W=$('#wrap'),A=$('#art'),sz=Math.min(W.clientWidth,W.clientHeight);A.setAttribute('width',sz);A.setAttribute('height',sz);sc=1;tx=(W.clientWidth-sz)/2;ty=(W.clientHeight-sz)/2;xf()}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,300));
// Label at the visible point of each region farthest from its edges (handles rings, covered backgrounds)
const LC={};
function labels(A,p){if(LC[p.id])return LC[p.id];if(p.regions.every(r=>r.lx!=null))return LC[p.id]=p.regions.map(r=>[r.lx,r.ly,r.lm]);return LC[p.id]=labels0(A,p)}
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
function tap(e,i,n){if(moved||filled.has(i))return;if(n!=sel){const t=$('#t'+i);t&&(t.style.fill='#d6336c',setTimeout(()=>t.style.fill='',700));
 document.querySelectorAll(`#art path[data-number="${sel}"]`).forEach(x=>{if(!filled.has(+x.dataset.i)){x.classList.remove('hint');void x.offsetWidth;x.classList.add('hint')}});return}
 filled.add(i);e.classList.remove("hint");e.setAttribute('fill',pic.palette[n-1]);if(pic.soft)e.style.stroke=pic.palette[n-1];{const t=$('#t'+i);t&&t.remove()};save(pic.id,[...filled]);prog()}
function prog(){const t=pic.regions.length,p=Math.round(filled.size/t*100);$('#fill').style.width=p+'%';$('#pct').textContent=p+'%';
 pic.palette.forEach((c,k)=>$('#pal').children[k].classList.toggle('done',pic.regions.every((r,i)=>r.n!=k+1||filled.has(i))));
 if(filled.size==t){document.body.dataset.complete=pic.id;yayT=setTimeout(()=>$('#yay').style.display='flex',300)}}
function xf(){const A=$('#art');A.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`;A.classList.toggle('zoomed',sc>=2);$('#reset').style.display=sc>1.02?'':'none'}
function zoom(f,cx,cy){const W=$('#wrap').getBoundingClientRect();if(cx==null)cx=W.width/2;if(cy==null)cy=W.height/2;const n=Math.min((pic&&pic.zmax)||6,Math.max(1,sc*f));tx=cx-(cx-tx)*n/sc;ty=cy-(cy-ty)*n/sc;sc=n;xf()}
let pts=new Map(),moved=false,last;const W=$('#wrap');
W.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);moved=false;last=null});
W.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const o=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
 if(pts.size==2){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(last){const r=W.getBoundingClientRect();zoom(d/last,(a[0]+b[0])/2-r.left,(a[1]+b[1])/2-r.top)}last=d;moved=true}
 else{const dx=e.clientX-o[0],dy=e.clientY-o[1];if(Math.abs(dx)+Math.abs(dy)>2&&sc>1){tx+=dx;ty+=dy;xf();moved=true}}});
['pointerup','pointercancel'].forEach(t=>W.addEventListener(t,e=>{pts.delete(e.pointerId);if(!pts.size)setTimeout(()=>moved=false,50)}));
W.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.2:1/1.2)});
$('#reset').onclick=fit;$('#reset').addEventListener('pointerdown',e=>e.stopPropagation());$('#zin').onclick=()=>zoom(1.4);$('#zout').onclick=()=>zoom(1/1.4);$('#back').onclick=()=>home();press($('#hback'),()=>welcome());press($('#again'),()=>{$('#yay').style.display='none';erase(pic.id);open(pic)});press($('#ok'),()=>{$('#yay').style.display='none';home()});press($('#askyes'),()=>askYes&&askYes());press($('#askno'),()=>askNo&&askNo());$('#ask').addEventListener('click',e=>{if(e.target===$('#ask')&&askNo)askNo()});welcome();