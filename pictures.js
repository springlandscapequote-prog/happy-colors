// Each picture: id, name, viewBox, palette (index = number-1), regions [{n, d}]
// n = color number, d = SVG path. Add new pictures by appending to this array.
function circ(cx,cy,r){return `M${cx-r},${cy}a${r},${r} 0 1,0 ${2*r},0a${r},${r} 0 1,0 ${-2*r},0Z`}
function rect(x,y,w,h){return `M${x},${y}h${w}v${h}h${-w}Z`}
function star(cx,cy,R,r){let p='';for(let i=0;i<10;i++){const a=Math.PI/5*i-Math.PI/2,q=i%2?r:R;p+=(i?'L':'M')+(cx+q*Math.cos(a)).toFixed(1)+','+(cy+q*Math.sin(a)).toFixed(1)}return p+'Z'}
function petals(cx,cy,r,k,n){const o=[];for(let i=0;i<k;i++){const a=2*Math.PI*i/k;o.push({n,d:circ(cx+r*Math.cos(a),cy+r*Math.sin(a),r*0.6)})}return o}
const PICTURES=[
{id:'stars',name:'Night Stars',viewBox:'0 0 200 200',palette:['#1d2b64','#ffd93d','#ff9f1c','#f4f1de','#6c5ce7','#2ec4b6'],
 regions:[{n:1,d:rect(0,0,200,160)},{n:6,d:'M0,160Q50,140 100,160T200,160V200H0Z'},{n:4,d:circ(160,40,22)},
 ...[[30,30],[80,20],[120,60],[40,90],[90,110],[150,100],[60,140],[180,140]].map(([x,y],i)=>({n:[2,3,5][i%3],d:star(x,y,12,5)}))]},
{id:'butterfly',name:'Butterfly',viewBox:'0 0 200 200',palette:['#a8e6cf','#ff6f91','#ffc75f','#845ec2','#4b4453','#f9f871'],
 regions:[{n:1,d:rect(0,0,200,200)},{n:2,d:'M100,100C60,20 10,40 30,95Z'},{n:2,d:'M100,100C140,20 190,40 170,95Z'},
 {n:4,d:'M100,105C60,180 25,160 40,110Z'},{n:4,d:'M100,105C140,180 175,160 160,110Z'},{n:3,d:circ(55,70,10)},{n:3,d:circ(145,70,10)},
 {n:6,d:circ(65,135,8)},{n:6,d:circ(135,135,8)},{n:5,d:'M95,60h10v90h-10Z'}]},
{id:'garden',name:'Flower Garden',viewBox:'0 0 200 200',palette:['#bde0fe','#52b788','#ff8fab','#ffd60a','#9d4edd','#e85d04'],
 regions:[{n:1,d:rect(0,0,200,140)},{n:2,d:rect(0,140,200,60)},
 ...[[40,3],[100,5],[160,6]].flatMap(([x,c])=>[{n:2,d:rect(x-3,95,6,50)},...petals(x,80,14,6,c),{n:4,d:circ(x,80,8)}])]},
{id:'winter',name:'Winter Bright House',viewBox:'0 0 200 200',palette:['#0b132b','#e63946','#ffffff','#f1c40f','#2a9d8f','#8d5524','#3a86ff'],
 regions:[{n:1,d:rect(0,0,200,150)},{n:3,d:rect(0,150,200,50)},{n:2,d:'M40,90L100,40L160,90Z'},{n:6,d:rect(50,90,100,60)},
 {n:4,d:rect(62,102,22,18)},{n:4,d:rect(116,102,22,18)},{n:5,d:rect(90,115,20,35)},
 ...[0,1,2,3,4,5,6].map(i=>({n:[2,4,5,7][i%4],d:circ(46+i*18,92,4)}))]},
{id:'puppy',name:'Puppy',viewBox:'0 0 200 200',palette:['#ffe5b4','#c68642','#5c3317','#000000','#ff6b81','#90e0ef'],
 regions:[{n:6,d:rect(0,0,200,200)},{n:2,d:circ(100,105,60)},{n:3,d:'M45,60C20,70 25,130 50,120Z'},{n:3,d:'M155,60C180,70 175,130 150,120Z'},
 {n:1,d:'M70,120C70,165 130,165 130,120Z'},{n:4,d:circ(78,92,8)},{n:4,d:circ(122,92,8)},{n:4,d:circ(100,118,9)},{n:5,d:'M92,140h16v14a8,8 0 0,1 -16,0Z'}]},
{id:'rainbow',name:'Rainbow & Sun',viewBox:'0 0 200 200',palette:['#caf0f8','#e63946','#f77f00','#fcbf49','#2a9d8f','#4361ee','#ffffff'],
 regions:[{n:1,d:rect(0,0,200,200)},{n:4,d:circ(165,35,20)},
 ...[2,3,4,5,6].map((c,i)=>{const R=90-i*12,r=R-12;return{n:c,d:`M${100-R},170A${R},${R} 0 0,1 ${100+R},170H${100+r}A${r},${r} 0 0,0 ${100-r},170Z`}}),
 {n:7,d:'M10,170a20,15 0 0,1 50,0Z'},{n:7,d:'M140,170a20,15 0 0,1 50,0Z'}]}
];
// Detailed pictures (25-40 shapes)
PICTURES.push(
{id:'ocean',name:'Ocean Reef',viewBox:'0 0 200 200',palette:['#48cae4','#f4d58d','#ff7b00','#ffffff','#2d6a4f','#ff4d6d','#7b2cbf','#023e8a'],
 regions:[{n:1,d:rect(0,0,200,170)},{n:2,d:'M0,170Q100,155 200,170V200H0Z'},
 ...[[20,140],[45,135],[160,138],[185,142]].map(([x,y])=>({n:5,d:`M${x-5},${y+30}Q${x-12},${y} ${x},${y-30}Q${x+10},${y} ${x+5},${y+30}Z`})),
 ...[[60,50],[140,40],[110,100]].flatMap(([x,y])=>[{n:3,d:`M${x-20},${y}Q${x},${y-15} ${x+15},${y}Q${x},${y+15} ${x-20},${y}Z`},{n:3,d:`M${x+15},${y}L${x+27},${y-9}V${y+9}Z`},{n:4,d:rect(x-6,y-8,4,16)},{n:8,d:circ(x+8,y-2,2.5)}]),
 ...[[30,30],[90,20],[170,80],[50,90],[175,20]].map(([x,y])=>({n:4,d:circ(x,y,4)})),
 {n:6,d:star(95,175,12,5)},{n:7,d:circ(130,178,8)},{n:6,d:star(65,178,9,4)},{n:7,d:circ(30,180,6)},{n:6,d:circ(170,180,6)}]},
{id:'castle',name:'Princess Castle',viewBox:'0 0 200 200',palette:['#cdb4db','#ffafcc','#a2d2ff','#ffd60a','#6c757d','#80ed99','#8d5524','#ffffff'],
 regions:[{n:3,d:rect(0,0,200,160)},{n:6,d:rect(0,160,200,40)},{n:4,d:circ(30,30,15)},
 ...[[150,25],[175,45],[120,15]].map(([x,y])=>({n:8,d:`M${x-15},${y}a8,8 0 0,1 15,-6a8,8 0 0,1 15,6Z`})),
 {n:1,d:rect(55,90,90,70)},{n:1,d:rect(30,70,25,90)},{n:1,d:rect(145,70,25,90)},{n:1,d:rect(85,55,30,35)},
 {n:2,d:'M27,70L42.5,35L58,70Z'},{n:2,d:'M142,70L157.5,35L173,70Z'},{n:2,d:'M82,55L100,15L118,55Z'},
 {n:4,d:'M100,15V5L112,9L100,13Z'},{n:7,d:'M88,160V128a12,12 0 0,1 24,0V160Z'},
 ...[[38,90],[38,120],[153,90],[153,120],[95,65],[68,105],[124,105]].map(([x,y])=>({n:4,d:rect(x,y,9,12)})),
 ...[0,1,2,3,4].map(i=>({n:5,d:rect(57+i*18,84,10,6)})),
 ...[[15,175],[45,185],[160,180],[185,172]].flatMap(([x,y])=>[{n:2,d:circ(x,y,5)},{n:4,d:circ(x,y,2)}])]});
