// Each picture: id, name, viewBox, palette (index = number-1), regions [{n, d}]
// n = color number, d = SVG path. Add new pictures by appending to this array.
function circ(cx,cy,r){return `M${cx-r},${cy}a${r},${r} 0 1,0 ${2*r},0a${r},${r} 0 1,0 ${-2*r},0Z`}
function rect(x,y,w,h){return `M${x},${y}h${w}v${h}h${-w}Z`}
function star(cx,cy,R,r){let p='';for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,q=i%2?r:R;p+=(i?'L':'M')+(cx+q*Math.cos(a)).toFixed(1)+','+(cy+q*Math.sin(a)).toFixed(1)}return p+'Z'}
function petals(cx,cy,r,k,n){const o=[];for(let i=0;i<k;i++){const a=2*Math.PI*i/k;o.push({n,d:circ(cx+r*Math.cos(a),cy+r*Math.sin(a),r*0.6)})}return o}
// Categories shown on the welcome page. Add a category here, then give pictures cat:'<id>' and they appear automatically.
const CATEGORIES=[
{id:'animals',name:'Animals',emoji:'🐶',color:'#ffb347'},
{id:'nature',name:'Nature',emoji:'🌈',color:'#5dd39e'},
{id:'vehicles',name:'Vehicles',emoji:'🚗',color:'#4dabf7'},
{id:'holidays',name:'Holidays & Winter',emoji:'🎄',color:'#ff6b6b'},
{id:'fantasy',name:'Fantasy & Castles',emoji:'🏰',color:'#b197fc'},
{id:'space',name:'Space',emoji:'🚀',color:'#4c6ef5'}];
const PICTURES=[
{id:'stars',level:'easy',cat:'space',name:'Night Stars',viewBox:'0 0 200 200',palette:['#1d2b64','#ffd93d','#ff9f1c','#f4f1de','#6c5ce7','#2ec4b6'],
 regions:[{n:1,d:rect(0,0,200,160)},{n:6,d:'M0,160Q50,140 100,160T200,160V200H0Z'},{n:4,d:circ(160,40,22)},
 ...[[30,30],[80,20],[120,60],[40,90],[90,110],[150,100],[60,140],[180,140]].map(([x,y],i)=>({n:[2,3,5][i%3],d:star(x,y,12,5)}))]},
{id:'butterfly',level:'easy',cat:'animals',name:'Butterfly',viewBox:'0 0 200 200',palette:['#a8e6cf','#ff6f91','#ffc75f','#845ec2','#4b4453','#f9f871'],
 regions:[{n:1,d:rect(0,0,200,200)},{n:2,d:'M100,100C60,20 10,40 30,95Z'},{n:2,d:'M100,100C140,20 190,40 170,95Z'},
 {n:4,d:'M100,105C60,180 25,160 40,110Z'},{n:4,d:'M100,105C140,180 175,160 160,110Z'},{n:3,d:circ(55,70,10)},{n:3,d:circ(145,70,10)},
 {n:6,d:circ(65,135,8)},{n:6,d:circ(135,135,8)},{n:5,d:'M95,60h10v90h-10Z'}]},
{id:'garden',level:'easy',cat:'nature',name:'Flower Garden',viewBox:'0 0 200 200',palette:['#bde0fe','#52b788','#ff8fab','#ffd60a','#9d4edd','#e85d04'],
 regions:[{n:1,d:rect(0,0,200,140)},{n:2,d:rect(0,140,200,60)},
 ...[[40,3],[100,5],[160,6]].flatMap(([x,c])=>[{n:2,d:rect(x-3,95,6,50)},...petals(x,80,14,6,c),{n:4,d:circ(x,80,8)}])]},
{id:'winter',level:'easy',cat:'holidays',name:'Winter Bright House',viewBox:'0 0 200 200',palette:['#0b132b','#e63946','#ffffff','#f1c40f','#2a9d8f','#8d5524','#3a86ff'],
 regions:[{n:1,d:rect(0,0,200,150)},{n:3,d:rect(0,150,200,50)},{n:2,d:'M40,90L100,40L160,90Z'},{n:6,d:rect(50,90,100,60)},
 {n:4,d:rect(62,102,22,18)},{n:4,d:rect(116,102,22,18)},{n:5,d:rect(90,115,20,35)},
 ...[0,1,2,3,4,5,6].map(i=>({n:[2,4,5,7][i%4],d:circ(46+i*18,92,4)}))]},
{id:'puppy',level:'easy',cat:'animals',name:'Puppy',viewBox:'0 0 200 200',palette:['#ffe5b4','#c68642','#5c3317','#000000','#ff6b81','#90e0ef'],
 regions:[{n:6,d:rect(0,0,200,200)},{n:2,d:circ(100,105,60)},{n:3,d:'M45,60C20,70 25,130 50,120Z'},{n:3,d:'M155,60C180,70 175,130 150,120Z'},
 {n:1,d:'M70,120C70,165 130,165 130,120Z'},{n:4,d:circ(78,92,8)},{n:4,d:circ(122,92,8)},{n:4,d:circ(100,118,9)},{n:5,d:'M92,140h16v14a8,8 0 0,1 -16,0Z'}]},
{id:'rainbow',level:'easy',cat:'nature',name:'Rainbow & Sun',viewBox:'0 0 200 200',palette:['#caf0f8','#e63946','#f77f00','#fcbf49','#2a9d8f','#4361ee','#ffffff'],
 regions:[{n:1,d:rect(0,0,200,200)},{n:4,d:circ(165,35,20)},
 ...[2,3,4,5,6].map((c,i)=>{const R=90-i*12,r=R-12;return{n:c,d:`M${100-R},170A${R},${R} 0 0,1 ${100+R},170H${100+r}A${r},${r} 0 0,0 ${100-r},170Z`}}),
 {n:7,d:'M10,170a20,15 0 0,1 50,0Z'},{n:7,d:'M140,170a20,15 0 0,1 50,0Z'}]}
];
// Detailed pictures (25-40 shapes)
PICTURES.push(
{id:'ocean',level:'easy',cat:'nature',name:'Ocean Reef',viewBox:'0 0 200 200',palette:['#48cae4','#f4d58d','#ff7b00','#ffffff','#2d6a4f','#ff4d6d','#7b2cbf','#023e8a'],
 regions:[{n:1,d:rect(0,0,200,170)},{n:2,d:'M0,170Q100,155 200,170V200H0Z'},
 ...[[20,140],[45,135],[160,138],[185,142]].map(([x,y])=>({n:5,d:`M${x-5},${y+30}Q${x-12},${y} ${x},${y-30}Q${x+10},${y} ${x+5},${y+30}Z`})),
 ...[[60,50],[140,40],[110,100]].flatMap(([x,y])=>[{n:3,d:`M${x-20},${y}Q${x},${y-15} ${x+15},${y}Q${x},${y+15} ${x-20},${y}Z`},{n:3,d:`M${x+15},${y}L${x+27},${y-9}V${y+9}Z`},{n:4,d:rect(x-6,y-8,4,16)},{n:8,d:circ(x+8,y-2,2.5)}]),
 ...[[30,30],[90,20],[170,80],[50,90],[175,20]].map(([x,y])=>({n:4,d:circ(x,y,4)})),
 {n:6,d:star(95,175,12,5)},{n:7,d:circ(130,178,8)},{n:6,d:star(65,178,9,4)},{n:7,d:circ(30,180,6)},{n:6,d:circ(170,180,6)}]},
{id:'castle',level:'easy',cat:'fantasy',name:'Princess Castle',viewBox:'0 0 200 200',palette:['#cdb4db','#ffafcc','#a2d2ff','#ffd60a','#6c757d','#80ed99','#8d5524','#ffffff'],
 regions:[{n:3,d:rect(0,0,200,160)},{n:6,d:rect(0,160,200,40)},{n:4,d:circ(30,30,15)},
 ...[[150,25],[175,45],[120,15]].map(([x,y])=>({n:8,d:`M${x-15},${y}a8,8 0 0,1 15,-6a8,8 0 0,1 15,6Z`})),
 {n:1,d:rect(55,90,90,70)},{n:1,d:rect(30,70,25,90)},{n:1,d:rect(145,70,25,90)},{n:1,d:rect(85,55,30,35)},
 {n:2,d:'M27,70L42.5,35L58,70Z'},{n:2,d:'M142,70L157.5,35L173,70Z'},{n:2,d:'M82,55L100,15L118,55Z'},
 {n:4,d:'M100,15V5L112,9L100,13Z'},{n:7,d:'M88,160V128a12,12 0 0,1 24,0V160Z'},
 ...[[38,90],[38,120],[153,90],[153,120],[95,65],[68,105],[124,105]].map(([x,y])=>({n:4,d:rect(x,y,9,12)})),
 ...[0,1,2,3,4].map(i=>({n:5,d:rect(57+i*18,84,10,6)})),
 ...[[15,175],[45,185],[160,180],[185,172]].flatMap(([x,y])=>[{n:2,d:circ(x,y,5)},{n:4,d:circ(x,y,2)}])]});

