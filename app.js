const $=s=>document.querySelector(s),NS='http://www.w3.org/2000/svg';let pic,sel=1,filled,sc=1,tx=0,ty=0;
const key=id=>'hc_'+id,load=id=>{try{return JSON.parse(localStorage.getItem(key(id))||'[]')}catch(e){return[]}},save=(id,v)=>{try{localStorage.setItem(key(id),JSON.stringify(v))}catch(e){}};
function mk(t,a,p){const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e}
function center(d){const s=mk('svg',{style:'position:absolute;visibility:hidden'},document.body),p=mk('path',{d},s),b=p.getBBox();s.remove();return[b.x+b.width/2,b.y+b.height/2]}
function home(){$('#game').style.display='none';$('#home').style.display='';const P=$('#picker');P.innerHTML='';
 PICTURES.forEach(p=>{const c=document.createElement('div');c.className='card';const f=new Set(load(p.id));const s=mk('svg',{viewBox:p.viewBox},c);
 p.regions.forEach((r,i)=>mk('path',{d:r.d,fill:f.has(i)?p.palette[r.n-1]:'#fff',stroke:'#999','stroke-width':.6},s));
 c.append(p.name+(f.size==p.regions.length?' ✅':''));c.onclick=()=>open(p);P.appendChild(c)})}
function open(p){pic=p;filled=new Set(load(p.id));$('#home').style.display='none';$('#game').style.display='flex';const A=$('#art');A.innerHTML='';A.setAttribute('viewBox',p.viewBox);
 const W=$('#wrap'),sz=Math.min(W.clientWidth,W.clientHeight);A.setAttribute('width',sz);A.setAttribute('height',sz);sc=1;tx=(W.clientWidth-sz)/2;ty=(W.clientHeight-sz)/2;xf();
 p.regions.forEach((r,i)=>{const e=mk('path',{d:r.d,'data-number':r.n,'data-i':i,fill:filled.has(i)?p.palette[r.n-1]:'#fff'},A);e.onclick=()=>tap(e,i,r.n)});
 p.regions.forEach((r,i)=>{if(!filled.has(i)){const[x,y]=center(r.d);mk('text',{x,y,id:'t'+i},A).textContent=r.n}});
 const pal=$('#pal');pal.innerHTML='';p.palette.forEach((c,i)=>{const b=document.createElement('div');b.className='sw';b.style.background=c;b.textContent=i+1;b.style.color=lum(c)?'#000':'#fff';b.onclick=()=>pick(i+1);pal.appendChild(b)});pick(1);prog();requestAnimationFrame(fit)}
function fit(){if(!pic||$('#game').style.display=='none')return;const W=$('#wrap'),A=$('#art'),sz=Math.min(W.clientWidth,W.clientHeight);A.setAttribute('width',sz);A.setAttribute('height',sz);sc=1;tx=(W.clientWidth-sz)/2;ty=(W.clientHeight-sz)/2;xf()}
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,300));
function lum(c){const n=parseInt(c.slice(1),16);return((n>>16)*.3+(n>>8&255)*.59+(n&255)*.11)>140}
function pick(n){sel=n;[...$('#pal').children].forEach((b,i)=>b.classList.toggle('sel',i+1==n))}
function tap(e,i,n){if(moved||filled.has(i))return;if(n!=sel){const t=$('#t'+i);t&&(t.style.fill='#d6336c',setTimeout(()=>t.style.fill='',700));
 document.querySelectorAll(`#art path[data-number="${sel}"]`).forEach(x=>{if(!filled.has(+x.dataset.i)){x.classList.remove('hint');void x.offsetWidth;x.classList.add('hint')}});return}
 filled.add(i);e.classList.remove("hint");e.setAttribute('fill',pic.palette[n-1]);{const t=$('#t'+i);t&&t.remove()};save(pic.id,[...filled]);prog()}
function prog(){const t=pic.regions.length,p=Math.round(filled.size/t*100);$('#fill').style.width=p+'%';$('#pct').textContent=p+'%';
 pic.palette.forEach((c,k)=>$('#pal').children[k].classList.toggle('done',pic.regions.every((r,i)=>r.n!=k+1||filled.has(i))));
 if(filled.size==t){document.body.dataset.complete=pic.id;setTimeout(()=>$('#yay').style.display='flex',300)}}
function xf(){$('#art').style.transform=`translate(${tx}px,${ty}px) scale(${sc})`}
function zoom(f,cx,cy){const W=$('#wrap').getBoundingClientRect();if(cx==null)cx=W.width/2;if(cy==null)cy=W.height/2;const n=Math.min(6,Math.max(1,sc*f));tx=cx-(cx-tx)*n/sc;ty=cy-(cy-ty)*n/sc;sc=n;xf()}
let pts=new Map(),moved=false,last;const W=$('#wrap');
W.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);moved=false;last=null});
W.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const o=pts.get(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);
 if(pts.size==2){const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(last){const r=W.getBoundingClientRect();zoom(d/last,(a[0]+b[0])/2-r.left,(a[1]+b[1])/2-r.top)}last=d;moved=true}
 else{const dx=e.clientX-o[0],dy=e.clientY-o[1];if(Math.abs(dx)+Math.abs(dy)>2&&sc>1){tx+=dx;ty+=dy;xf();moved=true}}});
['pointerup','pointercancel'].forEach(t=>W.addEventListener(t,e=>{pts.delete(e.pointerId);if(!pts.size)setTimeout(()=>moved=false,50)}));
W.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.2:1/1.2)});
$('#zin').onclick=()=>zoom(1.4);$('#zout').onclick=()=>zoom(1/1.4);$('#back').onclick=home;$('#ok').onclick=()=>{$('#yay').style.display='none';home()};home();