// ---- Hard sample: Sunflower Mandala (procedural, ~138 spaces, 14 colors) ----
(function(){
 const C=100,pol=(r,a)=>[C+r*Math.cos(a),C+r*Math.sin(a)],f=v=>v.toFixed(1),pt=(r,a)=>pol(r,a).map(f).join(',');
 const sec=(r1,r2,a1,a2)=>`M${pt(r2,a1)}A${r2},${r2} 0 0,1 ${pt(r2,a2)}L${pt(r1,a2)}A${r1},${r1} 0 0,0 ${pt(r1,a1)}Z`;
 const petal=(rb,rt,a,dw)=>{const m=(rb+rt)/2;return `M${pt(rb,a-dw)}Q${pt(m,a-dw*1.7)} ${pt(rt,a)}Q${pt(m,a+dw*1.7)} ${pt(rb,a+dw)}Z`};
 const cc=(x,y,r)=>circ(x,y,r),N=16,T=Math.PI*2/N,R=[];
 R.push({n:1,d:rect(0,0,200,200)});
 for(let i=0;i<N;i++){const[x,y]=pol(85,T*i);R.push({n:i%2?10:9,d:cc(x,y,10)})}                 // scallop edge
 for(let i=0;i<N;i++)R.push({n:i%2?6:5,d:petal(58,88,T*i+T/2,.1)});                              // pointed petals
 for(let i=0;i<N;i++)R.push({n:i%2?3:4,d:sec(46,62,T*i,T*(i+1))});                                // outer ring
 for(let i=0;i<N;i++)R.push({n:i%2?12:11,d:sec(32,46,T*i+T/2,T*(i+1)+T/2)});                      // middle ring
 for(let i=0;i<N;i++)R.push({n:i%2?8:7,d:sec(18,32,T*i,T*(i+1))});                                // inner ring
 for(let i=0;i<N;i++){const[x,y]=pol(39,T*i+T);R.push({n:14,d:cc(x,y,3.4)})}                      // seed dots
 for(let i=0;i<N;i++){const a=T*i+T/2,[x,y]=pol(54,a);R.push({n:5,d:`M${f(x-3.2)},${f(y)}L${f(x)},${f(y-4.2)}L${f(x+3.2)},${f(y)}L${f(x)},${f(y+4.2)}Z`})} // diamonds
 for(let i=0;i<8;i++)R.push({n:2,d:petal(6,19,Math.PI/4*i,.3)});                                  // sunflower center petals
 R.push({n:13,d:cc(100,100,8)});
 for(let i=0;i<N;i++){const[x,y]=pol(70,T*i);R.push({n:3,d:cc(x,y,3.2)})}                         // dots between petals
 PICTURES.push({id:'mandala',name:'Sunflower Mandala',level:'hard',cat:'nature',viewBox:'0 0 200 200',
  palette:['#d0ebff','#ffd43b','#f08c00','#e8590c','#c92a2a','#f783ac','#9c36b5','#5f3dc4','#1c7ed6','#22b8cf','#2f9e44','#8ce99a','#6f4e37','#fff3bf'],regions:R});
})();
// ---- New Easy / Medium pictures (procedural). Medium = 50-80 spaces, 10-14 colors. ----
(function(){
 const f=v=>+v.toFixed(1),ell=(cx,cy,rx,ry)=>`M${f(cx-rx)},${f(cy)}a${rx},${ry} 0 1,0 ${f(2*rx)},0a${rx},${ry} 0 1,0 ${f(-2*rx)},0Z`;
 const poly=a=>'M'+a.map(p=>p.join(',')).join('L')+'Z',R=(n,d)=>({n,d}),mir=x=>200-x;
 const add=(id,name,level,cat,palette,regions)=>PICTURES.push({id,name,level,cat,viewBox:'0 0 200 200',palette,regions});

 // ===== School Bus (Easy, Vehicles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,128)),R(7,rect(0,118,200,34)),R(2,rect(0,150,200,50)),R(3,circ(30,30,14)),R(8,ell(110,28,22,8)),R(8,ell(150,44,16,6)));
  r.push(R(3,rect(18,68,160,72)),R(3,rect(176,98,18,42)));
  for(let i=0;i<4;i++)r.push(R(5,rect(28+i*27,76,22,24)));
  r.push(R(4,rect(18,108,160,6)),R(6,rect(18,118,160,6)),R(5,rect(138,78,28,56)),R(6,rect(28,60,12,8)),R(6,rect(150,60,12,8)),R(8,circ(189,112,4)),R(6,rect(18,126,5,9)));
  [[50],[140]].forEach(([x])=>{r.push(R(4,circ(x,142,16)),R(8,circ(x,142,7)))});
  [10,80,150].forEach(x=>r.push(R(8,rect(x,176,32,6))));
  add('bus','School Bus','easy','vehicles',['#bde0fe','#6c757d','#ffd60a','#212529','#74c0fc','#e63946','#80ed99','#ffffff'],r)})();

 // ===== Fire Truck (Medium, Vehicles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,130)),R(6,circ(172,26,13)));
  [[30,24],[100,18],[150,52]].forEach(([x,y])=>r.push(R(8,ell(x,y,18,7)),R(8,ell(x+10,y-5,10,6))));
  r.push(R(2,ell(40,128,60,22)),R(2,ell(160,130,55,18)),R(2,rect(0,126,200,26)));
  // tree
  r.push(R(12,rect(178,70,7,60)),R(2,circ(182,56,18)),R(9,circ(176,60,4)),R(9,circ(190,52,3)));
  // fire station
  r.push(R(5,rect(6,76,76,64)),R(11,'M4,76L44,42L84,76Z'),R(10,rect(34,56,20,12)),R(3,rect(22,100,40,40)),R(12,rect(22,100,40,6)));
  for(let i=0;i<3;i++)r.push(R(10,rect(12+i*24,82,14,12)));
  r.push(R(6,circ(44,62,3)));
  // road
  r.push(R(3,rect(0,138,200,62)));
  for(let i=0;i<4;i++)r.push(R(6,rect(8+i*50,184,28,5)));
  // hydrant
  r.push(R(4,rect(26,150,10,16)),R(10,rect(23,147,16,4)),R(10,rect(36,154,5,5)));
  // truck
  r.push(R(4,rect(58,96,86,40)),R(4,rect(138,84,48,52)),R(9,rect(146,91,30,18)),R(10,circ(189,99,3.5)));
  for(let i=0;i<3;i++)r.push(R(5,rect(64+i*26,104,22,26)),R(10,rect(80+i*26,112,4,10)));
  r.push(R(10,rect(60,86,82,8)));
  for(let i=0;i<6;i++)r.push(R(7,rect(66+i*13,86,4,8)));
  r.push(R(11,circ(152,79,4)),R(6,circ(170,79,4)),R(8,rect(58,131,128,4)),R(10,rect(182,122,10,10)),R(6,circ(184,113,4)),R(10,rect(150,114,24,4)));
  [80,116,164].forEach(x=>r.push(R(7,circ(x,140,14)),R(10,circ(x,140,6))));
  // cones
  [[16,176],[196,170]].forEach(([x,y])=>r.push(R(11,poly([[x-7,y+10],[x,y-8],[x+7,y+10]])),R(8,rect(x-4,y+1,8,4))));
  add('firetruck','Fire Truck','medium','vehicles',['#a5d8ff','#69db7c','#495057','#e03131','#c92a2a','#ffd43b','#212529','#ffffff','#74c0fc','#ced4da','#ff922b','#a0522d'],r)})();

 // ===== Wise Owl (Medium, Animals) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(2,circ(36,36,20)),R(12,circ(30,30,4)),R(12,circ(42,42,3)));
  [[90,20],[130,38],[165,18],[180,62],[62,12],[20,80]].forEach(([x,y],i)=>r.push(R(12,star(x,y,i%2?6:8,3))));
  r.push(R(3,'M0,150Q100,140 200,152V166Q100,156 0,166Z'),R(6,circ(30,158,5)),R(6,circ(172,158,4)));
  // leaves
  [[20,146,-1],[44,148,-1],[164,146,1],[184,149,1],[8,162,-1],[190,164,1]].forEach(([x,y])=>r.push(R(11,ell(x,y-6,10,5))));
  // owl
  r.push(R(4,ell(100,118,50,52)),R(4,circ(100,82,44)),R(6,poly([[60,56],[66,34],[82,48]])),R(6,poly([[140,56],[134,34],[118,48]])));
  r.push(R(6,'M54,96Q26,128 50,160Q72,152 70,112Z'),R(6,'M146,96Q174,128 150,160Q128,152 130,112Z'));
  [[50,110],[46,128],[52,146]].forEach(([x,y])=>{r.push(R(4,ell(x,y,8,6)),R(4,ell(mir(x),y,8,6)))});
  r.push(R(5,ell(100,128,30,36)));
  [[84,104],[100,104],[116,104],[92,118],[108,118],[84,132],[100,132],[116,132]].forEach(([x,y])=>r.push(R(6,circ(x,y,6))));
  r.push(R(5,circ(78,82,19)),R(5,circ(122,82,19)),R(7,circ(78,82,13)),R(7,circ(122,82,13)),R(8,circ(78,82,8)),R(8,circ(122,82,8)),R(9,circ(78,82,4)),R(9,circ(122,82,4)));
  r.push(R(10,poly([[91,92],[109,92],[100,108]])),R(6,poly([[64,66],[78,60],[76,68]])),R(6,poly([[136,66],[122,60],[124,68]])));
  [[84],[116]].forEach(([x])=>{for(let k=-1;k<=1;k++)r.push(R(10,ell(x+k*8,157,4,3)))});
  [[16,110],[184,100],[24,60],[176,130]].forEach(([x,y])=>r.push(R(12,circ(x,y,3))));
  add('owl','Wise Owl','medium','animals',['#3b3a6e','#fff3bf','#8d5524','#c68642','#ffe8cc','#7f4f24','#ffffff','#fab005','#212529','#ff922b','#51cf66','#ffd43b'],r)})();

 // ===== Christmas Tree (Medium, Holidays & Winter) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(12,circ(172,30,14)));
  [[20,20],[60,40],[40,70],[150,60],[185,80],[90,16],[120,34],[14,110]].forEach(([x,y])=>r.push(R(2,circ(x,y,2.6))));
  r.push(R(12,ell(170,188,80,28)),R(2,ell(40,186,90,28)),R(2,rect(0,176,200,24)));
  // snowman
  r.push(R(2,circ(28,154,16)),R(2,circ(28,130,12)),R(2,circ(28,111,9)),R(7,rect(21,100,14,6)),R(7,rect(17,105,22,3)),R(11,poly([[28,112],[36,113],[28,115]])),R(8,rect(18,119,20,5)));
  // tree
  r.push(R(5,rect(90,150,20,30)),R(3,poly([[100,22],[130,78],[70,78]])),R(4,poly([[100,50],[146,118],[54,118]])),R(3,poly([[100,82],[162,160],[38,160]])));
  r.push(R(6,star(100,22,13,5.5)));
  r.push(R(9,'M62,100Q100,114 138,100L141,107Q100,121 59,107Z'),R(9,'M46,138Q100,156 154,138L158,146Q100,164 42,146Z'),R(9,'M80,66Q100,74 120,66L122,72Q100,80 78,72Z'));
  [[100,92,7],[84,104,8],[116,104,10],[70,134,7],[100,142,8],[130,134,10],[54,150,8],[148,150,7],[92,168,10],[112,170,8],[100,64,10],[100,114,7]].forEach(([x,y,n])=>r.push(R(n,circ(x,y,5.5))));
  [[88,78],[112,80],[74,116],[128,118],[58,152],[142,156],[100,130],[86,150]].forEach(([x,y])=>r.push(R(6,circ(x,y,2.8))));
  // presents
  r.push(R(7,rect(48,164,26,18)),R(9,rect(59,164,4,18)),R(9,circ(61,162,4)));
  r.push(R(8,rect(122,166,24,16)),R(2,rect(132,166,4,16)),R(2,circ(134,164,4)));
  r.push(R(10,rect(150,170,22,12)),R(6,rect(159,170,4,12)),R(6,circ(161,168,3.5)));
  add('tree','Christmas Tree','medium','holidays',['#13315c','#ffffff','#2b9348','#1b6b34','#8d5524','#ffd60a','#e63946','#4dabf7','#ffb703','#c77dff','#fb8500','#adc4e0'],r)})();

 // ===== Rainbow Castle (Medium, Fantasy & Castles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  [[9,100],[11,92],[8,84],[3,76],[10,68]].forEach(([n,Rr])=>{const w=8;r.push(R(n,`M${100-Rr},170A${Rr},${Rr} 0 0,1 ${100+Rr},170H${100+Rr-w}A${Rr-w},${Rr-w} 0 0,0 ${100-Rr+w},170Z`))});
  [[14,150],[186,150],[40,34],[160,26]].forEach(([x,y])=>r.push(R(2,ell(x,y,16,7)),R(2,ell(x+8,y-5,9,6))));
  [[20,70],[180,80],[60,18],[140,60]].forEach(([x,y])=>r.push(R(8,star(x,y,6,2.6))));
  r.push(R(3,ell(30,188,70,26)),R(3,ell(172,188,70,26)),R(3,rect(0,172,200,28)));
  // castle
  r.push(R(4,rect(70,96,60,76)),R(4,rect(40,80,28,92)),R(4,rect(132,80,28,92)),R(4,rect(88,56,24,44)));
  r.push(R(6,poly([[36,80],[54,46],[72,80]])),R(6,poly([[128,80],[146,46],[164,80]])),R(6,poly([[84,56],[100,16],[116,56]])));
  r.push(R(9,poly([[100,16],[100,4],[114,10]])),R(9,poly([[54,46],[54,36],[66,41]])),R(9,poly([[146,46],[146,36],[158,41]])));
  [[76,90],[85,90],[115,90],[124,90]].forEach(([x,y])=>r.push(R(5,rect(x,y,6,7))));
  [[54,100],[146,100],[100,70]].forEach(([x,y])=>r.push(R(8,'M'+(x-5)+','+(y+14)+'V'+y+'a5,5 0 0,1 10,0V'+(y+14)+'Z')));
  [[54,134],[146,134]].forEach(([x,y])=>r.push(R(5,rect(x-2,y-8,4,16))));
  r.push(R(8,rect(80,112,12,16)),R(8,rect(108,112,12,16)),R(7,'M88,172V150a12,12 0 0,1 24,0V172Z'),R(8,circ(107,160,1.8)),R(12,'M88,200L94,172H106L112,200Z'));
  [[54,48],[146,48],[100,18]].forEach(([x,y])=>r.push(R(8,circ(x,y+4,0))));
  r.pop();r.pop();r.pop();
  [[14,170,6],[38,180,9],[160,176,8],[184,170,6],[70,184,11],[132,186,6],[52,192,8],[190,190,9]].forEach(([x,y,n])=>r.push(R(n,circ(x,y,4))));
  [[12,176],[196,180],[24,190]].forEach(([x,y])=>r.push(R(3,ell(x,y,12,7))));
  r.push(R(10,rect(40,166,28,6)),R(10,rect(132,166,28,6)));
  add('rainbowcastle','Rainbow Castle','medium','fantasy',['#a5d8ff','#ffffff','#8ce99a','#d0bfff','#9775fa','#f06595','#8d5524','#ffd43b','#fa5252','#4dabf7','#ff922b','#adb5bd'],r)})();

 // ===== Rocket Trip (Medium, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  [[110,16],[150,24],[186,20],[16,100],[70,18],[176,100],[14,150],[190,170],[142,92],[56,96]].forEach(([x,y],i)=>r.push(R(2,star(x,y,i%3?5:7,2.2))));
  [[132,18],[142,72],[30,90],[170,70],[186,90],[44,134],[178,152]].forEach(([x,y])=>r.push(R(3,circ(x,y,2.5))));
  // ringed planet (ring behind planet)
  r.push(R(10,ell(42,48,40,9)),R(9,circ(42,48,24)),R(10,ell(34,40,5,3)),R(10,ell(52,56,6,4)),R(8,ell(36,58,4,2.6)));
  // small planet
  r.push(R(11,circ(162,50,15)),R(8,circ(157,46,3)),R(8,circ(168,55,4)));
  // moon surface
  r.push(R(6,ell(100,226,140,56)));
  [[30,178,9],[90,172,7],[150,180,10],[190,190,6],[60,192,6]].forEach(([x,y,rad])=>r.push(R(12,circ(x,y,rad))));
  // earth
  r.push(R(5,circ(166,120,14)),R(11,'M158,114q6,-4 8,2q-3,6 -8,4Z'),R(11,'M168,124q5,-2 6,3q-4,4 -6,-3Z'));
  // ufo
  r.push(R(6,ell(32,118,18,5)),R(5,'M22,116a10,9 0 0,1 20,0Z'),R(2,circ(22,119,2.6)),R(2,circ(32,121,2.6)),R(2,circ(42,119,2.6)));
  // rocket
  r.push(R(7,'M82,150Q100,205 118,150Z'),R(2,'M90,150Q100,190 110,150Z'),R(3,'M93,150Q100,176 107,150Z'));
  r.push(R(4,'M74,105Q48,120 46,152L76,136Z'),R(4,'M126,105Q152,120 154,152L124,136Z'),R(4,poly([[91,132],[100,162],[109,132]])));
  r.push(R(3,'M100,36Q132,66 128,152H72Q68,66 100,36Z'),R(4,'M100,36Q116,50 121,70H79Q84,50 100,36Z'));
  r.push(R(4,rect(74,112,52,7)),R(6,circ(100,92,14)),R(5,circ(100,92,9)),R(5,circ(84,134,4)),R(5,circ(116,134,4)),R(6,rect(72,144,56,8)));
  add('rocket','Rocket Trip','medium','space',['#1a1b4b','#ffe066','#ffffff','#e03131','#74c0fc','#adb5bd','#ff922b','#f08c00','#9c36b5','#f783ac','#20c997','#868e96'],r)})();
})();
// Level for any picture without one: Easy up to 35 spaces, Medium 36-80, Hard 81+
PICTURES.forEach(p=>{if(!p.level)p.level=p.regions.length<=35?'easy':p.regions.length<=80?'medium':'hard'});
const LEVELS={easy:{name:'Easy',stars:'⭐',order:0},medium:{name:'Medium',stars:'⭐⭐',order:1},hard:{name:'Hard',stars:'⭐⭐⭐',order:2}};
