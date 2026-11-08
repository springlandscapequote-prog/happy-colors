// ---- Daily pictures (original art drawn in code by this project; license CC0). One block per day, newest last. See DAILY_RUN.md and PICTURE_LOG.md. ----
// Helpers (circ, rect, star come from pictures.js). Levels: Easy <=35 regions, Medium 36-80, Hard 81+.
(function(){
 const f=v=>+v.toFixed(1),ell=(cx,cy,rx,ry)=>`M${f(cx-rx)},${f(cy)}a${rx},${ry} 0 1,0 ${f(2*rx)},0a${rx},${ry} 0 1,0 ${f(-2*rx)},0Z`;
 const poly=a=>'M'+a.map(p=>f(p[0])+','+f(p[1])).join('L')+'Z',R=(n,d)=>({n,d});
 const add=(id,name,level,cat,palette,regions)=>PICTURES.push({id,name,level,cat,viewBox:'0 0 200 200',palette,regions});
 // rotated ellipse (sampled polygon); a0..a1 = arc range in radians (full = 0..2PI)
 const rell=(cx,cy,rx,ry,rot,a0,a1)=>{const o=[];for(let i=0;i<=36;i++){const a=a0+(a1-a0)*i/36,x=rx*Math.cos(a),y=ry*Math.sin(a);o.push([cx+x*Math.cos(rot)-y*Math.sin(rot),cy+x*Math.sin(rot)+y*Math.cos(rot)])}return o};
 // horizontal band of a circle between y1 and y2 (sampled polygon)
 const band=(cx,cy,r,y1,y2)=>{const L=[],Rr=[],N=10,w=y=>Math.sqrt(Math.max(0,r*r-(y-cy)*(y-cy)));for(let i=0;i<=N;i++){const y=y1+(y2-y1)*i/N;L.push([cx-w(y),y]);Rr.push([cx+w(y),y])}return poly(Rr.concat(L.reverse()))};

 // ===== 2026-10-15  Happy Snowman (Easy, Holidays & Winter) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(9,circ(168,32,16)));
  r.push(R(3,ell(34,44,22,9)),R(3,ell(140,66,22,9)));
  r.push(R(2,'M0,128Q60,104 120,126T200,118V200H0Z'));
  // pine tree
  r.push(R(7,rect(160,138,10,18)),R(8,poly([[165,78],[186,106],[144,106]])),R(8,poly([[165,92],[192,124],[138,124]])),R(8,poly([[165,108],[198,140],[132,140]])),R(9,star(165,76,9,4)));
  // snowman (arms first so they sit behind the body)
  r.push(R(7,'M64,104L30,86L33,81L66,98Z'),R(7,'M112,104L146,86L143,81L110,98Z'));
  r.push(R(3,circ(88,158,34)),R(3,circ(88,108,26)),R(3,circ(88,68,20)));
  r.push(R(4,rect(66,40,44,6)),R(4,rect(72,18,32,24)),R(6,rect(72,32,32,7)));
  r.push(R(4,circ(81,64,4)),R(4,circ(95,64,4)),R(5,poly([[88,69],[108,75],[88,80]])));
  r.push(R(6,rect(66,84,44,10)),R(6,'M100,92L112,92L116,126L102,126Z'));
  [[88,112],[88,130],[88,148]].forEach(([x,y])=>r.push(R(4,circ(x,y,3.4))));
  r.push(R(10,circ(74,74,4)),R(10,circ(102,74,4)));
  // snowflakes
  [[20,60],[34,96],[126,40],[184,70],[120,96]].forEach(([x,y])=>r.push(R(3,star(x,y,5,2))));
  add('snowman','Happy Snowman','easy','holidays',['#74c0fc','#e7f5ff','#ffffff','#212529','#ff922b','#e03131','#8d5524','#2b9348','#ffd43b','#f783ac'],r)})();

 // ===== 2026-10-15  Planet Parade (Hard, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  // two big nebula clouds behind everything (large, easy-to-tap areas)
  r.push(R(13,poly(rell(104,92,76,17,.12,0,6.2832))),R(10,poly(rell(38,62,30,13,-.55,0,6.2832))),R(13,poly(rell(176,150,26,12,.9,0,6.2832))));
  // stars
  [[100,8,6],[192,12,5],[188,96,5],[8,100,5],[100,196,5],[170,198,5],[70,40,4],[56,92,4],[120,66,5],[16,188,5],[198,40,4],[76,110,4],[178,118,4],[150,8,5]].forEach(([x,y,s],i)=>r.push(R(i%3==0?9:i%3==1?2:11,star(x,y,s,s*.42))));
  // sun (top-left corner)
  for(let i=0;i<7;i++){const a=.06+i*.225,b=a+.17;r.push(R(3,poly([[14+38*Math.cos(a),14+38*Math.sin(a)],[14+58*Math.cos((a+b)/2),14+58*Math.sin((a+b)/2)],[14+38*Math.cos(b),14+38*Math.sin(b)]])))}
  r.push(R(3,circ(14,14,44)),R(2,circ(14,14,35)),R(3,circ(8,24,6)),R(3,circ(27,7,5)),R(4,circ(30,28,4)));
  // Mercury
  r.push(R(5,circ(74,16,8)),R(14,circ(71,14,2.2)),R(14,circ(77,19,2)));
  // Venus
  r.push(R(6,circ(94,54,13)),R(3,band(94,54,13,47,53)),R(2,band(94,54,13,57,63)),R(4,circ(88,47,2.4)));
  // Earth + moon
  r.push(R(7,circ(134,30,15)),R(8,poly([[123,22],[130,17],[134,24],[128,31],[121,29]])),R(8,poly([[136,32],[145,29],[147,37],[140,43]])),R(9,band(134,30,15,16,20)),R(9,band(134,30,15,41,45)));
  r.push(R(9,ell(141,23,5,2)),R(9,ell(125,38,5,2)));
  r.push(R(5,circ(166,14,7)),R(14,circ(164,12,2)),R(14,circ(169,17,1.9)));
  // Mars
  r.push(R(4,circ(170,62,11)),R(9,band(170,62,11,51,55)),R(3,circ(166,66,3)),R(14,circ(174,58,2.2)));
  // asteroid belt
  [[66,80],[86,92],[104,80],[122,92],[142,80]].forEach(([x,y],i)=>{const k=6+i%2;r.push(R(14,poly([[x-k,y-k*.6],[x+k*.2,y-k],[x+k,y-k*.1],[x+k*.5,y+k*.8],[x-k*.7,y+k*.7]])))});
  // Jupiter
  r.push(R(6,circ(40,132,31)),R(3,band(40,132,31,106,116)),R(4,band(40,132,31,122,133)),R(3,band(40,132,31,140,148)),R(4,band(40,132,31,153,158)),R(4,ell(58,142,10,6)),R(3,ell(58,142,5,3)));
  // Saturn
  const sx=142,sy=112,rot=-.28;
  r.push(R(6,poly(rell(sx,sy,42,13,rot,0,6.2832))),R(3,circ(sx,sy,18)),R(2,band(sx,sy,18,98,106)),R(4,band(sx,sy,18,109,114)),R(2,band(sx,sy,18,126,130)));
  r.push(R(6,poly(rell(sx,sy,42,13,rot,0,3.1416).concat(rell(sx,sy,28,7,rot,3.1416,0)))));
  // Uranus (tilted ring)
  r.push(R(10,poly(rell(112,152,6,20,.35,0,6.2832))),R(11,circ(112,152,13)),R(13,band(112,152,13,146,150)),R(13,band(112,152,13,156,160)));
  // Neptune
  r.push(R(7,circ(160,152,12)),R(13,band(160,152,12,145,149)),R(13,band(160,152,12,157,161)),R(9,ell(165,148,4,2)),R(13,circ(154,152,3)));
  // Pluto
  r.push(R(12,circ(186,166,6)),R(9,circ(184,164,2)));
  // comet
  r.push(R(11,poly([[134,188],[190,192],[190,180]])),R(9,poly([[136,188],[176,187],[176,184]])),R(2,circ(136,188,7)),R(3,circ(136,188,4)));
  // rocket
  r.push(R(3,poly([[82,196],[88,176],[94,196]])),R(9,ell(88,162,9,18)),R(4,poly([[79,152],[88,130],[97,152]])),R(7,circ(88,160,4.5)),R(4,poly([[79,166],[67,182],[80,180]])),R(4,poly([[97,166],[109,182],[96,180]])),R(2,poly([[84,181],[88,192],[92,181]])));
  add('planets','Planet Parade','hard','space',['#0b1033','#ffd43b','#ff922b','#e03131','#adb5bd','#c8a27a','#339af0','#51cf66','#f8f9fa','#9775fa','#66d9e8','#f783ac','#364fc7','#495057'],r)})();

 // ===== 2026-10-16  Rainbow Unicorn (Easy, Fantasy & Castles) =====
 (function(){const r=[];
  const arc=(cx,cy,R1,R2)=>`M${cx-R1},${cy}A${R1},${R1} 0 0 1 ${cx+R1},${cy}L${cx+R2},${cy}A${R2},${R2} 0 0 0 ${cx-R2},${cy}Z`;
  r.push(R(1,rect(0,0,200,200)),R(5,circ(174,28,15)));
  // rainbow (behind everything else)
  r.push(R(8,arc(92,140,90,78)),R(10,arc(92,140,78,66)),R(5,arc(92,140,66,54)),R(7,arc(92,140,54,42)));
  r.push(R(2,ell(24,136,30,13)),R(2,ell(160,136,30,13)));
  r.push(R(6,'M0,146Q60,128 120,144T200,140V200H0Z'));
  // tail (behind the body)
  r.push(R(4,'M62,128Q40,124 34,146Q30,166 44,176Q40,158 50,148Q56,140 64,140Z'),R(3,'M62,136Q50,142 50,158Q52,170 60,176Q56,160 66,146Z'));
  // legs + hooves
  [[70,172],[84,174],[118,174],[132,172]].forEach(([x,y])=>{r.push(R(2,rect(x,140,10,y-140)),R(9,rect(x,y,10,8)))});
  // body, neck, head
  r.push(R(2,ell(100,138,38,20)));
  r.push(R(2,poly([[114,126],[128,92],[146,96],[136,136]])));
  r.push(R(2,poly(rell(146,98,18,11,.45,0,6.2832))));
  r.push(R(2,poly([[134,86],[138,72],[144,84]])));
  r.push(R(5,poly([[142,84],[154,58],[150,87]])));
  // mane (pink and purple)
  r.push(R(3,'M136,80Q124,80 120,96Q116,112 110,124L118,126Q124,108 132,98Q138,90 142,86Z'),R(4,'M120,96Q106,104 104,122L112,124Q114,110 124,100Z'));
  r.push(R(9,circ(148,96,2.6)),R(3,circ(156,106,3.4)));
  // flowers
  [[30,170],[176,166]].forEach(([x,y])=>r.push(R(3,star(x,y,8,5)),R(5,circ(x,y,3))));
  r.push(R(5,star(28,30,9,4)),R(5,star(126,26,8,3.6)));
  add('unicorn','Rainbow Unicorn','easy','fantasy',['#a5d8ff','#ffffff','#f783ac','#b197fc','#ffd43b','#69db7c','#74c0fc','#ff6b6b','#495057','#ff922b'],r)})();

 // ===== 2026-10-16  Busy Harbor (Hard, Vehicles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  // sun with rays
  for(let i=0;i<8;i++){const a=i*Math.PI/4+.2,b=a+.38;r.push(R(3,poly([[30+15*Math.cos(a),26+15*Math.sin(a)],[30+25*Math.cos((a+b)/2),26+25*Math.sin((a+b)/2)],[30+15*Math.cos(b),26+15*Math.sin(b)]])))}
  r.push(R(3,circ(30,26,14)));
  // clouds
  r.push(R(2,ell(86,22,20,8)),R(2,ell(128,10,16,6)),R(2,ell(16,66,14,6)));
  // seagulls
  [[58,46],[78,58],[106,40]].forEach(([x,y])=>r.push(R(2,poly([[x-9,y-1],[x-4,y-5],[x,y-1.5],[x+4,y-5],[x+9,y-1],[x+4,y-0.5],[x,y+3],[x-4,y-0.5]]))));
  // hills
  r.push(R(4,'M0,106Q22,78 56,96Q84,74 120,98Q138,92 150,106Z'),R(13,'M40,106Q66,90 96,100Q118,92 140,106Z'));
  // lighthouse: beams, tower stripes, lamp, roof
  r.push(R(3,poly([[166,32],[134,22],[134,48],[166,42]])),R(3,poly([[182,32],[200,26],[200,48],[182,42]])));
  const xl=y=>162+(98-y)*4/54,xr=y=>186-(98-y)*4/54,seg=(a,b)=>poly([[xl(a),a],[xr(a),a],[xr(b),b],[xl(b),b]]);
  r.push(R(7,seg(44,58)),R(2,seg(58,71)),R(7,seg(71,85)),R(2,seg(85,98)));
  r.push(R(3,rect(166,28,16,16)),R(11,rect(163,42,22,4)),R(7,poly([[162,29],[174,14],[186,29]])),R(6,rect(171,61,6,7)),R(11,rect(170,84,8,13)));
  // water bands
  r.push(R(6,rect(0,104,200,96)));
  r.push(R(10,poly([[146,116],[150,106],[160,97],[172,100],[186,94],[200,99],[200,116]])));
  r.push(R(5,'M0,132Q25,126 50,132T100,132T150,132T200,132V200H0Z'),R(6,'M0,160Q25,154 50,160T100,160T150,160T200,160V200H0Z'),R(5,'M0,188Q25,182 50,188T100,188T150,188T200,188V200H0Z'));
  // cargo ship (back left)
  r.push(R(8,rect(70,66,8,16)),R(11,rect(70,66,8,4)));
  r.push(R(2,rect(64,80,18,25)),R(11,rect(67,85,12,5)),R(11,rect(67,93,12,5)));
  [[14,92,8],[27,92,12],[40,92,3],[53,92,4],[18,81,14],[31,81,6],[44,81,12]].forEach(([x,y,c])=>r.push(R(c,rect(x,y,12.5,11))));
  r.push(R(7,poly([[4,104],[90,104],[84,118],[12,118]])),R(2,poly([[7.5,110],[87.3,110],[85.6,114],[10.3,114]])));
  // sailboat (middle)
  r.push(R(9,rect(110,76,4,54)),R(7,poly([[114,76],[127,80],[114,85]])));
  r.push(R(2,poly([[116,86],[116,127],[144,127]])),R(3,poly([[108,90],[108,127],[88,127]])));
  r.push(R(12,poly([[84,129],[148,129],[140,143],[92,143]])),R(2,poly([[85.7,132],[146.3,132],[145.1,135],[86.9,135]])),R(1,circ(104,139,2.4)),R(1,circ(128,139,2.4)));
  // fish
  [[40,140,1],[100,194,-1]].forEach(([x,y,s])=>{r.push(R(8,poly([[x-s*8,y],[x-s*16,y-6],[x-s*16,y+6]])),R(8,ell(x,y,9,5)),R(11,circ(x+s*4,y-1,1.8)))});
  // buoys
  [[96,166],[200-6,146]].forEach(([x,y],i)=>{if(i)return;r.push(R(7,circ(x,y,7)),R(2,band(x,y,7,y-2,y+2)),R(3,poly([[x-2,y-7],[x,y-13],[x+2,y-7]])))});
  r.push(R(7,circ(70,146,5)),R(2,band(70,146,5,144.5,147.5)));
  // fishing boat (front left)
  r.push(R(9,rect(54,138,3.6,34)),R(14,poly([[57,140],[57,160],[70,160]])));
  r.push(R(2,rect(22,154,22,18)),R(1,rect(26,158,7,6)),R(1,rect(35,158,6,6)),R(7,rect(20,150,26,5)));
  r.push(R(8,poly([[8,172],[78,172],[68,188],[18,188]])),R(11,poly([[10.5,176],[75.5,176],[73.6,179],[12.4,179]])));
  // tugboat (front right)
  r.push(R(2,ell(172,127,6,4.5)),R(2,ell(181,118,7.5,5.5)),R(2,ell(191,107,8,6)));
  r.push(R(8,rect(166,134,10,34)),R(11,rect(166,134,10,5)),R(2,rect(166,148,10,4)));
  r.push(R(3,rect(136,138,24,10)),R(1,rect(140,140,7,5)),R(1,rect(150,140,7,5)));
  r.push(R(2,rect(126,148,40,22)),R(1,rect(130,153,8,8)),R(1,rect(142,153,8,8)),R(1,rect(154,153,8,8)));
  r.push(R(7,poly([[108,168],[198,168],[190,188],[118,188]])),R(2,poly([[109.6,172],[196.4,172],[195.2,175],[110.8,175]])));
  [[124,181],[140,181],[156,181],[172,181]].forEach(([x,y])=>r.push(R(11,circ(x,y,4))));
  add('harbor','Busy Harbor','hard','vehicles',['#a5d8ff','#ffffff','#ffd43b','#69db7c','#1c7ed6','#4dabf7','#e03131','#ff922b','#8d5524','#adb5bd','#343a40','#9775fa','#2f9e44','#f783ac'],r)})();

 // ===== 2026-10-17  Peacock Parade (Hard, Animals) =====
 (function(){const r=[],cx=100,cy=150,P=(a,d)=>[cx+d*Math.cos(a),cy+d*Math.sin(a)],D=Math.PI/180;
  r.push(R(1,rect(0,0,200,200)),R(3,circ(184,16,12)));
  r.push(R(2,ell(26,20,20,8)),R(2,ell(150,10,16,6)),R(2,ell(20,76,16,7)),R(2,ell(180,72,16,7)));
  r.push(R(4,'M0,150Q50,128 100,142T200,136V200H0Z'));
  // tail fan backing (one big area behind the feathers)
  r.push(R(6,`M${cx-98},${cy}A98,98 0 0 1 ${cx+98},${cy}Z`));
  // outer row of tail feathers with eyes
  for(let i=0;i<9;i++){const a=(-166+i*19)*D,[x,y]=P(a,66),[ex,ey]=P(a,i==4?86:80);
   r.push(R(i%2?7:14,poly(rell(x,y,32,12.5,a,0,6.2832))));
   r.push(R(3,poly(rell(ex,ey,10.5,8.5,a,0,6.2832))),R(8,poly(rell(ex,ey,7,5.6,a,0,6.2832))),R(i%2?10:9,poly(rell(ex-1.2*Math.cos(a),ey-1.2*Math.sin(a),3.4,2.8,a,0,6.2832))))}
  // inner row
  for(let i=0;i<8;i++){const a=(-157+i*19)*D,[x,y]=P(a,42),[ex,ey]=P(a,52);
   r.push(R(i%2?14:7,poly(rell(x,y,22,10,a,0,6.2832))));
   r.push(R(3,poly(rell(ex,ey,7.5,6,a,0,6.2832))),R(i%2?9:10,poly(rell(ex,ey,3.8,3,a,0,6.2832))))}
  // grass in front of the tail
  r.push(R(5,'M0,160Q50,150 100,158T200,154V200H0Z'));
  // legs + feet
  r.push(R(11,rect(90,150,4,22)),R(11,rect(104,150,4,22)),R(11,poly([[84,172],[96,170],[96,175],[84,176]])),R(11,poly([[102,170],[114,172],[114,176],[102,175]])));
  // body, wing, neck, head
  r.push(R(9,ell(99,138,17,20)));
  r.push(R(7,poly(rell(92,142,8,15,.25,0,6.2832))));
  r.push(R(9,'M96,122Q90,104 96,88Q100,80 108,82Q112,90 106,104Q104,114 108,124Z'));
  r.push(R(9,circ(104,84,9)));
  r.push(R(2,ell(106,82,4,3)),R(13,circ(107,82,1.9)));
  r.push(R(11,poly([[111,85],[121,88],[111,91]])));
  // crest
  [[97,73],[104,71],[111,73]].forEach(([x,y])=>r.push(R(8,circ(x,y,3))));
  // flowers in the grass
  [[24,178],[60,190],[148,186],[182,172]].forEach(([x,y],i)=>r.push(R(i%2?12:2,star(x,y,8,5)),R(3,circ(x,y,3))));
  add('peacock','Peacock Parade','hard','animals',['#a5d8ff','#ffffff','#ffd43b','#b2f2bb','#51cf66','#2b8a3e','#20c997','#22b8cf','#1c64d6','#5f3dc4','#ff922b','#f783ac','#343a40','#94d82d'],r)})();

 // ===== 2026-10-17  Pumpkin Patch (Medium, Holidays & Winter) =====
 (function(){const r=[],T=6.2832;
  r.push(R(1,rect(0,0,200,200)),R(3,circ(26,24,14)));
  r.push(R(2,ell(84,22,20,8)),R(2,ell(122,12,14,6)));
  r.push(R(4,'M0,100Q50,80 100,94T200,88V200H0Z'));
  // autumn tree (behind the fence)
  r.push(R(9,rect(160,58,10,56)));
  r.push(R(6,circ(165,46,27)),R(10,circ(147,56,11)),R(3,circ(184,50,10)),R(10,circ(164,26,10)),R(3,circ(158,62,8)));
  // fence: rails first, posts on top
  r.push(R(9,rect(0,102,200,6)),R(9,rect(0,116,200,6)));
  [86,118,148,184].forEach(x=>r.push(R(11,rect(x,94,6,32))));
  // field
  r.push(R(5,'M0,128Q100,118 200,128V200H0Z'));
  r.push(R(12,'M0,188Q100,180 200,188V200H0Z'));
  // hay bales with straps
  [[4,110],[40,110],[22,88]].forEach(([x,y])=>{r.push(R(3,rect(x,y,36,22)),R(11,rect(x+8,y,4,22)),R(11,rect(x+24,y,4,22)))});
  // vine leaves on the ground
  [[66,150,.5],[132,146,-.6],[20,152,-.3],[180,150,.4]].forEach(([x,y,a])=>r.push(R(8,poly(rell(x,y,10,5,a,0,T)))));
  // pumpkins: back lobes first, middle lobe on top, then stem + leaf
  const pk=(x,y,w,h,s)=>{
   r.push(R(7,ell(x-w*.55,y,w*.6,h)),R(7,ell(x+w*.55,y,w*.6,h)));
   if(s>1)r.push(R(6,ell(x-w*.28,y,w*.55,h*1.05)),R(6,ell(x+w*.28,y,w*.55,h*1.05)));
   r.push(R(s>1?7:6,ell(x,y,w*.45,h*1.1)));
   r.push(R(13,poly([[x-2.4,y-h*1.1+1],[x-1.6,y-h*1.1-7],[x+3,y-h*1.1-8],[x+2.4,y-h*1.1+1]])));
   if(s>0)r.push(R(8,poly(rell(x+9,y-h*1.1-3,7,3.4,-.5,0,T))))};
  pk(100,162,24,20,2);
  pk(44,166,18,14,1);pk(158,166,18,14,1);
  pk(72,184,12,9,0);pk(130,186,12,9,0);
  // falling leaves
  [[56,52,.6,10],[112,64,-.4,6],[194,92,.9,10],[16,72,-.8,3]].forEach(([x,y,a,c])=>r.push(R(c,poly(rell(x,y,6,3.2,a,0,T)))));
  add('pumpkinpatch','Pumpkin Patch','medium','holidays',['#a5d8ff','#ffffff','#ffd43b','#c0eb75','#a9714b','#ff922b','#e8590c','#2f9e44','#8d5524','#e03131','#e0a458','#69db7c','#5c940d'],r)})();

 // ===== 2026-10-18  Dragon & Castle Mountain (Hard, Fantasy & Castles) =====
 (function(){const r=[],T=6.2832;
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(4,circ(176,24,17)),R(3,circ(176,24,11)));
  r.push(R(2,ell(32,20,22,8)),R(2,ell(98,14,18,7)),R(2,ell(140,10,13,5)));
  // far mountains with snow caps
  r.push(R(5,poly([[0,112],[20,84],[44,98],[84,42],[112,86],[134,68],[170,96],[200,84],[200,140],[0,140]])));
  r.push(R(2,poly([[84,42],[95.2,59.5],[89,56],[84,62],[78,56],[71.4,57.5]])));
  // hills: meadow, castle hill, front hill
  r.push(R(10,'M0,120Q70,104 130,118T200,112V200H0Z'));
  r.push(R(11,'M0,104Q40,90 80,102Q104,110 118,126L118,200H0Z'));
  r.push(R(9,'M0,160Q60,140 120,154T200,148V200H0Z'));
  // winding path from the castle gate
  r.push(R(15,'M32,100Q42,120 26,136Q12,152 30,172L46,172Q30,152 44,136Q56,118 42,100Z'));
  // castle
  r.push(R(7,rect(14,70,44,30)),R(7,rect(21,64,5,6)),R(7,rect(46,64,5,6)));
  r.push(R(7,rect(4,58,16,42)),R(7,rect(52,58,16,42)),R(7,rect(28,52,16,20)));
  r.push(R(12,poly([[2,58],[12,38],[22,58]])),R(12,poly([[50,58],[60,38],[70,58]])),R(12,poly([[25,52],[36,32],[47,52]])));
  r.push(R(3,poly([[12,39],[12,27],[22,32]])),R(13,poly([[36,33],[36,21],[46,26]])));
  r.push(R(14,'M29,100V88a7,7 0 0 1 14,0V100Z'));
  r.push(R(6,rect(9,66,6,9)),R(6,rect(57,66,6,9)),R(6,circ(36,60,3.4)));
  // pine trees
  [[80,108],[98,118],[66,116]].forEach(([x,y],i)=>{const s=i==2?.8:1;
   r.push(R(14,rect(x-2.5,y-8*s,5,8*s)),R(11,poly([[x,y-34*s],[x+11*s,y-16*s],[x-11*s,y-16*s]])),R(i==2?10:11,poly([[x,y-26*s],[x+13*s,y-8*s],[x-13*s,y-8*s]])))});
  // ---- friendly dragon ----
  // tail with spade tip
  r.push(R(16,'M160,168Q198,176 192,138L183,139Q186,162 158,158Z'));
  r.push(R(12,poly([[187.5,122],[199,142],[176,142]])));
  // wing (three membranes between the finger bones)
  const A=[150,110],W=[[112,56],[140,36],[174,38],[196,72]];
  for(let i=0;i<3;i++){const a=W[i],b=W[i+1],c=[A[0]+.55*((a[0]+b[0])/2-A[0]),A[1]+.55*((a[1]+b[1])/2-A[1])];
   r.push(R(i%2?4:13,`M${A[0]},${A[1]}L${a[0]},${a[1]}Q${f(c[0])},${f(c[1])} ${b[0]},${b[1]}Z`))}
  // back spikes (partly behind the neck and body)
  [[145.5,86.9,-.6],[152,97.5,-.6],[159.5,107.9,-.7],[166.9,113.8,-1.1],[177.9,122.7,-.7],[183.6,136.8,-.2]].forEach(([x,y,a])=>{
   const ux=Math.cos(a),uy=Math.sin(a),tx=-uy,ty=ux;r.push(R(12,poly([[x+tx*6,y+ty*6],[x+ux*11,y+uy*11],[x-tx*6,y-ty*6]])))});
  // body, belly, neck
  r.push(R(16,ell(158,142,26,30)));
  r.push(R(16,'M144,124Q134,100 124,84L140,76Q150,98 168,118Z'));
  r.push(R(3,ell(148,148,14,22)));
  [132,142,152,162].forEach(y=>r.push(R(4,ell(148,y,(y==132||y==162)?8:11,3.4))));
  // legs and arm
  r.push(R(16,ell(174,160,12,15)),R(16,ell(166,178,15,5.5)));
  [[156,180],[162,182],[168,182]].forEach(([x,y])=>r.push(R(2,circ(x,y,2.3))));
  r.push(R(16,poly(rell(134,142,6,12,.5,0,T))),R(16,circ(128,152,5)));
  // horns, head, snout
  r.push(R(3,poly([[126,66],[134,46],[138,64]])),R(3,poly([[114,68],[112,50],[123,64]])));
  r.push(R(16,ell(124,76,16,13)),R(9,ell(108,83,11,8)));
  r.push(R(6,circ(103,80,2.3)),R(6,circ(110,79,2.3)));
  r.push(R(2,ell(127,71,5,5.5)),R(6,circ(126,71,2.7)),R(13,circ(120,85,3.2)));
  // little smoke puffs (a friendly dragon)
  r.push(R(7,circ(93,74,4)),R(7,circ(85,65,5.5)));
  // treasure
  [[110,176],[119,180],[128,176],[114,170],[124,170]].forEach(([x,y])=>r.push(R(3,circ(x,y,4.4))));
  r.push(R(13,poly([[119,158],[124,163],[119,168],[114,163]])));
  // rocks and flowers
  r.push(R(8,ell(84,166,9,5)),R(8,ell(186,186,10,6)));
  [[14,186],[56,190],[80,184],[150,194]].forEach(([x,y],i)=>r.push(R(i%2?12:13,star(x,y,7.5,4.5)),R(3,circ(x,y,2.6))));
  add('dragonmountain','Dragon & Castle Mountain','hard','fantasy',['#a5d8ff','#ffffff','#ffd43b','#ff922b','#b197fc','#5f3dc4','#dee2e6','#adb5bd','#b2f2bb','#69db7c','#2b8a3e','#fa5252','#f783ac','#a9714b','#e0a458','#20c997'],r)})();

 // ===== 2026-10-18  Moon Base (Medium, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  // Earth in the sky
  r.push(R(9,circ(40,40,20)),R(10,poly([[28,30],[38,24],[44,32],[36,42],[26,40]])),R(10,poly([[44,44],[54,40],[57,50],[48,56]])),R(2,ell(46,26,7,2.6)));
  // stars and a shooting star
  [[92,14],[124,34],[150,12],[188,44],[78,54],[12,80],[108,76],[166,72]].forEach(([x,y],i)=>r.push(R(i%2?2:3,star(x,y,5.5,2.4))));
  r.push(R(4,poly([[135,51],[145,61],[180,26]])),R(3,circ(140,56,5.5)));
  // moon hills and ground
  r.push(R(7,'M0,120Q40,98 80,112T160,104T200,100V200H0Z'));
  r.push(R(6,'M0,146Q60,132 120,142T200,136V200H0Z'));
  r.push(R(8,ell(146,114,10,3.6)),R(8,ell(18,122,9,3.6)));
  r.push(R(8,ell(40,180,17,6.5)),R(7,ell(40,181,10,3.6)),R(8,ell(150,186,14,5)),R(8,ell(98,192,10,4)),R(8,ell(188,160,9,3.6)));
  // solar panels on a stand
  r.push(R(8,rect(20,116,4,22)));
  r.push(R(13,poly([[4,104],[16,103],[17,118],[5,119]])),R(11,poly([[16,103],[28,102],[29,117],[17,118]])),R(13,poly([[28,102],[40,101],[41,116],[29,117]])));
  // main dome with windows and door
  r.push(R(2,'M50,128A30,30 0 0 1 110,128Z'),R(5,rect(46,128,68,10)));
  r.push(R(11,circ(62,118,4.5)),R(11,circ(80,106,4.5)),R(11,circ(98,118,4.5)));
  r.push(R(12,'M74,138V126a6,6 0 0 1 12,0V138Z'));
  // tunnel and small dome with antenna
  r.push(R(7,rect(110,126,26,9)));
  r.push(R(8,rect(150.5,96,4,20)),R(2,poly(rell(146,94,11,5,-.5,0,3.1416))),R(12,circ(155,90,3.2)));
  r.push(R(2,'M136,130A16,16 0 0 1 168,130Z'),R(5,rect(134,130,36,8)),R(11,circ(152,123,4)));
  // base flag with a star
  r.push(R(8,rect(178,96,4,48)),R(5,rect(182,97,17,14)),R(3,star(190.5,104,5.5,2.4)));
  // rover
  r.push(R(8,rect(158,128,3.6,22)),R(12,circ(159.8,125,4)));
  r.push(R(2,poly([[118,150],[124,138],[150,138],[156,150]])),R(11,poly([[127,141.5],[147,141.5],[151,148],[123,148]])));
  r.push(R(4,rect(110,150,56,14)),R(3,circ(113.5,155,2.6)));
  [118,138,158].forEach(x=>r.push(R(8,circ(x,168,7.5)),R(3,circ(x,168,3.2))));
  // moon rocks
  r.push(R(7,ell(66,160,7,4)),R(7,ell(184,186,8,4.5)),R(7,ell(10,164,6,3.8)));
  add('moonbase','Moon Base','medium','space',['#24305e','#ffffff','#ffd43b','#ff922b','#b197fc','#f1f3f5','#ced4da','#868e96','#339af0','#51cf66','#a5d8ff','#fa5252','#3b5bdb'],r)})();

 // ===== 2026-10-19  Gingerbread Village (Hard, Holidays & Winter) =====
 (function(){const r=[],T=6.2832;
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(3,circ(180,20,12)));
  r.push(R(2,ell(30,18,20,8)),R(2,ell(96,12,16,6)),R(2,ell(140,26,14,6)));
  [[62,34],[118,44],[12,48],[160,52],[82,36]].forEach(([x,y])=>r.push(R(2,star(x,y,5,2.2))));
  // snowy hills and pine trees far behind
  r.push(R(4,'M0,98Q50,72 100,88T200,80V200H0Z'));
  [[30,66],[174,62]].forEach(([x,y])=>r.push(R(10,poly([[x,y-26],[x+13,y-4],[x-13,y-4]])),R(9,poly([[x,y-14],[x+16,y+14],[x-16,y+14]]))));
  r.push(R(2,'M0,118Q60,104 120,114T200,110V200H0Z'));
  // a gingerbread house: walls, roof, icing edges, candies
  const house=(x0,x1,yb,yr,peak,roofC,doorC,wide)=>{const w=x1-x0,cx=(x0+x1)/2,ov=8;
   r.push(R(5,rect(x0,yr,w,yb-yr)));
   r.push(R(roofC,poly([[x0-ov,yr+4],[cx,peak],[x1+ov,yr+4]])));
   // icing along both roof edges
   const ex=(ax,ay,bx,by,t)=>{const dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy),nx=-dy/L*t,ny=dx/L*t;return poly([[ax,ay],[bx,by],[bx+nx,by+ny],[ax+nx,ay+ny]])};
   r.push(R(2,ex(x0-ov,yr+4,cx,peak,-5)),R(2,ex(cx,peak,x1+ov,yr+4,-5)));
   return {cx,w}};
  // left house
  let h=house(10,50,156,116,84,11,7);
  r.push(R(2,rect(10,116,40,5)));
  r.push(R(3,rect(16,126,12,12)),R(2,rect(14,138,16,4)));
  r.push(R(7,'M34,156V140a6,6 0 0 1 12,0V156Z'));
  r.push(R(8,circ(30,104,4.5)),R(9,circ(20,110,3.6)),R(13,circ(40,110,3.6)));
  r.push(R(12,circ(16,148,3)),R(8,circ(27,150,3)));
  // right house
  h=house(150,192,156,114,82,12,8);
  r.push(R(2,rect(150,114,42,5)));
  r.push(R(3,rect(174,124,12,12)),R(2,rect(172,136,16,4)));
  r.push(R(8,'M155,156V138a6,6 0 0 1 12,0V156Z'));
  r.push(R(7,circ(171,102,4.5)),R(11,circ(160,108,3.6)),R(13,circ(182,108,3.6)));
  r.push(R(11,circ(178,148,3)),R(7,circ(187,150,3)));
  // big middle house with chimney (chimney behind the roof)
  r.push(R(6,rect(116,50,12,30)),R(2,rect(114,46,16,6)));
  house(62,138,152,92,46,8,7);
  r.push(R(7,circ(100,72,8)),R(2,circ(100,72,3.6)));
  [[80,82],[120,82],[92,58],[108,58]].forEach(([x,y],i)=>r.push(R([9,11,13,12][i],circ(x,y,4))));
  r.push(R(2,'M62,92H138V98Q131,103 124,98Q117,103 110,98Q103,103 96,98Q89,103 82,98Q75,103 68,98Q65,101 62,98Z'));
  r.push(R(3,rect(70,106,16,16)),R(3,rect(114,106,16,16)),R(2,rect(68,122,20,4)),R(2,rect(112,122,20,4)));
  r.push(R(2,'M88,146V124a12,12 0 0 1 24,0V146Z'),R(13,'M92,146V125a8,8 0 0 1 16,0V146Z'),R(14,circ(104,134,2)));
  r.push(R(12,rect(62,140,26,8)),R(12,rect(112,140,26,8)));
  [[69,144,8],[81,144,7],[119,144,7],[131,144,8]].forEach(([x,y,c])=>r.push(R(c,circ(x,y,2.6))));
  // snowy ground and candy path
  r.push(R(2,'M0,156Q50,150 100,154T200,152V200H0Z'));
  [[100,160,8],[94,171,11],[104,182,12],[96,194,8]].forEach(([x,y,c])=>r.push(R(c,ell(x,y,9,4.5))));
  // gumdrop bushes in front of the houses
  [[56,156,9],[144,156,9],[6,160,7],[196,160,11]].forEach(([x,y,c])=>r.push(R(c,`M${x-8},${y}A8,9 0 0 1 ${x+8},${y}Z`)));
  // gingerbread friend (legs and arms first)
  const gx=58,gy=172;
  r.push(R(5,poly(rell(gx-5,gy+14,4.5,9,.3,0,T))),R(5,poly(rell(gx+5,gy+14,4.5,9,-.3,0,T))));
  r.push(R(5,poly(rell(gx-10,gy-2,9,4.5,-.5,0,T))),R(5,poly(rell(gx+10,gy-2,9,4.5,.5,0,T))));
  r.push(R(5,ell(gx,gy+3,9,11)),R(5,circ(gx,gy-14,8)));
  r.push(R(14,circ(gx-3,gy-16,1.9)),R(14,circ(gx+3,gy-16,1.9)),R(7,ell(gx,gy-10,3.4,1.9)));
  [-3,3,9].forEach(d=>r.push(R(2,circ(gx,gy+d,2.2))));
  // candy cane post
  r.push(R(2,rect(146,152,8,40)));
  [158,170,182].forEach(y=>r.push(R(7,rect(146,y,8,5))));
  r.push(R(7,'M146,152A12,12 0 0 1 170,152L162,152A4,4 0 0 0 154,152Z'));
  // lollipop
  r.push(R(6,rect(178,166,4,30)),R(8,circ(180,164,11)),R(3,circ(180,164,7)),R(2,circ(180,164,3)));
  add('gingerbread','Gingerbread Village','hard','holidays',['#a5d8ff','#ffffff','#ffd43b','#dbe4ff','#d9883e','#8d5524','#fa5252','#f783ac','#51cf66','#2b8a3e','#b197fc','#63e6be','#ff922b','#343a40'],r)})();

 // ===== 2026-10-19  Hot Air Balloons (Medium, Vehicles) =====
 (function(){const r=[],T=6.2832;
  // balloon envelope (round top, tapered bottom); kx squeezes it sideways to make the stripes
  const env=(cx,cy,s,kx)=>{const X=d=>f(cx+d*s*kx),Y=d=>f(cy+d*s);return `M${X(-1)},${Y(0)}A${f(s*kx)},${f(s)} 0 0 1 ${X(1)},${Y(0)}Q${X(1)},${Y(.85)} ${X(.32)},${Y(1.28)}L${X(-.32)},${Y(1.28)}Q${X(-1)},${Y(.85)} ${X(-1)},${Y(0)}Z`};
  const balloon=(cx,cy,s,cols,skirt,bask)=>{
   [1,.62,.26].forEach((k,i)=>{if(cols[i])r.push(R(cols[i],env(cx,cy,s,k)))});
   const y0=cy+s*1.28,hw=s*.32,sh=Math.max(s*.18,5),bw=Math.max(s*.5,10),bh=Math.max(s*.32,7);
   r.push(R(skirt,poly([[cx-hw,y0],[cx+hw,y0],[cx+hw*.75,y0+sh],[cx-hw*.75,y0+sh]])));
   if(bask)r.push(R(10,rect(f(cx-bw/2),f(y0+sh),f(bw),f(bh))));
   if(s>=20)r.push(R(13,rect(f(cx-bw/2-1),f(y0+sh),f(bw+2),4)))};
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(3,circ(26,24,14)));
  r.push(R(2,ell(160,18,22,8)),R(2,ell(70,36,18,7)),R(2,ell(64,112,18,7)),R(2,ell(16,92,16,6)));
  [[126,20],[140,28]].forEach(([x,y])=>r.push(R(14,poly([[x-7,y-1],[x-3.5,y-4.5],[x,y-1.5],[x+3.5,y-4.5],[x+7,y-1],[x+3.5,y],[x,y+2.6],[x-3.5,y]]))));
  // hills, fields, river
  r.push(R(9,'M0,146Q40,124 90,138T200,130V200H0Z'));
  r.push(R(4,'M0,164Q60,148 120,160T200,156V200H0Z'));
  r.push(R(12,'M0,182Q50,172 100,180T200,176V200H0Z'));
  r.push(R(6,'M118,160Q132,170 120,182L136,182Q146,170 134,159Z'));
  // trees
  [[22,150],[156,154],[184,148]].forEach(([x,y])=>r.push(R(10,rect(x-2,y,4,10)),R(5,circ(x,y-4,7))));
  // little barn
  r.push(R(7,rect(54,146,22,16)),R(10,poly([[51,147],[65,135],[79,147]])),R(2,rect(61,152,8,10)));
  // balloons: far small one first, big front one last
  balloon(160,44,15,[11,2,null],3,true);
  balloon(42,58,20,[8,3,8],7,true);
  balloon(156,92,13,[6,2,6],3,true);
  balloon(104,46,30,[7,3,6],8,true);
  r.push(R(2,star(104,40,7,3)));
  add('balloons','Hot Air Balloons','medium','vehicles',['#a5d8ff','#ffffff','#ffd43b','#94d82d','#2f9e44','#339af0','#fa5252','#ff922b','#69db7c','#a9714b','#9775fa','#d8f5a2','#8d5524','#495057'],r)})();

 // ===== 2026-10-20  Penguin Family (Medium, Animals) =====
 (function(){const r=[],T=6.2832;
  // generic cartoon penguin: flippers first (behind the body), then body, belly, feet, head and face
  const peng=(cx,cy,s)=>{const S=v=>f(v*s);
   r.push(R(4,poly(rell(cx-21*s,cy-4*s,6*s,19*s,.38,0,T))),R(4,poly(rell(cx+21*s,cy-4*s,6*s,19*s,-.38,0,T))));
   r.push(R(4,ell(cx,cy,S(22),S(36))),R(2,ell(cx,cy+S(8),S(15),S(27))),R(13,ell(cx,cy-S(18),S(12),S(5))));
   r.push(R(5,ell(cx-S(9),cy+S(36),S(9),Math.max(S(4),3.5))),R(5,ell(cx+S(9),cy+S(36),S(9),Math.max(S(4),3.5))));
   r.push(R(4,circ(cx,cy-S(40),S(17))),R(2,circ(cx-S(6),cy-S(40),S(7))),R(2,circ(cx+S(6),cy-S(40),S(7))));
   r.push(R(10,circ(cx-S(12),cy-S(34),Math.max(S(2.8),2.2))),R(10,circ(cx+S(12),cy-S(34),Math.max(S(2.8),2.2))));
   r.push(R(4,circ(cx-S(6),cy-S(41),Math.max(S(2.6),2.1))),R(4,circ(cx+S(6),cy-S(41),Math.max(S(2.6),2.1))));
   r.push(R(5,poly([[cx-S(5),cy-S(35)],[cx+S(5),cy-S(35)],[cx,cy-S(27)]])))};
  r.push(R(1,rect(0,0,200,200)),R(3,circ(30,28,14)));
  r.push(R(2,ell(150,24,24,9)),R(2,ell(94,42,18,7)));
  [[112,14],[190,62],[10,66]].forEach(([x,y])=>r.push(R(2,star(x,y,5,2.2))));
  // sea with waves, floating iceberg and a jumping fish
  r.push(R(6,rect(0,100,200,42)));
  r.push(R(12,'M0,110Q25,105 50,110T100,110T150,110T200,110V116Q175,111 150,116T100,116T50,116T0,116Z'));
  r.push(R(12,'M0,124Q25,119 50,124T100,124T150,124T200,124V130Q175,125 150,130T100,130T50,130T0,130Z'));
  r.push(R(7,poly([[80,122],[90,92],[104,84],[116,96],[124,122]])),R(9,poly([[104,84],[116,96],[124,122],[106,122]])));
  r.push(R(11,poly([[184,98],[196,90],[194,104]])),R(11,poly(rell(176,104,11,6,-.5,0,T))),R(4,circ(171,105,1.9)));
  // ice floe and snow lumps
  r.push(R(7,'M0,138Q50,130 100,136T200,132V200H0Z'));
  r.push(R(2,ell(18,190,26,9)),R(2,ell(186,190,24,8)));
  // dad, mom, chick
  peng(56,132,1);
  peng(148,140,.86);
  const c=102;
  r.push(R(5,ell(c-5,180,6,3.5)),R(5,ell(c+5,180,6,3.5)));
  r.push(R(8,ell(c,166,13,14)),R(14,ell(c,171,8,8.5)),R(8,circ(c,144,13)),R(2,ell(c,147,11,9)));
  r.push(R(4,circ(c-4,143.5,2)),R(4,circ(c+4,143.5,2)),R(5,poly([[c-3.6,147],[c+3.6,147],[c,152.5]])));
  add('penguins','Penguin Family','medium','animals',['#a5d8ff','#ffffff','#ffd43b','#343a40','#ff922b','#339af0','#e7f5ff','#adb5bd','#99e9f2','#f783ac','#20c997','#1c7ed6','#ffc078','#e9ecef'],r)})();

 // ===== 2026-10-20  Little Red Tractor (Easy, Vehicles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(3,circ(172,30,16)));
  r.push(R(2,ell(46,30,24,9)),R(2,ell(104,22,16,7)));
  r.push(R(4,'M0,118Q50,98 100,114T200,106V200H0Z'));
  r.push(R(10,rect(180,84,7,30)),R(5,circ(183,80,14)));
  r.push(R(9,'M0,150Q100,138 200,150V200H0Z'));
  r.push(R(10,'M0,182Q100,174 200,182V189Q100,181 0,189Z'));
  // flowers in the field
  [[112,180],[186,170],[36,184]].forEach(([x,y])=>r.push(R(6,circ(x,y,6.5)),R(3,circ(x,y,2.6))));
  // round hay bale
  r.push(R(3,circ(20,160,12)),R(9,circ(20,160,5)));
  // tractor: exhaust and smoke behind, then cab, hood, wheels on top
  r.push(R(7,rect(124,86,6,28)),R(2,circ(130,76,7)),R(2,circ(142,62,9)));
  r.push(R(6,rect(54,72,46,64)));
  r.push(R(7,rect(48,62,58,10)),R(8,rect(64,80,26,22)));
  r.push(R(6,rect(96,112,70,32)),R(7,rect(158,116,8,24)),R(3,circ(156,108,5)));
  r.push(R(6,'M34,142A38,38 0 0 1 110,142L104,142A32,32 0 0 0 40,142Z'));
  r.push(R(7,circ(72,142,30)),R(3,circ(72,142,16)),R(6,circ(72,142,6)));
  r.push(R(7,circ(146,158,16)),R(3,circ(146,158,8)),R(6,circ(146,158,3.2)));
  add('tractor','Little Red Tractor','easy','vehicles',['#a5d8ff','#ffffff','#ffd43b','#8ce99a','#2f9e44','#fa5252','#343a40','#74c0fc','#d4a373','#8d5524'],r)})();
 // ===== 2026-10-21  Floating Astronaut (Easy, Space) =====
 (function(){const r=[],T=6.2832;
  // rounded rectangle
  const rr=(x,y,w,h,q)=>`M${x+q},${y}H${x+w-q}A${q},${q} 0 0 1 ${x+w},${y+q}V${y+h-q}A${q},${q} 0 0 1 ${x+w-q},${y+h}H${x+q}A${q},${q} 0 0 1 ${x},${y+h-q}V${y+q}A${q},${q} 0 0 1 ${x+q},${y}Z`;
  r.push(R(1,rect(0,0,200,200)));
  [[24,24,7],[70,16,5],[186,98,6],[16,96,5],[178,150,6],[132,186,5]].forEach(([x,y,k])=>r.push(R(3,star(x,y,k,k*.42))));
  // comet
  r.push(R(9,poly([[118,18],[156,6],[160,26],[118,27]])),R(3,star(116,22,7,3)));
  // big planet (bottom-left) and ringed planet (top-right)
  r.push(R(7,circ(26,178,40)),R(8,band(26,178,40,150,161)),R(4,circ(46,186,6)));
  r.push(R(6,poly(rell(170,52,26,6,-.3,0,T))),R(9,circ(170,52,13)));
  // astronaut (generic, tinted visor - no face): antenna and backpack first
  r.push(R(4,rect(98,24,4,12)),R(10,circ(100,23,4.5)));
  r.push(R(4,rr(68,84,64,50,10)));
  r.push(R(2,poly(rell(65,85,20,8,.785,0,T))),R(2,poly(rell(135,85,20,8,-.785,0,T))));
  r.push(R(6,circ(49,69,7.5)),R(6,circ(151,69,7.5)));
  r.push(R(2,rr(80,126,17,30,7)),R(2,rr(103,126,17,30,7)));
  r.push(R(6,rr(76,150,24,13,5)),R(6,rr(100,150,24,13,5)));
  r.push(R(2,rr(76,86,48,50,14)),R(4,rr(87,100,26,18,4)),R(10,circ(94,109,3.5)),R(5,circ(106,109,3.5)),R(6,rect(76,126,48,7)));
  r.push(R(2,circ(100,62,28)),R(5,ell(100,64,20,15)),R(2,ell(92,57,6,3.5)));
  add('astronaut','Floating Astronaut','easy','space',['#1c2541','#ffffff','#ffd43b','#ced4da','#4dabf7','#ff922b','#9775fa','#f783ac','#63e6be','#fa5252'],r)})();

 // ===== 2026-10-21  Fairy Mushroom Village (Medium, Fantasy & Castles) =====
 (function(){const r=[],T=6.2832;
  const rr=(x,y,w,h,q)=>`M${x+q},${y}H${x+w-q}A${q},${q} 0 0 1 ${x+w},${y+q}V${y+h-q}A${q},${q} 0 0 1 ${x+w-q},${y+h}H${x+q}A${q},${q} 0 0 1 ${x},${y+h-q}V${y+q}A${q},${q} 0 0 1 ${x+q},${y}Z`;
  r.push(R(1,rect(0,0,200,200)),R(3,circ(176,26,14)),R(2,ell(40,26,22,8)),R(2,ell(110,18,16,6)));
  r.push(R(13,'M0,104Q50,80 100,98T200,90V200H0Z'));
  r.push(R(8,rect(14,70,10,40)),R(5,circ(19,60,18)));
  r.push(R(4,'M0,140Q100,126 200,140V200H0Z'));
  r.push(R(14,'M86,200Q96,170 116,150L136,150Q116,172 112,200Z'));
  // big red mushroom house
  r.push(R(7,rr(112,92,36,58,8)),R(6,'M96,98Q98,50 130,48Q162,50 164,98Z'),R(2,ell(130,98,34,5)));
  [[116,74,6],[138,62,5.5],[152,82,6],[128,86,4.5]].forEach(([x,y,k])=>r.push(R(2,circ(x,y,k))));
  r.push(R(8,'M122,150V128A8,8 0 0 1 138,128V150Z'),R(3,circ(134,140,2.4)),R(3,circ(120,112,5.5)),R(11,circ(140,112,5.5)));
  // small purple mushroom house
  r.push(R(7,rr(46,112,24,40,6)),R(9,'M34,116Q36,82 58,82Q80,82 82,116Z'),R(2,ell(58,116,23,4)));
  [[47,102,4.5],[64,94,4],[71,107,3.5]].forEach(([x,y,k])=>r.push(R(3,circ(x,y,k))));
  r.push(R(12,'M52,152V138A6,6 0 0 1 64,138V152Z'),R(3,circ(58,126,4.5)));
  // tiny orange mushroom house
  r.push(R(7,rr(172,118,16,26,4)),R(12,'M164,121Q166,97 180,97Q194,97 196,121Z'),R(2,ell(180,121,16,3)));
  r.push(R(2,circ(174,109,3.5)),R(2,circ(187,106,3.2)),R(8,'M176,144V135A4,4 0 0 1 184,135V144Z'));
  // lantern by the path
  r.push(R(8,rect(80,136,4,22)),R(3,circ(82,132,5)));
  // little wild mushrooms
  r.push(R(7,rect(33,164,6,10)),R(6,'M25,166Q36,151 47,166Z'),R(7,rect(159,160,6,10)),R(10,'M151,162Q162,147 173,162Z'));
  // flowers
  [[16,186,10],[66,180,11],[140,184,9],[186,170,10],[176,192,11]].forEach(([x,y,c])=>r.push(R(c,circ(x,y,6.5)),R(3,circ(x,y,2.6))));
  // fireflies / sparkles
  [[70,40],[146,36],[46,64],[190,80],[100,124]].forEach(([x,y])=>r.push(R(3,star(x,y,5,2.1))));
  // butterflies
  [[88,56,10,9],[186,58,9,11]].forEach(([x,y,a,b])=>r.push(R(a,poly(rell(x-5,y,6,8,-.4,0,T))),R(b,poly(rell(x+5,y,6,8,.4,0,T))),R(8,ell(x,y,2.2,6))));
  add('mushroomvillage','Fairy Mushroom Village','medium','fantasy',['#a5d8ff','#ffffff','#ffd43b','#8ce99a','#2f9e44','#fa5252','#fff3bf','#a9714b','#9775fa','#f783ac','#4dabf7','#ff922b','#63e6be','#ffe8cc'],r)})();

 // ===== 2026-10-22  Rainbow Kite Festival (Medium, Nature) =====
 (function(){const r=[],T=6.2832;
  // diamond kite split into 4 colored quarters + a tail of ribbon bows
  const kite=(cx,cy,w,h1,h2,cs,bows)=>{const t=[cx,cy-h1],e=[cx+w,cy],b=[cx,cy+h2],l=[cx-w,cy],c=[cx,cy];
   r.push(R(cs[0],poly([t,e,c])),R(cs[1],poly([e,b,c])),R(cs[2],poly([b,l,c])),R(cs[3],poly([l,t,c])));
   tail(cx,cy+h2,bows)};
  // wavy kite tail ribbon (4.4 wide) from (x0,y0) going down, with ribbon bows sitting on it
  const tail=(x0,y0,bows)=>{const L=[],Rr=[],n=24,len=bows.length*12+8,X=t=>x0+5*Math.sin(t*len/9),Y=t=>y0+t*len;
   for(let i=0;i<=n;i++){const t=i/n,x=X(t),y=Y(t),dx=X(t+.01)-x,dy=Y(t+.01)-y,d=Math.hypot(dx,dy),nx=-dy/d*2.2,ny=dx/d*2.2;L.push([x+nx,y+ny]);Rr.push([x-nx,y-ny])}
   r.push(R(2,poly(L.concat(Rr.reverse()))));
   bows.forEach((k,i)=>{const t=(i*12+10)/len,x=X(t),y=Y(t);r.push(R(k,poly(rell(x-5.5,y,5.5,4,.45,0,T))),R(k,poly(rell(x+5.5,y,5.5,4,-.45,0,T))))})};
  r.push(R(1,rect(0,0,200,200)),R(3,circ(22,24,13)));
  r.push(R(2,ell(98,28,15,6)),R(2,ell(184,30,14,6)),R(2,ell(24,74,13,5)));
  r.push(R(4,'M0,120Q60,92 120,112T200,100V200H0Z'));
  r.push(R(11,rect(178,96,8,26)),R(5,circ(182,90,15)));
  r.push(R(5,'M0,148Q100,132 200,148V200H0Z'));
  // picnic blanket (checkered) and basket
  [[0,0,6],[1,0,2],[2,0,6],[0,1,2],[1,1,6],[2,1,2]].forEach(([i,j,k])=>r.push(R(k,rect(18+i*13,160+j*9,13,9))));
  r.push(R(11,'M62,158A9,9 0 0 1 80,158L75,158A4,4 0 0 0 67,158Z'),R(11,rect(60,158,22,14)));
  // rainbow delta kite (5 color sectors from the top point)
  const ax=140,ay=16,bx=[108,120.8,133.6,146.4,159.2,172];[6,10,3,12,8].forEach((k,i)=>r.push(R(k,poly([[ax,ay],[bx[i],64],[bx[i+1],64]]))));
  tail(140,64,[6,3,7]);
  kite(58,52,20,22,36,[6,3,7,10],[8,3,6]);
  kite(100,96,13,14,22,[8,12,3,9],[10,7]);
  // flowers in the meadow
  [[110,176,10],[142,186,3],[168,168,8],[188,190,6],[30,190,9]].forEach(([x,y,c])=>r.push(R(c,circ(x,y,6.5)),R(c==3?9:3,circ(x,y,2.6))));
  // butterflies
  [[24,132,10,8],[160,124,3,12]].forEach(([x,y,a,b])=>r.push(R(a,poly(rell(x-5,y,6,8,-.4,0,T))),R(b,poly(rell(x+5,y,6,8,.4,0,T))),R(11,ell(x,y,2.2,6))));
  add('kites','Rainbow Kite Festival','medium','nature',['#a5d8ff','#ffffff','#ffd43b','#8ce99a','#2f9e44','#fa5252','#4dabf7','#9775fa','#ff922b','#f783ac','#a9714b','#63e6be'],r)})();

 // ===== 2026-10-22  Garden Bugs (Hard, Animals) =====
 (function(){const r=[],T=6.2832;
  // vertical stripe of an ellipse between x1 and x2 (sampled polygon)
  const vband=(cx,cy,rx,ry,x1,x2)=>{const U=[],D=[],N=8,h=x=>ry*Math.sqrt(Math.max(0,1-((x-cx)/rx)**2));for(let i=0;i<=N;i++){const x=x1+(x2-x1)*i/N;U.push([x,cy-h(x)]);D.push([x,cy+h(x)])}return poly(U.concat(D.reverse()))};
  r.push(R(1,rect(0,0,200,200)),R(3,circ(176,24,14)),R(2,ell(64,18,14,6)),R(2,ell(136,20,12,5)));
  r.push(R(4,'M0,96Q50,80 100,92T200,86V200H0Z'));
  r.push(R(5,'M0,160Q100,146 200,160V200H0Z'));
  // three big flowers: stems, leaves, petals, centers
  const flower=(x,y,sy,pc,cc,lf)=>{r.push(R(5,rect(x-3,y+16,6,sy-y-16)));
   lf.forEach(([lx,ly,rot])=>r.push(R(13,poly(rell(lx,ly,12,5,rot,0,T)))));
   for(let i=0;i<8;i++){const a=i*T/8;r.push(R(pc[i%2],circ(x+13*Math.cos(a),y+13*Math.sin(a),7.5)))}
   r.push(R(cc,circ(x,y,8.5)))};
  flower(34,58,160,[8,10],3,[[24,112,-.5],[44,128,.5]]);
  flower(100,40,160,[3,10],11,[[90,96,-.5],[110,112,.5]]);
  flower(166,64,160,[9,8],3,[[156,118,-.5],[176,132,.5]]);
  // bees (wings first)
  const bee=(x,y)=>{r.push(R(2,poly(rell(x-3,y-9,4.5,7,-.3,0,T))),R(2,poly(rell(x+4,y-9,4.5,7,.3,0,T))));
   r.push(R(3,ell(x,y,10,7)),R(7,vband(x,y,10,7,-3+x,.5+x)),R(7,vband(x,y,10,7,3.5+x,7+x)),R(7,circ(x+11,y-1,4.5)))};
  bee(64,88);bee(130,72);
  // butterfly
  ((x,y)=>{r.push(R(12,poly(rell(x-9,y-6,10,7,-.5,0,T))),R(12,poly(rell(x+9,y-6,10,7,.5,0,T))));
   r.push(R(10,poly(rell(x-7,y+7,7,5.5,.4,0,T))),R(10,poly(rell(x+7,y+7,7,5.5,-.4,0,T))));
   r.push(R(3,circ(x-11,y-7,3)),R(3,circ(x+11,y-7,3)),R(7,ell(x,y,2.5,11)))})(134,112);
  // caterpillar crawling on the grass
  [[72,158],[82,154],[92,157],[102,153],[112,156]].forEach(([x,y],i)=>r.push(R(i%2?13:4,circ(x,y,7))));
  r.push(R(3,circ(124,148,8.5)),R(7,circ(121,145,2.2)),R(7,circ(128,145,2.2)),R(8,circ(124,152,2.4)));
  // ladybug on a big leaf
  r.push(R(4,poly(rell(38,180,32,12,-.12,0,T))));
  r.push(R(7,circ(38,159,9)),R(2,circ(33,154,2.2)),R(2,circ(43,154,2.2)));
  r.push(R(6,'M38,160A15,15 0 0 0 38,190Z'),R(6,'M38,160A15,15 0 0 1 38,190Z'));
  [[31,169,3.3],[30,181,3],[45,169,3.3],[46,181,3]].forEach(([x,y,k])=>r.push(R(7,circ(x,y,k))));
  // snail with a spiral shell
  r.push(R(14,rect(181,152,4,16)),R(14,rect(190,154,4,16)),R(7,circ(183,152,3)),R(7,circ(192,154,3)));
  r.push(R(14,ell(160,186,32,8)),R(14,ell(187,176,8,13)));
  r.push(R(10,circ(158,170,18)),R(3,circ(160,171,13)),R(10,circ(162,172,8)),R(3,circ(163,172,3.6)));
  // small flowers in the grass
  [[70,190,8],[96,184,9],[118,192,12],[12,146,10],[194,142,6]].forEach(([x,y,c])=>r.push(R(c,circ(x,y,6)),R(3,circ(x,y,2.4))));
  add('gardenbugs','Garden Bugs','hard','animals',['#a5d8ff','#ffffff','#ffd43b','#8ce99a','#2f9e44','#fa5252','#343a40','#f783ac','#9775fa','#ff922b','#a9714b','#4dabf7','#63e6be','#ffe8cc'],r)})();

 // ===== 2026-10-23  Jack-o'-Lantern Smile (Easy, Holidays & Winter) =====
 (function(){const r=[],T=6.2832;
  // evening sky, crescent moon, stars, clouds, grassy hill
  r.push(R(1,rect(0,0,200,200)),R(2,circ(160,34,15)),R(1,circ(167,28,12.5)));
  [[30,26,6],[86,18,5],[126,46,5],[186,78,5],[18,82,5]].forEach(([x,y,k])=>r.push(R(2,star(x,y,k,k*.42))));
  r.push(R(3,ell(54,56,22,8)),R(3,ell(150,90,20,7)));
  r.push(R(7,'M0,158Q100,138 200,158V200H0Z'));
  // big smiling pumpkin: side ribs first, middle rib on top
  r.push(R(5,ell(72,130,38,46)),R(5,ell(128,130,38,46)),R(4,ell(100,128,38,50)));
  r.push(R(8,poly([[93,82],[107,82],[112,62],[100,60]])),R(6,poly(rell(124,72,15,6,-.35,0,T))));
  // happy face (triangle eyes, nose, smile with two teeth)
  r.push(R(2,poly([[68,118],[90,118],[79,98]])),R(2,poly([[110,118],[132,118],[121,98]])),R(2,poly([[93,134],[107,134],[100,123]])));
  r.push(R(2,'M62,140Q100,180 138,140Q100,160 62,140Z'),R(4,rect(83,148,9,7)),R(4,rect(108,148,9,7)));
  // fallen autumn leaves
  [[26,178,9,.5],[170,184,8,-.6],[188,166,9,.3],[40,194,8,-.2]].forEach(([x,y,c,a])=>r.push(R(c,poly(rell(x,y,9,5,a,0,T)))));
  add('jacklantern',"Jack-o'-Lantern Smile",'easy','holidays',['#7048e8','#ffe066','#d0bfff','#ff922b','#e8590c','#2f9e44','#8ce99a','#a9714b','#fa5252'],r)})();

 // ===== 2026-10-23  Wizard Tower Library (Hard, Fantasy) =====
 (function(){const r=[];
  // stone wall, arched night window with moon and stars, window sill
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(3,'M72,80V42A28,28 0 0 1 128,42V80Z'));
  r.push(R(4,circ(112,38,11)),R(3,circ(117,33,9)));
  [[86,34,5],[84,62,5],[104,66,4.6],[118,58,4.2]].forEach(([x,y,k],i)=>r.push(R(i%2?5:4,star(x,y,k,k*.42))));
  r.push(R(6,rect(66,78,68,6)));
  // a few grey stone blocks on the wall
  r.push(R(2,rect(54,4,22,9)),R(2,rect(124,4,22,9)),R(2,rect(80,132,18,9)),R(2,rect(102,143,18,9)));
  // floor and round rug
  r.push(R(15,rect(0,154,200,46)));
  r.push(R(11,ell(100,182,72,15)),R(13,ell(100,182,52,10)),R(4,ell(100,182,28,5.5)));
  // two bookshelves full of books (frame, 3 compartments, books, some with a gold band)
  const shelf=(x0,sets)=>{r.push(R(7,rect(x0,30,58,124)));
   sets.forEach((bk,k)=>{const y0=34+k*40;r.push(R(6,rect(x0+4,y0,50,34)));let x=x0+6;
    bk.forEach(([w,h,c,b])=>{r.push(R(c,rect(x,y0+34-h,w,h)));if(b)r.push(R(4,rect(x,y0+34-h+6,w,4)));x+=w+.6})})};
  shelf(6,[[[7,28,8,1],[6,24,10,0],[8,30,9,1],[6,22,14,0],[7,27,12,1],[7,25,11,0]],
           [[6,26,9,0],[8,30,14,1],[7,24,8,0],[6,28,10,1],[7,22,12,0],[8,29,13,0]],
           [[8,29,10,1],[6,25,12,0],[7,30,11,0],[7,23,8,1],[6,27,9,0],[7,26,14,1]]]);
  shelf(136,[[[6,26,12,1],[8,29,11,0],[7,23,9,0],[6,28,8,1],[7,25,14,0],[8,30,10,1]],
             [[7,28,13,0],[6,24,8,1],[8,30,10,0],[7,26,9,1],[6,23,11,0],[7,29,12,1]],
             [[6,24,14,0],[8,30,8,1],[7,27,13,0],[6,22,10,1],[8,28,9,0],[6,25,11,1]]]);
  // wizard hat on the left shelf (no face, no character)
  r.push(R(11,'M20,28Q30,16 40,2Q42,16 48,28Z'),R(4,rect(21,22,26,5)),R(11,ell(34,29,21,4)),R(4,star(37,13,5.5,2.4)));
  // potion bottles on the right shelf
  r.push(R(6,rect(148,6,6,8)),R(9,circ(151,21,8)));
  r.push(R(6,rect(165,4,5,8)),R(13,rect(162,12,11,18)));
  r.push(R(6,rect(182,6,5,10)),R(10,poly([[176,30],[193,30],[188,16],[181,16]])));
  // desk with open spell book, candle and crystal ball
  r.push(R(7,rect(66,126,7,34)),R(7,rect(127,126,7,34)),R(7,rect(60,118,80,8)));
  r.push(R(8,rect(62,113,40,5)),R(5,'M64,114L66,100Q76,96 82,102V114Z'),R(5,'M82,102Q90,96 98,100L100,114H82Z'));
  [[70,92,5],[82,84,4.4],[94,90,4.2]].forEach(([x,y,k])=>r.push(R(4,star(x,y,k,k*.42))));
  r.push(R(6,rect(103,113,15,5)),R(15,rect(107,94,7,19)),R(12,ell(110.5,86,4.6,8)),R(4,ell(110.5,88,2.8,4.6)));
  r.push(R(7,poly([[120,118],[138,118],[134,110],[124,110]])),R(14,circ(129,99,11)),R(5,circ(125,95,3.6)));
  // stack of books on the floor
  r.push(R(8,rect(10,182,42,8)),R(10,rect(14,174,36,8)),R(9,rect(12,166,38,8)));
  // globe on a stand
  r.push(R(7,rect(160,188,20,6)),R(7,rect(168,180,4,9)),R(10,circ(170,166,14)),R(9,poly(rell(165,161,6,4.5,.3,0,6.2832))),R(9,poly(rell(176,172,5.5,4,-.4,0,6.2832))));
  add('wizardlibrary','Wizard Tower Library','hard','fantasy',['#adb5bd','#868e96','#364fc7','#ffd43b','#ffffff','#a9714b','#7f4f24','#fa5252','#40c057','#4dabf7','#9775fa','#ff922b','#f783ac','#63e6be','#fff3bf'],r)})();

 // ===== 2026-10-24  Steam Train Station (Hard, Vehicles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(3,circ(176,24,13)));
  [[30,22,16,6],[44,16,9,6],[96,30,15,6],[108,24,8,5]].forEach(([x,y,a,b])=>r.push(R(2,ell(x,y,a,b))));
  r.push(R(4,'M0,92Q50,70 100,88T200,80V200H0Z'),R(5,'M0,104Q60,90 120,104T200,100V200H0Z'));
  r.push(R(4,rect(0,110,200,90)));
  // station building (chimney behind the roof)
  r.push(R(8,rect(78,40,8,18)),R(11,rect(10,64,88,50)),R(12,poly([[4,66],[54,36],[104,66]])),R(2,circ(54,54,7)));
  [18,46,74].forEach(x=>r.push(R(14,`M${x},94V82a8,8 0 0,1 16,0V94Z`)));
  r.push(R(8,rect(6,96,96,5)));
  for(let i=0;i<6;i++){const x=6+i*16;r.push(R(i%2?2:9,poly([[x,101],[x+16,101],[x+8,110]])))}
  // lamp post and tree
  r.push(R(8,rect(104,84,4,28)),R(3,circ(106,79,5)));
  r.push(R(6,rect(121,92,6,22)),R(5,circ(124,82,11)));
  // smoke puffs from the engine
  [[184,88,6],[173,78,8],[159,70,9],[143,64,9],[127,58,8]].forEach(([x,y,k])=>r.push(R(13,circ(x,y,k))));
  // track: gravel, ties, rail
  r.push(R(7,rect(0,162,200,14)));
  for(let i=0;i<14;i++)r.push(R(6,rect(3+i*14.3,160,7,18)));
  r.push(R(8,rect(0,164,200,4)));
  // two passenger cars
  [[4,10],[58,16]].forEach(([x,c])=>{
   r.push(R(c,rect(x,118,46,34)),R(8,rect(x-2,112,50,7)));
   [0,1,2].forEach(i=>r.push(R(11,rect(x+4+i*14,124,10,12))));
   r.push(R(14,rect(x,142,46,5)));
   [x+11,x+35].forEach(w=>r.push(R(8,circ(w,157,7)),R(14,circ(w,157,3))))});
  r.push(R(8,rect(50,144,8,4)),R(8,rect(104,144,6,4)));
  // coal tender
  r.push(R(9,rect(110,124,24,28)),R(8,'M110,125Q116,112 122,121Q128,112 134,125Z'));
  [116,128].forEach(w=>r.push(R(8,circ(w,157,6)),R(14,circ(w,157,2.6))));
  r.push(R(8,rect(132,144,6,4)));
  // locomotive: dome and chimney behind the boiler
  r.push(R(14,ell(166,122,6,6)),R(8,poly([[178,100],[188,100],[186,124],[180,124]])),R(8,rect(175,95,16,7)));
  r.push(R(9,rect(136,104,24,48)),R(8,rect(132,98,32,7)),R(11,rect(141,110,14,14)));
  r.push(R(10,'M158,122H186Q194,122 194,136Q194,150 186,150H158Z'));
  r.push(R(14,rect(170,122,4,28)),R(14,rect(182,122,4,28)),R(3,circ(195,132,4)));
  r.push(R(9,rect(136,148,60,6)));
  r.push(R(8,circ(150,155,9)),R(8,circ(171,155,9)),R(8,circ(189,159,5)));
  r.push(R(7,rect(150,153,21,4)),R(14,circ(150,155,3.5)),R(14,circ(171,155,3.5)));
  // flowers in the front grass
  [[14,190,15],[42,186,16],[72,192,15],[104,187,16],[136,191,15],[166,186,16],[190,192,15]].forEach(([x,y,c])=>r.push(R(c,star(x,y,6,3.2))));
  add('steamtrain','Steam Train Station','hard','vehicles',['#a5d8ff','#ffffff','#ffd43b','#8ce99a','#40c057','#8d5524','#adb5bd','#343a40','#e03131','#4dabf7','#fff3bf','#d9480f','#e9ecef','#fab005','#f783ac','#9775fa'],r)})();

 // ===== 2026-10-24  Flying Saucer (Easy, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  [[20,72,11],[64,20,10],[118,20,10],[186,94,10],[172,134,11],[24,130,11]].forEach(([x,y,s])=>r.push(R(4,star(x,y,s,s*.48))));
  r.push(R(6,circ(34,34,19)),R(3,band(34,34,19,29,40)));
  r.push(R(2,'M0,168Q50,148 100,166T200,158V200H0Z'));
  r.push(R(3,ell(30,184,16,7)),R(3,ell(172,182,15,6.5)));
  // light beam
  r.push(R(7,poly([[84,104],[116,104],[146,174],[54,174]])));
  // antenna, dome, shine
  r.push(R(9,rect(98,54,4,12)),R(10,circ(100,52,4.5)));
  r.push(R(8,ell(100,86,24,24)),R(5,poly(rell(90,76,6,3.5,-.6,0,6.2832))));
  // saucer body and rim
  r.push(R(9,ell(100,100,58,14)),R(3,ell(100,106,38,6)));
  [[62,4],[81,10],[100,4],[119,10],[138,4]].forEach(([x,c])=>r.push(R(c,circ(x,98,5.6))));
  // shooting star
  r.push(R(5,poly([[152,62],[188,46],[191,55]])),R(4,star(148,64,10,4.8)));
  add('saucer','Flying Saucer','easy','space',['#1b2459','#adb5bd','#868e96','#ffd43b','#ffffff','#ff922b','#fff3bf','#99e9f2','#9775fa','#f783ac'],r)})();

 // ===== 2026-10-25  Harvest Table (Hard, Holidays & Winter) =====
 (function(){const r=[],T=6.2832;
  r.push(R(1,rect(0,0,200,200)));
  // paper leaf bunting along the top
  for(let i=0;i<9;i++){const x=4+i*22;r.push(R([5,6,4][i%3],poly([[x,2],[x+18,2],[x+9,20]])))}
  // window with an autumn view
  r.push(R(3,rect(56,28,88,60)));
  [[61,33],[102,33],[61,60],[102,60]].forEach(([x,y])=>r.push(R(2,rect(x,y,37,23))));
  r.push(R(7,'M61,83V73Q80,64 98,72V83Z'),R(12,'M102,83V71Q122,63 139,74V83Z'));
  r.push(R(6,circ(126,45,7)),R(11,ell(79,45,11,5)));
  // autumn wreath on the left wall
  r.push(R(9,circ(26,62,17)),R(1,circ(26,62,9)));
  [[26,46,5],[41,56,4],[38,74,7],[11,56,6],[14,74,4]].forEach(([x,y,c])=>r.push(R(c,star(x,y,6.5,3.2))));
  r.push(R(5,poly([[26,80],[14,73],[14,87]])),R(5,poly([[26,80],[38,73],[38,87]])));
  // dried corn hanging on the right wall
  r.push(R(13,poly([[166,40],[152,50],[160,58]])),R(13,poly([[180,40],[194,50],[186,58]])));
  r.push(R(6,poly(rell(164,66,6.5,17,.28,0,T))),R(6,poly(rell(182,66,6.5,17,-.28,0,T))));
  r.push(R(13,poly([[166,44],[156,62],[168,56]])),R(13,poly([[180,44],[190,62],[178,56]])));
  r.push(R(5,circ(173,40,5)));
  // candles
  [[50,8],[150,8]].forEach(([x])=>{r.push(R(11,rect(x-5,84,10,26)),R(6,poly(rell(x,77,4,7,0,0,T))))});
  // table: cloth top, trim, front drape with checks
  r.push(R(15,rect(0,108,200,42)));
  r.push(R(3,ell(50,111,11,3.6)),R(3,ell(150,111,11,3.6)));
  r.push(R(6,rect(0,148,200,6)),R(15,rect(0,154,200,46)));
  for(let row=0;row<3;row++)for(let k=0;k<5;k++){const x=(row%2?20:0)+k*40,y=154+row*15.4;r.push(R(16,rect(x,y,20,15.4)))}
  // fruits in the basket (drawn first so the basket sits in front)
  [[72,98],[82,98],[77,90],[67,106],[77,106],[87,106]].forEach(([x,y])=>r.push(R(8,circ(x,y,5.4))));
  r.push(R(12,rect(75,80,4,7)));
  r.push(R(3,rect(95,78,3.5,8)),R(7,poly(rell(104,81,7,3.5,-.4,0,T))),R(5,circ(97,98,12)));
  r.push(R(14,circ(118,92,7.5)),R(14,circ(120,105,10.5)),R(3,rect(117,80,3,6)));
  r.push(R(4,circ(134,106,8.5)),R(9,circ(102,112,7)));
  // basket
  r.push(R(13,'M58,114H142L130,146H70Z'));
  r.push(R(3,poly([[61.4,124],[138.6,124],[137.1,128],[62.9,128]])),R(3,poly([[65.1,134],[134.9,134],[133.4,138],[66.6,138]])));
  r.push(R(3,ell(100,115,44,5)));
  // pumpkin pie on a plate (left)
  r.push(R(11,ell(32,134,30,11)),R(10,ell(32,131,26,9)),R(9,ell(32,130,21,6.5)),R(11,circ(32,129,4.2)));
  // pumpkin (right, plain, no face)
  r.push(R(12,rect(169,104,6,10)),R(7,poly(rell(183,108,8,3.8,.35,0,T))));
  r.push(R(4,ell(160,130,10,14)),R(4,ell(184,130,10,14)),R(9,ell(172,130,13,16)));
  // fallen leaves on the table
  [[8,118,5],[64,142,6],[146,142,5],[196,118,6],[92,152,9],[110,155,7]].forEach(([x,y,c])=>r.push(R(c,star(x,y,6,3))));
  add('harvest','Harvest Table','hard','holidays',['#fff9db','#a5d8ff','#8d5524','#ff922b','#e03131','#ffd43b','#69db7c','#9775fa','#d9480f','#e9b872','#ffffff','#2b9348','#c08552','#c0eb75','#ffd8a8','#f08c00'],r)})();


 // ===== 2026-10-25  Friendly Whale (Easy, Animals; drawn and tested 2026-10-23, added today) =====
 (function(){const r=[],T=6.2832;
  r.push(R(1,rect(0,0,200,200)),R(3,circ(170,28,15)));
  r.push(R(2,ell(40,30,18,7)),R(2,ell(112,22,14,6)),R(2,ell(186,62,13,5)));
  r.push(R(4,'M0,96Q25,88 50,96T100,96T150,96T200,96V200H0Z'));
  // water spout from the blowhole
  r.push(R(2,'M116,78Q112,62 104,52Q114,56 120,64Q126,56 136,52Q128,62 124,78Z'));
  [[100,46],[118,40],[140,46]].forEach(([x,y])=>r.push(R(2,circ(x,y,4.2))));
  // tail (behind the body), flukes
  r.push(R(6,poly([[48,98],[24,74],[32,68],[58,108]])));
  r.push(R(6,poly(rell(18,66,13,6,-.5,0,T))),R(6,poly(rell(38,58,13,6,-1.2,0,T))));
  // body, belly, flipper, face
  r.push(R(6,ell(104,110,60,32)));
  r.push(R(7,'M56,122Q104,154 160,118Q150,136 104,140Q70,138 56,122Z'));
  r.push(R(5,poly(rell(92,124,15,7,.5,0,T))));
  r.push(R(8,circ(134,100,5.5)),R(9,circ(146,114,5.5)));
  r.push(R(8,'M128,122Q142,130 156,118L157,123Q142,137 127,127Z'));
  // front waves
  r.push(R(5,'M0,140Q25,130 50,140T100,140T150,140T200,140V200H0Z'));
  // little fish and bubbles
  [[44,170,10],[150,178,9]].forEach(([x,y,c])=>r.push(R(c,poly([[x-16,y-7],[x-8,y],[x-16,y+7]])),R(c,ell(x,y,11,7))));
  [[66,160,4],[172,160,3.6],[100,186,4]].forEach(([x,y,k])=>r.push(R(2,circ(x,y,k))));
  // sea star on the right
  r.push(R(10,star(120,166,10,4.6)));
  add('whale','Friendly Whale','easy','animals',['#a5d8ff','#ffffff','#ffd43b','#4dabf7','#1c7ed6','#748ffc','#dbe4ff','#343a40','#f783ac','#ff922b'],r)})();

 // ===== 2026-10-26  Space Station Garden (Hard, Space) =====
 (function(){const r=[],T=6.2832;
  const rr=(x,y,w,h,q)=>`M${x+q},${y}H${x+w-q}Q${x+w},${y} ${x+w},${y+q}V${y+h-q}Q${x+w},${y+h} ${x+w-q},${y+h}H${x+q}Q${x},${y+h} ${x},${y+h-q}V${y+q}Q${x},${y} ${x+q},${y}Z`;
  r.push(R(1,rect(0,0,200,200)));
  // big nebula clouds (large easy areas)
  r.push(R(14,poly(rell(52,30,48,15,-.3,0,T))),R(13,poly(rell(150,156,40,13,.35,0,T))));
  // stars
  [[10,14,6,3],[98,12,6,2],[142,34,5,3],[72,46,5,2],[16,160,6,3],[58,152,5,2],[100,150,5,3],[192,170,5,2],[120,26,4,2],[30,50,4,3]].forEach(([x,y,s,c])=>r.push(R(c,star(x,y,s,s*.45))));
  // moon with craters
  r.push(R(7,circ(176,22,14)),R(8,circ(171,18,3.6)),R(8,circ(182,28,3)));
  // Earth far below
  r.push(R(4,circ(100,300,130)));
  r.push(R(5,ell(52,190,22,8)),R(5,ell(128,184,18,7)),R(5,ell(170,194,14,7)),R(2,ell(92,192,16,4.5)),R(2,ell(150,197,14,3.5)));
  // solar panel wings (4 panels x 9 cells)
  [[4,56],[4,110],[158,56],[158,110]].forEach(([x0,y0])=>{for(let row=0;row<3;row++)for(let col=0;col<3;col++)r.push(R((row+col)%2?4:9,rect(x0+col*13,y0+row*11,12,10)))});
  // truss
  r.push(R(7,rect(4,96,192,6)));
  // side modules
  r.push(R(11,rr(38,89,24,18,4)),R(8,rect(43,89,4,18)));
  r.push(R(3,rr(138,87,24,22,5)),R(10,circ(152,98,4.2)));
  // antenna dish
  r.push(R(7,rect(148,72,4,15)),R(2,poly(rell(150,71,8,3.5,0,0,T))),R(12,circ(150,63,3.2)));
  // main module
  r.push(R(2,rr(58,82,84,30,8)));
  r.push(R(7,rect(74,82,4,30)),R(7,rect(122,82,4,30)));
  r.push(R(10,circ(66,97,4.5)),R(10,circ(134,97,4.5)),R(10,circ(90,94,3.6)),R(10,circ(110,94,3.6)));
  r.push(R(11,rect(80,102,40,6)));
  // greenhouse dome with the astronauts' garden
  r.push(R(10,'M72,80A28,28 0 0,1 128,80Z'));
  r.push(R(15,rect(74,72,52,8)));
  r.push(R(6,circ(80,70,5)),R(5,circ(88,69,5)));
  r.push(R(6,rect(98,58,4,15)),R(5,poly(rell(93.5,64,5,2.6,-.5,0,T))),R(5,poly(rell(106.5,62,5,2.6,.5,0,T))));
  r.push(R(12,circ(95,70,3.2)),R(12,circ(105,69,3.2)),R(12,circ(100,56,3)));
  r.push(R(6,rect(112,66,4,8)),R(3,star(114,64,7,3.4)),R(15,circ(114,64,2.8)));
  r.push(R(8,rect(68,79,64,5)));
  // floating astronaut holding a little potted plant (helmet visor only, no face)
  r.push(R(7,rr(110,146,9,18,2)));
  r.push(R(2,poly(rell(124,170,4.5,9,.35,0,T))),R(2,poly(rell(136,170,4.5,9,-.25,0,T))));
  r.push(R(12,ell(120,178,5,3.2)),R(12,ell(139,178,5,3.2)));
  r.push(R(2,poly(rell(115,156,4.2,9,.5,0,T))),R(2,poly(rell(144,147,4.2,10,-.9,0,T))));
  r.push(R(2,rr(117,144,24,22,6)),R(12,rect(123,151,12,6)));
  r.push(R(2,circ(128,134,11)),R(8,ell(130,134,7,5.2)),R(2,poly(rell(127,132,2.6,1.6,-.4,0,T))));
  r.push(R(11,poly([[146,128],[160,128],[157,140],[149,140]])),R(5,circ(150,123,4)),R(6,circ(157,122,4)));
  add('spacegarden','Space Station Garden','hard','space',['#1b2459','#ffffff','#ffd43b','#4dabf7','#69db7c','#2b9348','#adb5bd','#495057','#1864ab','#99e9f2','#ff922b','#e03131','#f783ac','#9775fa','#8d5524'],r)})();

 // ===== 2026-10-26  Magic Wand & Stars (Easy, Fantasy) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  // crescent moon (same-as-sky circle on top makes the crescent)
  r.push(R(2,circ(38,40,18)),R(1,circ(47,33,15)));
  // clouds at the bottom
  r.push(R(5,ell(36,188,42,18)),R(5,ell(112,192,46,17)),R(5,ell(180,186,34,17)));
  // wand stick in 4 striped pieces, from (56,172) to (116,96)
  const seg=(t0,t1)=>{const ax=56,ay=172,bx=116,by=96,dx=bx-ax,dy=by-ay,L=Math.hypot(dx,dy),nx=-dy/L*5,ny=dx/L*5,p=t=>[ax+dx*t,ay+dy*t];const a=p(t0),b=p(t1);return poly([[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]])};
  [[0,.25,3],[.25,.5,6],[.5,.75,3],[.75,1,6]].forEach(([a,b,c])=>r.push(R(c,seg(a,b))));
  // big star with an inner star
  r.push(R(2,star(126,78,36,16)),R(7,star(126,80,17,7.6)));
  // ribbon bow under the star
  r.push(R(4,poly([[104,108],[88,98],[90,118]])),R(4,poly([[104,108],[120,116],[106,124]])),R(9,circ(104,108,5)));
  // sparkles
  [[176,30,11,8],[74,70,10,4],[178,118,10,6],[40,112,9,8],[150,150,10,4],[20,150,8,7],[98,24,9,6]].forEach(([x,y,s,c])=>r.push(R(c,star(x,y,s,s*.45))));
  [[160,64,4.5,5],[60,100,4,9],[130,130,4.2,8],[86,152,4,2],[190,152,4.4,9]].forEach(([x,y,k,c])=>r.push(R(c,circ(x,y,k))));
  add('magicwand','Magic Wand & Stars','easy','fantasy',['#e5dbff','#ffd43b','#9775fa','#f783ac','#ffffff','#74c0fc','#ff922b','#63e6be','#e64980'],r)})();
 // ===== 2026-10-27  Sunny Sailboat (Easy, Vehicles) =====
 (function(){const r=[],T=6.2832;
  r.push(R(1,rect(0,0,200,200)),R(3,circ(166,36,18)));
  r.push(R(2,ell(40,34,24,10)),R(2,ell(112,22,16,7)),R(2,ell(178,80,16,6)));
  // little green island far away
  r.push(R(9,'M0,132Q26,98 58,132Z'));
  r.push(R(4,'M0,128Q25,122 50,128T100,128T150,128T200,128V200H0Z'));
  // mast and flag
  r.push(R(7,rect(98,40,5,98)),R(6,poly([[103,38],[122,44],[103,50]])));
  // striped main sail (3 bands) and orange jib
  const sx=y=>104+(y-48)/80*58;
  r.push(R(6,poly([[104,48],[104,75],[sx(75),75]])),R(2,poly([[104,75],[104,101],[sx(101),101],[sx(75),75]])),R(3,poly([[104,101],[104,128],[sx(128),128],[sx(101),101]])));
  r.push(R(8,poly([[97,52],[97,128],[52,128]])));
  // hull with a white stripe and portholes
  r.push(R(6,'M46,134H164L148,162H62Z'));
  r.push(R(2,poly([[48,136],[162,136],[158,143],[52,143]])));
  [[80,151],[105,151],[130,151]].forEach(([x,y])=>r.push(R(3,circ(x,y,4.6))));
  // front waves
  r.push(R(5,'M0,160Q25,152 50,160T100,160T150,160T200,160V200H0Z'));
  // fish, bubbles, sea star
  [[40,180,8],[160,182,10]].forEach(([x,y,c])=>r.push(R(c,poly([[x-18,y-8],[x-9,y],[x-18,y+8]])),R(c,ell(x,y,12,7.5))));
  [[64,170,4],[182,166,3.8],[132,174,3.6]].forEach(([x,y,k])=>r.push(R(2,circ(x,y,k))));
  r.push(R(3,star(100,186,11,5)));
  add('sailboat','Sunny Sailboat','easy','vehicles',['#a5d8ff','#ffffff','#ffd43b','#4dabf7','#1c7ed6','#e03131','#8d5524','#ff922b','#69db7c','#f783ac'],r)})();

 // ===== 2026-10-27  Hot Cocoa Winter Window (Medium, Holidays & Winter) =====
 (function(){const r=[];
  // vertical wavy steam ribbon (sampled sine strip)
  const steam=(x0,y0,y1,amp,w)=>{const L=[],Rr=[],N=14;for(let i=0;i<=N;i++){const y=y0+(y1-y0)*i/N,x=x0+amp*Math.sin(i/N*6.2832);L.push([x-w/2,y]);Rr.push([x+w/2,y])}return poly(L.concat(Rr.reverse()))};
  r.push(R(1,rect(0,0,200,200)));
  // window: frame, night glass, outside scene
  r.push(R(2,rect(30,16,140,110)),R(3,rect(38,24,124,94)));
  r.push(R(9,circ(130,44,10)));
  [[58,38,7],[80,54,6],[116,34,6],[152,58,6]].forEach(([x,y,s])=>r.push(R(9,star(x,y,s,s*.45))));
  r.push(R(4,'M38,98Q70,84 100,94T162,90V118H38Z'));
  [[60,78],[142,80]].forEach(([x,y])=>r.push(R(8,poly([[x,y],[x+13,y+14],[x-13,y+14]])),R(8,poly([[x,y+8],[x+17,y+28],[x-17,y+28]]))));
  [[50,58],[90,40],[120,58],[148,30],[110,86]].forEach(([x,y])=>r.push(R(4,circ(x,y,3.2))));
  r.push(R(2,rect(96,24,8,94)),R(2,rect(38,66,124,8)));
  // curtains, rod and a string of lights
  r.push(R(13,'M18,10H48Q36,60 46,130H18Z'),R(13,'M182,10H152Q164,60 154,130H182Z'));
  r.push(R(11,rect(10,6,180,6)),R(9,circ(12,9,5)),R(9,circ(188,9,5)));
  [[56,5],[74,9],[92,12],[110,7],[128,5],[146,9]].forEach(([x,c],i)=>r.push(R(c,circ(x,19+(i%2)*3,4))));
  // sill and table
  r.push(R(14,rect(24,124,152,9)));
  r.push(R(14,rect(0,146,200,54)),R(11,rect(0,146,200,6)));
  // candle on the left
  r.push(R(10,poly(rell(29,116,4.5,8,0,0,6.2832))),R(12,rect(22,124,14,26)),R(9,ell(29,152,15,4.5)));
  // gift box on the right
  r.push(R(13,rect(168,126,26,26)),R(9,rect(179,126,5,26)),R(5,circ(181.5,123,5)));
  // mug: handle ring behind, body, stripe, star, cocoa, marshmallows, steam
  r.push(R(5,circ(112,130,15)),R(1,circ(112,130,8)));
  r.push(R(5,'M62,104H110L106,160Q104,166 98,166H74Q68,166 66,160Z'));
  r.push(R(2,rect(64,118,44,7)));
  r.push(R(9,star(86,143,10,4.4)));
  r.push(R(6,ell(86,104,24,5.5)));
  r.push(R(7,rect(70,94,10,9)),R(2,rect(82,92,10,9)),R(7,rect(94,95,10,9)));
  [[76,52,88],[88,46,86],[100,54,90]].forEach(([x,a,b])=>r.push(R(12,steam(x,a,b,3,5))));
  // plate of cookies with chocolate chips
  r.push(R(2,ell(150,170,32,8)));
  [[138,160],[162,162]].forEach(([x,y])=>{r.push(R(10,circ(x,y,12)));[[-4,-4],[4,0],[-2,5]].forEach(([dx,dy])=>r.push(R(11,circ(x+dx,y+dy,2.6))))});
  add('cocoawindow','Hot Cocoa Winter Window','medium','holidays',['#ffe8cc','#ffffff','#364fc7','#e7f5ff','#e03131','#8d5524','#fcc2d7','#2b9348','#ffd43b','#ff922b','#5c3a1e','#a5d8ff','#9775fa','#c08457'],r)})();

 // ===== 2026-10-28  Digger & Dump Truck (Medium, Vehicles) =====
 (function(){const r=[];
  const rr=(x,y,w,h,q)=>`M${x+q},${y}H${x+w-q}Q${x+w},${y} ${x+w},${y+q}V${y+h-q}Q${x+w},${y+h} ${x+w-q},${y+h}H${x+q}Q${x},${y+h} ${x},${y+h-q}V${y+q}Q${x},${y} ${x+q},${y}Z`;
  r.push(R(1,rect(0,0,200,200)),R(3,circ(26,26,15)));
  r.push(R(2,ell(84,26,22,9)),R(2,ell(102,18,14,7)),R(2,ell(166,40,22,8)),R(2,ell(150,34,12,6)));
  r.push(R(8,'M0,118Q40,92 86,116T200,108V160H0Z'));
  r.push(R(7,rect(0,150,200,50)),R(5,rect(0,176,200,24)));
  [[6,186],[60,186],[114,186],[168,186]].forEach(([x,y])=>r.push(R(2,rect(x,y,26,4))));
  // dirt pile with rocks and a little flag
  r.push(R(6,'M80,154Q104,108 130,154Z'));
  r.push(R(5,ell(96,144,6,4)),R(5,ell(114,138,5,4)),R(5,ell(108,150,6,3.6)));
  // excavator: boom and stick behind the cab, bucket full of dirt
  r.push(R(3,poly([[56,114],[96,62],[108,70],[70,122]])));
  r.push(R(5,poly([[68,104],[94,72],[99,76],[73,108]])));
  r.push(R(3,poly([[96,62],[106,56],[124,98],[113,103]])));
  r.push(R(4,circ(102,63,5.5)));
  r.push(R(6,ell(124,100,11,4.5)),R(4,poly([[112,100],[136,98],[136,114],[118,118]])));
  r.push(R(12,rr(8,146,76,22,11)));
  [[19,157,6],[36,157,5],[53,157,5],[71,157,6]].forEach(([x,y,k])=>r.push(R(5,circ(x,y,k)),R(4,circ(x,y,2.8))));
  r.push(R(4,rect(16,136,60,10)));
  r.push(R(4,rect(56,90,5,14)),R(3,rr(12,98,52,40,5)));
  r.push(R(11,rr(18,104,22,20,3)),R(4,rect(12,126,52,5)),R(10,circ(52,108,3.6)));
  // dump truck with a load of dirt
  r.push(R(6,'M128,124Q150,100 172,124Z'));
  r.push(R(9,poly([[124,122],[176,122],[172,148],[128,148]])),R(3,rect(130,128,40,5)),R(3,rect(132,138,36,5)));
  r.push(R(10,rr(174,114,22,34,4)),R(11,rr(178,118,14,12,2)),R(3,circ(193,140,2.6)));
  r.push(R(12,rect(122,146,76,6)));
  [[138,158],[158,158],[184,158]].forEach(([x,y])=>r.push(R(12,circ(x,y,9)),R(5,circ(x,y,3.8))));
  // traffic cones
  [[30,170],[100,166],[150,174]].forEach(([x,y])=>{r.push(R(9,poly([[x,y],[x+8,y+20],[x-8,y+20]])),R(2,poly([[x-3,y+7],[x+3,y+7],[x+5,y+12],[x-5,y+12]])),R(9,rect(x-11,y+20,22,4)))});
  add('digger','Digger & Dump Truck','medium','vehicles',['#a5d8ff','#ffffff','#ffd43b','#495057','#adb5bd','#8d5524','#c08457','#69db7c','#ff922b','#e03131','#4dabf7','#212529'],r)})();

 // ===== 2026-10-28  Goldfish Bowl (Medium, Animals) =====
 (function(){const r=[];
  const weed=(x0,y0,y1,amp,w)=>{const L=[],Rr=[],N=14;for(let i=0;i<=N;i++){const y=y0+(y1-y0)*i/N,x=x0+amp*Math.sin(i/N*6.2832);L.push([x-w/2,y]);Rr.push([x+w/2,y])}return poly(L.concat(Rr.reverse()))};
  r.push(R(1,rect(0,0,200,200)));
  // framed sun picture on the wall
  r.push(R(6,rect(10,14,40,34)),R(3,rect(14,18,32,26)),R(9,circ(30,31,8)));
  // table
  r.push(R(5,rect(0,150,200,50)),R(6,rect(0,150,200,7)));
  // potted plant on the table
  r.push(R(8,poly(rell(168,108,7,18,-.4,0,6.2832))),R(8,poly(rell(184,112,7,17,.5,0,6.2832))),R(8,poly(rell(176,104,7,20,0,0,6.2832))));
  r.push(R(13,'M160,128H192L188,156H164Z'),R(14,rect(158,124,36,7)));
  // bowl glass, water, rim, sand
  r.push(R(4,circ(100,98,62)),R(3,band(100,98,58,58,156)),R(11,ell(100,40,32,7)));
  r.push(R(7,band(100,98,58,138,156)));
  [[70,146,13],[84,147,9],[118,146,14],[130,144,13]].forEach(([x,y,c])=>r.push(R(c,ell(x,y,6,4.4))));
  // seaweed and treasure chest
  r.push(R(8,weed(130,146,96,4,6)),R(8,weed(140,140,108,3,5.5)),R(8,weed(100,148,116,3,6)));
  r.push(R(6,rect(58,126,24,16)),R(6,'M58,126Q70,114 82,126Z'),R(9,rect(58,128,24,4)),R(9,rect(67,131,6,6)));
  // big goldfish (tail and fins first)
  r.push(R(10,poly([[108,86],[126,72],[124,102]])),R(9,poly([[86,76],[100,66],[102,78]])));
  r.push(R(10,ell(92,88,19,13)));
  r.push(R(9,ell(98,88,4,10)),R(9,poly([[90,94],[98,106],[84,98]])));
  r.push(R(2,circ(80,84,4.6)),R(12,circ(79,84,2.2)));
  // little purple fish
  r.push(R(14,poly([[118,120],[132,112],[132,128]])),R(14,ell(110,120,11,7.5)),R(2,circ(105,118,3)),R(12,circ(104.5,118,1.9)));
  // bubbles
  [[66,74,3.8],[62,64,4.2],[94,124,3],[142,84,3.2],[136,72,3.8],[54,104,3.4]].forEach(([x,y,k])=>r.push(R(2,circ(x,y,k))));
  add('fishbowl','Goldfish Bowl','medium','animals',['#ffe8cc','#ffffff','#a5d8ff','#e7f5ff','#c08457','#8d5524','#ffec99','#2b9348','#ffd43b','#ff922b','#74c0fc','#212529','#f783ac','#9775fa'],r)})();

 // ===== 2026-10-29  Fairy Tea Party (Medium, Fantasy & Castles) =====
 (function(){const r=[];
  // garland string: horizontal sampled sine strip (4 wide)
  const garl=(x0,x1,y0,amp,w)=>{const T=[],B=[],N=20;for(let i=0;i<=N;i++){const x=x0+(x1-x0)*i/N,y=y0+amp*Math.sin(i/N*3.1416);T.push([x,y-w/2]);B.push([x,y+w/2])}return poly(T.concat(B.reverse()))};
  r.push(R(1,rect(0,0,200,200)),R(3,circ(174,62,13)));
  r.push(R(2,ell(40,74,22,8)),R(2,ell(134,82,18,7)));
  r.push(R(4,'M0,112Q50,90 100,110T200,102V200H0Z'));
  r.push(R(5,'M0,156Q60,142 120,154T200,150V200H0Z'));
  // fairy lights garland with glowing bulbs
  r.push(R(5,garl(-2,202,10,22,4)));
  [[14,1],[42,7],[72,9],[100,3],[128,12],[158,8],[186,7]].forEach(([x,c],i)=>{const t=(x+2)/204,y=10+22*Math.sin(t*3.1416)+6;r.push(R([3,7,9,12,8,10,3][i],circ(x,y,5.2)))});
  // tree stump table (roots, trunk, bark lines, cut top with rings)
  r.push(R(6,poly([[54,176],[66,150],[72,176]])),R(6,poly([[128,176],[134,150],[146,176]])));
  r.push(R(6,rect(62,120,76,56)));
  [[76,132],[97,136],[118,132]].forEach(([x,y])=>r.push(R(13,rect(x,y,5,36))));
  r.push(R(14,ell(100,120,48,12)),R(6,ell(100,120,30,7.5)),R(14,ell(100,120,15,3.8)));
  // teapot (handle and spout first)
  r.push(R(8,circ(80,100,9)),R(1,circ(80,100,4.6)));
  r.push(R(7,poly([[114,98],[132,82],[137,86],[118,110]])));
  r.push(R(7,ell(100,102,19,14)));
  r.push(R(8,ell(100,88,10,4.4)),R(3,circ(100,82,3.6)));
  [[92,100],[106,98],[100,110]].forEach(([x,y])=>r.push(R(2,circ(x,y,3.2))));
  // tea cups on saucers
  [[66,9],[136,12]].forEach(([x,c])=>{r.push(R(c,circ(x-10,108,5.5)),R(14,circ(x-10,108,2.6)));
   r.push(R(2,ell(x,118,14,3.8)),R(c,poly([[x-10,102],[x+10,102],[x+7,116],[x-7,116]])));});
  // toadstool seats
  [[22,140],[178,140]].forEach(([x,y])=>{r.push(R(2,rect(x-7,y,14,26)),R(11,`M${x-19},${y+2}A19,15 0 0,1 ${x+19},${y+2}Z`));
   [[-9,-6],[2,-10],[10,-4]].forEach(([dx,dy])=>r.push(R(2,circ(x+dx,y+dy,3.2))))});
  // cupcakes in the grass
  [[46,174],[154,174]].forEach(([x,y])=>{r.push(R(8,poly([[x-11,y],[x+11,y],[x+8,y+16],[x-8,y+16]])),R(7,ell(x,y-2,13,8)),R(11,circ(x,y-11,4)))});
  // flowers
  [[84,186,9],[116,188,10]].forEach(([x,y,c])=>{for(let i=0;i<5;i++){const a=i*1.2566-1.5708;r.push(R(c,circ(x+6*Math.cos(a),y+6*Math.sin(a),4.2)))}r.push(R(3,circ(x,y,3.4)))});
  // butterflies (no faces)
  [[38,46,12],[118,56,7]].forEach(([x,y,c])=>{r.push(R(c,poly(rell(x-7,y,8,6,-.5,0,6.2832))),R(c,poly(rell(x+7,y,8,6,.5,0,6.2832))),R(13,ell(x,y,2,7)))});
  add('teaparty','Fairy Tea Party','medium','fantasy',['#e5dbff','#ffffff','#ffd43b','#8ce99a','#2f9e44','#a9714b','#f783ac','#9775fa','#4dabf7','#ff922b','#fa5252','#63e6be','#7f4f24','#ffc078'],r)})();

 // ===== 2026-10-29  Stargazing Observatory (Hard, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  // milky way band (big, easy to tap)
  r.push(R(4,poly(rell(100,66,120,24,-.32,0,6.2832))),R(5,poly(rell(96,66,78,9,-.32,0,6.2832))));
  // crescent moon
  r.push(R(3,circ(28,28,16)),R(1,circ(35,23,13)));
  // ringed planet
  r.push(R(11,poly(rell(164,28,18,5,-.3,0,6.2832))),R(10,circ(164,28,9)),R(15,band(164,28,9,25,29)),R(11,poly(rell(164,28,18,5,-.3,0,3.1416).concat(rell(164,28,12,3,-.3,3.1416,0)))));
  // comet
  r.push(R(12,poly([[84,14],[120,10],[120,24]])),R(2,circ(120,17,6)));
  // stars
  [[60,12,5],[8,62,5],[54,44,4],[70,90,5],[12,98,4],[96,34,4],[140,10,5],[192,8,4],[186,56,5],[140,48,4],[194,92,5],[52,98,4],[86,62,5],[120,70,4],[58,72,4],[26,80,4],[176,100,4],[30,56,4],[106,88,4],[160,64,4]].forEach(([x,y,s],i)=>r.push(R([3,2,12][i%3],star(x,y,s,s*.45))));
  // shooting stars
  [[146,80,170,74],[50,64,74,54]].forEach(([x0,y0,x1,y1])=>{r.push(R(15,poly([[x0,y0-2],[x1,y1-3],[x1,y1+3],[x0,y0+2]])),R(3,star(x1,y1,6,2.8)))});
  // hills and pine trees
  r.push(R(8,'M0,140Q50,120 100,136T200,128V200H0Z'));
  [[16,132,1],[38,128,.8],[188,126,.9],[96,134,.7]].forEach(([x,y,k])=>{r.push(R(13,rect(x-3,y-2,6,Math.max(12*k,8))),R(9,poly([[x,y-34*k],[x+14*k,y-14*k],[x-14*k,y-14*k]])),R(9,poly([[x,y-22*k],[x+17*k,y],[x-17*k,y]])))});
  // observatory: telescope behind the dome, dome with open slit, round building
  r.push(R(7,poly([[134,96],[160,64],[168,70],[142,102]])),R(12,poly(rell(164,67,6,4.4,-.87+1.5708,0,6.2832))));
  r.push(R(6,'M110,112A30,30 0 0,1 170,112Z'),R(12,band(140,112,30,98,104)),R(1,rect(134,86,10,26)));
  r.push(R(15,rect(112,112,56,46)),R(6,rect(108,108,64,6)));
  r.push(R(13,'M132,158V142A8,8 0 0,1 148,142V158Z'),R(3,circ(144,150,1.9)));
  r.push(R(3,circ(122,128,5.5)),R(3,circ(158,128,5.5)));
  r.push(R(7,rect(106,156,68,6)));
  // little telescope on a tripod
  r.push(R(7,poly([[72,150],[66,170],[69,171],[75,152]])),R(7,poly([[76,150],[84,170],[81,171],[73,152]])));
  r.push(R(10,poly([[60,140],[88,126],[92,134],[64,148]])),R(2,poly(rell(90,130,3.4,5,-.45,0,6.2832))));
  // front grass, checkered picnic blanket and a lantern
  r.push(R(9,'M0,170Q60,158 120,168T200,164V200H0Z'));
  for(let row=0;row<2;row++)for(let col=0;col<4;col++)r.push(R((row+col)%2?2:14,poly([[16+col*16+row*6,176+row*10],[32+col*16+row*6,176+row*10],[32+col*16+(row+1)*6,186+row*10],[16+col*16+(row+1)*6,186+row*10]])));
  r.push(R(11,rect(94,176,12,14)),R(3,circ(100,183,4)),R(7,rect(96,170,8,6)));
  // flowers
  [[128,186,10],[156,182,5],[184,188,11]].forEach(([x,y,c])=>{for(let i=0;i<5;i++){const a=i*1.2566-1.5708;r.push(R(c,circ(x+5.5*Math.cos(a),y+5.5*Math.sin(a),3.8)))}r.push(R(3,circ(x,y,3)))});
  add('observatory','Stargazing Observatory','hard','space',['#1b2459','#ffffff','#ffd43b','#364fc7','#9775fa','#adb5bd','#495057','#2b9348','#69db7c','#f783ac','#ff922b','#99e9f2','#8d5524','#e03131','#ffe8cc'],r)})();

 // ===== 2026-10-30  Autumn Waterfall (Medium, Nature) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(3,circ(172,26,14)));
  r.push(R(2,ell(40,24,20,8)),R(2,ell(118,18,16,6)));
  r.push(R(10,'M0,70Q50,46 100,62T200,56V200H0Z'));
  // cliffs on both sides with the river at the top
  r.push(R(4,'M0,74L34,64L78,58L82,150L0,150Z'),R(4,'M118,58L160,62L200,70V150H118Z'));
  r.push(R(6,ell(100,60,24,6)));
  // waterfall with light stripes
  r.push(R(6,rect(80,60,40,90)));
  [86,98,110].forEach(x=>r.push(R(7,rect(x,66,5,78))));
  // rocks on the cliffs
  [[22,96,10,6],[54,120,11,6],[148,92,11,6],[178,124,10,6],[30,136,9,5]].forEach(([x,y,a,b])=>r.push(R(5,ell(x,y,a,b))));
  // pool with foam and stones
  r.push(R(6,ell(100,158,80,16)));
  r.push(R(2,ell(100,150,26,6)),R(2,ell(70,154,10,4)),R(2,ell(130,154,10,4)));
  r.push(R(5,ell(46,162,8,4.5)),R(5,ell(156,164,9,4.5)));
  // autumn trees on top of the cliffs
  [[16,66,8],[52,58,9],[150,58,3],[186,64,13]].forEach(([x,y,c])=>{r.push(R(12,rect(x-3,y-10,6,14)));
   r.push(R(c,circ(x-8,y-14,9)),R(c==8?9:8,circ(x+8,y-14,9)),R(c,circ(x,y-24,10)))});
  // grass in front
  r.push(R(11,'M0,172Q50,164 100,172T200,168V200H0Z'));
  // falling leaves
  [[64,30,8],[96,40,9],[136,34,3],[150,104,8],[42,108,13],[184,98,9],[60,186,3],[140,190,8]].forEach(([x,y,c],i)=>r.push(R(c,poly(rell(x,y,6.5,3.8,i*.7,0,6.2832)))));
  // mushrooms
  [[22,182],[176,184]].forEach(([x,y])=>{r.push(R(2,rect(x-3,y-6,6,12)),R(9,`M${x-11},${y-5}A11,9 0 0,1 ${x+11},${y-5}Z`));
   r.push(R(2,circ(x-4,y-10,2.2)),R(2,circ(x+5,y-9,2)))});
  // little red-orange leaf pile
  r.push(R(13,ell(100,186,16,7)),R(8,ell(94,183,6,3.8)),R(9,ell(106,188,6,3.8)));
  add('waterfall','Autumn Waterfall','medium','nature',['#a5d8ff','#ffffff','#ffd43b','#868e96','#495057','#4dabf7','#d0ebff','#ff922b','#fa5252','#8ce99a','#2b9348','#8d5524','#e8590c'],r)})();

 // ===== 2026-10-30  Octopus Coral Garden (Hard, Animals) =====
 (function(){const r=[];
  // tube along a polyline with width w0 -> w1 (sampled strip with perpendicular offsets)
  const tube=(pts,w0,w1)=>{const L=[],Rt=[],n=pts.length;for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1,w=(w0+(w1-w0)*i/(n-1))/2;L.push([pts[i][0]-dy/l*w,pts[i][1]+dx/l*w]);Rt.push([pts[i][0]+dy/l*w,pts[i][1]-dx/l*w])}return poly(L.concat(Rt.reverse()))};
  const wave=(x0,y0,x1,y1,amp,k)=>{const o=[];for(let i=0;i<=16;i++){const t=i/16,x=x0+(x1-x0)*t,y=y0+(y1-y0)*t,dx=x1-x0,dy=y1-y0,l=Math.hypot(dx,dy),s=amp*Math.sin(t*k*3.1416);o.push([x-dy/l*s,y+dx/l*s])}return o};
  r.push(R(1,rect(0,0,200,200)));
  // light rays from the surface
  r.push(R(2,poly([[20,0],[44,0],[22,90],[8,90]])),R(2,poly([[150,0],[172,0],[192,80],[178,80]])),R(2,poly([[90,0],[108,0],[104,30],[92,30]])));
  // sand
  r.push(R(3,'M0,158Q50,146 100,156T200,150V200H0Z'));
  // seaweed
  [[12,160,6,52,8],[30,164,26,96,9],[176,160,180,60,8],[192,164,196,112,9],[160,166,152,118,9]].forEach(([x0,y0,x1,y1,c])=>r.push(R(c,tube(wave(x0,y0,x1,y1,5,3),7,4))));
  // branch corals
  [[34,160,4],[164,160,5]].forEach(([x,y,c])=>{r.push(R(c,tube([[x,y],[x,y-30]],8,6)),R(c,tube([[x,y-14],[x-12,y-24],[x-14,y-36]],7,5)),R(c,tube([[x,y-18],[x+12,y-28],[x+13,y-40]],7,5)));
   r.push(R(c,circ(x,y-31,4.5)),R(c,circ(x-14,y-37,4)),R(c,circ(x+13,y-41,4)))});
  // brain corals
  [[72,166,10],[118,170,14]].forEach(([x,y,c])=>{r.push(R(c,`M${x-18},${y}A18,16 0 0,1 ${x+18},${y}Z`),R(c==10?5:6,band(x,y,17,y-9,y-5)))});
  // tentacles (behind the head)
  const tents=[[78,94,-1.0],[84,98,-.6],[92,100,-.25],[100,101,0],[108,100,.25],[116,98,.6],[122,94,1.0],[100,96,.0]];
  tents.slice(0,7).forEach(([bx,by,a],i)=>{const pts=[];for(let j=0;j<=14;j++){const t=j/14,len=58-Math.abs(a)*16,ang=1.5708-a*1.2,x=bx+Math.cos(ang)*len*t+Math.sin(t*5+i)*9*t,y=by+Math.sin(ang)*len*t*.9;pts.push([x,y])}
   r.push(R(6,tube(pts,13,5)));const s1=pts[5],s2=pts[10];r.push(R(7,circ(s1[0],s1[1],3)),R(7,circ(s2[0],s2[1],2.6)))});
  // head
  r.push(R(6,ell(100,72,30,30)));
  [[86,56,4],[112,52,3.5],[100,44,3],[118,66,3]].forEach(([x,y,k])=>r.push(R(7,circ(x,y,k))));
  r.push(R(11,circ(89,78,7)),R(11,circ(111,78,7)),R(12,circ(90,79,3.6)),R(12,circ(112,79,3.6)));
  r.push(R(4,ell(78,90,5,3)),R(4,ell(122,90,5,3)));
  // fish (tails first)
  [[36,40,13,1],[60,82,5,1],[72,20,14,1],[172,30,13,-1]].forEach(([x,y,c,d])=>{r.push(R(c,poly([[x-d*10,y],[x-d*20,y-7],[x-d*20,y+7]])),R(c,ell(x,y,12,7.5)),R(10,poly([[x-d*2,y-6],[x+d*5,y-11],[x+d*7,y-5]])),R(11,circ(x+d*6,y-1.5,2.6)))});
  // bubbles
  [[132,40,4],[138,26,3],[134,12,4.5],[64,64,3.5],[60,52,3],[150,72,3]].forEach(([x,y,k])=>r.push(R(11,circ(x,y,k))));
  // starfish, shells and pebbles on the sand
  [[24,182,5],[176,180,10]].forEach(([x,y,c])=>r.push(R(c,star(x,y,9,4))));
  [[98,188],[150,190]].forEach(([x,y])=>{r.push(R(15,`M${x-8},${y}A8,8 0 0,1 ${x+8},${y}Z`)),r.push(R(4,rect(x-5,y,10,3.6)))});
  [[60,190,6,3.5],[124,192,5,3],[192,192,6,3.5],[6,170,5,3]].forEach(([x,y,a,b])=>r.push(R(15,ell(x,y,a,b))));
  add('octopus','Octopus Coral Garden','hard','animals',['#1c7ed6','#4dabf7','#ffec99','#f783ac','#ff922b','#9775fa','#d0bfff','#2b9348','#69db7c','#fa5252','#ffffff','#212529','#ffd43b','#63e6be','#c08457'],r)})();

 // ===== 2026-10-31  Mars Rover Canyon (Medium, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(12,circ(166,30,13)));
  r.push(R(5,circ(36,26,8)),R(13,circ(72,16,4.5)));
  [[110,20],[130,44],[16,58],[92,46]].forEach(([x,y])=>r.push(R(6,star(x,y,5,2.2))));
  // far mesas and canyon walls
  r.push(R(2,'M0,92L0,66L20,64L28,72L58,70L66,92Z'),R(2,'M120,92L132,70L170,68L176,60L200,62V92Z'));
  r.push(R(3,'M0,92L66,92L80,84L120,84L132,92L200,92V120H0Z'));
  r.push(R(2,rect(0,100,200,5)));
  // ground
  r.push(R(4,'M0,116Q50,108 100,116T200,112V200H0Z'));
  // craters
  [[34,176,16,6],[168,168,14,5]].forEach(([x,y,a,b])=>{r.push(R(3,ell(x,y,a,b)),R(11,ell(x,y+1.5,a-6,b-2.5)))});
  // rocks
  [[16,140,7,4],[184,138,8,4.5],[60,190,8,4.5],[132,186,7,4],[40,126,6,3.5],[190,190,6,3.5]].forEach(([x,y,a,b])=>r.push(R(11,ell(x,y,a,b))));
  // wheel tracks behind the rover
  [[8,158],[22,158],[36,158],[8,166],[22,166],[36,166]].forEach(([x,y])=>r.push(R(3,rect(x,y,9,4))));
  // little helicopter drone
  r.push(R(13,rect(150,58,4,10)),R(5,ell(152,72,9,6)),R(10,circ(155,71,3)),R(13,poly(rell(152,56,16,2.4,0,0,6.2832))));
  r.push(R(13,poly([[145,76],[147,76],[142,84],[139,84]])),R(13,poly([[157,76],[159,76],[165,84],[162,84]])));
  // mast and camera head (behind the body)
  r.push(R(5,rect(116,74,6,34)),R(13,rect(106,60,26,14)),R(10,circ(113,67,3.6)),R(10,circ(125,67,3.6)));
  // antenna and arm
  r.push(R(13,rect(74,90,4,18)),R(6,'M64,92A12,12 0 0,1 88,92Z'));
  r.push(R(5,poly([[132,128],[156,138],[154,143],[130,133]])),R(13,rect(152,138,10,8)));
  // solar panel
  r.push(R(5,rect(60,106,80,9)));
  for(let i=0;i<6;i++)r.push(R(7,rect(62+i*13,107.5,11,6)));
  // body
  r.push(R(6,rect(68,115,66,20)),R(9,rect(68,124,66,5)),R(10,rect(76,117,12,6)),R(8,circ(124,120,3)));
  // suspension and wheels
  r.push(R(13,poly([[74,135],[130,135],[128,139],[76,139]])));
  [[76,146],[102,146],[128,146]].forEach(([x,y])=>{r.push(R(8,circ(x,y,10)),R(5,circ(x,y,4)))});
  // dust puffs
  r.push(R(12,ell(56,154,8,4)),R(12,ell(46,148,6,3.5)));
  add('marsrover','Mars Rover Canyon','medium','space',['#ffd8a8','#d9480f','#e8590c','#ffa94d','#868e96','#f1f3f5','#1c7ed6','#212529','#ffd43b','#a5d8ff','#8d5524','#fff3bf','#495057'],r)})();

 // ===== 2026-10-31  Halloween Candy Porch (Hard, Holidays) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(2,circ(170,24,15)),R(12,circ(165,20,3)),R(12,circ(175,30,2.6)));
  [[22,12],[60,24],[100,10],[134,30],[196,52]].forEach(([x,y],i)=>r.push(R(3,star(x,y,5,2.2))));
  // friendly bats
  [[40,40],[124,16]].forEach(([x,y])=>{r.push(R(8,poly([[x-4,y],[x-16,y-8],[x-13,y+1],[x-18,y+6],[x-4,y+5]])),R(8,poly([[x+4,y],[x+16,y-8],[x+13,y+1],[x+18,y+6],[x+4,y+5]])),R(11,ell(x,y+1,5,6)))});
  // roof and wall
  r.push(R(12,poly([[6,66],[100,34],[194,66]])),R(8,rect(6,64,188,5)));
  r.push(R(7,rect(14,69,172,93)));
  [80,140].forEach(y=>r.push(R(6,rect(14,y,172,4))));
  // bunting under the roof trim
  for(let i=0;i<9;i++){const x=18+i*19;r.push(R([4,11,8][i%3],poly([[x,69],[x+14,69],[x+7,79]])))}
  // windows with shutters
  [[26,88],[138,88]].forEach(([x,y],k)=>{r.push(R(9,rect(x-8,y,8,40)),R(9,rect(x+38,y,8,40)),R(10,rect(x,y,38,40)));
   for(let i=0;i<2;i++)for(let j=0;j<2;j++)r.push(R(3,rect(x+3+i*17.5,y+3+j*17.5,14.5,15.5)))});
  // ghost in the left window, cat in the right window
  r.push(R(10,'M38,128L38,104A9,9 0 0,1 56,104L56,128L52,123L47,128L43,123Z'),R(8,circ(44,106,2.2)),R(8,circ(50,106,2.2)));
  r.push(R(8,ell(157,121,9,8)),R(8,circ(157,108,6)),R(8,poly([[151,106],[152,98],[156,103]])),R(8,poly([[163,106],[162,98],[158,103]])));
  // door with frame, panels, knob and wreath
  r.push(R(10,rect(80,84,40,78)),R(9,rect(84,88,32,74)));
  [[88,112],[102,112],[88,136],[102,136]].forEach(([x,y])=>r.push(R(6,rect(x,y,10,20))));
  r.push(R(3,circ(111,130,2.6)),R(5,circ(100,99,9)),R(9,circ(100,99,4.6)),R(4,circ(93,93,2.4)),R(4,circ(107,93,2.4)),R(4,circ(100,108,2.4)));
  // porch lanterns
  [[72,96],[124,96]].forEach(([x,y])=>{r.push(R(8,rect(x,y,7,4)),R(3,rect(x,y+4,7,10)),R(8,rect(x,y+14,7,3)))});
  // porch floor and railings
  r.push(R(6,rect(0,162,200,8)));
  r.push(R(10,rect(4,140,64,4)),R(10,rect(132,140,64,4)));
  for(let i=0;i<7;i++){r.push(R(10,rect(8+i*9,144,4,18)),R(10,rect(136+i*9,144,4,18)))}
  // steps
  r.push(R(7,rect(70,170,60,10)),R(6,rect(64,180,72,10)),R(7,rect(58,190,84,10)));
  // grass by the steps
  r.push(R(5,rect(0,170,58,30)),R(5,rect(142,170,58,30)));
  // jack-o'-lanterns (friendly smiles)
  const jack=(x,y,s,face)=>{r.push(R(5,rect(x-2,y-s-5,4,7)),R(4,ell(x,y,s*1.25,s)),R(13,ell(x,y,s*.45,s*.92)));
   if(face){r.push(R(8,poly([[x-s*.75,y-s*.12],[x-s*.4,y-s*.5],[x-s*.15,y-s*.12]])),R(8,poly([[x+s*.15,y-s*.12],[x+s*.4,y-s*.5],[x+s*.75,y-s*.12]])),R(8,`M${f(x-s*.7)},${f(y+s*.15)}Q${x},${f(y+s*.85)} ${f(x+s*.7)},${f(y+s*.15)}Z`))}};
  jack(26,178,13,1);jack(176,180,13,1);jack(78,165,7,0);jack(126,166,7,0);
  // candy bowl on the top step
  [[93,164,9],[101,162,15],[109,164,3]].forEach(([x,y,c])=>r.push(R(c,circ(x,y,4.6))));
  // wrapped candies on the middle step
  [[76,185,15],[124,185,9]].forEach(([x,y,c])=>r.push(R(c,poly([[x-13,y-4.5],[x-5,y],[x-13,y+4.5]])),R(c,poly([[x+13,y-4.5],[x+5,y],[x+13,y+4.5]])),R(c,circ(x,y,5))));
  r.push(R(11,'M88,169L114,169A13,8 0 0,1 88,169Z'));
  // potted mums
  [[50,188],[150,188]].forEach(([x,y])=>{r.push(R(6,poly([[x-8,y],[x+8,y],[x+6,y+12],[x-6,y+12]])));
   [[x-6,y-4,13],[x+6,y-4,9],[x,y-9,15],[x,y-2,3]].forEach(([a,b,c])=>r.push(R(c,circ(a,b,5))))});
  // fallen leaves on the grass
  [[8,196,4],[44,172,9],[192,196,13],[164,164,4]].forEach(([x,y,c],i)=>r.push(R(c,poly(rell(x,y,5,3,i*.8,0,6.2832)))));
  r.push(R(14,ell(112,196,6,3)),R(14,ell(100,186,6,3)));
  add('candyporch','Halloween Candy Porch','hard','holidays',['#5f3dc4','#fff3bf','#ffd43b','#ff922b','#2b9348','#8d5524','#c08457','#212529','#e03131','#ffffff','#9775fa','#868e96','#ffa94d','#69db7c','#f783ac'],r)})();

 // ===== 2026-11-01  Race Car Track (Hard, Vehicles) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(2,circ(182,16,11)));
  [[34,18,9,6],[48,14,10,7],[62,19,9,6]].forEach(([x,y,a,b])=>r.push(R(3,ell(x,y,a,b))));
  // bunting across the top
  for(let i=0;i<8;i++){const x=78+i*13;r.push(R([6,7,2,10][i%4],poly([[x,0],[x+11,0],[x+5.5,10]])))}
  // grandstand with colored seats (no people)
  r.push(R(6,poly([[2,34],[100,34],[92,24],[10,24]])),R(11,rect(6,34,90,46)));
  for(let j=0;j<3;j++)for(let i=0;i<6;i++)r.push(R([6,7,9,10,14,2][(i+j)%6],rect(9+i*14.5,38+j*14,12.5,10)));
  // pit garage
  r.push(R(7,poly([[104,34],[198,34],[192,24],[110,24]])),R(3,rect(108,34,86,46)),R(9,rect(108,36,86,8)));
  [114,140,166].forEach(x=>{r.push(R(11,rect(x,50,22,30)),R(7,rect(x,60,22,5)))});
  // checkered flag
  r.push(R(8,rect(99,22,3.6,58)));
  for(let j=0;j<2;j++)for(let i=0;i<3;i++)r.push(R((i+j)%2?8:3,rect(102.6+i*7,10+j*6.5,7,6.5)));
  // grass, trees and a tire stack
  r.push(R(4,rect(0,80,200,28)));
  [[16,92],[56,90]].forEach(([x,y])=>{r.push(R(13,rect(x-3,y+4,6,12)),R(12,circ(x,y,9)),R(12,circ(x+9,y+4,6)))});
  [[150,0],[172,0]].forEach(([x])=>{for(let k=0;k<3;k++)r.push(R(k%2?6:8,rect(x,84+k*7.5,16,6.5)))});
  // track with red/white curbs
  for(let i=0;i<15;i++)r.push(R(i%2?3:6,rect(i*13.4,108,13.4,6)));
  r.push(R(5,rect(0,114,200,52)));
  for(let i=0;i<7;i++)r.push(R(3,rect(46+i*22,137,14,4)));
  for(let i=0;i<15;i++)r.push(R(i%2?6:3,rect(i*13.4,166,13.4,6)));
  // checkered start line
  for(let j=0;j<6;j++)for(let i=0;i<2;i++)r.push(R((i+j)%2?8:3,rect(8+i*7,114+j*8.66,7,8.66)));
  // race cars (no numbers or logos)
  const car=(x,y,c,s)=>{r.push(R(3,rect(x-20,y,12,4)),R(3,rect(x-24,y+7,14,4)));
   r.push(R(8,rect(x,y-6,6,14)),R(c,poly([[x+2,y],[x+20,y-4],[x+40,y-4],[x+58,y+4],[x+58,y+10],[x+2,y+10]])));
   r.push(R(1,ell(x+29,y-5,8,4.6)),R(s,rect(x+8,y+1,40,4.4)));
   r.push(R(8,rect(x+52,y+9,12,4)));
   [x+14,x+46].forEach(cx=>{r.push(R(8,circ(cx,y+11,7)),R(11,circ(cx,y+11,3)))})};
  car(50,120,6,3);car(92,150,7,2);car(134,120,10,9);
  // bottom grass with flower bushes and cones
  r.push(R(4,rect(0,172,200,28)));
  [[30,186],[100,188],[170,186]].forEach(([x,y],i)=>{r.push(R(12,ell(x,y,16,9)));[[x-7,y-2],[x+6,y-3],[x,y+3]].forEach(([a,b],k)=>r.push(R([14,2,10][(i+k)%3],circ(a,b,3.4))))});
  [[62,184],[138,184]].forEach(([x,y])=>{r.push(R(9,poly([[x,y-10],[x+8,y+10],[x-8,y+10]])),R(3,poly([[x-3,y-2.5],[x+3,y-2.5],[x+5,y+2.5],[x-5,y+2.5]])),R(8,rect(x-11,y+10,22,4)))});
  add('racetrack','Race Car Track','hard','vehicles',['#a5d8ff','#ffd43b','#ffffff','#51cf66','#868e96','#e03131','#1c7ed6','#212529','#ff922b','#9775fa','#ced4da','#2b9348','#c08457','#f783ac'],r)})();

 // ===== 2026-11-01  Dragon Egg Nest (Medium, Fantasy) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(2,circ(30,28,14)));
  [[146,24,12,8],[162,18,12,9],[176,25,11,7]].forEach(([x,y,a,b])=>r.push(R(3,ell(x,y,a,b))));
  // mountains with snow caps
  r.push(R(4,poly([[-10,120],[46,52],[104,120]])),R(11,poly([[78,120],[146,44],[214,120]])));
  r.push(R(3,poly([[46,52],[34,67],[42,63],[48,69],[57,65]])),R(3,poly([[146,44],[132,60],[140,56],[147,63],[159,59]])));
  r.push(R(5,rect(0,116,200,84)));
  // back of the nest
  r.push(R(6,ell(100,150,64,22)));
  // baby dragon: wings first, then body, belly, head
  r.push(R(13,poly([[88,118],[64,96],[70,108],[60,112],[70,118],[64,126],[86,130]])),R(13,poly([[112,118],[136,96],[130,108],[140,112],[130,118],[136,126],[114,130]])));
  r.push(R(12,ell(100,124,19,18)),R(2,ell(100,121,9,8)));
  r.push(R(12,circ(100,93,16)),R(13,ell(100,102,11,7.5)));
  r.push(R(14,circ(93,90,3.2)),R(14,circ(107,90,3.2)),R(14,'M93,100Q100,111 107,100Z'));
  // eggshell cap on the head and broken shell in front
  r.push(R(3,poly([[85,87],[88,77],[100,71],[112,77],[115,87],[108,82],[100,88],[92,82]])));
  r.push(R(3,poly([[78,134],[85,128],[92,135],[100,127],[108,135],[115,128],[122,134],[120,152],[80,152]])),R(8,circ(90,143,3.6)),R(9,circ(110,142,3.6)));
  // two spotted eggs
  [[54,136,-.35,8,10],[146,136,.35,9,8]].forEach(([x,y,t,c,s])=>{r.push(R(c,poly(rell(x,y,14,19,t,0,6.2832))));
   [[-5,-7],[5,-2],[-3,6]].forEach(([dx,dy])=>r.push(R(s,circ(x+dx,y+dy,3.4))))});
  // front of the nest with twigs
  r.push(R(7,'M30,148Q100,178 170,148L164,168Q100,194 36,168Z'));
  [[64,166,-.12],[100,173,0],[136,166,.12]].forEach(([x,y,t])=>r.push(R(6,poly(rell(x,y,20,2.6,t,0,6.2832)))));
  // magic sparkles
  [[40,90],[160,88],[70,66],[126,62],[100,40]].forEach(([x,y])=>r.push(R(2,star(x,y,6,2.6))));
  // flowers
  [[20,184,9],[180,186,11]].forEach(([x,y,c])=>{for(let k=0;k<5;k++){const a=k*1.2566-1.5708;r.push(R(c,circ(x+6*Math.cos(a),y+6*Math.sin(a),4)))}r.push(R(2,circ(x,y,3.4)))});
  // mushrooms
  [[64,190,9],[136,190,10]].forEach(([x,y,c])=>{r.push(R(3,rect(x-3.5,y-4,7,10)),R(c,'M'+(x-11)+','+(y-3)+'A11,9 0 0,1 '+(x+11)+','+(y-3)+'Z'),R(3,circ(x-4,y-7,2.2)),R(3,circ(x+4,y-8,2.2)))});
  add('dragonegg','Dragon Egg Nest','medium','fantasy',['#d0bfff','#ffd43b','#ffffff','#9775fa','#69db7c','#8d5524','#c08457','#20c997','#f783ac','#ff922b','#4dabf7','#2b9348','#b2f2bb','#212529'],r)})();

 // ===== 2026-11-02  Enchanted Treehouse Lanterns (Hard, Fantasy) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(2,circ(172,24,15)),R(1,circ(179,19,12)));
  [[14,14],[44,30],[192,6],[188,62],[20,62],[8,40]].forEach(([x,y],i)=>r.push(R(i%2?3:2,star(x,y,5.5,2.4))));
  // hills
  r.push(R(15,ell(30,160,74,34)),R(11,ell(178,162,64,30)));
  r.push(R(5,rect(0,160,200,40)));
  // tree: branch for the swing, trunk with roots
  r.push(R(6,poly([[106,128],[178,112],[180,119],[106,136]])));
  r.push(R(6,poly([[84,172],[92,96],[108,96],[116,172]])),R(6,poly([[86,164],[70,174],[90,174]])),R(6,poly([[114,164],[130,174],[110,174]])));
  // swing
  r.push(R(13,rect(150,117,3.6,32)),R(13,rect(170,113,3.6,36)),R(9,rect(144,148,34,6)));
  // foliage (big shapes behind the house)
  r.push(R(4,circ(100,46,42)),R(4,circ(54,64,26)),R(4,circ(146,64,26)));
  r.push(R(5,circ(76,20,12)),R(5,circ(124,18,12)),R(5,circ(40,56,10)),R(5,circ(162,54,10)));
  // platform and supports
  r.push(R(6,poly([[66,103],[74,103],[94,124],[94,132]])),R(6,poly([[134,103],[126,103],[106,124],[106,132]])));
  r.push(R(7,rect(54,96,92,7)));
  // house
  r.push(R(8,rect(122,30,10,24)));
  r.push(R(7,rect(66,64,68,32)),R(6,rect(66,66,68,4)),R(6,rect(66,90,68,4)));
  r.push(R(8,poly([[56,66],[100,34],[144,66]])),R(2,circ(100,53,6.5)));
  r.push(R(11,rect(92,72,16,24)),R(2,circ(104,85,2.4)));
  [[70,72],[114,72]].forEach(([x,y])=>{r.push(R(13,rect(x,y,16,16)),R(2,rect(x+3,y+3,10,7)));r.push(R(10,rect(x-2,y+16,20,5)))});
  // ladder
  for(let k=0;k<6;k++)r.push(R(7,rect(68,108+k*10,16,4)));
  r.push(R(6,rect(66,103,4,68)),R(6,rect(82,103,4,68)));
  // lantern garlands
  const garland=(x0,x1,y0,sag)=>{const T=[],B=[],N=14;for(let i=0;i<=N;i++){const t=i/N,x=x0+(x1-x0)*t,y=y0+sag*Math.sin(Math.PI*t);T.push([x,y-2]);B.push([x,y+2])}r.push(R(13,poly(T.concat(B.reverse()))));
   return t=>[x0+(x1-x0)*t,y0+sag*Math.sin(Math.PI*t)]};
  const lant=(p,c)=>{const [x,y]=p;r.push(R(13,rect(x-4,y+1,8,4)),R(c,ell(x,y+12,6,8)))};
  const g1=garland(4,56,92,12);[[.15,9],[.4,10],[.65,14],[.9,2]].forEach(([t,c])=>lant(g1(t),c));
  const g2=garland(144,198,84,12);[[.12,2],[.37,14],[.62,9],[.87,10]].forEach(([t,c])=>lant(g2(t),c));
  // fireflies
  [[24,132],[58,146],[136,96],[192,104],[132,148],[40,118]].forEach(([x,y])=>r.push(R(2,star(x,y,5,2.2))));
  // stepping stones
  [[100,180,10,4],[118,188,10,4],[90,192,9,3.6],[136,194,9,3.6]].forEach(([x,y,a,b])=>r.push(R(12,ell(x,y,a,b))));
  // mushrooms
  [[20,182,8],[52,188,11],[178,186,10]].forEach(([x,y,c])=>{r.push(R(3,rect(x-3.5,y-4,7,10)),R(c,'M'+(x-11)+','+(y-3)+'A11,9 0 0,1 '+(x+11)+','+(y-3)+'Z'),R(3,circ(x-4,y-7,2.2)),R(3,circ(x+4,y-8,2.2)))});
  // flowers
  [[150,176,10],[196,176,9],[34,170,14]].forEach(([x,y,c])=>{for(let k=0;k<5;k++){const a=k*1.2566-1.5708;r.push(R(c,circ(x+5.6*Math.cos(a),y+5.6*Math.sin(a),3.6)))}r.push(R(2,circ(x,y,3.2)))});
  add('treehouse','Enchanted Treehouse Lanterns','hard','fantasy',['#5c7cfa','#ffd43b','#ffffff','#2b9348','#69db7c','#8d5524','#c08457','#e03131','#ff922b','#f783ac','#9775fa','#adb5bd','#212529','#20c997','#b197fc'],r)})();

 // ===== 2026-11-02  Snow Globe (Easy, Holidays & Winter) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)),R(7,rect(0,172,200,28)));
  [[24,30],[176,40],[22,120],[180,128]].forEach(([x,y],i)=>r.push(R(i%2?2:4,star(x,y,10,4.2))));
  r.push(R(3,circ(100,90,62)));
  r.push(R(4,band(100,90,62,122,152)));
  // pine trees
  [[52,124],[148,124]].forEach(([x,y])=>{r.push(R(7,rect(x-4,y-6,8,10)),R(9,poly([[x,y-40],[x+14,y-20],[x-14,y-20]])),R(9,poly([[x,y-28],[x+17,y-6],[x-17,y-6]])))});
  // cottage
  r.push(R(8,rect(110,72,9,16)));
  r.push(R(6,rect(78,94,44,32)),R(8,poly([[72,96],[100,72],[128,96]])),R(4,poly([[100,72],[86,84],[114,84]])));
  r.push(R(5,rect(93,106,14,20)),R(2,rect(83,102,9,9)),R(2,rect(108,102,9,9)));
  // snowflakes in the globe
  [[86,50],[130,48],[106,38],[60,86],[142,90],[82,144],[120,146]].forEach(([x,y])=>r.push(R(4,star(x,y,5.5,2.4))));
  // glass shine
  r.push(R(4,poly(rell(64,66,5,16,.6,0,6.2832))));
  // base
  r.push(R(8,poly([[56,146],[144,146],[160,180],[40,180]])),R(2,rect(48,160,104,7)));
  [[70,172],[100,172],[130,172]].forEach(([x,y])=>r.push(R(4,star(x,y,6,2.6))));
  add('snowglobe','Snow Globe','easy','holidays',['#d0bfff','#ffd43b','#a5d8ff','#ffffff','#74c0fc','#ffa94d','#8d5524','#e03131','#2b9348'],r)})();

 // ===== 2026-11-03  Rainy Rainforest Canopy (Hard, Nature) =====
 (function(){const r=[];
  const drop=(x,y)=>`M${x},${y-8}L${x+4.2},${y}A4.2,4.2 0 1,1 ${x-4.2},${y}Z`;
  const vine=(x0,y1)=>{const L=[],Rr=[];for(let y=0;y<=y1;y+=4){const x=x0+4*Math.sin(y/10);L.push([x-2.2,y]);Rr.push([x+2.2,y])}return poly(L.concat(Rr.reverse()))};
  const flower=(x,y,c)=>{for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5;r.push(R(c,circ(x+6.5*Math.cos(a),y+6.5*Math.sin(a),5.2)))}r.push(R(9,circ(x,y,4)))};
  // misty sky and rain clouds
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(15,ell(40,14,34,12)),R(15,ell(108,10,30,11)),R(15,ell(172,16,32,12)));
  // far canopy (dark circles, light circles in front)
  [[10,56],[50,50],[92,56],[134,50],[176,56]].forEach(([x,y])=>r.push(R(3,circ(x,y,20))));
  [[30,64],[72,66],[114,66],[156,64],[198,70]].forEach(([x,y])=>r.push(R(4,circ(x,y,13))));
  // trunks with bark stripes
  r.push(R(5,rect(14,60,20,140)),R(5,rect(166,60,20,140)));
  r.push(R(6,rect(19,96,10,5)),R(6,rect(19,136,10,5)),R(6,rect(171,92,10,5)),R(6,rect(171,128,10,5)));
  // misty forest floor and river
  r.push(R(3,'M0,160Q50,148 100,158T200,154V200H0Z'));
  r.push(R(13,'M0,178Q50,170 100,178T200,176V200H0Z'));
  r.push(R(12,rect(60,186,20,4.5)),R(12,rect(130,184,24,4.5)));
  // lily pads
  r.push(R(4,ell(40,186,13,5.5)),R(4,ell(108,190,14,6)),R(4,ell(176,190,12,5)));
  // branch from the left trunk with a toucan
  r.push(R(6,poly([[30,104],[124,96],[126,106],[30,114]])));
  r.push(R(7,poly([[58,96],[50,118],[62,114]])));
  r.push(R(7,ell(66,84,12,16)),R(12,ell(72,80,6,9)));
  r.push(R(8,poly([[74,66],[100,72],[96,80],[76,78]])),R(9,poly([[90,70],[100,72],[96,80],[89,79]])));
  r.push(R(12,circ(70,70,4.6)),R(7,circ(71,70,2.2)));
  r.push(R(8,rect(60,98,4,4)),R(8,rect(68,98,4,4)));
  // hanging vines with leaves
  [[100,92],[140,86],[48,40]].forEach(([x0,y1],k)=>{r.push(R(3,vine(x0,y1)));for(let y=24;y<=y1-6;y+=20){const x=x0+4*Math.sin(y/10),s=((y/20)|0)%2?1:-1;r.push(R(4,poly(rell(x+s*7,y,8,4.6,s*.5,0,6.2832))))}});
  // big leaf with a tree frog
  r.push(R(4,poly(rell(138,146,34,12,-.25,0,6.2832))),R(3,poly(rell(138,146,30,2.4,-.25,0,6.2832))));
  r.push(R(16,ell(124,130,7,5)),R(16,ell(150,128,7,5)));
  r.push(R(16,ell(137,124,15,11)),R(12,ell(137,128,8,5.5)));
  r.push(R(10,circ(129,112,5.2)),R(10,circ(145,112,5.2)),R(7,circ(129,112,2.4)),R(7,circ(145,112,2.4)));
  r.push(R(8,circ(126,136,3)),R(8,circ(148,136,3)));
  // flowers
  flower(40,148,11);flower(96,140,10);flower(186,146,14);
  // butterfly
  r.push(R(14,poly(rell(141,84,9,6,-.6,0,6.2832))),R(14,poly(rell(141,98,7,5,.6,0,6.2832))));
  r.push(R(11,poly(rell(159,84,9,6,.6,0,6.2832))),R(11,poly(rell(159,98,7,5,-.6,0,6.2832))));
  r.push(R(7,ell(150,91,2.6,10)));
  // raindrops
  [[16,32],[76,28],[96,38],[124,30],[150,34],[196,36],[62,36],[110,118],[56,166],[88,108],[48,128],[78,130],[116,84],[194,124],[6,120],[6,90],[46,90],[120,170],[82,154],[160,168]].forEach(([x,y])=>r.push(R(2,drop(x,y))));
  // foreground leaves in the corners
  r.push(R(3,poly(rell(8,186,26,10,-.6,0,6.2832))),R(4,poly(rell(196,180,24,9,.6,0,6.2832))));
  add('rainforest','Rainy Rainforest Canopy','hard','nature',['#a5d8ff','#339af0','#2b9348','#69db7c','#8d5524','#c08457','#212529','#ff922b','#ffd43b','#e03131','#f783ac','#ffffff','#20c997','#9775fa','#adb5bd','#94d82d'],r)})();

 // ===== 2026-11-03  Little Sea Turtle (Easy, Animals) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(2,poly([[40,0],[64,0],[30,200],[6,200]])),R(2,poly([[130,0],[150,0],[124,170],[104,170]])));
  r.push(R(3,'M0,168Q50,156 100,166T200,162V200H0Z'));
  // seaweed
  r.push(R(4,'M16,180Q4,150 16,128Q28,106 16,84L26,84Q38,106 26,128Q14,150 28,180Z'));
  r.push(R(4,'M178,176Q168,156 178,140Q188,124 180,108L190,108Q198,124 188,140Q178,156 190,176Z'));
  // starfish and shell on the sand
  r.push(R(9,star(150,182,13,5.5)),R(10,ell(62,184,10,6)));
  // fish
  r.push(R(10,poly([[52,40],[66,30],[66,50]])),R(10,ell(40,40,15,10)));
  // flippers (behind the shell), tail and head
  r.push(R(5,poly(rell(138,62,24,9,-.6,0,6.2832))),R(5,poly(rell(140,132,24,9,.6,0,6.2832))));
  r.push(R(5,poly(rell(54,70,15,7,.6,0,6.2832))),R(5,poly(rell(54,126,15,7,-.6,0,6.2832))));
  r.push(R(5,poly([[46,92],[26,98],[46,104]])));
  r.push(R(5,circ(156,90,16)));
  // shell: rim, inner shell and plates
  r.push(R(6,ell(96,98,52,38)),R(4,ell(96,98,45,31)));
  r.push(R(7,circ(96,98,12)),R(7,circ(96,77,8)),R(7,circ(71,92,9)),R(7,circ(121,92,9)),R(7,circ(78,116,8)),R(7,circ(114,116,8)));
  r.push(R(8,circ(162,84,4.6)));
  // bubbles
  [[168,46,6],[178,26,5],[158,18,4.6]].forEach(([x,y,s])=>r.push(R(2,circ(x,y,s))));
  add('turtle','Little Sea Turtle','easy','animals',['#74c0fc','#a5d8ff','#ffe066','#2b9348','#8ce99a','#8d5524','#c0eb75','#212529','#f783ac','#ff922b'],r)})();
 // ===== 2026-11-04  Little Fire Boat (Easy, Vehicles) =====
 (function(){const r=[];
  // thick water-spray arc (quadratic curve sampled, w = thickness)
  const arc=(x0,y0,cx,cy,x1,y1,w)=>{const A=[],B=[];for(let i=0;i<=16;i++){const t=i/16,u=1-t,x=u*u*x0+2*u*t*cx+t*t*x1,y=u*u*y0+2*u*t*cy+t*t*y1,dx=2*u*(cx-x0)+2*t*(x1-cx),dy=2*u*(cy-y0)+2*t*(y1-cy),L=Math.hypot(dx,dy),nx=-dy/L*w/2,ny=dx/L*w/2;A.push([x+nx,y+ny]);B.push([x-nx,y-ny])}return poly(A.concat(B.reverse()))};
  r.push(R(1,rect(0,0,200,200)),R(5,circ(172,28,14)));
  r.push(R(3,ell(36,26,22,9)),R(3,ell(118,18,18,7)));
  r.push(R(8,'M0,122Q50,98 100,118T200,110V132H0Z'));
  r.push(R(2,'M0,128Q50,120 100,128T200,124V200H0Z'));
  // water sprays from the two cannons (behind the boat)
  r.push(R(9,arc(52,110,26,30,6,118,8)),R(9,arc(148,110,174,30,194,118,8)));
  [[12,100],[20,82],[188,100],[180,82]].forEach(([x,y])=>r.push(R(9,circ(x,y,4.2))));
  // hull, stripe, portholes
  r.push(R(4,poly([[28,130],[172,130],[160,164],[44,164]])));
  r.push(R(3,poly([[32,139],[168,139],[165,148],[35,148]])));
  [[72,156],[100,156],[128,156]].forEach(([x,y])=>r.push(R(5,circ(x,y,4))));
  // cabin, roof, one big window each
  r.push(R(3,rect(70,96,60,34)),R(4,rect(64,86,72,11)));
  r.push(R(6,rect(77,103,19,13)),R(6,rect(104,103,19,13)));
  // mast and beacon light
  r.push(R(7,rect(96,62,8,24)),R(5,circ(100,56,7)));
  // cannon posts and cannons
  r.push(R(7,rect(47,114,10,16)),R(7,rect(143,114,10,16)));
  r.push(R(5,poly([[40,108],[60,104],[62,112],[42,116]])),R(5,poly([[160,104],[140,108],[138,116],[158,112]])));
  // waves and bow wave
  r.push(R(3,poly([[160,164],[184,150],[176,164]])));
  [[30,180],[90,186],[150,182],[60,170]].forEach(([x,y])=>r.push(R(3,ell(x,y,14,4))));
  add('fireboat','Little Fire Boat','easy','vehicles',['#a5d8ff','#339af0','#ffffff','#e03131','#ffd43b','#1864ab','#adb5bd','#2b9348','#99e9f2'],r)})();

 // ===== 2026-11-04  Comet & Star Nursery (Medium, Space) =====
 (function(){const r=[];
  // crescent = part of circle 1 outside circle 2 (sampled polygon)
  const crescent=(x1,y1,r1,x2,y2,r2)=>{const A=[],B=[];for(let i=0;i<360;i++){const a=i*Math.PI/180,px=x1+r1*Math.cos(a),py=y1+r1*Math.sin(a);if(Math.hypot(px-x2,py-y2)>r2)A.push([px,py]);const qx=x2+r2*Math.cos(a),qy=y2+r2*Math.sin(a);if(Math.hypot(qx-x1,qy-y1)<r1)B.push([qx,qy])}return poly(A.concat(B.reverse()))};
  r.push(R(1,rect(0,0,200,200)));
  // nebula clouds (the star nursery)
  r.push(R(2,poly(rell(104,124,92,40,-.3,0,6.2832))));
  r.push(R(3,poly(rell(70,156,46,20,.15,0,6.2832))));
  r.push(R(8,poly(rell(150,96,40,16,-.4,0,6.2832))));
  r.push(R(9,poly(rell(166,176,30,11,.25,0,6.2832))));
  // comet: tail bands then the head
  const tr=Math.atan2(36,98);
  r.push(R(6,poly(rell(108,28,56,15,tr,0,6.2832))),R(11,poly(rell(112,30,50,9,tr,0,6.2832))),R(5,poly(rell(118,32,40,4.4,tr,0,6.2832))));
  r.push(R(4,circ(160,47,13)),R(5,circ(164,43,5)));
  // ringed planet
  const px=42,py=62,rot=-.25;
  r.push(R(7,poly(rell(px,py,32,9,rot,0,6.2832))),R(9,circ(px,py,15)),R(8,band(px,py,15,56,61)));
  r.push(R(7,poly(rell(px,py,32,9,rot,0,3.1416).concat(rell(px,py,22,5,rot,3.1416,0)))));
  // crescent moon with craters
  r.push(R(11,crescent(28,160,24,40,152,20)));
  r.push(R(12,circ(14,160,3.6)),R(12,circ(22,176,3.2)));
  // baby stars in the nursery
  [[72,112,11,4],[104,126,12,11],[138,112,10,7],[118,150,10,10],[90,146,9,5],[150,136,9,6],[60,140,9,9]].forEach(([x,y,s,c])=>r.push(R(c,star(x,y,s,s*.45))));
  // little planets
  r.push(R(7,circ(180,140,7)),R(3,circ(178,70,6)));
  // twinkle stars
  [[10,12],[60,10],[30,100],[186,14],[190,40],[6,128],[100,188],[136,188],[194,104],[80,78],[120,70],[184,194],[60,192],[100,96],[176,116],[14,30]].forEach(([x,y],i)=>r.push(R([5,4,10,6][i%4],star(x,y,5.5,2.4))));
  add('cometnursery','Comet & Star Nursery','medium','space',['#1a1b4b','#5f3dc4','#f783ac','#ffd43b','#ffffff','#74c0fc','#ff922b','#b197fc','#20c997','#fcc2d7','#ffec99','#868e96'],r)})();

 // ===== 2026-11-05  Tide Pool Rocks (Hard, Nature) =====
 (function(){const r=[];
  // wavy seaweed strip
  const weed=(x0,y0,y1,w,amp)=>{const L=[],Rr=[];for(let y=y0;y<=y1;y+=4){const x=x0+amp*Math.sin((y-y0)/9);L.push([x-w/2,y]);Rr.push([x+w/2,y])}return poly(L.concat(Rr.reverse()))};
  // sky + clouds + sun
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(2,ell(40,18,36,10)),R(2,ell(130,12,40,11)),R(2,ell(180,22,28,9)));
  r.push(R(15,circ(168,36,13)));
  // sandy beach
  r.push(R(4,'M0,56Q50,48 100,58T200,52V200H0Z'));
  // big rock masses
  r.push(R(5,poly([[0,70],[55,62],[70,110],[48,150],[0,140]])));
  r.push(R(6,poly([[50,78],[95,68],[118,100],[100,148],[55,140]])));
  r.push(R(7,poly([[105,72],[155,60],[175,95],[160,145],[110,138]])));
  r.push(R(5,poly([[155,78],[200,70],[200,150],[168,148]])));
  r.push(R(6,poly([[20,140],[70,130],[90,170],[40,185],[8,168]])));
  r.push(R(7,poly([[120,140],[170,132],[190,170],[145,188],[110,168]])));
  // rock speckles (kept clear of pool centers)
  [[28,95],[42,120],[78,100],[98,128],[130,95],[148,105],[178,100],[60,155],[150,155]].forEach(([x,y],i)=>r.push(R([5,6,7][i%3],circ(x,y,5.5))));
  // three tide pools + reflections at pool edges (not under starfish)
  r.push(R(3,ell(70,118,28,16)),R(16,ell(55,110,9,4.5)),R(16,ell(85,124,8,3.5)));
  r.push(R(3,ell(145,118,26,15)),R(16,ell(132,110,9,4.5)),R(16,ell(158,124,7,3)));
  r.push(R(3,ell(100,168,34,18)),R(16,ell(82,160,10,4.5)),R(16,ell(120,160,9,4)));
  // foam edges
  [[48,106],[90,130],[120,106],[166,130],[76,154],[124,182]].forEach(([x,y])=>r.push(R(2,circ(x,y,4.2))));
  // starfish in pools
  r.push(R(10,star(68,118,14,6)));
  r.push(R(11,star(148,118,12,5.2)));
  r.push(R(10,star(100,170,13,5.5)));
  // 3 anemones: body + 5 round tentacles (big enough to keep labels)
  [[36,145,11],[174,145,11],[88,145,10]].forEach(([cx,cy,s],k)=>{
    const tc=k%2?11:12, bc=k%2?12:11;
    for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5;r.push(R(tc,circ(cx+s*.9*Math.cos(a),cy+s*.9*Math.sin(a),s*.4)))}
    r.push(R(bc,circ(cx,cy,s*.55)));
  });
  // seaweed
  r.push(R(8,weed(18,100,155,5.5,5)),R(9,weed(26,110,160,5,4)));
  r.push(R(8,weed(185,95,150,5.5,5)),R(9,weed(176,105,155,5,4)));
  r.push(R(8,weed(98,78,112,5,3)),R(9,weed(108,80,115,4.5,3)));
  // hermit crab (shell then body/legs)
  r.push(R(13,ell(48,178,14,10)));
  r.push(R(14,circ(58,174,5)));
  r.push(R(14,poly([[58,176],[72,170],[70,178],[58,180]])));
  [[40,186],[46,188],[52,186]].forEach(([x,y])=>r.push(R(14,ell(x,y,4,2.2))));
  // little crab
  r.push(R(14,ell(168,178,10,7)));
  // big white eyes (no tiny pupils — those misfilled on Chromium)
  r.push(R(2,circ(160,170,5)),R(2,circ(176,170,5)));
  r.push(R(14,poly([[158,176],[148,168],[150,174]])),R(14,poly([[178,176],[188,168],[186,174]])));
  // shells
  [[30,168],[80,188],[130,188],[190,160],[20,130],[112,148]].forEach(([x,y],i)=>r.push(R(13,ell(x,y,7+i%2,4.5))));
  r.push(R(2,ell(32,166,3.2,2.2)),R(2,ell(82,186,3.2,2.2)),R(2,ell(132,186,3.2,2.2)));
  // pebbles (clear of corner ledges)
  [[60,192],[100,192],[140,192],[42,192],[158,192],[95,100],[125,100],[55,88],[145,88],[180,130],[10,155]].forEach(([x,y],i)=>r.push(R([5,6,7,13][i%4],circ(x,y,3.8))));
  // bubbles in water
  [[58,112],[84,118],[136,112],[158,118],[86,162],[114,166],[100,150]].forEach(([x,y])=>r.push(R(2,circ(x,y,3.2))));
  // barnacles on rocks
  [[35,85],[65,90],[135,85],[160,90],[185,110],[45,135],[155,135]].forEach(([x,y],i)=>r.push(R([6,7,5][i%3],circ(x,y,3.6))));
  // kelp blades in bottom pool (away from starfish center)
  r.push(R(9,poly(rell(78,175,14,4.2,.4,0,6.2832))),R(8,poly(rell(122,176,13,4,-.3,0,6.2832))));
  // corner rock ledges
  r.push(R(5,poly([[0,180],[22,176],[26,200],[0,200]])),R(6,poly([[178,180],[200,176],[200,200],[174,200]])));
  add('tidepool','Tide Pool Rocks','hard','nature',['#a5d8ff','#ffffff','#339af0','#ffd8a8','#495057','#868e96','#adb5bd','#2b9348','#69db7c','#ff922b','#f783ac','#9775fa','#ffec99','#e03131','#ffd43b','#74c0fc'],r)})();

 // ===== 2026-11-05  Mermaid Tail Seashells (Easy, Fantasy) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  r.push(R(8,'M0,155Q60,142 110,155T200,148V200H0Z'));
  // mermaid tail: curved body from top-left down (NO face/torso)
  r.push(R(2,poly([[48,12],[100,8],[118,40],[112,90],[95,130],[68,148],[42,128],[38,80],[32,40]])));
  // big scale circles
  [[58,36],[80,30],[98,38],[55,58],[78,52],[100,60],[60,82],[82,76],[102,86],[68,108],[90,104]].forEach(([x,y],i)=>r.push(R(i%2?3:2,circ(x,y,12))));
  // fluke fin (wide mermaid fluke)
  r.push(R(4,poly([[55,140],[18,175],[40,168],[68,155],[95,168],[118,178],[90,145],[72,150]])));
  r.push(R(6,poly([[62,148],[42,165],[68,158],[92,165],[78,148]])));
  // seashells
  r.push(R(5,ell(158,62,30,24)),R(6,ell(158,62,14,11)));
  r.push(R(5,ell(155,140,26,20)),R(9,ell(155,140,12,9)));
  r.push(R(5,circ(36,172,17)),R(9,circ(40,168,7.5)));
  // pearls
  [[128,95],[142,108],[126,116]].forEach(([x,y])=>r.push(R(6,circ(x,y,6.5))));
  // starfish
  r.push(R(7,star(175,172,17,7.5)));
  // bubbles
  [[172,28],[188,48],[22,36]].forEach(([x,y])=>r.push(R(6,circ(x,y,6.5))));
  // sparkles
  [[16,16],[186,16]].forEach(([x,y])=>r.push(R(9,star(x,y,7.5,3.2))));
  add('mermaidtail','Mermaid Tail Seashells','easy','fantasy',['#b197fc','#20c997','#69db7c','#f783ac','#ffd8a8','#ffffff','#ff922b','#ffe066','#fcc2d7'],r)})();


 // ===== 2026-11-06  Aquarium Tunnel (Hard, Animals) =====
 (function(){const r=[];
  const weed=(x0,y0,y1,w,amp)=>{const L=[],Rr=[];for(let y=y0;y<=y1;y+=4){const x=x0+amp*Math.sin((y-y0)/10);L.push([x-w/2,y]);Rr.push([x+w/2,y])}return poly(L.concat(Rr.reverse()))};
  // deep water background
  r.push(R(1,rect(0,0,200,200)));
  // light rays from top
  r.push(R(2,poly([[40,0],[70,0],[55,70]])),R(2,poly([[90,0],[120,0],[105,80]])),R(2,poly([[140,0],[165,0],[152,65]])));
  // tunnel glass wash (big pale shape behind scene, not a covering rim)
  r.push(R(3,poly([[0,20],[30,5],[100,0],[170,5],[200,20],[200,40],[170,22],[100,14],[30,22],[0,40]])));
  // sand floor
  r.push(R(4,'M0,150Q50,140 100,152T200,145V200H0Z'));
  // sand ripples
  r.push(R(13,ell(50,170,40,8)),R(13,ell(140,175,45,9)),R(13,ell(100,188,55,7)));
  // big rock piles
  r.push(R(5,poly([[0,120],[45,110],[55,155],[30,170],[0,160]])));
  r.push(R(6,poly([[145,115],[200,105],[200,165],[170,175],[140,155]])));
  r.push(R(5,poly([[70,155],[100,148],[120,165],[95,180],[65,170]])));
  // rock speckles (kept clear of tunnel pillars at x<20 and x>180)
  [[28,138],[40,152],[158,132],[168,148],[85,162],[110,168]].forEach(([x,y],i)=>r.push(R([5,6][i%2],circ(x,y,5.5))));
  // left pink coral
  r.push(R(7,circ(32,100,14)));
  r.push(R(7,ell(22,85,8,14)),R(7,ell(42,82,8,15)),R(7,ell(32,78,9,12)));
  r.push(R(12,circ(22,72,6.2)),R(12,circ(44,68,6.2)),R(12,circ(32,64,6.2)));
  // right orange coral
  r.push(R(8,circ(170,105,13)));
  r.push(R(8,ell(160,88,7.5,13)),R(8,ell(180,86,7.5,14)),R(8,ell(170,82,8,12)));
  r.push(R(12,circ(160,76,5)),R(12,circ(180,74,5)),R(12,circ(170,72,5)));
  // center purple coral dome
  r.push(R(9,ell(100,130,28,18)));
  r.push(R(14,ell(100,128,14,8)));
  r.push(R(9,band(100,130,28,122,126)));
  // anemones (body + round tentacles)
  [[55,140,11],[145,142,11]].forEach(([cx,cy,s])=>{
    for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5;r.push(R(11,circ(cx+s*.95*Math.cos(a),cy+s*.95*Math.sin(a),s*.42)))}
    r.push(R(12,circ(cx,cy,s*.55)));
  });
  // seaweed (inward of pillars; below coral tips y~70)
  r.push(R(10,weed(28,100,148,6,5)),R(15,weed(40,108,152,5.5,4)));
  r.push(R(10,weed(172,100,150,6,5)),R(15,weed(160,108,155,5.5,4)));
  r.push(R(10,weed(75,100,145,5.5,4)),R(15,weed(125,105,148,5.5,4)));
  // yellow fish
  r.push(R(13,ell(70,70,22,14)));
  r.push(R(8,poly([[48,70],[32,58],[32,82]])));
  r.push(R(8,poly([[70,56],[78,48],[82,58]])));
  r.push(R(2,circ(82,66,4.6)));
  r.push(R(16,circ(83,66,2.4)));
  // teal fish (clear of striped fish above-right)
  r.push(R(15,ell(128,68,20,12)));
  r.push(R(10,poly([[148,68],[165,58],[165,78]])));
  r.push(R(10,poly([[128,56],[134,48],[138,58]])));
  r.push(R(2,circ(115,64,4.4)));
  r.push(R(16,circ(114,64,2.3)));
  // orange fish
  r.push(R(8,ell(100,100,18,11)));
  r.push(R(12,poly([[82,100],[66,90],[66,110]])));
  r.push(R(2,circ(110,96,4.2)));
  r.push(R(16,circ(111,96,2.2)));
  // small pink fish
  r.push(R(7,ell(50,50,12,8)));
  r.push(R(11,poly([[38,50],[26,42],[26,58]])));
  r.push(R(2,circ(56,47,3.6)));
  // blue striped fish (top-right, clear of teal fish)
  r.push(R(2,ell(155,32,13,8)));
  r.push(R(16,band(155,32,13,27,31)),R(16,band(155,32,13,34,38)));
  r.push(R(16,poly([[168,32],[178,26],[178,38]])));
  r.push(R(2,circ(147,29,3.5)));
  // starfish on sand
  r.push(R(8,star(45,175,14,6)));
  r.push(R(11,star(160,180,12,5.2)));
  r.push(R(12,star(100,185,11,4.8)));
  // shells
  [[25,185],[70,190],[130,192],[185,170],[15,160]].forEach(([x,y],i)=>r.push(R(13,ell(x,y,8+i%2,5))));
  r.push(R(2,ell(26,183,3.5,2.2)),R(2,ell(71,188,3.5,2.2)),R(2,ell(131,190,3.5,2.2)));
  // bubbles
  [[40,40],[60,30],[90,25],[120,35],[170,55],[85,85],[110,75],[40,110],[180,100],[95,55]].forEach(([x,y])=>r.push(R(2,circ(x,y,4))));
  // pebbles
  [[55,192],[85,195],[115,193],[145,190],[175,185],[35,195]].forEach(([x,y],i)=>r.push(R([5,6,13][i%3],circ(x,y,3.8))));
  // tunnel wall pillars + top rim (drawn last, keep clear of fish)
  r.push(R(3,poly([[0,0],[16,0],[20,200],[0,200]])));
  r.push(R(3,poly([[184,0],[200,0],[200,200],[180,200]])));
  r.push(R(3,poly([[16,0],[100,0],[184,0],[172,16],[100,8],[28,16]])));
  add('aquarium','Aquarium Tunnel','hard','animals',['#1c7ed6','#74c0fc','#e7f5ff','#ffec99','#868e96','#495057','#f783ac','#ff922b','#9775fa','#2b9348','#69db7c','#fcc2d7','#ffe066','#c08457','#20c997','#212529'],r)})();

 // ===== 2026-11-06  Crescent Moon & Stars (Easy, Space) =====
 (function(){const r=[];
  r.push(R(1,rect(0,0,200,200)));
  // soft nebula clouds
  r.push(R(6,poly(rell(50,50,40,18,.3,0,6.2832))));
  r.push(R(7,poly(rell(160,140,36,16,-.4,0,6.2832))));
  r.push(R(6,poly(rell(140,40,28,12,.5,0,6.2832))));
  // big crescent moon
  r.push(R(2,circ(68,105,50)));
  // craters only on the lit (left) face, clear of sky overlay at (95,90) r42
  r.push(R(8,circ(42,90,8)));
  r.push(R(8,circ(50,120,7)));
  r.push(R(8,ell(38,115,7.5,4.5)));
  r.push(R(8,circ(48,75,5.5)));
  // sky overlay makes the crescent
  r.push(R(1,circ(95,90,42)));
  // little planet (keep 10+ inside frame)
  r.push(R(5,circ(160,50,16)));
  r.push(R(4,band(160,50,16,43,49)));
  r.push(R(9,band(160,50,16,53,59)));
  // big stars (grown for visible@1x)
  [[155,105,13],[125,160,12],[35,35,11],[165,165,11],[28,155,10],[100,28,10],[178,115,9]].forEach(([x,y,s],i)=>r.push(R([3,4,9][i%3],star(x,y,s,s*.42))));
  // twinkle stars
  [[105,70],[120,120],[55,170],[175,40],[24,95]].forEach(([x,y])=>r.push(R(3,star(x,y,6.5,2.8))));
  // shooting star
  r.push(R(4,poly([[140,22],[178,14],[176,20]])));
  r.push(R(3,circ(140,22,5)));
  add('crescentmoon','Crescent Moon & Stars','easy','space',['#1b2459','#ffd43b','#ffffff','#74c0fc','#ff922b','#9775fa','#b197fc','#ffe8cc','#f783ac'],r)})();

 // ===== 2026-11-07  Fire Station Dog & Hose (Medium, Vehicles) =====
 (function(){const r=[];
  const rr=(x,y,w,h,q)=>`M${x+q},${y}H${x+w-q}Q${x+w},${y} ${x+w},${y+q}V${y+h-q}Q${x+w},${y+h} ${x+w-q},${y+h}H${x+q}Q${x},${y+h} ${x},${y+h-q}V${y+q}Q${x},${y} ${x+q},${y}Z`;
  // sky, sun, clouds
  r.push(R(1,rect(0,0,200,200)),R(3,circ(22,22,15)));
  r.push(R(2,ell(68,26,20,8)),R(2,ell(84,20,13,6)),R(2,ell(158,34,22,8)),R(2,ell(146,28,13,6)));
  // grass hill + road (stripes clear of foreground props)
  r.push(R(4,'M0,118Q50,100 100,116T200,108V150H0Z'));
  r.push(R(7,rect(0,148,200,52)));
  [[6,184],[54,184],[102,184],[150,184]].forEach(([x,y])=>r.push(R(2,rect(x,y,28,5))));
  // station building
  r.push(R(5,rect(28,52,118,100)));
  r.push(R(6,'M22,56L87,18L152,56Z'));
  r.push(R(8,rect(118,28,14,28)),R(2,ell(125,22,8,5)),R(2,ell(132,16,6,4)));
  // garage door + thick stripes + handle
  r.push(R(12,rect(42,88,60,64)));
  r.push(R(2,rect(46,100,52,6)),R(2,rect(46,116,52,6)),R(2,rect(46,132,52,6)));
  r.push(R(8,circ(94,118,3.6)));
  // side door (narrower, latch on left) + window with one big pane
  r.push(R(8,rect(108,96,24,56)),R(3,rect(112,120,7,12)));
  r.push(R(11,rect(108,60,28,28)),R(2,rect(112,64,20,16)));
  // flag pole + simple two-color flag
  r.push(R(8,rect(156,40,4,78)));
  r.push(R(5,poly([[160,42],[188,52],[160,62]])),R(2,poly([[160,52],[178,58],[160,62]])));
  // wall ladder
  r.push(R(8,rect(18,70,6,78)),R(8,rect(34,70,6,78)));
  [78,94,110,126].forEach(y=>r.push(R(12,rect(18,y,22,5))));
  // hydrant (far right, clear of dog body)
  r.push(R(5,rect(182,116,14,34)),R(6,rect(178,112,22,7)),R(6,rect(194,128,10,8)),R(6,circ(189,108,5.5)));
  // coiled hose: stacked disks (outer orange, road fill, inner orange, road center)
  r.push(R(10,circ(64,166,17)));
  r.push(R(7,circ(64,166,11)));
  r.push(R(10,circ(64,166,8)));
  r.push(R(7,circ(64,166,3.6)));
  r.push(R(8,rect(78,162,26,8)),R(6,circ(106,166,5)));
  // boots (far left) + helmet (between boots and hose)
  r.push(R(9,rr(8,162,16,22,3)),R(9,rr(28,162,16,22,3)),R(12,rect(8,176,16,5)),R(12,rect(28,176,16,5)));
  r.push(R(5,ell(48,176,11,6)),R(6,rect(40,172,16,5)),R(3,circ(48,168,3.2)));
  // dalmatian between door and hydrant: head left edge ~133 clears door at 132
  r.push(R(2,rect(138,158,7,16)),R(2,rect(150,158,7,16)),R(2,rect(160,158,7,16)),R(2,rect(170,158,7,16)));
  r.push(R(9,'M170,144L188,134L190,140L174,152Z'));
  r.push(R(2,ell(156,148,22,15)));
  r.push(R(2,circ(138,134,12)));
  r.push(R(9,ell(128,124,6,9)),R(9,ell(146,122,6,9)));
  r.push(R(2,ell(130,140,8,6)),R(9,circ(126,140,3.4)));
  r.push(R(2,circ(132,130,4.2)),R(2,circ(142,130,4.2)));
  [[148,142],[164,150],[156,154],[142,150],[168,142]].forEach(([x,y])=>r.push(R(9,circ(x,y,4))));
  // dog bowl left of dog
  r.push(R(10,ell(112,178,13,5)),R(5,ell(112,176,9,3.5)));
  // bucket under hydrant
  r.push(R(11,poly([[168,172],[186,172],[184,192],[170,192]])),R(8,rect(166,170,22,5)),R(12,ell(177,170,9,3)));
  add('firestation','Fire Station Dog & Hose','medium','vehicles',['#a5d8ff','#ffffff','#ffd43b','#69db7c','#e03131','#c92a2a','#495057','#8d5524','#212529','#ff922b','#4dabf7','#adb5bd'],r)})();

 // ===== 2026-11-08  Snow Day Sledding Hill (Hard, Holidays & Winter) =====
 (function(){const r=[];
  const sm=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
  const hy=x=>96+60*sm((x-30)/150), ha=x=>{const t=(x-30)/150;return (t<0||t>1)?0:Math.atan(60*6*t*(1-t)/150)};
  // local sled frame -> page (x forward downhill, y up negative)
  const T=(ox,oy,a)=>(x,y)=>[ox+x*Math.cos(a)-y*Math.sin(a),oy+x*Math.sin(a)+y*Math.cos(a)];
  const TP=(t,pts)=>poly(pts.map(p=>t(p[0],p[1])));
  const TC=(t,x,y,rad)=>{const p=t(x,y);return circ(f(p[0]),f(p[1]),rad)};
  const strip=(d,w,x0,x1)=>{const A=[],B=[];for(let x=x0;x<=x1;x+=5){A.push([x,hy(x)+d]);B.push([x,hy(x)+d+w])}return poly(A.concat(B.reverse()))};
  const pine=(x,by,s)=>{r.push(R(7,rect(x-4*s,by-6*s,8*s,12*s)));
   r.push(R(5,poly([[x,by-54*s],[x+12*s,by-36*s],[x-12*s,by-36*s]])),R(6,poly([[x,by-42*s],[x+16*s,by-20*s],[x-16*s,by-20*s]])),R(5,poly([[x,by-28*s],[x+20*s,by-4*s],[x-20*s,by-4*s]])))};
  const sled=(ox,col)=>{const a=ha(ox),t=T(ox,hy(ox),a);
   r.push(R(13,TP(t,[[-26,0],[22,0],[30,-9],[25,-9],[20,-4],[-26,-4]])));
   r.push(R(col,TP(t,[[-28,-4],[20,-4],[24,-13],[-28,-13]])));return t};
  // sky, sun, clouds
  r.push(R(1,rect(0,0,200,200)),R(4,circ(172,28,14)));
  r.push(R(2,ell(40,26,22,9)),R(2,ell(54,19,12,6)),R(2,ell(112,20,18,7)),R(2,ell(124,14,10,5)));
  // far hill with pines
  r.push(R(3,'M60,130Q130,70 200,92V200H60Z'));
  pine(118,100,.8);pine(182,94,.75);
  // big sledding hill, sled trails, front snow
  const H=[];for(let x=0;x<=200;x+=5)H.push([x,hy(x)]);H.push([200,200],[0,200]);
  r.push(R(2,poly(H)));
  r.push(R(3,strip(16,4.5,62,180)),R(3,strip(32,4.5,72,168)));
  r.push(R(3,'M0,178Q50,170 100,180T200,182V200H0Z'));
  // fence at the top of the hill (rails first, then posts with snow caps)
  r.push(R(7,rect(4,82,54,4.5)),R(7,rect(4,92,54,4.5)));
  [8,24,40,54].forEach(x=>{r.push(R(7,rect(x-3,78,7,26)))});
  [8,24,54].forEach(x=>r.push(R(2,ell(x+0.5,78,5,2.6))));
  // bluebird on a fence post
  r.push(R(10,poly([[34,74],[28,68],[30,77]])),R(10,ell(40,72,7.5,5.5)),R(9,ell(41,75,4.6,2.6)),R(10,circ(46,66,4.4)),R(4,poly([[50,64],[56,66],[50,68.5]])),R(13,circ(45.5,64.8,1.9)));
  // bear cub on a red sled
  {const t=sled(78,8);
   r.push(R(7,TC(t,-14,-50,4.4)),R(7,TC(t,2,-50,4.4)));
   r.push(R(7,poly(rell(...t(-8,-22),11,12,ha(78),0,2*Math.PI))));
   r.push(R(7,TC(t,-6,-40,10.5)));
   r.push(R(15,poly(rell(...t(-3,-36),5.6,4.2,ha(78),0,2*Math.PI))),R(13,TC(t,-3,-38.5,2.2)));
   r.push(R(13,TC(t,-11,-43,2)),R(13,TC(t,0,-43,2)));
   r.push(R(12,TP(t,[[-17,-46],[5,-46],[3,-54],[-6,-57],[-15,-54]])),R(2,TC(t,-6,-59,3.6)));
   r.push(R(10,TP(t,[[-17,-31],[5,-31],[5,-26.5],[-17,-26.5]])),R(10,TP(t,[[-17,-28],[-12,-28],[-16,-15],[-21,-16]])));
   r.push(R(11,TC(t,2,-17,3.8)),R(11,TC(t,-17,-15,3.8)));}
  // bunny on a blue sled
  {const t=sled(140,10),a=ha(140);
   r.push(R(14,poly(rell(...t(-12,-58),4.2,11,a-.2,0,2*Math.PI))),R(14,poly(rell(...t(0,-58),4.2,11,a+.2,0,2*Math.PI))));
   r.push(R(12,poly(rell(...t(-12,-59),2,7,a-.2,0,2*Math.PI))),R(12,poly(rell(...t(0,-59),2,7,a+.2,0,2*Math.PI))));
   r.push(R(14,poly(rell(...t(-8,-22),10,11,a,0,2*Math.PI))));
   r.push(R(14,TC(t,-6,-38,9.5)));
   r.push(R(13,TC(t,-10,-40,1.9)),R(13,TC(t,-1,-40,1.9)),R(12,TC(t,-5.5,-35,2.2)));
   r.push(R(9,TP(t,[[-16,-30],[4,-30],[4,-25.5],[-16,-25.5]])),R(9,TP(t,[[-16,-27],[-11,-27],[-15,-14],[-20,-15]])));
   r.push(R(8,TC(t,2,-16,3.6)),R(8,TC(t,-16,-14,3.6)));}
  // empty yellow sled waiting in front, with its rope
  r.push(R(7,'M60,146Q72,140 78,150L76,153Q70,145 62,150Z'));
  r.push(R(13,poly([[18,154],[62,154],[68,146],[64,146],[60,150],[18,150]])),R(4,rect(16,140,46,10)));
  // little snow fort of big blocks (front left)
  [0,1,2,3].forEach(i=>{r.push(R(i%2?14:2,rect(84+i*15,166,15,10)),R(i%2?2:14,rect(84+i*15,156,15,10)))});
  [0,2].forEach(i=>r.push(R(14,rect(84+i*15+15,147,15,9))));
  // snowball pile, bush with berries
  r.push(R(2,circ(160,185,7)),R(2,circ(176,185,7)),R(2,circ(168,173,7)));
  r.push(R(6,circ(18,182,9)),R(5,circ(33,180,8)),R(8,circ(14,178,2.4)),R(8,circ(22,186,2.4)),R(8,circ(34,176,2.4)));
  // falling snowflakes
  [[12,14],[12,56],[66,46],[80,30],[142,12],[148,44],[150,70],[96,124],[22,124],[50,120],[190,118],[110,190]].forEach(([x,y])=>r.push(R(2,star(x,y,6,2.8))));
  add('sledhill','Snow Day Sledding Hill','hard','holidays',['#a5d8ff','#ffffff','#d0ebff','#ffd43b','#2b9348','#69db7c','#8d5524','#e03131','#ff922b','#1c7ed6','#9775fa','#f783ac','#495057','#dee2e6','#e0b07a'],r)})();

 // ===== 2026-11-08  Seahorse (Medium, Animals) =====
 (function(){const r=[];
  // tapering tube along a polyline (perpendicular offsets)
  const tube=(P,w0,w1)=>{const A=[],B=[],n=P.length-1;P.forEach((p,i)=>{const q=P[Math.min(n,i+1)],o=P[Math.max(0,i-1)],dx=q[0]-o[0],dy=q[1]-o[1],L=Math.hypot(dx,dy)||1,w=(w0+(w1-w0)*i/n)/2;A.push([p[0]-dy/L*w,p[1]+dx/L*w]);B.push([p[0]+dy/L*w,p[1]-dx/L*w])});return poly(A.concat(B.reverse()))};
  const wave=(x,y0,y1,amp,ph)=>{const P=[];for(let y=y1;y>=y0;y-=6)P.push([x+amp*Math.sin(y/12+ph),y]);return P};
  // water, light rays
  r.push(R(1,rect(0,0,200,200)),R(2,'M0,0H200V40Q150,52 100,40T0,44Z'));
  r.push(R(2,poly([[118,40],[136,40],[176,150],[150,150]])),R(2,poly([[30,44],[44,44],[70,140],[52,140]])));
  // sand floor
  r.push(R(10,'M0,166Q50,154 100,166T200,160V200H0Z'));
  // seaweed (left and right)
  r.push(R(8,tube(wave(16,70,172,5,0),9,5)),R(9,tube(wave(30,96,172,4,2),8,4.5)),R(9,tube(wave(186,80,166,5,1),9,5)));
  // pink branching coral (right)
  r.push(R(6,tube([[166,168],[166,148],[166,126]],10,7)),R(6,tube([[166,150],[156,138],[150,124]],7,6)),R(6,tube([[167,146],[178,136],[180,120]],7,6)));
  r.push(R(6,circ(166,124,5)),R(6,circ(150,122,4.5)),R(6,circ(180,118,4.5)));
  // purple dome coral (left) with one wide stripe
  r.push(R(7,'M36,170A22,20 0 0,1 80,170Z'),R(14,'M44,170A14,12 0 0,1 72,170Z'));
  // rocks, shell, starfish
  r.push(R(13,ell(120,178,16,8)),R(13,ell(140,184,10,6)));
  r.push(R(11,'M88,186A12,12 0 0,1 112,186Z'),R(6,rect(96,186,8,5)));
  r.push(R(4,star(176,182,10,4.6)));
  // little fish
  r.push(R(4,poly([[170,58],[184,48],[184,68]])),R(4,ell(160,58,13,8)),R(5,rect(156,51,5,14)),R(12,circ(152,56,2.2)));
  r.push(R(14,poly([[164,100],[176,92],[176,108]])),R(14,ell(154,100,11,7)),R(12,circ(147,98,2)));
  // seahorse: dorsal fin behind, tail, belly, neck, head, snout
  r.push(R(6,poly(rell(124,96,7,15,.25,0,2*Math.PI))));
  const tail=[[108,120],[104,132],[100,140]];for(let i=0;i<=18;i++){const a=i/18*1.55*Math.PI,rr=12-6*i/18;tail.push([88+rr*Math.cos(a),144+rr*Math.sin(a)])}
  r.push(R(3,tube(tail,18,6)));
  r.push(R(3,poly(rell(98,72,12,19,-.35,0,2*Math.PI))));
  r.push(R(3,ell(106,104,19,25)));
  r.push(R(4,ell(96,106,9,20)));
  [[89,94],[88,104],[89,114]].forEach(([x,y])=>r.push(R(5,rect(x,y,14,4))));
  r.push(R(3,poly([[84,46],[62,48],[62,58],[84,58]])),R(5,rect(58,47,6,12)));
  r.push(R(5,poly([[88,40],[92,28],[98,38]])),R(5,poly([[98,40],[106,32],[106,44]])));
  r.push(R(3,ell(92,50,14,12)));
  r.push(R(11,circ(94,47,5.6)),R(12,circ(95,47,2.8)),R(6,circ(88,57,3.6)));
  [[104,72],[112,88],[116,112],[100,132]].forEach(([x,y])=>r.push(R(5,circ(x,y,3.4))));
  // sand pebbles
  [[14,186],[30,190],[60,188],[76,190],[150,192],[188,190]].forEach(([x,y],i)=>r.push(R(i%2?13:5,circ(x,y,3.4))));
  // bubbles from the snout and the fish
  [[52,40,4.2],[44,28,5],[54,16,4],[136,50,3.6],[130,38,4.4],[138,24,3.8]].forEach(([x,y,s])=>r.push(R(11,circ(x,y,s))));
  add('seahorse','Seahorse','medium','animals',['#4dabf7','#a5d8ff','#ff922b','#ffd43b','#e8590c','#f783ac','#9775fa','#2b9348','#69db7c','#ffd8a8','#ffffff','#343a40','#868e96','#20c997'],r)})();




})();

// Spring Landscape Rose Garden — vectorized from owner-supplied line art. See LICENSES.md.
(function(){
 const R=[{n:9,d:'M138.0,64.4L137.5,63.9L137.3,62.8L135.4,61.5L135.7,61.0L136.4,60.5L136.4,60.2L135.7,59.0L135.7,58.6L135.1,57.9L135.1,56.8L133.8,54.7L133.4,54.6L132.2,53.3L130.5,53.1L129.2,52.5L128.6,52.6L127.4,53.5L126.0,53.5L126.5,51.8L127.0,51.3L127.0,50.1L128.0,48.9L128.0,45.6L127.0,44.0L128.1,42.6L128.1,42.2L128.6,41.6L128.6,40.9L128.9,40.6L128.9,39.8L129.2,39.6L129.2,38.4L127.7,37.2L127.5,36.3L126.6,35.4L125.7,35.2L125.2,34.7L124.0,34.7L122.6,34.1L121.3,34.2L120.7,34.7L120.3,36.0L120.6,36.3L120.4,37.2L120.8,38.2L120.8,40.6L121.5,41.8L121.5,42.2L122.2,42.9L123.3,43.0L123.8,43.5L123.3,44.1L122.8,44.2L121.3,44.1L120.2,44.8L119.8,44.5L116.5,44.7L116.1,44.2L114.8,44.2L113.0,46.3L111.1,47.4L110.3,48.4L109.2,48.8L106.9,48.8L106.6,49.1L105.9,49.1L105.5,49.5L105.6,49.9L105.2,50.5L104.2,50.9L102.4,50.9L101.7,51.5L101.7,52.0L101.3,52.7L101.4,53.8L101.0,54.2L100.4,54.5L99.5,54.6L98.7,56.1L97.5,57.1L96.7,57.1L96.2,56.7L95.8,55.6L95.8,54.2L96.2,53.7L96.2,53.0L97.0,52.3L97.0,51.5L96.2,50.8L95.6,48.8L96.2,47.7L96.2,46.1L96.5,45.8L96.7,39.7L97.8,39.6L98.3,40.0L100.2,40.0L100.5,39.7L101.7,39.7L102.3,39.3L103.2,40.3L104.2,40.6L104.8,40.2L104.3,38.3L104.9,37.8L105.7,38.6L111.1,38.8L112.5,38.6L112.8,38.3L114.0,38.3L115.5,37.6L116.8,36.0L117.5,33.1L118.6,32.3L119.2,31.0L120.6,29.6L121.5,26.3L123.0,24.3L123.0,23.7L122.7,23.3L121.8,22.9L121.7,22.6L120.1,20.7L118.8,20.2L117.6,19.0L117.7,17.6L118.0,17.4L118.2,16.0L118.2,14.3L117.6,12.3L116.8,11.5L115.4,10.6L114.0,10.4L113.4,9.7L112.6,8.0L111.0,6.5L109.5,5.9L108.1,5.9L105.8,4.4L103.1,4.4L100.3,2.6L97.7,2.6L94.5,3.4L92.0,2.6L89.7,2.6L87.8,3.2L85.9,5.0L85.4,6.6L84.6,7.7L81.6,7.6L80.6,8.0L79.5,9.1L78.8,10.8L78.8,12.9L79.1,13.2L79.1,13.8L79.5,14.6L79.9,16.1L79.5,16.8L78.5,17.0L78.0,16.6L77.1,16.4L76.8,16.1L74.5,16.1L74.2,16.4L73.2,16.4L72.1,17.6L71.9,20.1L72.2,20.4L73.3,20.7L74.4,21.8L74.4,22.2L74.8,22.7L75.0,26.3L77.6,29.1L79.2,29.2L80.4,29.8L82.8,32.2L82.4,34.1L82.1,34.4L81.9,37.4L83.6,39.8L82.7,41.0L81.8,42.8L80.3,41.8L79.3,38.9L78.6,38.3L78.0,38.1L76.8,38.6L76.5,38.9L76.1,40.2L74.9,40.8L74.5,41.6L73.7,42.1L73.3,42.1L72.8,42.6L72.2,42.6L71.9,43.2L70.5,44.3L69.3,45.8L68.7,45.9L68.3,46.3L68.0,47.5L67.5,47.9L66.6,47.9L65.6,47.4L64.7,46.2L63.5,45.7L62.5,45.0L61.7,45.0L61.5,44.7L60.1,44.8L59.5,44.1L59.4,43.4L59.4,41.5L59.6,40.6L61.0,40.7L61.7,41.2L62.9,41.0L63.3,42.0L64.9,43.6L65.6,43.3L66.3,43.3L66.7,43.6L68.2,42.6L69.9,42.1L71.2,41.1L71.9,39.8L71.9,38.7L72.7,37.6L72.5,37.3L72.7,36.2L72.5,35.6L72.7,35.2L72.4,34.8L72.7,32.0L71.3,30.9L69.6,30.9L67.8,32.1L67.2,32.1L66.9,32.4L65.4,32.3L65.4,31.6L66.0,31.2L66.4,30.1L67.1,29.4L67.1,28.9L66.6,28.1L66.6,27.5L67.8,26.0L67.6,25.7L67.8,24.2L67.5,24.0L66.8,24.0L66.0,23.5L63.0,23.7L62.5,24.1L61.7,24.2L60.6,25.4L59.7,25.4L57.7,26.9L57.1,26.8L56.9,26.5L56.9,24.9L56.1,23.9L56.1,23.4L56.6,22.4L56.6,21.3L56.9,21.0L56.9,19.6L57.1,19.3L57.1,18.8L55.1,17.0L53.9,16.5L52.6,14.8L51.8,14.8L51.1,15.5L50.9,16.2L49.9,17.5L49.9,18.8L49.3,20.5L49.3,21.7L49.0,22.0L49.0,25.1L49.4,26.0L49.4,27.2L50.6,28.1L52.3,28.7L53.1,28.7L53.2,30.1L53.5,30.5L55.1,31.6L53.8,32.7L54.0,35.1L54.9,35.9L55.0,37.0L54.7,37.4L53.9,37.4L53.7,37.1L51.5,37.1L51.3,37.4L50.8,37.4L49.8,36.9L48.4,36.9L47.8,37.4L47.4,37.4L45.0,35.9L42.0,35.7L41.0,35.9L38.6,37.4L37.4,37.4L36.8,37.1L36.5,37.4L35.3,37.6L33.7,38.7L31.8,40.6L31.7,41.1L31.1,42.1L30.9,43.6L30.5,44.2L29.6,44.2L29.3,44.5L28.4,44.7L26.2,46.9L25.3,47.1L23.4,48.3L23.3,49.7L23.7,50.7L23.8,52.2L23.1,53.5L22.2,53.0L21.4,51.8L20.7,51.4L19.8,51.4L18.9,50.6L18.9,50.2L18.3,49.6L17.6,49.5L17.4,49.3L15.5,49.5L15.1,49.1L14.9,47.7L13.9,46.4L12.7,45.4L12.3,45.4L11.4,44.7L10.5,44.5L7.9,44.5L6.6,45.3L5.9,45.3L5.1,46.1L4.5,47.4L3.7,48.2L3.4,49.2L3.0,49.6L1.9,49.7L0.0,50.6L0.0,27.7L0.7,28.1L4.9,28.1L5.2,27.8L5.9,27.8L8.1,28.7L9.1,28.7L10.0,28.1L11.4,28.1L12.0,28.6L13.1,28.7L14.3,29.5L14.9,29.5L15.2,29.8L17.6,29.8L17.9,29.5L18.6,29.5L19.3,29.0L20.5,28.7L21.7,27.8L23.1,27.8L24.1,28.6L25.0,28.7L25.3,29.0L26.9,29.0L27.2,28.7L27.9,28.6L28.9,27.8L30.0,27.8L31.5,28.6L33.1,28.6L34.3,27.9L37.4,28.3L39.6,27.8L39.8,27.5L40.5,27.5L41.5,28.1L43.6,28.3L44.4,27.8L44.8,27.8L45.6,27.0L45.9,26.5L45.9,25.6L45.6,25.3L44.4,25.4L43.9,25.2L43.0,24.6L42.4,23.5L41.7,23.2L40.3,23.3L39.1,22.1L38.3,21.6L37.9,21.6L37.1,20.5L37.0,19.2L36.5,19.0L33.9,19.0L33.3,18.4L33.0,17.6L31.5,16.4L29.6,16.4L29.3,16.1L28.1,16.1L27.8,15.7L28.0,15.0L27.8,13.8L25.8,11.8L24.8,11.4L23.6,11.4L23.3,11.1L22.7,11.1L22.1,11.5L20.7,11.6L20.3,11.9L19.8,12.0L18.7,12.9L18.2,14.0L17.4,14.9L15.7,14.4L15.4,14.2L14.0,14.2L11.9,15.2L11.3,15.8L11.2,16.3L10.8,16.7L10.6,17.9L10.4,18.2L10.4,19.3L9.9,19.7L9.6,19.7L8.8,19.2L8.4,19.2L7.1,20.2L6.5,20.3L5.3,21.5L5.0,22.6L4.5,23.1L2.9,22.5L1.6,23.5L0.0,23.8L0.0,0.0L199.9,0.0L199.9,16.9L198.6,17.0L198.1,16.4L197.9,15.5L197.2,14.8L196.1,14.2L194.2,14.1L193.8,13.4L193.8,12.9L192.9,12.0L192.2,11.8L190.8,11.8L190.3,12.2L189.8,12.0L189.3,11.4L188.5,9.3L186.3,7.0L184.7,6.8L184.4,6.5L182.3,6.8L180.9,5.5L180.9,5.2L179.9,4.4L178.2,3.9L177.9,3.7L175.9,3.6L175.1,3.7L173.2,4.7L172.2,4.9L170.4,6.0L169.2,7.9L169.0,9.7L168.6,10.3L166.3,10.2L165.6,10.4L164.6,11.3L164.0,12.4L164.0,12.9L163.4,13.5L161.0,13.5L160.4,13.9L160.2,14.8L159.8,15.4L158.1,15.8L156.1,17.1L155.5,18.7L156.0,19.1L156.4,19.1L157.3,20.1L157.7,21.4L155.8,22.5L154.3,24.0L153.4,24.5L151.7,25.9L150.8,27.3L150.4,27.7L150.3,28.4L149.9,28.9L149.9,29.8L149.4,30.5L149.4,32.2L150.2,33.1L149.9,33.7L150.0,34.8L149.1,35.0L148.5,35.6L148.5,37.9L149.0,38.9L149.6,39.5L150.6,40.0L150.7,40.4L149.9,41.3L149.8,41.9L148.7,43.5L147.3,44.2L146.5,45.2L146.4,46.5L145.8,47.3L145.8,48.2L146.1,48.5L146.2,49.4L145.3,50.0L144.6,49.4L144.3,49.4L143.5,50.0L143.0,50.0L141.0,47.9L135.7,48.1L135.1,48.7L135.1,49.5L136.4,50.5L137.0,51.8L137.0,52.7L137.5,53.5L137.5,53.9L138.2,54.8L138.7,56.7L139.1,57.2L139.0,59.1L139.3,59.5L139.3,60.8L138.5,62.0L138.5,63.7ZM132.2,28.2L133.1,27.6L133.2,27.0L134.1,25.8L134.7,24.6L134.9,23.2L135.3,22.2L135.3,20.5L134.9,19.8L134.7,18.7L134.1,17.9L134.0,17.2L133.2,15.7L133.0,13.6L132.4,13.0L131.5,13.0L130.7,12.6L130.0,12.6L129.2,13.8L129.2,15.7L128.9,16.0L128.6,18.6L128.9,18.8L128.9,19.8L129.2,20.1L129.2,21.3L129.4,22.4L129.7,22.7L129.9,24.6L131.0,26.2L131.4,27.9ZM136.7,44.5L137.0,44.2L138.3,44.2L139.6,43.7L140.3,42.9L141.4,42.4L141.8,42.0L142.1,39.5L140.4,37.5L138.6,36.9L138.3,36.6L137.0,36.6L136.7,36.4L134.3,37.4L133.7,38.0L133.1,39.3L132.3,40.1L132.3,42.3L131.9,43.5L132.4,44.1L133.1,44.1L133.8,44.5Z'},{n:10,d:'M106.6,183.6L105.9,183.6L105.5,183.2L105.3,182.3L104.9,182.0L104.4,182.0L103.2,183.2L102.4,183.5L102.0,183.0L102.0,182.3L102.5,181.3L102.5,179.9L101.9,179.3L100.8,179.5L97.6,179.3L96.6,179.6L95.2,179.5L94.4,179.1L93.8,179.1L93.0,179.5L92.3,178.8L91.1,178.6L90.7,178.2L89.0,177.7L88.2,177.1L87.7,177.1L86.4,176.5L85.4,176.5L84.7,175.7L83.1,175.2L82.5,174.4L80.4,173.1L79.0,172.7L78.5,172.1L78.0,172.1L76.8,173.1L75.9,173.3L74.7,174.9L74.1,174.7L73.6,174.2L73.2,173.2L73.3,172.2L73.6,172.0L73.6,170.8L72.4,169.6L70.1,168.6L70.5,166.9L70.3,166.4L70.4,165.1L70.1,164.5L69.5,164.2L69.5,162.9L67.8,161.0L67.7,160.4L67.1,159.8L67.0,159.2L66.0,157.9L65.2,156.3L64.5,155.3L64.3,154.6L63.9,154.3L63.9,153.9L62.8,152.0L62.6,151.1L61.9,150.2L61.9,149.1L61.4,148.4L61.4,147.9L61.0,147.4L61.0,146.8L60.7,146.2L60.5,145.1L59.9,144.0L59.0,143.2L58.5,142.2L58.6,141.1L58.2,140.0L58.5,138.8L58.5,137.9L58.1,137.5L57.7,136.8L58.2,135.4L58.1,134.1L57.8,133.8L57.6,132.7L57.6,128.6L56.9,127.5L56.1,127.5L55.5,128.0L55.0,127.7L56.6,123.8L56.6,122.8L56.3,122.5L55.6,122.5L54.3,123.3L53.2,123.3L53.0,123.0L53.5,121.0L54.3,119.8L54.3,118.8L55.7,117.3L56.1,116.0L56.1,115.2L57.1,114.3L58.1,112.8L58.1,111.9L58.5,111.0L58.5,110.0L58.8,109.7L58.7,108.4L59.5,107.4L59.5,106.6L59.1,105.8L60.5,103.2L60.5,101.6L61.0,101.0L61.1,100.5L61.6,100.1L61.6,99.7L62.6,98.1L62.8,96.7L64.0,94.7L64.0,93.3L64.4,92.9L64.3,92.1L65.4,91.2L65.2,90.0L66.0,89.8L67.4,88.0L67.4,87.6L67.1,87.3L67.1,86.4L67.4,86.1L67.2,83.6L67.8,83.1L68.9,83.0L69.4,83.0L70.1,83.4L71.0,83.4L71.7,83.1L73.6,81.2L73.8,80.4L74.5,79.8L75.0,79.7L75.7,78.7L76.3,78.4L77.4,77.3L77.4,75.9L77.7,75.6L77.9,74.2L78.3,73.3L79.1,72.5L79.9,72.7L80.4,73.2L80.5,73.7L81.6,74.6L82.3,74.6L83.3,73.8L83.6,73.1L83.1,72.1L83.1,70.7L82.9,70.4L82.9,69.8L82.4,69.5L82.4,69.0L82.1,68.7L82.3,67.7L82.8,67.7L83.6,68.5L84.1,68.6L84.5,69.0L84.5,69.6L84.8,69.9L84.8,71.1L85.5,72.2L86.1,72.2L87.1,71.4L89.9,71.0L91.3,69.1L92.2,70.5L93.2,70.5L94.2,69.3L94.7,69.3L95.7,70.1L103.5,70.1L104.3,69.6L104.7,69.6L105.8,70.5L108.6,70.7L109.0,71.3L110.4,71.4L112.3,72.4L113.5,72.4L114.1,73.0L115.3,73.5L116.9,74.6L118.5,75.2L119.5,76.3L120.1,76.4L121.9,77.9L123.2,78.6L125.4,76.7L127.4,76.3L128.4,75.7L129.1,76.0L130.0,76.9L131.8,77.0L132.0,77.3L132.0,78.3L133.9,79.9L133.9,80.9L134.5,82.2L134.2,82.9L133.2,83.0L132.5,82.2L132.1,82.2L131.8,82.5L131.5,85.6L132.0,86.6L132.5,87.1L132.7,88.8L133.1,89.1L133.2,89.7L134.9,92.3L134.9,92.8L135.6,93.3L135.8,94.4L137.0,95.8L137.0,98.1L137.5,98.6L137.5,99.3L138.0,100.0L138.7,102.3L139.0,102.9L139.1,103.8L139.8,105.0L139.9,106.4L140.2,106.7L140.6,109.0L141.8,111.0L141.8,111.4L141.6,111.7L141.8,113.6L142.4,114.7L143.2,115.4L143.5,116.0L143.7,117.6L145.2,119.0L145.4,121.0L145.9,121.7L145.2,122.3L144.6,123.3L143.5,123.4L143.2,123.7L143.1,124.2L143.4,124.7L142.5,125.5L142.4,130.7L142.3,131.5L142.0,131.8L141.8,135.3L141.6,135.6L141.5,137.8L141.1,138.4L141.1,139.3L140.8,139.6L140.7,140.9L140.3,141.5L140.2,143.0L140.3,143.3L140.8,143.2L142.3,141.6L144.0,141.6L144.3,141.4L144.8,141.4L145.4,141.9L145.4,142.4L145.7,143.1L146.4,143.6L146.4,144.3L146.1,144.6L146.1,146.2L146.4,146.5L146.5,147.4L145.8,147.9L145.5,147.8L143.9,145.5L143.5,145.6L142.5,146.5L142.0,148.3L141.5,148.9L141.6,149.9L142.5,151.3L142.3,153.4L141.4,154.6L141.4,155.3L140.8,156.1L140.6,157.2L138.7,159.0L138.7,159.6L139.0,159.9L138.7,160.9L137.6,161.6L136.5,163.0L135.7,165.0L134.9,166.1L134.7,168.0L134.3,168.1L133.7,168.7L133.7,169.0L131.8,170.6L131.1,171.8L131.1,172.6L131.9,173.4L130.9,175.1L130.0,175.8L129.5,175.4L128.1,175.3L127.9,175.0L125.4,175.0L122.8,176.1L122.0,175.1L122.0,173.9L121.5,172.9L120.6,172.7L119.7,173.6L118.8,173.8L117.6,175.0L116.4,175.0L116.1,175.3L115.7,175.3L115.3,175.9L114.5,176.5L112.6,176.6L109.9,177.9L109.6,178.2L109.0,178.3L107.9,180.9L107.2,181.7L107.2,182.8ZM119.7,165.3L121.3,163.7L121.3,163.4L123.5,160.4L123.6,159.9L124.3,159.2L124.4,158.7L125.2,157.6L125.3,157.0L126.3,155.3L126.3,154.9L126.8,154.1L126.8,153.7L127.6,151.9L127.7,151.1L128.1,150.5L128.2,149.1L128.5,148.8L128.6,147.6L128.6,146.2L128.9,146.0L128.9,141.8L128.6,141.5L128.5,139.1L128.2,138.8L128.2,138.2L127.7,137.4L127.0,135.2L126.5,134.8L126.3,134.1L124.4,131.4L121.7,128.7L120.2,127.8L119.6,127.1L117.8,126.1L117.1,125.5L114.8,124.5L113.8,123.8L113.3,123.7L112.9,123.4L111.1,122.8L110.0,122.1L109.3,122.1L108.5,121.6L108.1,121.6L107.3,121.1L106.9,121.1L106.1,120.6L104.0,119.9L102.3,118.9L101.4,118.7L101.0,118.3L98.5,117.3L90.2,112.3L87.4,109.9L86.6,109.5L82.9,105.7L80.5,102.1L79.9,100.6L79.5,100.2L79.4,99.4L79.1,98.8L79.1,98.1L78.8,97.8L78.8,94.0L78.6,93.6L78.2,93.7L75.3,96.5L72.8,99.5L72.8,99.8L70.4,103.3L70.3,103.9L69.9,104.4L68.8,106.9L68.7,107.6L68.3,108.1L67.6,111.4L67.6,115.2L68.3,118.3L69.5,121.0L70.0,121.4L70.3,122.3L72.0,124.1L72.1,124.5L73.9,126.3L74.2,126.3L74.9,127.2L77.1,128.7L77.3,128.7L80.9,131.2L82.5,131.8L85.1,133.3L88.5,134.4L89.2,135.0L91.8,135.6L94.2,136.6L95.4,136.8L95.6,137.1L96.8,137.3L97.1,137.6L97.9,137.7L99.0,138.3L100.7,138.9L101.1,139.2L102.0,139.4L104.5,140.9L105.2,141.1L105.7,141.6L106.2,141.7L109.9,144.4L113.7,148.2L113.7,148.5L114.6,149.4L114.7,149.8L115.5,150.4L115.6,151.0L117.0,153.2L117.2,154.1L118.0,155.3L118.6,158.1L118.9,158.4L118.9,159.1L119.2,159.4L119.4,164.9ZM113.8,116.2L116.9,116.1L117.2,115.8L119.5,115.6L119.8,115.4L120.4,115.4L120.7,115.1L122.1,114.9L122.4,114.6L124.5,114.1L125.4,113.4L127.9,112.4L128.6,111.7L129.2,111.7L130.5,110.6L130.7,110.6L131.3,110.0L132.8,109.0L133.0,108.5L130.0,107.3L127.5,105.7L125.7,104.1L125.4,104.1L114.2,92.8L113.4,92.3L112.3,91.2L110.5,90.1L109.8,89.5L109.5,89.5L108.2,88.5L106.9,88.2L105.7,87.4L104.5,87.2L102.8,86.5L102.1,86.5L101.9,86.2L99.0,86.0L98.7,85.7L94.0,85.7L93.7,86.0L91.1,86.2L90.8,86.5L88.5,87.0L86.5,87.9L86.1,87.9L83.6,89.5L83.0,89.6L81.8,90.5L81.9,90.9L83.0,91.2L86.8,91.2L87.1,91.5L89.0,91.5L89.7,91.9L91.8,92.0L92.1,92.2L94.0,92.4L94.2,92.7L95.6,92.9L96.7,93.5L98.1,93.6L104.0,96.2L104.5,96.8L105.8,97.4L108.9,99.5L109.2,100.3L108.1,100.3L107.1,99.9L106.4,99.9L106.1,99.6L104.8,99.5L103.5,98.9L102.6,98.9L102.3,98.7L101.0,98.6L100.4,98.2L99.4,98.2L99.2,97.9L97.1,97.7L96.8,97.4L95.6,97.3L94.4,97.3L94.2,97.0L90.2,96.8L89.9,96.5L85.6,96.5L85.3,96.8L83.9,96.8L83.3,97.2L83.8,98.8L84.9,100.4L85.0,100.9L87.9,104.7L90.4,107.4L94.7,110.6L99.4,113.2L99.9,113.2L101.1,114.0L102.0,114.1L103.1,114.6L103.7,114.6L104.0,114.9L105.4,115.1L106.6,115.6L109.0,115.8L109.3,116.1ZM106.7,165.7L106.7,165.1L105.5,163.3L101.8,159.4L100.9,158.9L100.3,158.1L99.5,157.7L98.5,156.6L92.2,152.1L91.9,151.5L92.2,151.3L93.2,151.4L95.3,152.2L96.1,152.3L98.1,153.2L98.5,153.2L99.3,153.8L100.2,154.0L103.0,155.6L103.5,155.7L104.5,156.4L105.2,156.6L105.7,157.1L107.5,158.2L111.2,161.0L115.0,164.9L115.6,165.1L115.8,164.8L115.8,164.2L115.6,163.9L115.4,162.0L114.8,160.8L114.6,159.4L114.3,159.1L113.7,157.0L113.1,156.3L113.0,155.3L112.1,154.1L112.1,153.8L111.5,153.1L111.4,152.6L110.8,152.0L110.8,151.7L109.1,149.9L109.1,149.6L106.2,146.7L104.2,145.1L100.3,142.7L97.3,141.6L97.0,141.4L94.7,140.9L94.4,140.6L92.1,140.4L91.8,140.2L76.3,139.7L76.0,139.4L74.2,139.4L70.8,138.8L69.4,138.0L68.9,138.0L67.5,137.2L66.5,137.0L66.6,141.5L67.0,142.2L67.1,143.8L67.6,144.8L67.8,146.2L68.1,146.5L68.8,148.8L69.3,149.6L70.4,152.2L71.4,153.4L72.0,154.5L76.1,158.9L81.3,162.2L82.3,162.3L84.0,163.2L84.9,163.3L86.2,163.9L87.0,164.0L87.3,164.3L89.0,164.5L89.2,164.8L93.0,164.9L93.3,165.2L102.5,165.2L102.8,165.5Z'},{n:9,d:'M14.2,217.6L13.2,217.5L12.5,216.9L12.3,216.3L11.3,215.7L11.3,215.2L12.0,214.2L12.0,213.6L11.3,212.8L10.7,211.7L10.2,211.5L8.8,211.5L8.5,211.7L7.8,211.3L6.4,211.3L5.7,210.6L5.8,210.4L7.3,210.4L7.8,209.9L7.8,208.8L8.7,207.8L9.0,206.9L8.1,206.0L6.7,206.3L5.9,206.7L5.5,206.7L5.2,206.2L5.2,205.8L5.6,204.9L5.6,204.0L5.2,203.4L4.7,203.2L4.6,202.7L3.6,201.5L2.8,201.3L1.9,201.7L1.3,202.3L1.1,202.8L1.1,204.0L0.7,204.3L0.0,204.4L0.0,59.5L1.1,59.6L1.4,59.3L2.1,59.3L3.3,60.0L4.1,60.2L6.6,60.2L7.4,60.8L9.9,60.8L11.7,59.3L12.6,59.3L13.0,59.6L14.2,59.0L15.7,59.3L16.0,59.6L18.1,59.6L19.8,58.8L22.1,58.8L23.5,57.5L24.4,58.4L24.7,59.4L25.3,60.0L28.4,61.2L29.9,62.6L30.0,63.0L28.9,64.0L28.3,65.6L28.3,68.2L28.9,69.9L30.7,71.3L32.6,71.9L34.3,73.5L34.6,73.5L35.1,73.9L35.7,74.0L38.6,74.0L39.4,73.6L40.9,73.3L42.2,74.3L42.6,74.3L43.8,75.4L43.8,76.6L44.2,77.0L44.4,78.7L45.0,79.2L45.0,79.7L44.6,80.1L43.5,80.3L41.6,81.4L40.0,83.2L39.3,84.4L38.9,84.4L38.6,84.0L39.0,83.0L38.8,81.4L37.9,81.5L37.4,81.8L35.9,83.2L35.1,84.7L35.0,85.9L33.3,89.0L33.3,92.1L33.0,92.8L33.5,93.3L33.6,93.8L33.3,93.9L32.7,93.9L31.8,93.3L31.1,92.3L31.1,90.9L30.5,90.6L29.6,90.7L29.5,91.4L29.1,91.8L27.4,91.8L26.5,91.2L25.4,91.0L23.3,91.1L23.2,90.4L22.3,89.5L21.7,89.1L21.6,88.6L20.3,87.3L20.0,87.3L18.7,86.6L17.4,86.8L16.6,86.2L15.0,86.2L14.3,86.8L11.8,87.4L11.0,88.6L9.7,89.2L9.0,90.4L8.3,91.0L8.2,91.8L7.4,92.7L6.5,94.7L6.7,96.1L7.7,96.8L8.1,96.5L13.7,96.8L14.7,96.3L15.0,96.3L15.7,96.8L16.6,96.8L16.9,96.5L17.8,96.5L18.1,96.2L19.3,96.1L19.6,95.8L20.0,95.8L20.5,96.2L20.4,96.7L19.7,97.4L18.7,97.8L18.0,98.6L17.9,99.2L17.2,100.0L17.0,101.3L16.4,101.7L15.2,101.7L14.6,102.0L12.4,103.4L11.6,104.5L11.1,106.4L10.1,107.9L9.8,108.8L8.4,109.1L7.0,110.2L6.7,110.8L6.7,112.0L6.1,112.6L5.6,113.8L5.1,114.3L4.9,115.2L3.9,116.7L4.1,119.0L4.6,120.1L4.6,122.0L3.7,123.1L3.7,125.0L6.1,126.9L6.3,129.1L7.1,130.4L8.5,131.3L9.7,131.3L10.2,131.6L10.8,132.9L11.7,133.8L12.2,133.9L14.2,133.9L15.4,135.6L15.6,136.5L16.3,137.3L16.3,137.6L17.0,138.4L18.8,139.7L21.9,139.7L23.8,138.5L24.9,139.1L25.1,139.6L24.9,140.0L23.9,141.5L23.9,142.0L23.1,143.6L23.0,144.6L23.3,144.8L23.3,145.3L23.0,145.6L22.9,146.4L21.9,146.4L21.1,145.6L20.8,144.6L19.8,143.3L19.0,143.1L18.5,143.8L18.9,145.3L19.5,146.0L20.1,147.4L20.1,148.2L20.4,148.5L20.6,151.0L19.7,152.5L20.6,153.6L20.6,154.1L21.6,155.3L21.6,156.7L21.4,157.0L21.8,157.9L21.8,158.7L22.1,159.0L22.1,159.8L22.8,160.8L23.3,162.3L24.1,163.2L24.8,163.3L25.3,163.9L25.7,164.0L26.3,163.6L26.5,163.8L26.6,164.8L26.3,165.1L26.3,165.8L26.8,166.6L27.1,167.8L28.1,168.6L28.6,168.6L29.1,169.4L30.0,169.5L30.4,169.8L31.3,171.1L31.3,172.5L31.9,173.7L29.7,175.0L28.6,176.1L28.6,178.2L28.2,178.9L26.5,180.6L26.2,181.4L26.2,183.0L26.8,184.2L26.6,185.4L26.8,188.2L27.1,188.5L27.3,189.7L27.8,190.6L28.7,191.6L31.2,192.9L32.4,193.1L33.3,193.9L33.3,195.2L32.1,196.4L31.7,200.1L32.3,201.5L33.4,202.4L33.4,203.3L33.8,203.8L33.8,204.5L33.5,204.9L33.1,205.2L31.7,204.3L30.1,204.1L29.6,203.8L29.0,203.8L28.6,204.2L27.9,203.9L26.6,203.9L26.1,203.3L22.7,203.4L22.4,203.7L21.0,203.7L20.0,204.1L18.0,205.9L17.0,206.4L16.3,207.1L16.3,207.4L15.6,208.1L15.6,209.6L14.6,210.7L14.4,211.9L14.4,212.5L14.9,213.3L14.9,213.7L14.4,214.5L14.6,217.2ZM10.0,172.8L11.4,172.7L12.2,172.1L13.9,171.5L16.2,169.9L17.0,168.7L17.5,165.6L17.2,165.4L17.0,164.2L16.3,163.1L16.1,162.0L15.2,161.1L13.4,161.1L12.6,160.7L11.9,160.7L11.6,161.0L10.2,161.0L9.0,161.6L8.5,161.6L7.8,162.3L6.9,162.6L5.1,164.3L4.1,165.8L4.1,167.1L3.2,168.0L3.2,168.7L2.8,169.4L2.9,170.3L2.6,171.0L2.8,172.4L3.2,172.7ZM16.5,181.4L17.6,180.7L20.0,180.5L20.7,180.0L21.9,179.8L24.7,178.1L25.1,177.3L25.1,174.7L25.9,173.4L25.9,172.5L25.2,171.5L24.5,171.2L23.1,171.0L21.9,170.2L21.3,170.2L19.0,170.7L18.7,171.1L18.1,171.2L17.0,172.1L15.6,174.5L15.4,175.6L15.4,177.5L15.6,177.8L15.4,178.3L15.4,180.9L15.8,181.5Z'},{n:8,d:'M53.9,268.7L0.0,268.6L0.0,204.5L0.7,204.3L1.1,204.0L1.1,202.8L1.3,202.3L1.9,201.7L2.8,201.3L3.6,201.5L4.6,202.7L4.7,203.2L5.2,203.4L5.6,204.0L5.6,204.9L5.3,205.2L5.2,206.2L5.6,206.7L8.1,206.0L9.0,206.9L8.7,207.8L7.8,208.8L7.8,209.9L7.3,210.4L5.8,210.4L5.7,210.6L6.4,211.3L7.8,211.3L8.5,211.7L8.8,211.5L10.2,211.5L10.7,211.7L11.3,212.8L12.0,213.6L12.0,214.2L11.3,215.2L11.3,215.7L12.3,216.3L12.6,217.0L13.2,217.5L14.2,217.6L14.6,217.4L15.0,217.7L15.8,217.7L15.8,218.6L15.6,219.2L16.0,219.6L16.4,219.6L16.9,219.2L18.3,219.2L19.6,220.1L19.6,220.9L18.9,222.1L18.9,222.5L17.5,223.6L16.9,225.2L17.3,225.5L17.7,225.3L18.6,225.4L18.7,225.8L18.3,226.9L18.4,227.9L18.7,228.1L19.3,228.2L20.5,227.3L21.9,227.3L23.4,228.4L23.4,230.5L22.5,231.9L22.5,232.4L23.0,232.8L24.1,234.8L24.6,235.1L25.7,235.3L27.0,236.9L27.7,237.0L28.5,236.3L28.7,235.4L29.7,234.6L30.8,233.0L32.0,233.5L32.9,233.0L33.4,233.0L34.2,233.8L34.0,235.7L34.6,236.4L35.1,236.4L35.9,237.1L35.7,238.3L36.0,238.7L37.1,238.7L37.7,239.6L37.7,240.2L38.2,240.6L38.6,240.6L39.8,240.0L40.4,240.3L40.6,240.8L40.4,242.3L40.6,242.9L41.1,243.3L40.9,245.0L41.3,245.4L42.9,244.7L43.3,244.3L43.5,242.4L43.9,242.0L45.3,241.8L46.1,240.8L46.7,240.8L47.7,241.8L47.8,242.3L48.2,242.8L49.2,242.7L49.9,243.3L49.9,244.0L50.5,245.0L50.5,246.0L51.0,247.0L51.1,248.8L51.4,249.1L51.4,251.0L50.5,252.2L50.5,252.6L50.2,252.9L50.2,253.4L50.9,254.3L50.9,255.2L50.6,255.5L50.6,256.2L50.9,256.5L50.9,256.9L50.6,257.2L50.6,259.1L50.9,259.3L50.9,260.1L50.5,261.0L50.5,261.9L50.8,262.3L51.3,262.4L52.2,263.0L53.8,264.6L53.9,265.0L53.5,265.6L53.5,266.2L53.9,266.7L55.7,267.1L55.8,267.5L55.7,267.8L54.4,268.0Z'},{n:9,d:'M199.2,190.6L197.9,186.6L194.6,182.8L193.2,182.0L192.5,181.9L192.2,181.7L191.4,181.7L191.1,181.9L189.7,181.9L189.4,181.7L187.3,181.5L184.9,182.3L184.4,181.9L184.5,180.9L184.3,180.6L184.1,179.7L183.8,179.3L183.2,179.3L182.6,180.1L182.6,180.6L181.7,182.7L181.1,183.1L180.3,182.9L179.2,180.7L178.5,180.1L178.3,178.7L178.8,178.0L178.8,177.1L179.6,176.6L180.9,176.6L181.4,176.1L181.4,175.5L180.9,175.1L180.9,174.2L180.3,173.3L178.9,173.1L178.6,172.8L178.6,172.4L179.1,171.8L179.1,170.8L178.8,170.4L178.1,170.2L177.3,170.4L176.3,169.5L176.3,169.1L177.0,169.0L177.6,168.5L177.9,166.8L178.3,166.2L179.2,165.7L180.2,165.6L181.3,166.7L181.8,167.9L183.7,170.0L185.1,170.4L185.9,171.0L187.7,171.2L188.0,171.4L189.0,171.6L193.7,171.6L195.2,172.4L195.5,172.4L196.0,172.0L196.0,170.6L195.7,170.3L196.0,169.2L195.7,168.9L195.7,168.0L194.0,164.1L191.6,161.6L191.0,161.5L189.6,160.7L188.7,160.5L187.7,159.9L185.6,159.9L185.0,160.2L184.4,159.8L184.6,158.8L185.9,157.8L186.4,156.9L186.2,156.3L185.2,155.5L185.2,154.9L185.8,154.2L185.8,153.9L186.5,153.2L188.9,153.2L190.1,152.7L192.2,150.7L192.6,149.6L193.8,148.4L194.0,147.9L194.0,145.3L195.0,143.4L195.0,142.2L194.5,141.7L194.0,141.8L192.8,143.0L192.0,143.0L191.7,142.6L191.7,141.5L192.1,140.3L191.4,139.8L190.8,140.0L189.6,141.4L187.7,142.3L186.5,143.3L186.1,143.3L185.0,143.9L184.6,144.3L183.5,145.0L183.1,144.6L182.9,142.2L182.1,141.4L182.7,140.6L183.3,140.5L184.1,139.6L184.1,138.9L183.4,138.0L183.8,137.2L186.1,136.0L186.4,136.0L188.5,134.7L192.0,135.0L192.9,134.3L193.8,133.1L194.0,130.7L195.2,129.4L195.7,128.3L195.7,127.2L194.8,125.6L194.2,125.1L193.5,125.0L192.1,126.2L190.8,126.8L189.0,127.1L188.3,126.7L189.0,125.6L190.1,124.7L190.5,124.0L191.9,122.7L193.4,120.2L193.5,119.5L193.5,115.8L193.1,113.0L191.6,111.7L190.3,111.3L188.8,110.0L187.1,108.2L186.4,106.6L186.2,105.2L185.2,103.8L184.9,102.9L182.7,102.3L182.3,101.7L180.1,102.0L179.9,101.7L177.5,101.5L177.1,101.3L176.8,100.5L175.9,99.2L174.8,98.5L173.9,98.5L172.7,99.1L170.6,99.1L169.8,98.8L169.6,98.5L169.7,94.5L169.0,92.4L166.7,89.5L164.7,88.3L164.7,87.7L163.7,87.2L163.6,86.7L162.3,85.4L162.3,85.0L162.0,84.4L162.1,83.8L162.5,83.0L162.5,82.5L163.0,82.2L163.5,82.3L165.6,84.5L166.8,84.5L167.5,85.1L169.8,85.7L170.1,86.0L172.2,86.0L173.6,85.3L174.8,85.3L176.5,86.0L177.7,86.0L178.0,85.7L178.7,85.7L181.4,83.5L182.4,82.3L182.4,81.2L181.8,79.9L179.2,77.5L179.2,77.1L179.7,76.7L184.1,76.9L185.5,76.4L187.1,74.9L188.1,72.5L189.7,70.9L189.7,70.4L190.0,70.1L190.0,68.7L188.9,66.8L186.4,65.4L186.4,64.0L186.7,63.7L186.9,62.8L186.9,61.1L186.2,59.9L183.4,57.7L183.3,56.1L183.1,55.8L183.1,54.2L182.6,53.1L179.4,51.4L178.6,51.5L178.2,51.2L177.1,49.5L177.1,49.2L177.4,49.1L178.6,49.1L179.7,49.5L182.0,49.5L182.5,49.2L183.6,49.2L186.4,50.5L187.2,50.5L187.5,50.2L188.9,50.0L190.7,48.9L191.8,49.1L192.3,49.5L193.0,49.7L195.1,49.7L196.6,49.1L200.0,49.3L200.0,75.2L199.4,75.3L198.1,76.0L196.6,75.3L195.4,75.3L193.9,76.2L193.3,77.4L192.0,77.9L188.5,80.9L188.5,81.6L189.7,82.7L190.6,83.1L193.2,83.0L193.5,82.7L194.2,82.7L194.4,83.0L195.5,83.0L196.4,82.4L197.2,82.3L198.7,83.0L200.0,83.0L200.0,190.4Z'},{n:8,d:'M199.9,268.7L157.0,268.7L156.9,267.7L156.6,267.4L156.6,266.5L157.3,265.6L157.3,264.3L157.1,264.1L157.1,263.4L157.7,262.8L158.5,262.8L158.9,263.5L159.4,263.5L160.7,261.5L160.9,260.7L160.9,256.7L161.1,256.5L161.2,255.4L162.3,254.3L162.5,253.9L162.5,251.7L163.6,250.2L164.2,248.8L164.2,248.4L165.3,247.1L166.2,245.6L166.3,245.0L167.1,244.1L167.0,242.9L168.7,241.3L168.8,240.8L169.2,240.3L169.7,240.3L171.0,238.7L173.0,237.5L173.0,237.1L173.7,236.0L175.6,235.3L176.2,234.5L176.1,232.1L177.3,232.5L178.3,231.8L178.2,231.0L178.6,230.5L178.6,229.8L179.5,228.4L180.1,228.4L181.1,228.8L182.6,228.1L184.4,228.2L185.0,229.1L185.1,230.0L186.6,229.8L187.1,230.1L187.7,230.1L188.1,229.7L187.9,228.3L188.1,226.6L189.0,225.6L189.4,225.6L190.4,224.7L191.1,224.7L191.9,224.1L191.7,221.8L192.5,221.0L193.2,221.0L193.5,220.8L193.5,219.0L194.4,218.2L194.8,218.1L195.2,217.4L194.8,216.6L194.8,214.8L194.3,214.0L194.3,211.0L194.7,210.5L195.1,210.6L195.5,211.0L195.8,212.0L196.3,212.0L196.7,211.6L196.9,209.5L197.6,208.9L198.2,208.8L198.9,208.3L198.8,206.9L199.0,206.4L198.8,205.7L199.0,204.9L198.8,204.7L198.1,204.8L197.4,204.2L197.3,203.2L197.8,202.7L200.0,202.9Z'},{n:7,d:'M119.7,165.3L119.4,164.9L119.2,159.4L118.9,159.1L118.9,158.4L118.6,158.1L118.0,155.3L117.2,154.1L117.0,153.2L115.6,151.0L115.5,150.4L114.7,149.8L114.6,149.4L113.7,148.5L113.7,148.2L109.9,144.4L106.2,141.7L105.7,141.6L105.2,141.1L104.5,140.9L102.0,139.4L101.1,139.2L100.7,138.9L99.0,138.3L97.9,137.7L97.1,137.6L96.8,137.3L95.6,137.1L93.2,136.1L89.2,135.0L88.5,134.4L85.1,133.3L84.8,132.9L84.4,132.9L83.5,132.3L80.9,131.2L77.3,128.7L77.1,128.7L74.9,127.2L74.2,126.3L73.9,126.3L72.1,124.5L72.0,124.1L70.3,122.3L70.0,121.4L69.5,121.0L68.3,118.3L67.6,115.2L67.6,111.4L68.3,108.1L68.7,107.6L68.8,106.9L69.9,104.4L70.3,103.9L70.4,103.3L72.8,99.8L72.8,99.5L75.3,96.5L78.2,93.7L78.6,93.6L78.8,94.0L78.8,97.8L79.1,98.1L79.1,98.8L79.3,99.1L79.5,100.2L79.9,100.6L80.5,102.1L82.9,105.7L86.6,109.5L87.4,109.9L90.2,112.3L98.5,117.3L101.0,118.3L101.4,118.7L102.3,118.9L104.0,119.9L104.5,119.9L105.7,120.6L106.1,120.6L106.9,121.1L107.3,121.1L108.1,121.6L108.5,121.6L109.3,122.1L110.0,122.1L111.1,122.8L112.9,123.4L113.3,123.7L113.8,123.8L114.8,124.5L117.1,125.5L117.8,126.1L119.6,127.1L120.2,127.8L121.7,128.7L124.4,131.4L126.3,134.1L126.5,134.8L127.0,135.2L127.7,137.4L128.2,138.2L128.2,138.8L128.5,139.1L128.6,141.5L128.9,141.8L128.9,146.0L128.6,146.2L128.6,147.6L128.5,148.8L128.2,149.1L128.1,150.5L127.7,151.1L127.6,151.9L126.8,153.7L126.8,154.1L126.3,154.9L126.3,155.3L125.3,157.0L125.2,157.6L124.4,158.7L124.3,159.2L123.6,159.9L123.5,160.4L121.3,163.4L121.3,163.7Z'},{n:9,d:'M144.8,54.2L144.1,53.6L144.1,53.0L144.7,52.0L144.7,51.3L145.3,50.0L146.2,49.4L146.1,48.5L145.8,48.2L145.8,47.3L146.4,46.5L146.4,45.4L147.3,44.2L148.7,43.5L149.8,41.9L149.9,41.3L150.7,40.4L150.6,40.0L149.6,39.5L148.7,38.4L148.5,37.9L148.5,35.6L149.1,35.0L150.0,34.8L149.9,33.7L150.2,33.1L151.0,33.0L151.3,33.3L151.9,33.3L153.8,32.5L154.6,31.6L156.5,28.6L157.4,28.6L157.9,30.0L158.4,30.1L159.0,29.1L159.0,26.7L159.7,25.0L160.5,25.2L160.8,24.9L166.0,24.9L166.8,24.7L167.5,24.0L168.4,24.0L170.6,24.9L173.4,24.9L174.4,24.7L174.7,24.5L175.8,24.5L178.2,25.9L179.1,25.9L180.1,26.4L182.3,26.4L183.5,25.7L183.9,25.7L185.4,24.1L186.4,24.1L187.5,24.7L188.5,24.9L191.6,24.9L193.4,24.3L195.4,24.9L197.5,24.9L198.2,24.5L200.0,24.5L199.9,44.1L197.5,44.2L196.3,42.9L195.0,42.5L193.9,41.6L192.8,41.6L192.2,41.0L192.2,39.6L191.8,39.0L189.9,37.1L188.7,36.9L188.4,36.6L186.1,36.6L185.8,36.9L184.9,37.1L183.8,37.9L183.3,38.4L183.3,38.9L182.5,39.7L180.1,39.5L178.3,40.3L177.4,41.8L177.4,42.9L176.7,43.6L175.9,43.6L175.6,43.3L173.9,43.6L173.4,43.8L172.4,45.1L172.4,45.8L172.7,46.2L173.9,46.9L175.8,47.5L176.6,48.5L177.9,51.0L178.6,51.5L178.3,53.9L178.1,54.0L177.8,54.1L177.0,53.5L175.3,53.1L173.2,51.4L172.0,51.4L171.4,50.8L171.3,50.2L170.2,49.2L168.9,48.6L167.2,48.6L166.9,48.1L166.3,47.9L165.6,47.1L164.2,47.1L162.6,47.9L160.3,46.4L159.0,46.3L157.9,47.1L157.5,47.1L156.5,47.9L154.9,48.0L154.2,48.7L154.2,49.0L151.1,52.0L150.5,51.7L149.6,51.7L149.1,52.1L148.7,52.9L148.1,53.3L147.4,53.4L146.5,52.9L146.0,52.9Z'},{n:9,d:'M153.1,268.7L111.9,268.7L110.9,267.7L109.6,267.4L109.4,266.9L109.9,266.3L111.3,265.8L113.8,263.8L114.6,262.4L114.6,261.5L115.2,260.9L116.9,260.7L117.4,260.2L118.0,260.1L119.2,260.4L119.8,259.3L122.6,256.8L122.7,256.3L123.1,255.8L124.5,255.7L125.0,255.2L126.1,255.2L126.3,255.0L126.5,253.4L127.0,253.0L127.0,252.2L127.5,251.2L126.9,250.1L127.0,249.1L127.3,248.8L127.3,248.2L127.6,247.6L127.7,246.7L128.0,246.4L128.5,244.6L129.4,243.1L129.2,242.6L128.8,242.6L124.9,245.7L124.6,245.4L124.7,243.8L124.2,243.1L123.7,243.1L123.2,243.6L122.7,245.3L121.7,246.5L120.0,247.0L119.7,247.3L118.3,247.3L117.1,249.0L116.3,249.4L114.9,249.7L114.3,250.3L114.3,250.9L113.7,251.5L112.8,251.6L112.1,252.0L111.6,252.0L111.3,251.7L111.5,250.0L112.5,247.9L112.5,247.2L111.2,246.1L111.7,245.0L111.7,244.3L113.4,242.4L114.0,242.3L114.3,242.0L114.9,242.0L116.0,240.8L116.3,240.7L117.5,239.6L117.6,238.4L118.9,237.7L119.5,236.5L120.0,236.5L120.5,236.9L121.3,236.9L122.2,235.9L122.2,234.8L122.8,234.2L124.2,234.2L126.5,232.0L126.8,232.0L127.7,233.1L128.2,234.5L129.9,236.1L130.1,236.7L130.1,237.4L131.9,238.9L133.7,241.4L134.1,241.6L135.0,241.4L135.6,240.7L137.1,240.0L138.0,240.8L138.6,242.1L140.1,243.6L142.6,245.4L144.3,246.1L145.8,247.3L146.1,247.6L146.1,248.4L145.8,248.7L145.8,250.8L146.1,251.1L146.7,251.1L147.0,250.5L148.1,249.7L148.5,248.8L150.3,247.1L151.1,245.7L152.2,245.2L152.9,244.4L153.4,244.4L153.8,244.9L153.7,245.6L152.5,247.0L150.7,248.5L149.8,250.6L149.0,251.7L149.0,252.9L149.3,253.2L149.9,253.2L151.2,251.9L152.4,251.7L152.5,252.5L151.3,253.9L150.9,255.2L151.9,255.2L153.0,254.6L153.5,254.6L153.7,255.1L153.6,255.4L152.4,256.5L151.9,257.7L151.3,258.1L151.4,259.0L151.9,259.2L152.4,260.0L151.9,260.8L151.9,261.2L150.4,262.7L150.4,263.1L151.2,264.1L151.9,264.1L152.9,263.6L153.4,263.6L154.2,264.3L154.0,265.3L153.2,266.0L152.8,267.2Z'},{n:7,d:'M113.7,116.3L109.3,116.1L109.0,115.8L106.6,115.6L105.4,115.1L104.0,114.9L103.7,114.6L103.1,114.6L102.3,114.2L101.1,114.0L100.4,113.4L99.4,113.2L94.7,110.6L90.4,107.4L87.9,104.7L85.0,100.9L84.9,100.4L83.8,98.8L83.3,97.2L83.9,96.8L85.3,96.8L85.6,96.5L89.9,96.5L90.2,96.8L94.2,97.0L94.4,97.3L95.6,97.3L96.8,97.4L97.1,97.7L99.2,97.9L99.4,98.2L100.4,98.2L101.0,98.6L103.5,98.9L104.8,99.5L106.1,99.6L106.4,99.9L107.1,99.9L108.1,100.3L109.1,100.4L109.2,99.9L108.9,99.5L105.8,97.4L104.5,96.8L104.0,96.2L98.1,93.6L96.7,93.5L95.6,92.9L94.2,92.7L94.0,92.4L92.1,92.2L91.8,92.0L89.7,91.9L89.0,91.5L87.1,91.5L86.8,91.2L83.0,91.2L81.9,90.9L81.8,90.5L83.0,89.6L83.6,89.5L86.1,87.9L86.5,87.9L88.5,87.0L90.8,86.5L91.1,86.2L93.7,86.0L94.0,85.7L98.7,85.7L99.0,86.0L101.9,86.2L102.1,86.5L102.8,86.5L104.5,87.2L105.7,87.4L106.9,88.2L108.2,88.5L109.5,89.5L109.8,89.5L110.5,90.1L112.3,91.2L113.4,92.3L114.2,92.8L125.4,104.1L125.7,104.1L127.5,105.7L130.0,107.3L133.0,108.5L132.8,109.0L131.3,110.0L130.7,110.6L130.5,110.6L129.2,111.7L128.6,111.7L127.9,112.4L125.4,113.4L124.5,114.1L122.4,114.6L122.1,114.9L120.7,115.1L120.4,115.4L119.8,115.4L119.5,115.6L117.2,115.8L116.9,116.1L114.0,116.1Z'},{n:7,d:'M106.7,165.8L104.9,165.5L102.8,165.5L102.5,165.2L93.3,165.2L93.0,164.9L89.2,164.8L89.0,164.5L87.3,164.3L87.0,164.0L86.2,163.9L84.9,163.3L84.0,163.2L82.3,162.3L81.3,162.2L76.1,158.9L72.0,154.5L71.4,153.4L70.4,152.2L69.9,150.7L68.8,148.8L68.1,146.5L67.8,146.2L67.6,144.8L67.1,143.8L67.0,142.2L66.6,141.5L66.5,137.0L67.5,137.2L68.9,138.0L69.4,138.0L70.8,138.8L74.2,139.4L76.0,139.4L76.3,139.7L91.8,140.2L92.1,140.4L94.4,140.6L94.7,140.9L97.0,141.4L97.3,141.6L100.3,142.7L104.8,145.5L109.1,149.6L109.1,149.9L110.8,151.7L110.8,152.0L111.4,152.6L111.5,153.1L112.1,153.8L112.1,154.1L113.0,155.3L113.1,156.3L113.7,157.0L114.3,159.1L114.6,159.4L114.8,160.8L115.4,162.0L115.6,163.9L115.8,164.2L115.8,164.8L115.6,165.1L115.0,164.9L111.2,161.0L110.5,160.6L109.8,159.8L107.5,158.2L105.7,157.1L105.2,156.6L104.5,156.4L103.5,155.7L103.0,155.6L100.2,154.0L99.3,153.8L98.5,153.2L98.1,153.2L96.1,152.3L95.3,152.2L93.2,151.4L92.2,151.3L91.9,151.5L92.2,152.1L98.5,156.6L99.5,157.7L100.3,158.1L100.9,158.9L101.8,159.4L105.5,163.3L106.7,165.1Z'},{n:6,d:'M103.4,268.7L85.6,268.7L84.8,267.7L84.8,267.2L85.0,267.0L85.8,267.0L86.3,266.7L86.2,265.4L85.9,264.7L85.3,264.2L85.5,263.7L85.3,262.5L84.3,261.5L83.8,260.4L84.2,259.9L85.4,260.2L86.4,261.2L87.0,261.3L87.9,262.0L89.4,263.6L90.4,264.0L91.3,264.0L91.5,263.5L90.9,262.9L90.9,262.3L90.5,261.9L90.5,261.3L90.0,260.5L90.0,259.3L90.3,259.1L90.0,257.2L90.3,256.9L90.3,256.5L89.3,255.1L89.3,254.7L88.5,254.2L88.0,254.2L86.7,255.0L86.2,254.9L85.4,254.2L85.3,253.3L85.9,252.8L86.4,252.7L86.7,252.0L85.0,250.5L84.9,250.0L83.8,248.6L83.2,247.3L81.3,245.5L81.0,244.6L80.0,243.6L78.6,243.0L77.5,243.0L76.6,242.5L76.5,242.0L76.9,241.0L76.6,240.4L76.0,239.7L74.4,238.7L72.2,238.0L71.5,237.2L71.9,236.2L73.0,235.2L74.3,235.9L75.2,235.2L75.8,235.2L76.5,236.2L76.5,236.7L77.7,237.7L77.7,238.9L78.6,239.6L80.1,241.4L81.4,242.3L82.3,242.4L83.3,243.0L83.7,243.0L84.1,242.6L84.1,242.0L83.6,240.9L82.8,240.1L83.1,238.3L82.1,236.2L81.9,235.0L81.0,234.1L80.5,232.9L80.6,232.0L81.2,231.8L82.1,230.6L83.0,230.6L83.6,231.2L83.6,232.6L84.1,233.7L84.8,234.2L85.4,233.8L85.8,233.9L86.5,234.5L86.7,235.2L87.9,236.7L87.9,238.8L87.4,239.8L87.4,240.9L87.9,242.3L89.2,243.5L89.7,243.5L90.4,243.0L91.2,243.0L91.5,243.4L91.5,243.8L91.0,244.6L91.2,244.8L91.0,246.0L91.2,246.7L91.7,247.1L91.7,247.6L92.0,247.9L92.0,249.8L92.2,251.0L92.5,251.3L92.5,251.7L92.9,252.0L93.8,252.0L94.5,251.5L94.8,251.0L95.0,249.3L95.5,248.4L94.9,246.9L94.9,244.1L95.3,243.2L94.3,241.7L94.1,240.3L93.8,240.0L93.6,239.1L91.7,237.4L91.7,237.0L92.2,236.2L92.0,233.3L91.5,232.6L91.7,230.0L91.2,229.2L91.2,228.8L90.5,227.9L90.5,226.5L89.8,224.5L88.8,223.0L88.8,221.5L88.2,221.0L87.4,220.8L86.7,220.2L86.6,219.7L86.1,219.1L86.2,217.8L87.5,216.5L88.6,215.6L89.1,215.4L90.0,216.3L90.8,217.8L91.6,218.7L93.3,218.7L94.4,220.1L95.0,220.2L95.8,219.2L96.0,217.2L97.6,215.8L98.7,214.0L99.9,213.0L99.9,212.6L99.5,212.2L99.5,211.4L99.8,210.9L102.1,210.2L102.8,210.5L103.3,211.2L102.6,212.4L101.9,212.7L101.4,213.1L101.0,214.6L99.1,215.8L98.8,217.2L97.9,218.1L97.9,218.6L98.7,219.4L98.2,220.1L97.3,220.5L96.8,221.2L97.2,222.1L97.0,222.8L96.5,223.3L96.5,224.2L97.0,225.3L96.2,226.6L95.5,227.4L95.5,228.0L95.8,228.3L95.8,230.5L96.2,231.5L96.0,233.3L96.2,233.6L96.2,234.1L97.2,235.2L97.2,237.1L97.4,237.5L97.2,237.9L97.2,239.6L97.9,240.9L97.9,241.4L99.1,242.6L99.1,243.4L98.7,243.9L98.7,244.7L99.0,244.9L99.4,245.2L100.2,245.2L100.5,244.9L100.9,244.9L101.4,244.4L101.7,243.8L101.7,242.6L102.6,240.9L103.1,239.1L104.1,237.9L104.1,235.5L104.7,234.9L104.8,234.4L105.9,233.2L106.4,232.2L107.5,231.2L107.7,230.3L108.1,229.5L108.1,228.1L108.8,227.3L108.9,226.0L109.5,225.3L110.2,225.2L110.4,226.3L110.8,226.7L111.6,225.9L112.7,225.3L113.3,225.4L113.0,226.4L112.2,227.1L112.0,227.9L110.4,228.9L109.8,230.0L109.6,231.2L108.2,231.9L107.9,233.3L107.2,234.4L107.2,235.1L106.7,235.5L106.6,236.0L107.0,236.8L106.4,237.8L106.5,239.1L105.9,239.8L106.2,240.9L106.0,242.2L106.5,242.5L106.5,243.1L106.3,244.0L105.5,245.3L105.5,245.8L104.6,246.7L104.6,247.4L104.3,247.6L104.3,248.6L103.9,249.3L103.9,250.2L103.4,251.3L103.4,252.2L103.1,252.5L103.1,254.3L103.4,254.6L103.4,255.2L104.5,257.1L105.3,256.9L105.6,255.6L105.9,255.4L106.7,256.2L107.5,256.6L107.9,257.3L107.1,259.2L106.5,260.1L106.4,260.7L105.8,260.9L105.8,261.9L104.8,263.4L104.8,264.8L104.2,265.2L104.2,265.9L103.4,267.7Z'},{n:10,d:'M182.3,26.4L180.1,26.4L179.1,25.9L178.2,25.9L175.8,24.5L174.7,24.5L174.4,24.7L173.4,24.9L170.6,24.9L168.4,24.0L167.5,24.0L166.8,24.7L166.0,24.9L160.8,24.9L160.5,25.2L160.1,25.2L159.5,24.6L159.5,22.7L159.2,22.1L157.6,21.3L157.3,20.1L156.4,19.1L155.8,19.0L155.5,18.7L155.5,18.3L155.8,17.5L156.7,16.6L157.3,16.5L158.1,15.8L159.8,15.4L160.6,13.7L161.0,13.5L163.4,13.5L164.0,12.9L164.0,12.4L164.6,11.3L165.6,10.4L166.3,10.2L168.6,10.3L169.0,9.7L169.0,8.6L169.7,7.0L170.1,6.2L171.3,5.3L171.9,5.2L172.7,4.7L173.2,4.7L175.1,3.7L177.9,3.7L180.6,4.9L182.3,6.8L184.4,6.5L184.7,6.8L186.3,7.0L188.5,9.3L189.3,11.4L189.8,12.0L190.2,12.2L190.8,11.8L192.9,12.0L193.8,12.9L193.8,13.4L194.2,14.1L196.1,14.2L197.9,15.5L198.1,16.4L198.6,17.0L200.0,16.9L199.9,24.5L198.2,24.5L197.5,24.9L195.4,24.9L193.4,24.3L191.6,24.9L188.5,24.9L187.5,24.7L186.4,24.1L185.4,24.1L183.9,25.7L183.5,25.7Z'},{n:1,d:'M150.7,222.4L148.4,222.2L147.5,221.4L147.4,220.6L146.2,220.1L145.5,219.4L143.4,219.4L143.0,219.7L142.4,219.8L141.4,218.8L140.9,218.6L140.2,219.0L139.8,219.7L139.8,220.3L139.0,220.8L138.6,220.8L138.0,220.2L137.3,218.3L136.5,217.6L136.0,217.7L134.6,218.8L134.3,218.8L133.8,219.2L133.1,219.2L132.0,219.8L131.7,220.4L131.0,220.8L130.1,222.2L129.5,222.2L128.3,221.3L127.7,221.3L126.4,222.0L125.5,221.9L125.1,221.2L125.1,219.5L126.0,218.7L125.6,217.2L126.4,216.5L126.8,215.9L126.8,214.9L128.5,213.6L128.5,213.1L128.9,212.6L130.1,212.1L131.9,210.1L132.4,210.1L133.4,210.8L134.0,210.8L135.0,210.4L137.3,210.4L138.6,209.8L143.1,209.6L144.6,208.9L145.3,208.9L145.5,208.5L145.3,207.9L144.2,207.1L142.6,206.5L141.6,205.5L142.2,204.8L142.9,204.8L143.6,205.3L144.8,205.3L145.8,204.8L147.6,204.6L149.3,203.9L150.5,203.9L151.3,204.3L153.9,204.1L156.8,200.9L158.3,199.9L158.5,199.0L159.6,197.4L160.3,197.5L161.4,197.1L164.7,193.7L165.1,193.5L165.6,194.1L166.2,194.1L166.9,193.7L167.0,193.2L167.6,192.7L168.7,192.9L169.2,192.5L170.0,192.7L171.0,192.2L171.6,192.2L172.2,192.9L172.8,192.9L173.0,192.7L173.0,191.8L172.4,190.6L172.5,189.5L174.7,188.1L175.4,187.0L175.4,186.4L176.3,185.5L177.3,185.5L178.3,186.6L178.3,187.0L178.9,187.7L178.8,188.4L178.5,188.9L177.7,189.3L176.8,190.2L176.7,190.7L176.3,191.3L175.0,192.3L174.5,193.3L174.7,195.3L174.2,195.6L174.0,196.8L172.1,198.5L171.8,199.5L170.9,200.5L170.8,201.0L169.2,202.3L169.0,203.1L167.9,204.1L167.8,205.4L167.5,205.7L167.1,207.7L165.6,208.7L164.3,209.1L163.4,210.1L161.0,210.8L160.2,212.1L159.5,212.7L159.2,213.6L158.7,214.1L157.9,214.8L157.0,214.8L156.6,215.2L156.3,215.7L156.6,217.4L157.4,218.2L157.7,218.2L158.2,219.1L157.8,219.5L156.5,220.1L155.7,220.8L154.8,220.8L154.5,220.6L152.9,220.6L151.5,221.4Z'},{n:9,d:'M167.0,242.9L166.0,242.3L165.3,242.5L163.9,242.3L162.5,241.5L161.8,240.6L161.3,240.4L161.3,240.1L161.8,239.3L163.0,240.0L163.6,239.8L164.1,239.2L165.2,237.4L165.4,236.2L166.9,234.5L167.5,233.1L167.5,232.4L168.3,231.2L168.3,227.7L167.8,226.6L167.8,225.3L167.1,224.0L167.1,223.3L167.4,222.9L168.6,223.0L170.8,224.4L173.6,225.3L174.4,225.9L175.8,226.0L177.2,226.8L178.0,226.5L178.4,226.1L178.5,224.8L179.2,224.1L179.5,223.5L179.5,222.1L180.0,221.4L180.0,219.3L179.7,219.0L180.0,217.2L179.7,216.9L179.5,214.9L178.5,213.7L178.5,213.2L177.6,212.4L177.4,211.4L177.0,211.0L176.5,211.0L175.6,209.8L174.4,209.6L172.4,208.8L171.5,208.7L171.2,208.4L168.7,208.4L167.1,207.7L167.5,205.7L167.8,205.4L167.9,204.1L169.0,203.1L169.2,202.3L170.8,201.0L170.9,200.5L171.8,199.5L172.1,198.5L174.0,196.8L174.2,195.6L174.7,195.3L174.5,193.3L175.0,192.3L176.3,191.3L176.7,190.7L176.8,190.2L178.3,188.9L178.6,189.0L179.5,190.5L179.2,190.9L179.2,191.8L179.9,192.4L180.6,192.4L181.5,192.0L183.9,192.0L184.7,192.4L185.3,192.4L187.5,193.4L191.7,193.2L192.8,192.6L194.0,192.6L195.2,191.5L196.3,191.5L197.3,190.9L198.6,190.9L199.3,190.5L199.9,190.5L200.0,202.8L198.8,202.9L197.8,202.7L196.4,204.0L196.4,204.5L195.2,205.6L195.0,206.9L194.6,207.6L193.7,208.1L192.8,208.1L191.9,209.0L191.9,209.6L190.5,210.7L189.9,211.7L189.6,211.8L189.1,211.5L188.2,211.4L187.6,211.9L187.2,212.7L186.4,213.6L186.2,215.2L187.3,216.3L187.3,216.9L189.0,218.2L188.3,220.7L187.7,221.3L186.2,221.0L184.9,222.0L183.8,221.9L183.0,222.6L182.3,222.5L180.9,223.8L180.7,225.0L181.2,225.7L181.4,226.6L181.8,227.0L181.7,228.5L181.1,228.8L180.1,228.4L179.5,228.4L178.6,229.8L178.6,230.5L178.2,231.2L176.6,231.1L176.1,231.2L175.9,231.8L176.2,232.6L176.2,234.5L175.6,235.3L173.7,236.0L173.0,237.1L173.0,237.5L171.0,238.7L169.7,240.3L169.2,240.3L168.8,240.8L168.7,241.3ZM189.6,208.6L190.5,207.5L190.5,206.4L190.9,205.4L190.9,204.3L190.7,204.0L190.9,202.8L190.7,202.5L190.5,200.5L190.2,200.2L189.7,198.7L188.5,197.7L187.3,196.0L186.6,195.4L184.9,194.8L181.1,194.8L180.0,195.3L178.9,195.3L177.9,194.8L176.5,194.8L175.9,195.5L175.9,196.4L176.6,197.6L176.8,198.5L176.8,201.6L177.9,202.7L178.0,203.2L178.6,203.9L181.1,205.3L182.3,205.5L183.7,206.3L186.1,206.5L186.5,207.0L187.0,207.0L188.1,207.6L189.1,208.7Z'},{n:4,d:'M105.1,257.1L104.5,257.1L104.1,256.7L103.8,255.6L103.4,255.2L103.4,254.6L103.1,254.3L103.1,252.5L103.4,252.2L103.4,251.3L103.9,250.2L103.9,249.3L104.3,248.6L104.6,246.7L105.5,245.8L105.5,245.3L106.3,244.0L106.5,242.5L106.0,242.2L106.2,240.9L105.9,239.8L106.5,239.1L106.4,237.8L107.0,236.8L106.6,236.0L106.7,235.5L107.2,235.1L107.2,234.4L107.9,233.3L108.1,232.1L109.6,231.2L109.8,230.0L110.4,228.9L112.0,227.9L112.2,227.1L113.0,226.4L113.3,225.3L114.6,223.9L117.5,222.9L118.6,221.8L119.9,221.9L121.0,221.3L120.8,219.9L121.1,219.4L122.2,219.4L123.3,218.0L124.5,217.2L125.5,217.1L126.0,218.3L126.0,218.7L125.1,219.5L125.1,221.2L125.5,221.9L126.4,222.0L127.1,221.5L128.3,221.3L129.5,222.2L130.1,222.2L131.7,223.2L132.4,223.2L133.1,222.7L133.8,223.0L136.2,223.2L138.3,224.2L141.8,226.9L142.8,227.3L144.1,228.6L145.3,229.3L145.2,231.2L143.7,233.3L143.5,234.3L142.3,235.4L141.9,236.3L141.0,236.5L140.0,237.6L139.5,237.7L138.0,238.6L137.1,240.0L136.3,240.3L134.5,241.6L133.7,241.4L131.9,238.9L130.1,237.4L130.1,236.7L129.9,236.1L128.2,234.5L127.7,233.1L126.8,232.0L126.5,232.0L124.2,234.2L122.8,234.2L122.2,234.8L122.2,235.9L121.7,236.5L121.3,236.9L120.5,236.9L120.0,236.5L119.5,236.5L119.2,237.0L119.2,237.4L118.4,238.1L117.6,238.4L117.5,239.6L116.3,240.7L116.0,240.8L114.9,242.0L114.3,242.0L113.0,242.7L111.7,244.3L111.7,245.0L111.4,245.9L111.1,246.1L110.2,246.1L109.6,246.7L109.6,247.9L108.9,249.1L108.9,249.6L109.1,249.9L109.1,251.9L109.4,253.3L108.0,254.5L107.6,254.5L106.9,253.8L106.6,253.8L106.3,254.1L106.0,255.3L105.6,255.6L105.5,256.5Z'},{n:10,d:'M17.6,29.8L15.2,29.8L14.9,29.5L14.3,29.5L13.1,28.7L12.0,28.6L11.4,28.1L10.0,28.1L9.1,28.7L7.4,28.6L5.9,27.8L5.2,27.8L4.9,28.1L0.7,28.1L0.0,27.7L0.0,23.9L1.6,23.5L2.9,22.5L4.5,23.1L5.0,22.6L5.0,22.2L5.7,21.1L6.6,20.2L7.1,20.2L8.4,19.2L8.8,19.2L9.6,19.7L9.9,19.7L10.4,19.3L10.4,18.2L10.6,17.9L10.8,16.7L11.2,16.3L11.3,15.8L11.9,15.2L14.0,14.2L15.4,14.2L15.7,14.4L17.4,14.9L18.2,14.0L18.7,12.9L19.8,12.0L20.3,11.9L20.7,11.6L22.1,11.5L22.7,11.1L23.3,11.1L23.6,11.4L24.8,11.4L25.8,11.8L27.8,13.8L28.0,14.3L27.8,15.7L28.1,16.1L29.3,16.1L29.6,16.4L31.5,16.4L33.0,17.6L33.3,18.4L33.9,19.0L36.5,19.0L37.0,19.2L37.1,20.5L37.9,21.6L38.3,21.6L39.1,22.1L40.3,23.3L42.0,23.3L42.5,23.6L43.0,24.6L43.9,25.2L44.4,25.4L45.6,25.3L45.9,25.6L45.9,26.5L45.6,27.0L44.8,27.8L44.4,27.8L43.6,28.3L41.5,28.1L40.5,27.5L39.8,27.5L39.6,27.8L37.4,28.3L34.3,27.9L33.1,28.6L31.5,28.6L30.0,27.8L28.9,27.8L27.9,28.6L27.2,28.7L26.9,29.0L25.3,29.0L25.0,28.7L24.1,28.6L23.1,27.8L21.7,27.8L20.5,28.7L19.3,29.0L18.6,29.5L17.9,29.5Z'},{n:8,d:'M85.5,268.7L53.9,268.7L54.4,268.0L55.7,267.8L55.8,267.5L55.7,267.1L55.3,266.9L54.0,266.8L53.5,266.2L53.5,265.6L53.9,265.0L53.8,264.6L52.2,263.0L51.3,262.4L50.8,262.3L50.5,261.9L50.5,261.0L50.9,260.1L50.9,259.3L50.6,259.1L50.6,257.2L50.9,256.9L50.6,255.5L50.9,255.2L50.9,254.3L50.2,253.4L50.2,252.9L50.5,252.6L50.5,252.2L51.4,251.0L51.4,249.1L51.1,248.8L51.0,247.0L50.5,246.0L50.5,245.0L49.9,244.0L49.9,243.3L49.2,242.6L49.4,242.3L49.3,241.5L49.6,241.2L50.0,241.3L51.4,242.6L52.8,245.0L53.2,245.4L54.0,247.9L54.9,249.4L55.5,249.4L55.9,248.8L55.9,247.1L56.2,246.7L56.8,246.8L57.8,245.8L58.1,245.8L58.4,246.1L58.2,247.6L57.8,248.2L57.8,249.7L57.2,250.3L57.2,253.1L58.1,253.2L58.5,253.7L58.5,255.9L58.8,256.2L59.3,256.3L60.3,255.8L60.5,255.5L60.5,255.0L61.3,254.2L62.0,254.2L62.5,254.9L63.0,254.9L63.7,254.3L64.0,253.9L64.0,252.2L64.9,251.1L65.7,249.3L65.9,249.1L66.5,249.1L66.9,249.6L67.0,250.4L67.4,251.0L67.3,252.5L67.5,252.9L68.2,253.2L68.9,253.1L70.1,253.7L71.2,254.8L71.2,255.1L72.0,255.9L72.1,256.5L72.5,256.9L73.9,257.1L74.5,257.6L75.3,259.2L76.0,259.7L77.3,261.3L78.6,261.2L79.0,261.8L80.6,262.1L82.1,262.8L82.5,263.3L83.0,263.3L84.4,264.0L85.2,264.1L85.9,264.7L86.4,266.5L86.1,266.9L85.0,267.0L84.8,267.2L84.8,267.7Z'},{n:9,d:'M55.5,249.4L54.8,249.3L54.7,248.8L54.0,247.9L53.2,245.4L52.8,245.0L51.4,242.6L50.0,241.3L49.6,241.2L49.3,241.5L49.4,242.3L49.1,242.7L48.2,242.8L47.8,242.3L47.7,241.8L46.7,240.8L46.1,240.8L45.3,241.8L43.9,242.0L43.5,242.4L43.3,244.3L42.9,244.7L41.3,245.4L40.9,245.0L41.1,243.3L40.6,242.9L40.4,242.3L40.6,241.2L40.4,240.3L39.8,240.0L38.6,240.6L38.2,240.6L37.7,240.2L37.7,239.6L37.1,238.7L36.0,238.7L35.7,238.3L35.9,237.1L35.1,236.4L34.6,236.4L34.0,235.7L34.2,233.8L33.4,233.0L32.9,233.0L32.0,233.5L30.8,233.0L29.7,234.6L28.7,235.4L28.5,236.3L27.9,236.9L27.2,237.0L25.7,235.3L24.6,235.1L24.1,234.8L23.0,232.8L22.5,232.4L22.5,231.9L23.4,230.5L23.4,228.4L21.9,227.3L20.5,227.3L19.3,228.2L18.8,228.2L18.4,227.9L18.4,226.2L18.7,225.7L18.4,225.3L17.7,225.3L17.2,224.6L17.2,224.0L17.9,223.1L18.9,222.5L18.9,222.1L19.6,220.9L19.6,220.1L18.3,219.2L16.9,219.2L16.4,219.6L16.0,219.6L15.6,219.2L15.8,218.6L15.8,217.6L16.7,217.0L17.4,217.0L17.6,216.8L21.0,217.2L23.8,217.0L27.2,215.3L27.3,214.8L29.2,213.0L30.4,210.9L30.6,208.3L31.2,207.5L31.7,207.5L32.1,207.0L30.9,205.9L29.6,205.3L28.7,204.5L28.6,204.1L29.0,203.8L29.6,203.8L30.5,204.2L31.7,204.3L32.2,204.8L32.6,204.8L33.7,205.9L34.5,206.0L35.7,206.7L36.7,207.7L37.1,208.6L37.7,209.1L38.3,209.2L38.6,209.6L40.3,209.8L41.6,211.4L41.8,212.3L42.4,212.7L44.4,214.9L44.7,215.7L45.9,217.1L48.2,217.2L48.8,217.8L49.0,219.2L50.4,220.7L50.5,221.4L51.0,222.1L50.3,222.7L49.4,222.0L48.8,221.1L48.2,221.2L47.8,221.0L47.0,220.1L45.6,220.1L45.2,219.7L45.1,219.1L44.0,218.0L43.8,217.2L43.2,216.5L40.6,216.5L40.1,216.9L39.7,216.9L39.0,216.2L39.1,214.9L39.0,214.4L38.2,213.9L37.7,213.9L36.6,213.2L35.6,213.4L35.3,213.1L33.1,213.1L32.4,213.7L30.5,214.3L29.3,215.4L29.1,215.4L28.5,216.0L28.3,217.4L26.3,219.0L26.2,219.6L25.9,220.0L25.9,220.7L25.6,221.0L25.4,222.4L25.1,222.7L24.9,226.2L25.4,227.1L25.4,228.3L25.6,229.2L25.9,229.5L25.9,230.5L26.1,230.7L26.3,232.1L27.1,232.7L29.6,231.3L30.3,231.3L31.2,230.9L32.4,230.9L37.1,228.8L37.7,229.6L37.7,231.4L38.0,232.1L38.0,233.1L38.3,233.3L38.5,234.5L41.8,238.2L42.6,238.1L43.5,236.9L44.8,235.6L45.8,235.1L46.1,234.5L47.1,233.6L47.4,233.5L48.0,232.6L48.6,232.4L48.9,232.4L49.3,232.7L50.2,235.0L52.0,236.3L52.6,236.0L52.8,235.5L52.6,235.0L51.8,235.0L51.6,234.4L51.9,233.8L53.2,232.5L53.4,232.1L54.4,231.9L55.0,232.5L55.9,232.3L56.6,232.4L57.7,233.7L57.7,236.6L58.3,237.7L58.4,239.0L57.9,239.4L56.8,239.8L55.7,241.2L55.7,244.6L56.0,245.1L56.1,246.7L55.9,247.1L55.9,248.8ZM52.2,224.4L51.5,224.4L51.1,224.0L50.9,223.1L51.5,222.5L52.5,222.5L52.8,222.7L52.6,224.0Z'},{n:2,d:'M174.5,133.3L170.3,133.3L170.0,132.9L170.0,132.4L172.4,130.3L172.6,129.3L172.8,129.1L172.8,126.7L172.4,125.7L172.4,124.6L171.3,122.7L171.3,122.3L170.1,120.6L169.6,120.1L168.0,117.5L167.5,117.2L166.9,115.2L166.7,112.8L167.5,110.8L169.0,109.0L169.0,108.4L169.5,107.1L170.4,106.2L171.0,105.7L171.4,105.7L172.0,105.0L174.8,105.1L175.8,104.9L177.6,105.7L179.1,107.1L179.7,106.7L181.2,106.7L181.5,107.0L182.8,107.4L184.1,108.3L185.2,109.5L185.7,110.5L185.7,111.0L186.5,111.7L187.0,111.7L188.0,112.3L188.8,113.1L189.7,114.8L190.2,115.1L190.2,117.2L189.6,118.7L188.5,120.1L188.3,121.9L187.6,123.1L187.2,124.4L186.4,125.5L186.6,126.2L187.5,126.3L188.0,126.7L187.0,127.3L186.4,128.2L185.3,128.9L183.2,128.7L182.9,128.5L181.5,128.5L181.2,128.8L180.6,128.9L179.6,130.0L177.4,131.6Z'},{n:1,d:'M122.2,219.4L121.1,219.4L120.8,218.8L120.8,217.8L121.3,217.1L121.3,216.4L122.0,214.5L122.6,213.8L123.3,213.9L124.2,213.3L124.4,211.4L124.7,211.0L125.3,209.5L125.9,209.0L126.1,208.2L127.7,207.4L128.0,206.7L127.7,206.0L126.4,205.1L125.4,205.1L125.2,204.8L124.3,204.8L123.7,204.5L122.0,201.9L121.9,200.3L121.5,199.4L120.8,198.7L120.8,197.6L120.3,196.8L120.1,195.5L119.8,195.2L119.8,194.3L118.6,193.2L118.6,192.3L118.0,190.8L118.0,186.6L117.7,186.4L117.6,185.0L118.3,183.9L120.8,181.5L120.8,180.3L121.0,178.7L122.1,176.6L122.6,176.6L122.8,176.1L125.4,175.0L127.9,175.0L128.1,175.3L129.5,175.4L130.1,175.8L130.9,176.8L131.3,178.2L130.1,180.1L128.6,185.4L128.6,187.5L128.9,188.1L128.6,188.8L128.6,189.7L129.2,190.4L129.2,191.1L128.6,191.7L127.9,191.7L125.6,193.0L125.6,194.2L125.9,194.4L126.0,195.4L126.4,196.0L128.7,198.4L129.9,199.2L130.4,199.9L131.4,200.4L134.1,202.9L135.5,203.7L136.7,203.9L137.0,204.1L137.6,204.1L138.3,203.5L139.3,203.5L139.8,204.6L140.9,204.6L142.6,206.5L144.2,207.1L145.5,208.1L145.5,208.5L145.3,208.9L144.6,208.9L143.1,209.6L138.6,209.8L137.3,210.4L135.0,210.4L134.0,210.8L133.4,210.8L132.4,210.1L131.9,210.1L130.1,212.1L128.9,212.6L128.5,213.1L128.5,213.6L126.8,214.9L126.8,215.9L126.2,216.8L125.6,217.1L124.5,217.2L123.9,217.6L122.7,218.6L122.7,218.8Z'},{n:6,d:'M108.5,70.7L105.8,70.5L104.7,69.6L104.3,69.6L103.5,70.1L95.7,70.1L94.7,69.3L94.2,69.3L93.2,70.5L92.2,70.5L91.2,69.1L91.1,68.2L91.3,67.5L92.2,66.9L92.4,66.2L92.2,65.8L91.9,64.3L91.7,64.2L91.4,64.4L90.6,65.0L88.2,63.5L86.8,62.9L85.8,61.9L85.4,61.7L85.5,60.9L86.5,60.1L86.7,59.2L87.1,58.8L87.1,57.8L86.8,56.5L87.2,55.2L87.0,54.3L86.7,53.9L86.6,52.6L86.2,52.3L86.2,51.3L86.5,51.1L86.8,49.5L86.7,49.1L85.6,48.2L85.9,46.8L86.6,46.0L87.0,44.9L86.7,44.4L85.8,43.6L85.8,43.3L86.4,42.9L87.2,42.9L87.4,42.6L87.4,41.3L87.8,40.5L89.2,39.7L91.1,39.7L91.8,40.3L92.5,40.3L93.6,39.6L95.3,39.8L96.0,39.3L96.6,39.3L96.8,39.6L96.5,45.8L96.2,46.1L96.2,47.7L95.9,48.2L95.6,49.2L96.2,50.3L96.2,50.8L97.0,51.5L97.0,52.3L96.2,53.0L96.2,53.7L95.8,54.2L96.0,56.3L96.7,57.1L97.5,57.1L98.7,56.1L99.5,54.6L100.4,54.5L101.4,53.8L102.2,54.3L102.7,55.7L102.6,58.2L103.8,58.8L104.6,59.7L105.3,60.0L106.7,61.6L107.9,64.0L107.9,65.1L108.4,66.1L108.4,68.0L108.9,69.0L108.9,69.9Z'},{n:9,d:'M65.5,89.9L65.1,89.9L64.9,89.1L64.9,88.0L65.7,87.1L65.4,85.2L65.7,85.0L66.2,82.8L65.9,81.4L66.0,79.8L66.3,78.6L67.0,77.9L67.0,77.5L67.4,77.1L67.4,75.7L67.8,75.2L67.8,73.7L68.1,73.4L68.1,72.1L67.8,71.8L67.8,69.1L67.5,68.8L66.9,67.5L66.4,67.0L67.2,66.2L69.4,66.2L70.0,65.6L69.8,64.7L68.6,62.8L68.6,62.0L67.7,61.0L67.6,60.4L66.7,59.0L66.8,58.4L68.3,54.6L69.2,54.6L69.7,55.0L70.3,55.7L70.7,56.7L71.9,57.9L73.0,58.1L73.5,57.8L73.8,57.3L73.6,55.9L74.3,54.6L74.3,54.2L74.8,53.9L76.2,55.1L76.6,57.5L77.7,59.4L78.1,59.9L78.3,61.1L79.0,61.7L80.1,62.4L81.3,62.6L82.1,63.1L82.5,63.1L83.3,62.6L84.5,62.6L85.1,61.9L85.6,61.8L86.8,62.9L88.2,63.5L90.6,65.0L91.7,64.2L92.4,66.2L92.2,66.9L91.3,67.5L91.1,68.0L91.2,69.2L89.9,71.0L87.1,71.4L86.1,72.2L85.5,72.2L85.0,71.6L84.5,69.0L84.1,68.6L83.6,68.5L82.8,67.7L82.3,67.7L82.1,68.7L82.4,69.0L82.4,69.5L82.9,69.8L82.9,70.4L83.1,70.7L83.1,72.1L83.6,73.1L83.3,73.8L82.3,74.6L81.6,74.6L80.5,73.7L80.4,73.2L79.9,72.7L79.5,72.5L78.8,72.7L78.3,73.3L77.7,74.7L77.7,75.6L77.4,75.9L77.4,77.3L76.3,78.4L75.7,78.7L75.0,79.7L74.5,79.8L73.8,80.4L73.6,81.2L71.7,83.1L71.0,83.4L70.1,83.4L69.4,83.0L68.9,83.0L67.8,83.1L67.2,83.6L67.4,86.1L67.1,86.4L67.1,87.3L67.4,87.6L67.4,88.0L66.4,89.4L66.0,89.8Z'},{n:4,d:'M35.2,97.9L34.4,97.3L34.2,96.8L34.4,95.6L34.2,94.7L33.0,92.8L33.0,92.4L33.3,92.1L33.3,89.0L35.0,85.9L35.4,84.0L35.9,83.2L37.4,81.8L37.9,81.5L38.8,81.4L39.0,83.0L38.6,84.0L38.9,84.4L39.3,84.4L40.0,83.2L41.6,81.4L43.5,80.3L44.6,80.1L45.0,79.7L45.0,79.2L44.4,78.7L44.2,77.0L44.7,76.6L44.7,75.4L45.1,75.1L47.4,75.1L48.0,75.5L48.4,75.5L48.7,75.2L50.0,75.3L51.1,76.0L51.1,76.6L51.3,76.8L52.0,77.1L52.7,76.7L53.3,77.2L54.6,77.2L54.9,76.9L55.6,76.8L56.8,77.0L57.1,77.5L57.3,78.7L57.8,79.1L57.9,79.6L58.5,79.9L58.3,81.6L60.2,82.8L60.5,83.3L60.5,84.0L61.1,84.7L61.4,85.5L62.2,86.2L62.7,87.5L63.6,88.0L64.0,89.0L64.9,89.5L65.4,90.6L65.4,91.2L64.4,92.0L64.0,91.0L63.4,90.8L62.7,90.8L61.6,89.7L61.6,88.5L61.1,87.9L60.4,87.2L59.4,87.1L59.3,86.4L59.8,85.5L59.1,84.5L58.7,84.5L57.5,85.7L55.8,85.4L55.0,85.5L54.6,85.7L54.4,86.5L53.2,87.6L53.2,89.2L53.0,89.6L53.0,90.3L50.9,92.3L48.7,92.7L47.6,93.5L46.1,93.9L45.3,94.4L44.1,94.6L43.8,94.8L42.9,94.8L41.6,95.9L41.1,96.7L41.0,97.2L40.4,97.8L38.8,96.2L37.4,96.2L36.6,96.9L36.0,97.0L35.6,97.7Z'},{n:5,d:'M100.2,245.2L99.4,245.2L98.7,244.7L99.1,242.6L97.9,241.4L97.9,240.9L97.2,239.6L97.2,237.9L97.4,237.5L97.2,237.1L97.2,235.2L96.2,234.1L96.2,233.6L96.0,233.3L96.2,231.5L95.8,230.5L95.8,228.3L95.5,228.0L95.5,227.4L96.2,226.6L97.0,225.3L96.5,224.2L96.5,223.3L97.0,222.8L97.2,222.1L96.8,221.2L97.3,220.5L98.2,220.1L98.7,219.4L97.9,218.6L97.9,218.1L98.8,217.2L99.1,215.8L101.0,214.6L101.4,213.1L101.9,212.7L102.5,212.6L103.3,211.2L102.3,210.2L103.9,209.1L104.1,208.5L104.1,207.1L104.5,206.7L104.9,206.5L106.3,206.3L107.8,205.3L108.4,205.3L109.1,206.4L109.3,207.3L109.3,208.3L109.0,208.9L109.1,209.9L109.6,210.4L110.2,210.5L110.8,211.0L110.8,212.1L111.2,212.8L110.1,214.3L110.4,214.9L110.4,217.4L109.8,218.1L109.8,219.7L110.5,221.2L110.4,222.6L110.8,223.0L113.6,223.0L114.5,224.0L113.3,225.4L112.7,225.3L111.6,225.9L110.8,226.7L110.4,226.3L110.2,225.2L109.5,225.3L108.9,226.0L108.8,227.3L108.1,228.1L108.1,229.5L107.7,230.3L107.5,231.2L106.4,232.2L105.9,233.2L104.8,234.4L104.7,234.9L104.1,235.5L104.1,237.9L103.1,239.1L102.6,240.9L101.7,242.6L101.7,243.8L100.9,244.9L100.5,244.9Z'},{n:4,d:'M30.3,156.4L29.7,156.3L29.0,155.7L26.7,153.1L25.4,152.0L24.9,151.0L24.9,150.3L23.9,149.1L23.8,148.6L23.4,148.2L23.4,147.0L23.0,146.3L23.0,145.6L23.3,145.3L23.0,144.1L23.9,142.0L23.9,141.5L25.1,139.6L24.7,138.9L23.8,138.4L23.9,137.9L24.3,137.1L24.9,136.7L25.7,136.7L26.6,137.1L27.3,136.6L27.3,136.2L27.8,135.5L28.4,135.1L29.5,135.0L30.3,134.4L31.7,134.2L33.6,132.3L34.6,131.8L36.3,130.5L37.1,130.4L38.7,132.2L40.0,133.0L40.2,134.5L42.0,136.4L42.5,136.6L44.6,139.0L45.1,139.2L45.5,139.9L45.5,140.2L44.8,140.6L43.9,140.6L42.6,139.8L42.0,139.9L42.1,141.2L41.9,142.0L43.1,142.7L43.8,143.6L44.0,145.8L44.5,147.1L44.4,148.2L44.7,148.5L44.7,150.0L44.6,150.2L43.9,150.2L41.2,148.5L39.4,148.5L38.3,147.9L37.9,147.9L36.4,149.6L36.4,149.9L32.1,154.5L31.2,154.7L30.6,155.3L30.6,156.0Z'},{n:5,d:'M42.4,238.2L41.6,238.1L39.4,235.4L38.5,234.5L38.3,233.3L38.0,233.1L38.0,232.1L37.7,231.4L37.7,229.6L37.2,228.9L37.7,228.1L38.0,227.1L38.7,226.5L39.3,226.4L40.0,225.3L40.9,224.8L41.4,224.0L41.4,222.8L41.8,222.1L41.6,220.2L40.2,216.9L40.6,216.5L43.2,216.5L43.8,217.2L44.0,218.0L45.1,219.1L45.2,219.7L45.6,220.1L47.0,220.1L47.8,221.0L48.2,221.2L48.8,221.1L49.6,222.2L50.9,223.1L51.3,224.3L52.4,224.3L52.8,223.5L52.8,222.7L52.5,222.5L51.5,222.5L50.5,221.4L50.4,220.6L51.1,220.1L51.1,218.1L51.4,217.8L51.4,216.9L49.9,214.5L49.8,213.6L49.3,212.8L49.0,211.6L49.3,211.3L49.3,209.7L49.9,208.3L50.5,207.8L52.6,207.4L53.1,208.3L53.2,210.7L53.5,211.1L54.4,212.0L56.3,212.7L57.2,214.6L55.8,216.2L54.9,216.0L54.5,216.4L54.5,217.1L55.4,218.2L57.5,218.4L58.1,218.8L59.9,221.2L59.8,221.5L58.3,223.3L58.1,224.0L58.3,226.6L57.3,228.6L57.1,229.7L56.9,230.0L56.9,231.2L57.1,231.5L57.1,232.1L56.8,232.5L55.9,232.3L55.0,232.5L54.4,231.9L53.4,232.1L53.2,232.5L51.9,233.8L51.6,234.4L51.6,234.7L52.6,235.7L52.0,236.3L50.2,235.0L49.3,232.7L48.9,232.4L48.6,232.4L48.0,232.6L47.8,233.1L47.1,233.6L45.8,235.1L44.8,235.6L43.5,236.9Z'},{n:4,d:'M78.8,261.4L78.6,261.2L77.3,261.3L76.0,259.7L75.3,259.2L74.5,257.6L73.9,257.1L72.5,256.9L72.1,256.5L72.0,255.9L71.2,255.1L71.2,254.8L70.1,253.7L68.9,253.1L68.2,253.2L67.5,252.9L67.3,252.5L67.4,251.0L67.1,250.7L66.9,249.6L66.5,249.1L65.9,249.1L65.7,249.3L64.9,251.1L64.0,252.2L64.0,253.9L63.7,254.3L63.0,254.9L62.5,254.9L62.0,254.2L61.3,254.2L60.5,255.0L60.5,255.5L60.3,255.8L59.3,256.3L58.8,256.2L58.5,255.9L58.5,253.7L58.1,253.2L57.2,253.1L57.2,250.3L57.8,249.7L57.8,248.2L58.1,247.9L58.3,246.7L58.5,246.3L58.1,245.8L57.8,245.8L56.6,246.8L56.0,246.5L56.0,245.1L55.7,244.6L55.7,241.2L56.1,240.5L57.5,239.4L57.9,239.4L58.3,239.0L58.7,239.1L59.5,240.5L60.7,241.6L61.0,242.5L62.3,243.5L62.6,244.2L63.4,244.4L63.9,243.9L63.9,243.3L64.4,242.8L65.1,242.8L66.3,241.6L67.5,241.1L68.2,240.3L68.8,240.3L69.5,239.6L69.5,239.3L70.0,238.9L70.2,238.3L71.4,237.3L71.7,237.3L72.2,238.0L74.4,238.7L76.0,239.7L76.6,240.4L76.9,241.0L76.5,242.0L76.6,242.5L77.5,243.0L78.6,243.0L80.0,243.6L81.0,244.6L81.3,245.3L80.5,246.7L80.5,248.4L79.8,249.0L79.8,250.2L79.5,250.5L79.5,251.4L79.8,251.7L80.4,253.8L79.8,254.8L79.8,256.2L79.3,257.2L78.8,257.7L78.8,258.4L79.5,259.2L79.5,259.8L79.8,260.2L79.5,260.8Z'},{n:4,d:'M82.5,63.1L80.1,62.4L78.3,61.1L78.1,59.9L77.7,59.4L76.6,57.5L76.2,55.1L75.2,54.1L74.7,53.9L74.3,54.2L74.3,54.6L73.6,55.9L73.8,57.3L73.6,57.8L73.0,58.1L71.9,57.9L70.7,56.7L70.3,55.7L69.7,55.0L69.2,54.6L68.2,54.6L68.1,54.3L68.1,51.3L68.3,51.1L68.3,49.9L68.6,49.6L68.8,48.7L68.6,48.0L68.0,47.5L68.3,46.3L68.7,45.9L69.3,45.8L69.9,44.9L71.9,43.2L72.2,42.6L72.8,42.6L73.3,42.1L73.7,42.1L74.5,41.5L74.9,40.8L76.0,40.3L76.5,38.9L76.8,38.6L78.0,38.1L78.6,38.3L79.3,38.9L80.3,41.8L81.6,42.8L82.0,42.6L82.4,41.5L83.6,39.9L85.7,40.7L86.1,40.4L87.8,40.6L87.4,41.3L87.4,42.6L87.2,42.9L86.4,42.9L85.8,43.3L85.8,43.6L86.7,44.4L87.0,45.0L85.9,46.8L85.6,48.0L85.7,48.4L86.5,49.0L86.8,49.5L86.5,51.1L86.2,51.3L86.2,52.3L86.6,52.6L86.7,53.9L87.2,55.0L86.8,56.5L87.1,57.8L87.1,58.8L86.7,59.2L86.5,60.1L85.5,60.9L85.4,61.7L84.5,62.6L83.3,62.6Z'},{n:5,d:'M161.4,255.3L160.1,253.7L159.6,253.7L159.0,253.2L159.0,250.0L159.2,249.3L158.3,248.9L158.0,248.6L158.0,247.8L157.2,247.1L156.5,247.5L155.7,248.3L155.4,248.9L153.1,251.4L151.2,251.9L149.9,253.2L149.3,253.2L149.0,252.9L149.0,251.7L149.8,250.6L150.7,248.5L152.5,247.0L153.7,245.6L153.8,244.9L153.4,244.4L152.9,244.4L152.2,245.2L151.1,245.7L150.3,247.1L148.5,248.8L148.1,249.7L147.0,250.5L147.0,250.8L146.4,251.2L145.8,250.8L145.8,248.7L146.1,248.4L146.1,247.6L144.3,246.1L142.6,245.4L140.1,243.6L138.6,242.1L138.0,240.8L137.2,240.0L137.4,239.4L138.0,238.6L139.3,237.7L140.0,237.6L141.0,236.5L141.9,236.4L142.3,235.4L143.2,234.6L143.7,233.3L145.2,231.2L145.3,229.3L146.9,229.2L148.9,228.0L149.4,228.3L150.2,229.5L150.2,232.4L149.4,233.6L149.4,234.5L149.7,234.8L149.9,235.9L150.6,237.0L150.7,239.2L151.3,239.7L152.3,239.0L152.5,238.2L153.0,237.6L154.3,237.7L154.9,238.3L154.9,240.0L155.3,240.3L156.0,240.3L156.6,240.9L157.0,242.1L157.8,242.6L158.0,243.2L157.9,244.5L158.2,244.8L158.7,244.9L159.2,244.4L159.2,242.4L159.8,241.8L160.3,241.8L160.7,241.5L160.9,240.8L161.3,240.4L161.8,240.6L162.5,241.5L163.9,242.3L164.3,242.5L166.0,242.3L167.1,243.0L167.1,244.1L166.3,245.0L166.2,245.6L165.3,247.1L164.6,247.7L163.6,250.2L162.5,251.7L162.5,253.9L162.3,254.3Z'},{n:4,d:'M63.4,244.4L62.6,244.2L62.3,243.5L61.0,242.5L60.7,241.6L59.5,240.5L59.0,239.5L58.4,239.0L58.3,237.7L57.7,236.6L57.7,233.7L56.8,232.5L57.1,232.1L57.1,231.5L56.9,231.2L56.9,230.0L57.1,229.7L57.3,228.6L58.3,226.6L58.3,225.7L58.9,225.6L60.4,224.7L61.4,223.5L62.0,223.2L62.5,223.2L64.4,222.2L66.3,222.2L67.2,222.7L68.9,222.7L70.1,223.4L71.3,223.4L71.6,223.2L72.5,223.0L73.5,222.2L74.4,222.2L74.7,222.6L75.5,222.8L77.1,224.4L78.9,224.0L79.1,224.7L80.0,225.7L79.3,226.6L79.3,227.4L81.9,230.3L82.0,230.7L81.7,231.3L81.0,231.9L80.4,231.8L79.8,231.2L79.8,229.8L79.4,229.2L78.1,228.6L77.7,227.9L77.1,227.5L76.6,226.6L76.0,226.0L75.0,225.8L74.6,226.4L75.4,230.0L74.4,232.0L73.3,233.3L73.0,235.2L71.9,236.2L71.5,237.2L70.2,238.3L69.4,239.8L68.8,240.3L68.2,240.3L67.5,241.1L66.3,241.6L65.1,242.8L64.4,242.8L63.9,243.3L63.9,243.9Z'},{n:3,d:'M179.9,71.7L177.7,70.7L176.4,71.1L175.6,70.5L173.0,70.1L172.7,69.8L170.5,69.8L169.6,69.6L169.4,69.3L167.7,69.1L167.2,68.6L167.7,68.1L169.5,68.0L170.0,67.5L170.1,65.8L169.6,64.3L168.0,63.0L167.9,62.4L166.6,60.1L166.6,59.4L166.2,58.7L166.2,57.6L165.9,57.3L165.7,55.8L165.2,55.8L161.6,58.4L160.6,58.6L160.4,58.4L160.4,57.8L161.1,56.7L161.3,55.9L161.9,55.1L162.1,53.0L162.3,52.7L162.5,51.3L163.7,49.6L166.2,47.9L166.9,48.1L167.2,48.6L168.9,48.6L170.2,49.2L171.3,50.2L171.4,50.8L172.0,51.4L173.2,51.4L175.9,53.3L177.0,53.5L177.8,54.1L178.4,53.9L179.1,54.9L179.2,55.5L180.8,57.4L181.2,58.0L181.2,59.0L180.9,59.2L180.7,60.6L181.5,61.4L182.7,61.9L183.5,62.7L184.1,63.7L184.1,64.6L183.5,65.6L183.3,67.8L181.7,69.2L181.8,70.1L181.3,71.0Z'},{n:3,d:'M98.1,26.0L97.2,25.1L97.0,24.3L95.2,22.1L94.2,21.6L92.3,21.4L90.9,20.2L90.9,20.0L90.2,19.2L89.0,19.0L86.8,17.8L85.5,15.4L84.5,14.6L84.2,13.5L83.8,13.1L83.8,11.5L84.3,10.9L84.9,10.9L85.1,10.6L86.5,10.6L88.3,12.2L88.3,13.6L88.6,13.8L88.8,14.8L89.4,15.6L89.9,15.6L90.5,15.1L90.8,13.6L91.2,12.7L92.2,12.2L92.2,11.7L91.5,11.0L91.5,10.3L92.5,8.0L94.1,6.5L94.9,6.4L96.1,5.4L98.0,5.9L98.8,6.8L99.4,6.9L99.7,7.3L102.8,7.3L104.1,8.1L104.8,8.1L105.2,7.8L106.6,7.8L106.9,8.0L107.8,8.2L109.1,9.8L109.1,12.2L109.3,12.6L109.9,13.2L110.4,13.2L110.7,13.5L112.3,13.5L112.7,14.1L112.5,15.2L111.7,16.3L110.7,16.9L109.7,18.0L108.7,18.5L107.3,18.7L107.1,19.0L106.0,18.8L105.6,19.1L104.3,19.2L104.0,19.5L102.8,19.5L102.3,19.8L101.1,20.2L98.4,23.4L98.7,25.5Z'},{n:8,d:'M111.8,268.7L103.5,268.7L103.4,268.4L103.4,267.7L104.1,266.2L104.2,265.2L104.8,264.8L104.8,263.4L105.8,261.9L105.8,260.9L106.4,260.7L106.5,260.1L107.1,259.2L107.9,257.3L107.5,256.6L106.7,256.2L106.0,255.4L106.3,254.1L106.9,253.8L107.6,254.5L108.0,254.5L109.4,253.3L109.1,251.9L109.1,249.9L108.9,249.6L108.9,249.1L109.6,247.9L109.6,246.7L110.2,246.1L111.0,246.0L112.5,247.2L112.5,247.9L111.7,249.3L111.3,251.0L111.4,251.9L112.1,252.0L112.8,251.6L113.7,251.5L114.3,250.9L114.3,250.3L114.9,249.7L116.3,249.4L117.1,249.0L118.3,247.3L119.7,247.3L120.0,247.0L121.7,246.5L122.7,245.3L123.2,243.6L123.7,243.1L124.2,243.1L124.7,243.8L124.6,245.4L124.9,245.7L128.6,242.9L129.2,243.5L128.6,244.1L128.0,246.4L127.7,246.7L127.5,247.9L127.3,248.2L127.3,248.8L127.0,249.1L126.9,250.1L127.5,251.2L127.0,252.2L127.0,253.0L126.5,253.4L126.3,255.0L126.1,255.2L125.0,255.2L124.5,255.7L123.1,255.8L122.7,256.3L122.6,256.8L119.8,259.3L119.2,260.4L118.6,260.4L118.1,260.1L117.4,260.2L116.9,260.7L115.2,260.9L114.9,261.1L114.6,261.5L114.6,262.4L113.8,263.8L111.3,265.8L109.9,266.3L109.4,266.9L109.6,267.4L110.9,267.7Z'},{n:3,d:'M139.8,198.1L139.2,197.6L139.0,196.0L138.0,194.4L135.2,191.7L134.7,190.6L134.1,190.2L133.5,188.0L133.1,187.6L132.1,187.4L131.0,188.9L129.8,189.3L128.9,188.4L128.6,187.5L128.6,185.4L129.4,183.0L129.4,182.3L129.7,182.0L130.3,179.7L131.3,178.2L131.0,177.0L130.1,175.8L130.9,175.1L131.9,173.4L132.3,173.2L133.3,172.1L134.5,171.9L135.6,171.3L136.2,171.9L137.0,172.1L137.3,172.5L137.3,173.3L137.7,173.7L141.4,174.5L141.7,174.8L142.6,175.0L144.6,176.5L146.2,176.6L146.7,177.0L147.1,177.0L148.2,178.2L148.5,179.2L149.1,179.8L149.9,179.8L150.6,180.3L151.9,181.6L151.9,182.5L152.5,183.8L151.9,185.1L150.8,186.2L150.6,187.0L149.8,187.9L149.1,187.9L148.7,188.3L145.7,189.6L144.6,189.6L144.3,189.8L142.9,190.0L142.5,190.3L141.8,189.9L141.5,189.2L140.3,188.4L139.8,187.2L139.4,186.8L139.4,186.2L139.0,185.3L139.0,184.7L139.4,183.9L139.4,183.5L139.0,183.1L138.2,183.1L137.4,183.3L136.5,183.9L135.8,185.0L135.6,185.6L134.9,186.4L134.8,187.2L135.7,189.6L137.0,191.0L137.4,191.7L138.5,192.8L139.1,194.4L140.2,195.6L140.3,196.8Z'},{n:4,d:'M153.0,166.9L152.5,166.8L152.5,165.8L153.0,165.1L152.8,163.0L153.5,161.5L153.7,159.9L152.7,158.5L152.8,157.8L152.0,157.0L151.9,155.3L151.3,154.8L151.1,151.5L151.6,150.7L150.6,149.7L150.6,147.4L150.8,147.0L152.3,145.5L155.2,144.0L156.1,143.2L156.5,142.6L156.7,142.6L159.3,140.4L159.8,140.2L160.9,140.3L162.2,139.7L162.5,140.3L162.5,141.0L161.5,141.6L159.6,141.8L159.2,142.2L158.1,142.6L157.4,143.3L157.3,144.1L157.6,145.8L158.4,146.6L159.8,146.4L160.1,146.7L162.2,146.8L162.7,147.2L163.0,147.2L165.2,148.8L166.3,150.2L167.8,153.4L168.0,155.8L168.6,156.5L168.0,157.3L168.0,158.9L167.4,161.7L166.6,163.0L166.6,163.7L165.6,165.7L164.6,165.5L164.1,164.9L163.1,164.8L161.7,164.0L160.8,164.1L158.6,162.8L157.9,162.8L156.1,164.2L155.7,165.4L155.1,166.0Z'},{n:4,d:'M176.5,169.1L175.6,169.0L175.0,168.4L175.0,164.6L175.2,164.0L174.5,163.0L174.5,162.0L174.1,161.6L174.1,161.2L173.3,160.1L172.1,159.1L172.1,158.1L172.5,158.0L173.3,158.2L173.5,157.9L173.5,156.7L174.5,156.0L174.3,155.0L175.0,154.1L175.2,152.7L175.9,152.1L176.6,151.0L176.7,149.7L178.3,148.2L178.3,146.8L178.9,146.1L179.4,146.1L180.5,146.8L181.3,147.6L182.0,147.6L182.6,147.1L183.1,145.6L183.5,145.0L185.0,143.9L186.1,143.3L186.5,143.3L187.7,142.3L189.6,141.4L190.8,140.0L191.6,139.8L192.1,140.3L191.7,141.5L191.7,142.6L192.0,143.0L192.8,143.0L194.0,141.8L194.5,141.7L195.0,142.2L195.0,143.4L194.0,145.3L194.0,147.9L193.8,148.4L192.6,149.6L192.2,150.7L190.1,152.7L188.9,153.2L186.5,153.2L185.8,153.9L185.8,154.2L185.2,154.9L185.2,155.5L186.2,156.3L186.3,157.2L185.5,158.2L184.6,158.8L184.4,159.9L183.8,160.8L182.6,162.3L182.6,162.6L181.4,163.7L181.4,164.0L180.2,165.6L179.2,165.7L178.3,166.2L177.9,166.8L177.6,168.5L177.2,168.9Z'},{n:4,d:'M177.2,226.8L175.8,226.0L174.4,225.9L173.6,225.3L170.8,224.4L169.1,223.2L167.5,222.9L166.7,221.9L165.2,220.9L164.6,220.8L164.2,220.4L163.0,220.1L162.7,219.8L161.3,219.6L161.0,219.4L158.2,219.3L157.7,218.2L157.4,218.2L156.6,217.4L156.3,215.7L157.0,214.8L157.9,214.8L159.2,213.6L159.5,212.7L160.2,212.1L161.0,210.8L163.4,210.1L164.3,209.1L167.0,207.8L167.7,208.1L168.4,208.1L168.7,208.4L171.2,208.4L171.5,208.7L172.4,208.8L174.4,209.6L175.6,209.8L176.5,211.0L177.0,211.0L177.4,211.4L177.6,212.4L178.5,213.2L178.5,213.7L179.5,214.9L179.7,216.9L180.0,217.2L180.0,217.8L179.7,218.1L179.7,219.0L180.0,219.3L180.0,221.4L179.5,222.1L179.5,223.5L179.2,224.1L178.5,224.8L178.4,226.1L178.0,226.5Z'},{n:1,d:'M140.4,202.5L140.1,202.4L139.8,198.2L140.3,196.8L140.2,195.6L139.1,194.4L138.5,192.8L137.4,191.7L137.0,191.0L135.7,189.6L134.8,187.2L134.9,186.4L135.6,185.6L135.8,185.0L136.5,183.9L137.4,183.3L138.2,183.1L139.0,183.1L139.4,183.5L139.4,183.9L139.0,184.7L139.4,186.8L139.8,187.2L140.3,188.4L141.4,189.2L141.8,189.9L142.5,190.3L142.9,190.0L144.3,189.8L144.6,189.6L145.7,189.6L148.7,188.3L149.1,187.9L149.8,187.9L150.6,187.0L150.8,186.2L151.3,185.7L152.0,186.2L152.6,186.2L153.5,187.3L153.2,189.7L152.5,190.9L152.7,191.5L153.3,191.6L155.3,189.8L155.3,189.4L155.7,189.0L155.7,185.6L155.4,185.3L155.3,183.3L155.8,182.6L156.4,180.8L156.8,180.7L158.1,181.7L159.0,181.9L159.9,183.0L159.9,183.5L160.2,183.8L160.4,185.3L160.9,186.4L160.9,187.3L160.7,187.6L160.7,190.6L159.7,192.3L159.5,193.5L158.7,194.2L158.5,194.9L157.8,195.0L157.0,195.5L153.9,198.2L151.7,198.8L150.2,199.9L147.9,200.5L147.6,200.8L144.1,201.3L143.8,201.5L142.4,201.7L142.2,202.0Z'},{n:4,d:'M120.8,198.7L119.6,198.7L118.0,197.2L116.4,197.0L114.2,196.0L113.6,196.0L113.3,196.2L111.6,196.0L110.8,195.2L110.5,194.3L109.6,193.5L109.1,192.5L109.1,191.8L109.5,191.5L110.1,191.5L110.3,190.8L108.3,189.3L106.9,189.1L105.6,189.3L105.5,191.6L105.2,192.0L104.3,192.0L104.0,191.7L103.0,191.5L101.9,190.3L101.7,189.2L101.3,188.7L101.3,185.1L101.7,184.2L102.4,183.5L103.2,183.2L104.4,182.0L105.3,182.2L105.5,183.2L105.9,183.6L106.6,183.6L107.2,182.8L107.2,181.7L107.9,180.9L109.0,178.3L109.6,178.2L109.9,177.9L112.6,176.6L114.5,176.5L115.3,175.9L115.7,175.3L116.1,175.3L116.4,175.0L117.6,175.0L118.8,173.8L119.7,173.6L120.6,172.7L121.2,172.7L121.5,172.9L122.0,173.9L122.0,175.1L122.8,176.1L122.6,176.6L121.9,176.9L121.0,178.7L120.8,180.3L120.8,181.5L118.3,183.9L117.6,185.0L117.7,186.4L118.0,186.6L118.0,190.8L118.6,192.3L118.6,193.2L119.8,194.3L119.8,195.2L120.1,195.5L120.3,196.8L120.8,197.6Z'},{n:3,d:'M48.8,188.5L48.5,188.1L48.5,187.3L49.3,186.1L49.3,185.4L48.7,184.5L47.0,183.8L46.1,183.8L45.1,183.6L44.8,183.3L43.5,183.1L42.9,182.9L41.1,180.9L41.1,179.7L41.7,178.6L43.5,177.3L43.3,175.4L42.1,174.5L42.3,172.2L42.8,171.5L42.7,170.6L43.4,170.2L43.8,169.5L45.6,167.8L47.7,166.9L51.4,166.9L54.5,168.2L54.9,168.6L56.3,168.1L58.4,168.3L59.4,168.8L60.7,170.3L60.7,170.8L61.0,171.2L61.8,173.1L61.0,173.9L60.5,176.3L59.8,177.5L59.0,177.7L58.5,178.0L57.8,178.9L57.6,179.7L54.1,183.1L53.0,183.9L51.6,185.6L51.6,186.0Z'},{n:4,d:'M58.4,225.7L58.1,225.1L58.3,223.3L59.8,221.5L59.9,221.2L58.1,218.8L57.5,218.4L55.4,218.2L54.5,217.1L54.5,216.4L54.9,216.0L55.8,216.2L57.2,214.6L56.3,212.7L54.4,212.0L53.5,211.1L53.2,210.7L53.1,208.3L52.6,207.4L55.1,205.9L57.9,205.9L58.9,205.6L60.1,205.0L61.7,203.2L62.7,203.0L63.6,204.3L63.6,205.2L64.0,205.5L64.8,205.5L65.4,205.8L66.9,207.6L67.4,209.9L68.0,210.5L69.3,211.1L69.5,212.5L70.4,213.5L70.7,214.5L73.1,216.6L74.5,218.8L74.4,220.8L75.7,221.9L75.7,222.6L75.3,222.8L74.4,222.2L73.5,222.2L72.5,223.0L71.6,223.2L71.3,223.4L70.1,223.4L68.9,222.7L67.2,222.7L66.3,222.2L64.4,222.2L62.5,223.2L62.0,223.2L61.4,223.5L60.4,224.7Z'},{n:10,d:'M9.9,60.8L7.4,60.8L6.6,60.2L4.1,60.2L3.3,60.0L2.1,59.3L1.4,59.3L1.1,59.6L0.0,59.4L0.0,50.7L1.9,49.7L3.0,49.6L3.4,49.2L3.7,48.2L4.5,47.4L5.1,46.1L5.9,45.3L6.6,45.3L7.9,44.5L10.5,44.5L11.4,44.7L12.2,45.3L12.7,45.4L14.9,47.7L15.1,49.1L15.5,49.5L17.4,49.3L17.6,49.5L18.3,49.6L18.9,50.2L18.9,50.6L19.8,51.4L20.7,51.4L21.4,51.8L22.1,52.9L23.2,53.6L22.9,54.5L22.9,56.5L23.4,57.5L22.1,58.8L19.8,58.8L18.1,59.6L16.0,59.6L15.7,59.3L14.2,59.0L13.0,59.6L12.6,59.3L11.7,59.3Z'},{n:3,d:'M48.5,56.2L47.9,56.2L47.0,55.8L46.2,55.8L46.0,55.5L41.5,55.8L40.5,55.2L39.4,55.2L39.1,55.5L38.4,55.5L37.4,55.0L35.6,55.1L34.8,54.5L34.1,54.5L33.4,54.2L32.5,53.2L32.1,52.0L31.0,51.0L30.6,50.3L30.4,48.6L30.6,47.5L31.2,46.5L31.7,46.3L33.0,45.0L33.4,44.7L35.0,44.6L36.1,43.1L37.0,42.4L38.2,41.9L39.6,42.1L40.4,41.3L41.5,40.7L43.2,40.7L43.5,40.9L45.0,40.7L46.3,39.8L47.0,39.8L48.4,40.0L50.0,41.2L51.3,41.4L53.5,45.0L52.7,45.8L52.7,46.1L52.3,46.5L52.1,47.9L50.9,50.1L50.6,51.4L49.9,52.3L49.0,55.7Z'},{n:9,d:'M123.2,78.6L121.9,77.9L120.1,76.4L119.5,76.3L118.5,75.2L116.9,74.6L115.3,73.5L114.8,73.4L113.6,72.7L113.5,72.3L113.8,71.8L115.6,70.5L115.8,69.9L115.6,67.8L116.5,66.6L116.5,62.3L116.0,61.5L114.7,60.3L114.3,59.3L114.3,58.4L114.9,58.2L116.3,58.5L117.0,57.9L117.2,57.0L117.5,56.7L117.5,55.9L116.9,54.7L117.0,52.7L119.6,50.6L120.1,49.6L120.3,48.7L120.2,44.8L121.3,44.1L122.8,44.2L123.8,43.6L124.1,43.6L125.4,43.8L125.7,44.1L126.9,44.1L127.6,44.8L127.6,45.1L128.0,45.6L128.0,48.9L127.0,50.1L127.0,51.3L126.5,51.8L126.0,53.5L124.1,53.3L123.6,53.9L123.6,54.6L123.9,55.1L126.0,57.1L126.3,57.6L126.3,57.9L124.0,59.6L123.6,59.6L122.7,60.1L122.0,61.1L122.0,61.7L121.5,62.0L121.4,62.3L120.8,62.7L120.7,63.5L121.0,64.3L121.0,64.9L120.3,66.1L120.3,67.2L119.8,68.1L119.8,68.7L120.1,69.0L120.3,69.9L120.7,70.2L121.9,70.1L123.8,70.2L124.5,70.1L125.3,70.5L126.7,70.3L128.1,70.6L128.4,70.8L128.2,73.7L128.5,74.0L128.7,75.7L127.4,76.3L125.4,76.7Z'},{n:4,d:'M163.0,240.0L162.6,239.9L161.2,238.5L157.2,236.4L156.9,235.7L154.9,234.1L154.5,233.2L153.2,232.4L152.4,231.0L152.3,230.5L151.6,229.5L151.6,228.6L151.2,228.1L151.2,227.8L150.3,226.7L150.6,225.9L150.6,224.3L151.1,223.5L150.7,222.4L151.5,221.4L152.9,220.6L154.5,220.6L154.8,220.8L155.7,220.8L156.5,220.1L158.1,219.3L161.0,219.4L161.3,219.6L162.7,219.8L163.0,220.1L164.2,220.4L164.6,220.8L165.2,220.9L166.7,221.9L167.5,222.8L167.1,223.3L167.1,224.0L167.8,225.3L167.8,226.6L168.3,227.7L168.3,231.2L167.5,232.4L167.5,233.1L166.9,234.5L165.4,236.2L165.2,237.4L163.7,239.6Z'},{n:3,d:'M17.4,121.6L16.2,121.6L15.8,121.1L11.7,121.1L10.1,119.5L10.0,118.9L9.6,118.6L9.4,117.2L9.0,116.4L9.0,115.0L9.6,114.1L9.6,113.6L10.4,112.6L10.4,111.4L10.1,111.1L10.1,109.3L9.8,108.7L10.1,107.9L11.1,106.4L11.7,104.4L12.4,103.4L13.4,102.9L14.0,102.3L15.2,101.7L16.4,101.7L16.9,101.3L17.6,101.7L18.3,101.7L18.6,102.0L19.3,102.0L19.9,101.6L21.2,101.7L21.4,102.0L22.7,102.4L23.7,103.2L25.0,102.9L26.0,103.7L26.9,104.5L26.9,105.0L27.5,105.9L27.5,108.1L27.8,108.4L27.6,109.4L28.0,110.2L27.5,112.6L26.2,115.0L25.3,114.9L25.0,114.6L22.4,114.6L21.8,115.0L20.7,115.1L20.1,114.9L19.6,114.4L18.6,114.4L18.3,114.2L17.6,114.2L17.2,114.6L17.2,116.1L16.6,116.6L15.4,116.6L14.9,117.2L14.9,118.3L15.2,118.7L16.4,119.2L17.2,120.0L17.7,121.4Z'},{n:4,d:'M32.1,173.7L31.9,173.6L31.3,172.5L31.3,171.1L30.6,170.0L30.0,169.5L29.1,169.4L28.6,168.6L28.1,168.6L27.1,167.8L26.8,166.6L26.3,165.8L26.6,164.0L26.3,163.6L26.2,162.1L27.0,161.0L27.6,161.0L27.8,161.3L27.8,162.0L29.1,163.8L30.5,163.8L30.9,163.4L31.1,161.6L32.5,159.1L32.7,157.9L33.5,157.0L33.3,156.1L32.1,154.6L32.3,154.1L34.4,152.1L35.0,151.2L36.4,149.9L36.4,149.6L37.9,147.9L38.3,147.9L39.4,148.5L41.2,148.5L43.5,150.0L44.6,150.2L44.7,151.4L45.0,151.7L45.0,152.2L44.7,152.5L44.7,153.7L45.0,154.2L43.5,154.9L42.6,155.7L42.6,156.0L41.6,157.1L41.1,157.5L41.1,159.6L41.4,159.9L41.4,160.8L41.1,161.5L41.8,162.3L42.8,162.9L42.9,164.0L39.0,167.5L38.3,169.2L37.7,169.9L37.7,170.6L36.6,171.1L35.1,172.7L33.9,172.5L33.0,173.5Z'},{n:4,d:'M86.8,200.0L86.1,200.0L85.0,198.5L84.2,198.4L83.8,198.1L83.6,194.2L83.3,194.0L83.1,192.6L81.9,190.9L80.7,189.8L79.7,189.8L78.6,189.2L76.8,189.2L76.2,187.7L75.4,187.0L75.1,187.0L74.2,185.9L74.8,185.1L75.0,183.3L75.4,182.4L76.0,182.4L77.3,183.1L78.5,183.1L79.8,181.6L81.5,181.0L81.9,180.6L81.9,179.7L82.9,178.0L82.9,176.6L83.1,176.3L83.3,175.3L84.7,175.7L85.4,176.5L87.0,176.6L87.7,177.1L88.2,177.1L89.0,177.7L90.7,178.2L91.1,178.6L92.3,178.8L93.0,179.5L93.8,179.1L94.4,179.1L95.2,179.5L96.5,179.5L96.8,180.0L96.6,181.7L96.0,182.2L95.3,183.3L94.7,183.5L93.9,183.2L93.4,183.8L93.4,185.7L92.2,186.7L93.4,190.3L91.9,190.5L90.8,191.2L89.1,190.8L87.3,190.9L87.0,191.2L86.4,191.2L85.9,191.6L85.9,193.0L86.7,193.9L87.5,195.7L87.0,198.1L87.1,199.4Z'},{n:5,d:'M132.1,173.3L131.8,173.3L131.1,172.6L131.1,171.8L131.8,170.6L132.9,169.8L134.3,168.1L134.7,168.0L134.9,166.1L135.7,165.0L136.5,163.0L137.6,161.6L138.7,160.9L139.0,160.4L138.7,159.0L140.6,157.2L140.8,156.1L141.4,155.3L141.4,154.6L142.5,152.9L142.5,151.3L141.5,149.6L141.5,148.9L142.0,148.3L142.5,146.5L143.5,145.6L143.9,145.5L145.5,147.8L145.8,147.9L146.4,147.4L147.3,147.3L149.4,144.8L150.3,143.4L150.9,143.6L151.6,143.4L153.2,141.7L154.4,141.1L156.2,139.0L157.4,138.1L158.3,136.4L158.9,136.4L159.4,135.5L160.5,135.2L160.9,137.0L161.1,137.3L161.4,137.6L162.5,137.6L162.8,137.8L162.8,138.6L162.3,139.6L160.9,140.3L159.8,140.2L159.3,140.4L156.7,142.6L156.5,142.6L156.1,143.2L155.2,144.0L152.3,145.5L150.8,147.0L150.6,147.4L150.6,149.7L151.6,150.7L151.1,151.5L151.3,154.8L151.9,155.3L152.0,157.0L152.8,157.8L152.7,158.5L152.0,158.7L150.5,157.9L150.3,158.3L150.2,159.8L149.7,160.5L148.8,161.4L147.6,162.2L146.6,162.3L145.7,161.6L145.0,161.6L144.4,162.3L143.6,162.3L143.4,162.6L142.2,162.7L141.5,162.2L140.9,162.2L140.2,163.1L139.4,163.0L139.1,163.2L139.1,164.0L138.3,164.5L138.0,165.1L138.0,166.3L138.2,166.8L139.0,167.3L139.0,168.0L138.2,168.3L137.1,169.3L136.8,169.4L135.8,170.4L135.5,171.4L134.5,171.9L133.3,172.1Z'},{n:1,d:'M158.5,127.1L157.2,127.1L155.1,126.1L153.3,124.6L152.1,124.0L151.1,122.7L150.8,121.8L150.1,121.4L149.3,121.7L149.4,122.4L149.1,123.0L147.6,124.5L146.9,124.2L146.8,123.4L145.9,121.7L146.9,120.6L146.9,120.2L147.3,119.8L147.0,118.5L147.0,117.6L147.3,117.4L147.3,114.8L147.0,114.5L146.8,113.0L145.9,112.1L146.6,110.5L146.7,109.8L146.5,109.7L146.7,108.6L147.9,108.2L148.6,109.1L149.3,109.0L149.9,108.5L150.2,107.1L151.0,106.3L151.5,106.3L153.9,104.6L154.4,104.5L154.8,104.1L156.0,103.9L156.4,104.1L161.4,103.9L161.6,104.2L161.6,104.7L161.3,105.0L161.1,106.9L160.9,107.1L160.7,108.5L160.2,109.3L160.3,110.3L160.0,111.0L160.2,112.0L159.7,112.8L159.9,113.9L158.7,115.5L158.3,117.2L158.0,117.5L157.8,118.8L158.0,122.1L158.3,122.4L158.3,123.1L159.2,125.1L159.2,126.0Z'},{n:1,d:'M52.3,207.5L51.6,207.5L50.8,206.7L49.9,206.7L49.1,206.3L47.1,205.8L45.3,204.8L44.1,204.8L42.3,206.1L41.2,205.8L36.2,205.8L35.4,205.0L34.3,202.9L32.3,201.5L31.7,200.1L31.7,198.6L32.0,197.5L32.9,197.0L33.4,197.0L34.4,197.9L35.1,198.2L35.6,198.7L36.4,198.7L37.7,199.3L40.5,199.3L42.4,198.8L42.7,199.6L41.6,201.7L41.7,202.5L42.2,202.6L42.7,202.2L43.0,201.1L45.1,199.3L46.5,199.3L46.8,199.6L51.0,199.6L51.3,199.3L52.5,199.1L53.7,198.4L54.3,198.4L55.8,197.5L56.2,197.5L57.8,196.0L58.2,195.8L60.4,195.8L60.8,195.3L62.1,194.9L63.8,194.0L65.1,194.1L66.2,195.3L66.5,195.8L66.5,197.2L66.1,198.6L64.7,200.0L63.9,200.0L62.5,201.8L61.6,202.1L61.6,203.2L60.1,205.0L57.9,205.9L55.1,205.9Z'},{n:10,d:'M187.2,50.5L186.4,50.5L183.6,49.2L182.5,49.2L182.0,49.5L179.7,49.5L178.6,49.1L177.0,49.2L175.8,47.5L173.9,46.9L172.7,46.2L172.4,45.8L172.4,45.1L172.8,44.4L173.9,43.6L174.6,43.6L174.8,43.3L176.7,43.6L177.4,42.9L177.4,41.8L178.3,40.3L180.1,39.5L182.5,39.7L183.3,38.9L183.3,38.4L183.8,37.9L184.9,37.1L185.8,36.9L186.1,36.6L188.4,36.6L188.7,36.9L189.9,37.1L191.8,39.0L192.2,39.6L192.2,41.0L192.8,41.6L193.9,41.6L195.0,42.5L196.3,42.9L197.5,44.2L200.0,44.1L199.9,49.3L196.6,49.1L195.1,49.7L193.0,49.7L192.3,49.5L191.8,49.1L190.7,48.9L188.9,50.0L187.5,50.2Z'},{n:4,d:'M77.4,224.4L76.9,224.3L75.5,222.8L75.7,221.9L74.4,220.8L74.4,218.7L73.1,216.9L73.1,216.6L70.7,214.5L70.4,213.5L69.5,212.5L69.2,211.2L69.8,211.1L70.3,211.4L71.6,211.3L73.1,212.8L73.4,213.4L74.4,213.7L75.0,213.1L75.0,212.3L75.3,212.1L75.3,210.0L76.4,208.8L77.9,207.9L77.9,207.3L78.1,207.1L79.8,206.0L81.0,206.1L81.4,205.6L83.5,205.3L83.8,205.1L85.3,205.1L85.6,205.3L86.1,205.3L86.4,205.1L87.5,205.1L88.8,205.8L89.4,205.5L91.5,205.5L91.6,206.2L91.2,206.9L89.8,208.3L90.1,210.6L89.8,211.9L89.1,213.6L89.2,215.3L88.6,215.6L86.5,217.5L86.2,217.8L86.2,218.8L86.0,219.2L84.2,219.4L83.2,220.4L81.8,220.4L81.1,220.8L80.1,221.0L79.7,221.8L79.8,222.8L79.2,223.9Z'},{n:4,d:'M27.1,232.7L26.3,232.1L26.1,230.7L25.9,230.5L25.9,229.5L25.6,229.2L25.4,228.3L25.4,227.1L24.9,226.2L25.1,222.7L25.4,222.4L25.4,221.6L26.3,219.0L28.3,217.4L28.5,216.0L29.1,215.4L29.3,215.4L30.5,214.3L32.4,213.7L33.1,213.1L35.3,213.1L35.6,213.4L36.6,213.2L38.8,214.3L39.1,214.8L39.0,216.2L40.5,217.5L40.5,217.8L41.4,219.3L41.4,220.0L41.6,220.2L41.8,222.1L41.4,222.8L41.4,224.0L41.1,224.6L40.1,225.2L39.3,226.4L38.7,226.5L38.0,227.1L37.7,228.1L37.0,228.9L33.1,230.6L32.7,230.6L32.4,230.9L31.2,230.9L30.3,231.3L29.6,231.3Z'},{n:4,d:'M100.4,210.7L100.0,210.7L99.9,209.8L100.0,207.8L99.9,207.1L99.2,206.5L98.3,206.5L97.3,206.0L96.0,206.1L95.4,205.4L94.7,205.3L94.4,205.1L92.9,205.1L92.3,204.8L92.2,204.3L92.9,203.1L92.9,202.1L93.6,201.4L93.8,200.0L94.6,199.2L94.5,198.3L95.3,197.5L96.4,197.4L99.5,194.9L100.2,194.8L101.1,194.3L101.7,194.3L102.1,193.8L102.7,193.7L102.9,193.5L102.9,192.3L103.5,191.7L104.0,191.7L104.3,192.0L105.2,192.0L105.5,191.6L105.6,189.3L105.9,189.1L108.3,189.3L109.5,190.0L110.4,191.0L110.1,191.5L109.5,191.5L109.1,191.8L109.1,192.5L109.6,193.5L110.8,194.7L110.8,195.2L112.0,196.2L112.0,197.3L112.5,199.0L111.3,200.3L110.2,200.5L109.8,200.9L109.8,202.1L109.1,203.1L109.1,203.5L108.9,203.8L108.9,205.0L108.5,205.4L107.8,205.3L106.3,206.3L104.9,206.5L104.5,206.7L104.1,207.1L104.1,208.5L103.7,209.2L102.3,210.2Z'},{n:4,d:'M128.3,70.7L126.7,70.3L125.3,70.5L124.5,70.1L123.8,70.2L122.8,70.1L120.7,70.2L120.3,69.9L120.1,69.0L119.8,68.7L119.8,68.1L120.3,67.2L120.3,66.1L121.0,64.9L121.0,64.3L120.7,63.5L120.8,62.7L121.4,62.3L121.5,62.0L122.0,61.7L122.0,61.1L122.7,60.1L123.1,59.7L124.0,59.6L126.3,57.9L126.3,57.6L126.0,57.1L123.9,55.1L123.6,54.6L123.6,53.9L124.1,53.3L126.2,53.6L127.4,53.5L128.6,52.6L129.2,52.5L130.5,53.1L132.2,53.3L133.4,54.6L133.8,54.8L135.1,56.8L135.1,57.9L135.7,58.6L135.7,59.0L136.4,60.2L136.4,60.5L135.7,61.0L135.4,61.5L137.3,62.8L137.5,63.9L138.0,64.4L138.0,64.8L136.8,66.0L136.4,66.9L135.5,67.9L134.9,68.0L134.5,67.6L133.9,67.6L132.4,68.8L131.7,69.0L131.2,69.6Z'},{n:3,d:'M53.7,194.2L51.4,193.6L49.1,193.6L45.8,192.2L43.9,192.2L43.5,192.5L42.6,192.7L40.9,192.1L39.0,190.2L38.0,188.0L37.5,187.5L37.0,187.4L36.7,187.0L35.6,186.5L34.2,185.1L33.5,183.9L33.0,182.3L32.7,182.0L32.7,180.9L33.3,180.1L33.5,178.9L33.8,178.6L33.9,178.0L34.4,177.6L34.7,177.0L34.7,175.9L35.1,175.5L35.1,175.1L35.9,173.6L35.9,173.3L35.2,172.6L36.6,171.1L37.1,171.0L37.8,170.5L38.4,171.0L39.8,170.7L40.1,170.4L42.7,170.6L42.8,171.5L42.3,172.2L42.1,174.5L43.3,175.4L43.5,177.3L41.7,178.6L41.1,179.7L41.1,180.9L42.9,182.9L44.1,183.3L44.8,183.3L45.1,183.6L47.0,183.8L48.9,184.8L49.3,185.4L49.3,186.1L48.5,187.3L48.7,188.5L48.5,190.3L49.1,190.9L50.6,191.5L51.7,192.4L52.7,192.4L53.9,193.1L54.0,193.7Z'},{n:4,d:'M148.7,109.1L147.9,108.2L146.7,108.5L146.5,107.3L146.6,104.7L146.4,104.3L145.8,103.8L145.4,102.5L143.8,101.4L144.2,100.5L144.2,99.3L144.0,98.1L143.7,97.8L143.6,95.7L144.0,95.2L143.7,93.8L144.2,93.0L144.2,92.3L143.6,91.8L142.6,91.7L142.5,90.9L143.4,90.1L145.1,90.1L146.0,90.8L147.2,90.8L148.2,90.3L149.8,90.1L150.0,89.8L150.5,89.8L150.8,90.1L153.9,90.1L154.4,90.6L156.0,90.8L156.2,90.9L156.1,92.1L156.3,92.6L157.5,93.7L158.0,94.7L158.6,95.4L158.6,95.6L158.0,96.4L158.0,97.8L157.3,99.1L157.5,100.9L156.3,102.6L155.9,104.0L154.8,104.1L151.5,106.3L151.0,106.3L150.2,107.1L149.9,108.5L149.3,109.0Z'},{n:1,d:'M38.4,125.4L35.8,125.4L35.5,125.1L34.5,125.1L33.8,124.1L33.8,123.8L34.8,122.7L36.6,119.3L36.8,114.6L36.5,112.9L37.3,112.3L37.3,111.7L37.7,111.0L37.7,109.6L38.3,108.8L38.5,108.1L37.7,106.9L37.7,106.3L37.2,105.8L37.1,105.2L35.1,103.2L34.2,101.7L33.5,100.9L33.5,100.4L33.7,100.0L34.3,100.0L34.7,99.7L35.1,99.0L35.1,98.0L35.6,97.7L35.6,97.4L37.4,96.2L38.8,96.2L39.4,96.7L40.3,97.9L40.4,99.0L40.9,100.0L42.2,101.3L43.4,101.7L45.0,102.9L45.5,104.0L45.6,105.0L45.5,109.2L44.4,110.0L44.0,112.3L42.8,113.6L42.8,114.5L43.3,115.5L43.5,116.7L43.3,119.5L42.8,120.2L42.6,121.0L41.6,121.8L41.3,122.7L40.3,123.3L39.6,124.0L39.5,124.5Z'},{n:2,d:'M175.9,136.0L173.2,135.0L171.8,135.0L171.5,135.1L170.6,135.0L169.9,134.2L168.4,133.3L166.8,131.8L166.2,131.7L164.0,130.0L163.4,129.9L162.5,129.1L163.3,127.7L163.3,121.4L162.5,120.0L162.3,118.6L162.1,118.3L161.9,117.5L161.1,116.4L161.1,115.8L160.8,115.3L160.8,114.9L160.4,114.4L159.7,114.2L159.9,113.4L160.6,112.9L161.3,113.3L161.7,113.0L163.0,112.9L163.3,112.6L163.7,110.5L164.2,110.1L164.7,110.1L164.9,109.8L164.9,109.1L165.3,108.5L165.4,107.6L165.8,107.2L166.2,106.0L166.9,105.6L167.7,104.4L168.9,103.7L169.8,103.5L171.1,104.0L171.4,103.9L171.9,105.0L171.4,105.7L170.8,105.8L169.5,107.1L169.0,108.4L169.0,109.0L168.7,109.7L168.0,110.1L167.1,111.7L166.7,112.8L166.9,115.2L167.5,117.2L168.0,117.5L169.6,120.1L170.1,120.6L171.3,122.3L171.3,122.7L172.4,124.6L172.4,125.7L172.8,126.7L172.8,129.1L172.6,129.3L172.4,130.3L170.0,132.4L170.0,132.9L170.3,133.3L174.5,133.3L175.0,134.2L176.5,135.3Z'},{n:4,d:'M189.6,193.4L187.5,193.4L185.3,192.4L184.7,192.4L183.9,192.0L181.5,192.0L180.6,192.4L179.9,192.4L179.2,191.8L179.2,190.9L179.5,190.5L178.5,188.9L178.9,187.7L179.5,186.8L179.7,185.1L180.2,184.4L180.2,183.2L180.3,182.9L181.1,183.1L181.7,182.7L182.6,180.6L182.6,180.1L183.2,179.3L183.8,179.3L184.1,179.7L184.3,180.6L184.5,180.9L184.4,181.9L184.9,182.3L187.3,181.5L189.4,181.7L189.7,181.9L191.1,181.9L191.4,181.7L192.2,181.7L192.5,181.9L193.2,182.0L194.6,182.8L197.9,186.6L198.1,187.5L198.4,187.7L198.6,189.1L199.1,190.3L198.9,190.8L198.6,190.9L197.3,190.9L196.3,191.5L195.2,191.5L194.0,192.6L192.8,192.6L191.7,193.2L189.9,193.2Z'},{n:1,d:'M30.5,126.1L29.8,126.1L28.3,125.1L27.2,124.8L26.7,124.4L25.1,123.7L24.4,123.0L24.5,120.1L24.9,119.3L25.1,117.2L25.5,116.8L26.1,115.0L26.7,114.4L26.7,114.0L27.2,113.5L27.5,112.2L27.8,111.9L28.0,110.2L27.6,109.4L27.8,108.4L27.5,108.1L27.5,105.9L26.9,105.0L26.9,104.5L27.4,104.1L29.1,104.1L29.3,104.4L30.3,104.4L31.6,105.0L33.3,106.2L34.2,107.6L34.4,109.0L34.7,109.3L34.7,111.0L35.1,111.3L35.1,111.9L36.6,113.0L36.8,118.3L36.4,120.0L33.8,123.9L33.3,124.0L32.4,124.9Z'},{n:4,d:'M15.8,217.7L15.0,217.7L14.5,217.4L14.4,214.5L14.9,213.7L14.9,213.3L14.4,212.5L14.6,210.7L15.6,209.6L15.6,208.1L16.3,207.4L16.3,207.1L17.0,206.4L18.0,205.9L20.0,204.1L21.0,203.7L22.4,203.7L22.7,203.4L26.1,203.3L26.6,203.9L27.9,203.9L28.6,204.2L29.6,205.3L30.2,205.4L32.0,206.8L32.0,207.1L31.7,207.5L31.2,207.5L30.6,208.3L30.4,210.9L29.7,211.9L29.6,212.4L28.8,213.5L27.3,214.8L27.2,215.3L26.5,215.8L25.5,216.0L23.8,217.0L21.0,217.2L17.6,216.8L17.4,217.0L16.7,217.0Z'},{n:9,d:'M52.2,125.9L51.3,125.5L49.5,123.4L47.4,122.2L46.8,122.2L46.0,121.8L44.8,121.8L42.9,123.3L42.2,123.3L41.3,122.7L41.6,121.8L42.6,121.0L42.7,120.4L43.3,119.5L43.5,116.7L43.3,115.5L42.8,114.5L42.8,113.6L44.0,112.3L44.4,110.0L45.4,109.2L47.4,110.1L48.4,110.1L49.5,110.6L49.9,110.4L51.3,110.4L51.5,110.6L52.0,110.6L52.6,109.9L53.2,108.4L54.1,107.5L55.8,107.5L56.5,107.9L58.6,108.2L58.8,108.4L58.8,109.7L58.5,110.0L58.5,111.0L58.1,111.9L58.1,112.8L57.1,114.3L56.1,115.2L56.1,116.0L55.7,117.3L54.3,118.8L54.3,119.8L53.1,122.2L53.1,124.0L52.6,124.6L52.6,125.3Z'},{n:1,d:'M168.2,143.8L166.5,142.8L163.7,142.1L162.9,141.4L162.5,140.9L162.3,139.7L162.8,138.6L162.8,137.8L162.5,137.6L161.4,137.6L161.1,137.3L160.9,137.0L160.5,135.2L159.4,135.5L158.9,136.4L158.2,136.4L157.8,136.0L156.3,136.1L155.9,136.4L155.2,135.8L155.2,135.1L155.8,133.7L157.7,132.1L158.4,132.1L159.0,131.7L159.5,130.6L159.1,129.5L159.1,128.3L159.4,127.9L160.6,127.8L161.1,128.4L162.5,129.0L163.4,129.9L164.0,130.0L166.2,131.7L166.8,131.8L168.4,133.3L169.9,134.2L170.6,135.0L171.0,135.1L171.8,135.0L173.9,135.1L175.3,135.9L176.4,136.2L177.0,136.7L177.8,136.6L179.0,137.3L180.1,137.1L182.5,137.3L183.4,137.7L184.1,138.9L184.1,139.6L183.8,140.0L183.3,140.5L182.7,140.6L182.1,141.4L179.7,141.1L178.4,140.1L176.8,140.2L176.0,140.0L174.6,139.0L173.9,139.0L172.4,140.4L169.6,142.3L168.7,143.6Z'},{n:4,d:'M123.3,213.9L122.5,213.7L122.5,212.3L120.8,209.8L120.1,209.2L118.3,208.7L117.8,208.1L116.2,208.1L114.9,207.9L114.7,207.7L113.8,207.7L113.0,208.4L112.1,210.1L111.3,210.9L110.8,211.0L109.2,210.1L109.0,208.9L109.3,208.3L109.3,207.3L109.1,206.4L108.6,205.5L108.9,205.0L108.9,203.8L109.1,203.5L109.3,202.6L109.8,202.1L109.8,200.9L110.2,200.5L111.3,200.3L112.5,199.0L112.0,197.3L112.1,196.1L113.3,196.2L113.6,196.0L114.2,196.0L116.4,197.0L118.0,197.2L119.6,198.7L120.8,198.7L121.5,199.4L121.8,200.0L122.0,201.9L123.5,204.4L124.3,204.8L125.2,204.8L125.4,205.1L126.4,205.1L127.7,206.0L128.0,206.7L127.7,207.3L126.1,208.2L125.9,209.0L125.3,209.5L124.7,211.0L124.4,211.4L124.2,213.3Z'},{n:1,d:'M56.5,65.5L55.1,65.5L54.8,65.2L53.2,65.0L52.7,64.6L52.7,63.9L54.0,62.9L54.5,61.6L55.7,60.7L57.1,58.4L57.8,56.4L58.1,56.1L58.3,54.7L58.5,54.4L58.5,53.0L60.5,49.6L60.5,47.1L60.2,46.8L59.9,45.1L60.4,44.7L61.5,44.7L61.7,45.0L62.5,45.0L63.7,45.8L64.3,45.9L65.7,47.5L66.1,47.5L66.6,47.9L67.5,47.9L68.1,47.6L68.6,48.0L68.8,48.7L68.6,49.6L68.3,49.9L68.3,51.1L68.1,51.3L68.1,54.3L68.3,54.7L67.7,55.9L67.6,56.7L67.1,57.6L66.7,59.1L66.1,59.5L64.9,62.4L63.9,63.5L61.9,64.7L61.3,64.7L60.8,64.3L60.4,64.3L58.2,64.8L57.5,65.2L56.7,65.2Z'},{n:5,d:'M74.4,213.7L73.4,213.4L73.1,212.8L71.6,211.3L70.3,211.4L68.0,210.5L67.4,209.9L66.9,207.6L66.1,206.8L66.0,206.4L65.4,205.8L64.8,205.5L64.0,205.5L63.6,205.2L63.6,204.3L62.6,203.0L62.5,201.8L63.1,200.9L64.3,200.9L64.8,199.9L66.0,198.7L67.8,199.6L68.6,199.6L68.9,199.3L71.0,198.7L72.3,197.5L74.4,196.5L75.0,197.1L74.8,197.6L75.0,198.5L76.1,200.0L76.6,200.3L77.7,200.4L79.2,202.0L79.7,202.0L80.2,201.6L80.8,201.6L81.0,201.9L81.3,202.5L81.0,203.1L81.0,204.5L81.4,205.7L81.0,206.1L79.8,206.0L78.8,206.5L77.9,207.3L77.7,208.0L76.2,209.0L76.1,209.4L75.3,210.2L75.3,212.1L75.0,212.3L75.0,213.1Z'},{n:3,d:'M94.2,33.3L89.4,33.0L88.2,32.4L86.1,32.4L85.8,32.5L82.8,32.4L82.2,31.8L82.1,31.4L80.4,29.8L79.2,29.2L77.6,29.1L75.0,26.3L74.8,22.7L74.4,22.2L74.4,21.8L73.3,20.7L72.2,20.4L71.9,20.1L71.9,18.2L72.4,17.2L73.2,16.4L74.2,16.4L74.5,16.1L76.8,16.1L77.1,16.4L78.0,16.6L78.5,17.0L78.9,17.0L79.9,16.4L80.1,16.6L83.3,20.7L83.8,21.7L84.6,22.5L85.0,23.4L85.0,24.6L85.4,25.0L85.5,25.5L87.5,27.5L89.0,28.2L89.5,28.6L90.8,29.2L91.4,29.8L92.5,30.3L94.7,32.6L94.8,32.8Z'},{n:1,d:'M61.1,195.2L60.3,194.7L60.2,194.0L63.6,190.2L65.3,186.9L66.5,185.8L67.7,183.8L68.3,182.5L68.8,180.1L69.8,178.5L69.8,177.6L69.5,177.3L68.9,177.3L68.8,176.2L67.9,176.1L66.2,173.5L66.1,172.7L65.7,172.1L65.8,170.8L66.3,170.0L67.8,168.9L70.1,168.6L71.4,169.3L72.4,169.6L73.6,170.8L73.6,172.0L73.2,172.8L73.3,173.6L73.6,174.2L74.6,174.9L74.8,175.4L74.5,180.1L74.8,180.4L75.0,181.8L75.3,182.3L74.8,184.2L74.8,185.1L74.2,185.8L72.7,186.4L72.4,187.1L72.4,188.2L71.6,189.4L71.6,189.8L69.6,191.5L68.0,192.2L66.8,192.0L65.2,193.3L64.8,194.0L63.8,194.0L62.1,194.9Z'},{n:2,d:'M42.2,202.6L41.7,202.5L41.6,201.7L42.7,199.6L42.4,198.8L40.5,199.3L37.7,199.3L36.4,198.7L35.6,198.7L35.1,198.2L34.4,197.9L33.4,197.0L32.9,197.0L32.3,197.4L32.0,197.2L32.2,196.2L33.3,195.2L33.3,194.0L34.0,194.2L35.7,196.0L37.0,196.5L37.7,196.7L41.7,196.7L41.9,196.3L41.0,194.2L39.8,193.4L39.1,193.2L35.3,189.3L34.2,188.6L32.3,185.3L32.1,183.0L31.8,182.7L31.8,180.1L32.1,179.9L32.1,179.2L32.6,178.4L32.7,177.8L33.8,176.5L33.8,175.4L34.2,174.6L33.6,173.8L33.0,173.4L33.9,172.5L35.3,172.7L35.9,173.3L35.9,173.6L35.1,175.1L35.1,175.5L34.7,175.9L34.7,177.0L34.4,177.6L33.9,178.0L33.8,178.6L33.5,178.9L33.3,180.1L32.7,180.9L32.7,182.0L33.0,182.3L33.5,183.9L34.2,185.1L35.6,186.5L36.7,187.0L37.0,187.4L37.5,187.5L38.0,188.0L39.0,190.2L40.9,192.1L42.6,192.7L43.5,192.5L43.9,192.2L45.8,192.2L49.1,193.6L51.4,193.6L53.6,194.2L53.9,194.1L54.0,193.2L54.2,193.2L56.1,194.3L57.8,194.2L58.4,194.8L60.4,194.8L61.0,195.2L60.4,195.8L58.2,195.8L57.8,196.0L56.2,197.5L55.8,197.5L54.3,198.4L53.7,198.4L52.5,199.1L51.3,199.3L51.0,199.6L46.8,199.6L46.5,199.3L45.1,199.3L43.0,201.1L42.7,202.2Z'},{n:1,d:'M176.5,77.2L174.4,77.2L174.1,76.9L172.1,77.1L171.8,76.6L171.8,75.9L173.6,74.6L176.4,71.7L176.5,71.1L177.3,70.7L178.6,71.0L179.9,71.7L181.1,71.3L181.8,70.1L181.7,69.2L183.3,67.8L183.5,65.6L184.1,64.6L184.1,63.7L183.5,62.7L182.7,61.9L181.5,61.4L180.7,60.6L180.9,59.2L181.2,59.0L181.2,58.0L180.2,56.5L179.2,55.5L179.1,54.9L178.3,53.9L178.5,51.6L179.4,51.4L182.6,53.1L183.1,54.2L183.1,55.8L183.3,56.1L183.4,57.7L185.6,59.3L186.4,60.1L186.9,61.1L186.9,62.8L186.7,63.7L186.4,64.0L186.4,65.4L189.0,66.9L190.0,68.7L190.0,70.1L189.7,70.4L189.7,70.9L188.1,72.5L187.1,74.9L186.1,76.0L184.9,76.7L184.1,76.9L179.7,76.7L179.2,77.0L176.8,76.9Z'},{n:5,d:'M166.2,194.1L165.6,194.1L165.1,193.4L165.4,192.6L166.3,191.5L167.1,189.7L167.1,189.0L167.4,188.7L167.5,187.5L167.5,185.0L167.0,183.4L164.5,180.9L164.0,179.5L163.6,178.8L161.5,177.1L161.9,176.5L161.9,175.9L161.6,175.6L161.6,174.2L162.1,173.4L162.1,172.1L163.4,172.1L164.5,171.4L166.8,170.7L167.7,169.8L168.2,169.8L168.4,169.5L170.0,169.4L170.4,169.9L170.4,170.6L170.8,171.2L171.1,171.4L171.6,171.3L171.8,170.6L172.6,169.7L172.6,168.2L173.0,167.5L173.0,165.1L173.3,164.8L173.0,163.7L173.3,163.4L173.3,161.7L172.9,161.0L173.6,160.5L174.5,162.0L174.5,163.0L175.2,164.0L174.8,169.0L175.2,169.3L175.6,169.0L176.2,169.1L176.4,169.6L177.3,170.5L176.4,172.1L176.4,172.6L174.7,173.9L174.5,175.1L174.2,175.4L174.2,176.3L174.7,176.7L174.7,177.3L174.4,177.7L173.4,177.7L172.2,176.6L171.3,176.6L169.8,177.1L169.2,177.9L168.2,178.1L167.8,178.7L167.8,179.9L168.8,180.8L169.5,182.5L170.2,183.1L171.6,182.6L172.0,182.7L171.7,183.8L170.9,185.0L170.7,185.9L169.5,188.0L169.5,189.0L168.8,190.0L168.8,190.7L168.3,191.1L168.5,191.9L167.9,192.7L167.0,193.2L166.9,193.7Z'},{n:9,d:'M143.5,82.4L143.2,81.9L143.2,81.2L143.5,80.9L143.5,79.8L144.0,78.9L144.2,77.5L145.4,74.9L145.3,73.5L144.9,73.0L144.7,71.9L143.7,70.3L141.8,68.9L140.8,67.4L140.0,66.9L139.1,65.6L138.0,64.7L138.0,64.3L138.5,63.7L138.5,62.0L139.3,60.8L139.3,59.6L140.3,58.8L140.7,57.8L142.4,56.5L142.9,55.2L143.4,54.8L144.1,54.9L146.0,52.9L146.5,52.9L147.4,53.4L148.1,53.3L148.7,52.9L149.4,51.8L150.5,51.7L151.0,52.0L150.6,53.2L150.6,57.9L151.1,58.7L151.3,60.5L150.9,61.3L150.2,60.5L150.0,59.4L149.1,58.2L147.9,57.1L147.4,56.9L146.5,56.9L146.1,57.3L146.1,57.9L145.8,58.2L146.1,61.3L145.8,61.6L145.7,62.5L145.4,63.0L145.4,65.1L145.6,65.4L145.8,66.8L147.0,68.0L147.5,69.5L148.2,69.9L148.6,71.0L149.6,71.7L150.2,71.7L151.3,72.2L151.9,73.0L148.6,75.5L148.1,76.5L147.3,77.0L146.4,79.0L146.4,79.5L144.7,80.8L144.4,81.6Z'},{n:8,d:'M187.7,230.1L187.1,230.1L186.6,229.8L185.1,230.0L185.0,229.1L184.4,228.2L182.6,228.1L181.7,228.5L181.8,227.0L181.4,226.6L181.2,225.7L180.7,225.0L180.9,223.8L182.3,222.5L182.7,222.5L183.4,223.0L184.5,221.9L185.3,221.8L186.2,221.0L187.7,221.3L188.3,220.7L189.0,218.2L187.3,216.9L187.3,216.3L186.2,215.2L186.4,213.6L188.0,211.5L188.9,211.4L189.6,211.8L189.9,211.7L190.5,210.7L191.9,209.6L191.9,209.0L192.8,208.1L193.7,208.1L194.6,207.6L195.0,206.9L195.2,205.6L196.4,204.5L196.4,204.0L197.2,203.3L197.4,204.2L197.9,204.7L198.8,204.7L199.0,204.9L198.8,205.7L199.0,206.4L198.8,206.9L198.9,208.3L198.2,208.8L197.6,208.9L196.9,209.5L196.7,211.6L196.3,212.0L195.8,212.0L195.5,211.0L195.1,210.6L194.7,210.5L194.3,211.0L194.3,214.0L194.8,214.8L194.8,216.6L195.2,217.4L195.0,217.8L193.5,219.0L193.5,220.8L193.2,221.0L192.5,221.0L191.7,221.8L191.9,224.1L191.1,224.7L190.4,224.7L189.4,225.6L189.0,225.6L188.1,226.6L187.9,227.4L188.1,229.7Z'},{n:3,d:'M85.7,40.7L83.7,39.9L81.9,37.4L82.1,34.4L82.4,34.1L82.4,33.4L82.7,33.1L82.8,32.4L84.4,32.4L84.7,32.5L88.2,32.4L89.4,33.0L91.6,33.0L91.8,33.3L94.2,33.3L94.7,32.8L95.2,33.0L98.4,33.0L98.9,33.3L100.0,33.1L100.9,33.8L105.9,34.0L106.5,34.4L106.5,35.6L105.8,36.8L105.8,37.3L104.3,38.3L104.8,40.2L104.2,40.6L103.2,40.3L102.3,39.3L101.7,39.7L100.5,39.7L100.2,40.0L98.3,40.0L97.8,39.6L96.0,39.3L95.3,39.8L93.6,39.6L92.5,40.3L91.8,40.3L91.1,39.7L89.2,39.7L87.9,40.5L86.1,40.4Z'},{n:3,d:'M159.9,79.0L159.3,78.6L158.9,78.6L158.2,78.0L157.3,77.2L157.1,76.3L156.5,75.7L155.2,74.9L154.5,74.8L153.2,73.5L152.9,72.4L152.8,69.0L152.5,68.7L152.3,67.5L152.4,66.4L152.8,65.8L151.8,63.7L151.8,63.5L153.0,63.0L153.5,62.5L153.7,61.6L154.4,60.5L154.8,60.2L155.7,60.1L156.9,59.1L157.3,58.4L157.1,56.4L157.8,55.8L158.4,55.8L158.7,56.1L158.6,57.7L158.7,58.2L159.2,58.7L159.2,59.6L159.7,60.4L159.7,60.8L160.8,62.2L160.8,62.6L161.1,63.0L161.1,63.7L161.9,64.9L162.1,66.1L162.4,66.7L162.7,68.7L162.3,69.5L162.3,71.3L162.1,71.6L161.9,73.0L161.3,73.7L161.3,74.9L162.2,76.0L164.1,77.3L163.4,77.9L161.5,77.9Z'},{n:4,d:'M114.8,223.9L114.5,223.9L113.6,223.0L110.8,223.0L110.4,222.6L110.5,221.2L109.8,219.7L109.8,218.1L110.4,217.4L110.4,214.9L110.1,214.3L111.2,212.8L110.8,212.1L110.8,211.0L111.3,210.9L112.1,210.1L113.0,208.4L113.8,207.7L114.7,207.7L114.9,207.9L116.2,208.1L117.8,208.1L118.3,208.7L120.1,209.2L121.5,210.6L122.5,212.3L122.5,213.8L122.0,214.5L121.8,215.4L121.5,215.7L121.3,217.1L120.8,217.8L120.8,218.8L121.0,219.5L120.8,220.3L121.0,221.3L119.9,221.9L118.6,221.8L117.5,222.9L116.2,223.2Z'},{n:3,d:'M13.7,128.3L11.4,128.3L11.0,127.9L10.2,127.8L9.1,126.6L8.1,126.3L7.4,125.6L6.6,124.1L4.5,122.2L4.6,120.1L4.1,119.0L3.9,116.7L4.9,115.2L5.1,114.3L5.6,113.8L5.8,113.1L6.7,112.0L6.7,110.8L7.0,110.2L7.8,109.4L8.8,109.0L9.7,108.9L10.0,109.1L10.1,111.1L10.4,111.4L10.4,112.6L9.6,113.6L9.6,114.1L9.0,115.0L9.0,116.4L9.4,117.2L9.6,118.6L10.0,118.9L10.4,120.0L11.0,120.6L11.7,121.1L15.8,121.1L16.2,121.6L17.7,121.4L18.8,122.1L20.4,122.2L20.7,122.5L22.4,122.5L22.7,122.8L24.4,123.1L25.1,123.7L26.7,124.4L27.2,124.8L26.9,125.9L26.0,125.9L25.7,125.6L24.8,125.4L23.4,125.4L23.1,125.1L20.5,125.1L20.2,125.4L19.3,125.4L18.0,126.5L17.5,127.3L16.9,127.3L16.0,127.8L14.0,128.0Z'},{n:3,d:'M51.0,65.5L50.3,65.2L41.0,65.2L39.8,65.0L39.0,64.4L38.3,64.3L38.3,63.5L36.7,60.9L36.7,59.8L35.9,58.4L35.9,57.0L35.6,56.7L35.5,55.2L36.0,55.0L37.4,55.0L38.4,55.5L39.1,55.5L39.4,55.2L40.5,55.2L41.5,55.8L46.0,55.5L46.2,55.8L47.0,55.8L47.9,56.2L48.7,56.0L49.6,56.7L50.5,56.9L51.7,57.6L53.3,59.3L53.9,59.6L54.5,61.7L54.0,62.9L52.8,63.7L52.7,64.6L51.8,64.8Z'},{n:1,d:'M177.7,86.0L176.5,86.0L174.8,85.3L173.6,85.3L172.2,86.0L170.1,86.0L169.8,85.7L167.5,85.1L166.8,84.5L165.6,84.5L163.5,82.3L162.7,82.2L161.5,81.0L160.5,80.7L159.9,79.9L159.8,79.0L161.0,78.1L161.5,77.9L163.4,77.9L164.3,77.2L165.3,77.4L165.8,78.0L166.8,78.6L168.6,78.6L171.2,77.9L172.1,77.1L172.7,76.9L174.1,76.9L174.4,77.2L179.0,76.9L179.2,77.5L181.8,79.9L182.4,81.2L182.4,82.3L182.1,82.8L179.4,85.3Z'},{n:1,d:'M64.9,176.7L64.6,176.7L64.3,176.3L63.6,174.7L62.3,173.3L61.7,173.0L61.5,172.1L61.1,171.8L61.0,171.2L60.7,170.8L60.7,170.3L60.2,169.6L59.4,168.8L57.9,168.1L56.3,168.1L54.9,168.6L54.5,168.2L51.4,166.9L47.7,166.9L45.6,167.8L43.8,169.5L43.4,170.2L42.7,170.5L40.1,170.4L39.8,170.7L38.4,171.0L37.7,170.4L37.7,169.9L38.3,169.2L39.0,167.5L42.9,163.9L43.5,163.8L44.1,163.3L44.8,163.3L45.1,163.6L46.7,163.6L47.0,163.3L47.6,163.3L47.9,163.6L48.7,163.6L49.1,163.9L49.5,163.9L50.8,164.9L51.8,164.9L52.2,164.3L53.4,163.3L54.1,163.2L55.8,162.3L56.7,162.3L57.3,162.1L58.1,162.2L58.4,161.9L58.9,161.9L59.3,162.3L59.7,162.3L61.3,163.6L61.6,164.3L62.6,165.2L64.3,166.3L64.9,168.7L65.4,169.5L66.2,170.1L65.7,171.0L65.7,172.1L66.1,172.7L66.1,173.4L65.7,174.0L65.7,175.9L65.4,176.4Z'},{n:4,d:'M172.8,192.9L172.2,192.9L171.6,192.2L171.0,192.2L170.0,192.7L169.3,192.5L168.3,191.7L168.3,191.1L168.8,190.7L168.8,190.0L169.5,189.0L169.5,188.0L170.7,185.9L170.9,185.0L171.7,183.8L172.0,182.6L171.6,182.6L170.2,183.1L169.5,182.5L168.8,180.8L167.8,179.9L167.8,178.7L168.2,178.1L169.2,177.9L169.8,177.1L171.3,176.6L172.2,176.6L173.4,177.7L174.4,177.7L174.7,177.3L174.7,176.7L174.2,176.3L174.2,175.4L174.5,175.1L174.7,173.9L176.4,172.6L176.4,172.1L177.3,170.4L178.6,170.2L179.1,170.8L179.1,171.8L178.6,172.4L178.6,172.8L178.9,173.1L180.3,173.3L180.9,174.2L180.9,175.1L181.4,175.5L181.4,176.1L180.9,176.6L179.6,176.6L178.8,177.1L178.8,178.0L178.3,178.7L178.5,180.1L179.2,180.7L180.3,182.8L180.2,184.4L179.7,185.1L179.5,186.8L178.9,187.7L178.5,187.4L178.0,186.2L177.3,185.5L176.3,185.5L175.4,186.4L175.4,187.0L174.7,188.1L172.5,189.5L172.4,190.6L173.0,191.8L173.0,192.7Z'},{n:1,d:'M183.4,137.7L182.5,137.3L181.2,137.1L179.9,137.3L178.5,137.1L177.8,136.6L177.3,135.9L176.8,135.7L176.1,135.0L175.1,134.3L174.5,133.2L177.4,131.6L179.6,130.0L180.6,128.9L181.2,128.8L181.5,128.5L182.9,128.5L183.2,128.7L185.3,128.9L186.3,128.4L187.0,127.3L188.0,126.7L189.0,127.1L189.9,127.1L190.2,126.8L190.8,126.8L192.1,126.2L193.5,125.0L194.5,125.4L195.7,127.2L195.7,128.3L195.2,129.4L194.0,130.7L193.8,133.1L193.5,133.7L192.0,135.0L188.5,134.7L186.4,136.0L186.1,136.0L183.8,137.2Z'},{n:4,d:'M51.8,164.9L50.8,164.9L49.5,163.9L49.1,163.9L48.7,163.6L47.9,163.6L47.6,163.3L47.0,163.3L46.7,163.6L45.1,163.6L44.8,163.3L44.1,163.3L43.5,163.8L42.9,163.9L42.8,162.9L41.8,162.3L41.1,161.5L41.4,160.8L41.4,159.9L41.1,159.6L41.1,157.5L41.6,157.1L42.6,156.0L42.6,155.7L43.5,154.9L46.2,153.8L47.5,152.8L48.8,152.8L49.1,153.1L50.5,152.8L51.7,154.0L54.6,154.0L55.6,154.7L57.2,154.8L57.1,155.3L55.8,156.7L55.8,157.1L56.4,158.4L56.6,159.6L57.1,160.1L57.3,160.6L57.3,162.0L56.7,162.3L55.8,162.3L54.1,163.2L53.4,163.3L52.2,164.3Z'},{n:9,d:'M137.6,98.6L137.0,98.1L137.0,95.8L136.5,95.5L136.4,95.0L137.4,94.3L139.0,92.5L139.1,91.9L140.2,90.6L140.2,88.8L141.1,85.9L141.4,85.6L141.6,83.8L141.8,83.4L142.4,83.0L143.1,83.0L143.4,82.7L144.4,81.6L144.7,80.8L146.4,79.5L146.4,79.0L147.3,77.0L148.1,76.5L148.9,75.2L151.8,73.0L153.1,73.5L154.5,74.8L155.7,75.2L156.1,75.6L155.9,75.9L154.6,76.6L154.6,77.1L154.9,77.3L154.9,78.3L154.5,79.0L154.5,79.9L153.7,81.2L153.5,82.1L153.2,82.4L152.2,82.4L151.3,83.5L150.8,83.7L150.1,85.3L148.9,85.7L148.1,86.8L147.2,86.8L146.6,87.4L146.5,87.9L145.2,89.2L145.0,90.1L143.4,90.1L142.5,90.9L142.5,91.9L142.2,92.2L141.3,92.3L140.3,93.3L139.7,96.4Z'},{n:4,d:'M189.6,208.7L189.1,208.7L188.1,207.6L187.0,207.0L186.5,207.0L186.1,206.5L183.7,206.3L182.3,205.5L181.1,205.3L178.6,203.9L178.0,203.2L177.9,202.7L176.8,201.6L176.8,198.5L176.6,197.6L175.9,196.4L175.9,195.5L176.5,194.8L177.9,194.8L178.9,195.3L180.0,195.3L181.1,194.8L184.9,194.8L186.6,195.4L187.3,196.0L188.5,197.7L189.7,198.7L190.2,200.2L190.5,200.5L190.7,202.5L190.9,202.8L190.9,203.2L190.7,203.5L190.7,204.0L190.9,204.3L190.9,205.4L190.5,206.4L190.5,207.5Z'},{n:4,d:'M146.0,121.7L145.4,121.0L145.2,119.0L143.7,117.6L143.5,116.0L143.2,115.4L142.4,114.7L141.8,113.6L141.8,112.9L141.6,112.6L141.6,111.7L141.8,111.4L141.8,111.0L140.6,109.0L140.2,106.7L139.9,106.4L139.8,105.0L139.1,103.8L139.0,102.9L138.7,102.3L138.0,100.0L137.5,99.3L137.5,98.6L137.9,98.5L138.0,98.1L139.7,96.4L140.3,93.3L141.3,92.3L142.2,92.2L142.6,91.7L143.6,91.8L144.2,92.3L144.2,93.0L143.7,93.8L144.0,95.2L143.6,95.7L143.7,97.8L144.0,98.1L144.2,99.3L144.2,100.5L143.8,101.4L145.4,102.5L145.8,103.8L146.6,104.7L146.5,107.3L146.7,108.9L146.5,109.7L146.7,109.8L145.9,112.2L146.8,113.0L147.0,114.5L147.3,114.8L147.3,117.4L147.0,117.6L147.0,119.0L147.3,119.3L147.3,119.8L146.9,120.2L146.9,120.6Z'},{n:1,d:'M38.6,74.0L35.7,74.0L35.1,73.9L34.6,73.5L34.3,73.5L32.6,71.9L30.7,71.3L28.9,69.9L28.3,68.2L28.3,65.6L28.9,64.0L29.3,63.6L30.1,63.0L32.7,64.3L35.5,64.3L35.7,64.6L38.6,64.3L39.8,65.0L41.0,65.2L50.3,65.2L50.7,65.6L50.6,66.2L50.0,66.8L49.6,66.8L49.1,67.2L47.7,67.4L46.5,68.4L45.5,68.8L43.2,69.0L41.8,70.7L41.0,73.2L39.4,73.6Z'},{n:4,d:'M147.1,147.4L146.5,147.4L146.4,146.5L146.1,146.2L146.1,144.6L146.4,144.3L146.4,143.6L145.7,143.1L145.4,142.4L145.4,141.9L144.8,141.4L144.3,141.4L144.0,141.6L142.3,141.6L140.8,143.2L140.3,143.3L140.2,143.0L140.3,141.5L140.7,140.9L140.8,139.6L141.1,139.3L141.1,138.4L141.5,137.8L141.6,135.6L141.8,135.3L142.0,131.8L142.3,131.5L142.4,130.7L142.5,125.5L143.5,124.7L144.7,125.7L144.7,127.1L145.3,127.9L145.8,128.3L147.5,128.8L149.1,130.5L150.0,131.0L150.0,131.8L150.4,132.7L150.2,134.1L150.5,135.8L150.4,138.3L150.2,139.6L149.9,139.8L149.9,140.5L150.4,141.2L150.4,143.4L149.4,144.8Z'},{n:1,d:'M41.7,196.7L37.7,196.7L36.2,196.2L34.0,194.2L33.3,194.0L32.6,193.2L31.2,192.9L28.7,191.6L27.3,189.7L27.1,188.5L26.8,188.2L26.6,186.0L26.8,184.2L26.2,183.0L26.2,181.4L26.7,180.3L28.2,178.9L28.6,178.2L28.6,176.1L29.7,175.0L31.9,173.7L33.1,173.5L33.6,173.8L34.2,174.6L33.8,175.4L33.8,176.5L32.7,177.8L32.6,178.4L32.1,179.2L32.1,179.9L31.8,180.1L31.8,182.7L32.1,183.0L32.3,185.3L34.2,188.6L35.3,189.3L39.1,193.2L39.8,193.4L41.1,194.3L41.1,194.7L41.9,196.0Z'},{n:5,d:'M156.9,268.7L153.2,268.7L152.8,267.2L153.2,266.0L154.0,265.3L154.2,264.3L153.4,263.6L152.9,263.6L151.9,264.1L151.2,264.1L150.4,263.1L150.4,262.7L151.9,261.2L151.9,260.6L152.8,259.4L152.6,259.1L151.5,259.1L151.3,258.8L151.3,258.1L151.9,257.7L152.4,256.5L153.7,255.2L153.5,254.6L153.0,254.6L151.9,255.2L151.0,255.3L151.2,254.0L152.5,252.5L152.4,251.7L153.1,251.4L155.4,248.9L155.7,248.3L156.5,247.5L157.2,247.1L158.0,247.8L158.0,248.6L158.3,248.9L159.2,249.3L159.0,250.0L159.0,253.2L159.6,253.7L160.1,253.7L161.3,255.3L161.1,256.5L160.9,256.7L160.9,260.7L160.4,262.0L159.4,263.5L158.9,263.5L158.5,262.8L157.7,262.8L157.0,263.6L157.3,264.3L157.3,265.6L156.6,266.5Z'},{n:9,d:'M173.3,158.2L171.5,158.0L171.0,157.4L171.6,156.5L171.6,155.8L171.2,155.1L171.2,154.6L171.6,153.9L171.6,152.3L171.2,151.3L171.2,149.1L170.9,148.8L170.7,147.4L168.8,144.1L168.7,143.5L169.6,142.3L172.4,140.4L173.9,139.0L174.6,139.0L176.0,140.0L176.8,140.2L178.4,140.1L179.7,141.1L182.1,141.4L182.9,142.2L183.1,144.6L183.4,145.1L183.1,145.6L182.6,147.1L182.0,147.6L181.3,147.6L180.5,146.8L179.4,146.1L178.9,146.1L178.4,146.6L178.3,148.2L176.7,149.7L176.6,151.0L175.9,152.1L175.2,152.7L175.0,154.1L174.3,155.0L174.5,156.0L173.5,156.7L173.5,157.9Z'},{n:4,d:'M9.9,172.8L3.2,172.7L2.8,172.4L2.6,171.4L2.9,170.3L2.8,169.4L3.2,168.7L3.2,168.0L4.1,167.1L4.1,165.8L5.1,164.3L6.9,162.6L7.8,162.3L8.5,161.6L9.0,161.6L10.2,161.0L11.6,161.0L11.9,160.7L12.6,160.7L13.4,161.1L15.2,161.1L16.1,162.0L16.3,163.1L17.0,164.2L17.2,165.4L17.5,165.6L17.0,168.7L16.2,169.9L13.9,171.5L12.2,172.1L11.4,172.7L10.2,172.7Z'},{n:1,d:'M110.9,26.8L110.5,26.8L110.2,26.3L110.5,24.8L110.5,23.2L110.8,22.9L110.8,19.9L110.5,19.6L110.4,18.4L109.9,17.7L110.7,16.9L111.7,16.3L111.7,16.0L112.5,15.2L112.7,14.1L112.3,13.5L110.7,13.5L110.4,13.2L109.9,13.2L109.3,12.6L109.1,12.2L109.1,9.8L107.8,8.2L106.9,8.0L106.6,7.8L105.2,7.8L104.8,8.1L104.1,8.1L102.8,7.3L99.7,7.3L99.4,6.9L98.8,6.8L98.0,5.9L98.9,5.8L99.4,6.1L100.2,6.1L100.6,5.9L101.6,5.3L102.0,4.7L102.0,3.9L103.1,4.4L105.8,4.4L108.1,5.9L109.5,5.9L111.0,6.5L112.6,8.0L113.4,9.7L114.0,10.4L116.2,11.0L117.6,12.3L118.2,14.3L118.2,16.0L118.0,17.4L117.7,17.6L117.6,19.0L117.2,19.4L117.0,20.2L115.9,22.1L113.7,24.2L113.1,25.2L112.2,25.8L111.5,26.5Z'},{n:3,d:'M151.9,63.5L151.5,63.2L150.9,61.6L151.3,60.5L151.3,59.4L150.6,57.9L150.6,53.2L151.0,52.1L154.2,49.0L154.2,48.7L154.9,48.0L156.5,47.9L157.5,47.1L157.9,47.1L159.0,46.3L160.3,46.4L162.6,47.9L164.2,47.1L165.6,47.1L165.9,47.4L166.2,47.8L163.7,49.6L162.5,51.3L162.3,52.7L162.1,53.0L161.9,55.1L161.3,55.9L161.1,56.7L160.4,57.8L160.5,58.5L159.1,58.6L158.7,58.2L158.6,57.7L158.7,56.1L158.4,55.8L157.5,55.9L157.1,56.4L157.3,58.4L156.9,59.1L155.7,60.1L154.8,60.2L154.4,60.5L153.7,61.6L153.5,62.5L153.0,63.0Z'},{n:4,d:'M195.5,172.4L194.0,171.9L193.7,171.6L189.0,171.6L188.0,171.4L187.7,171.2L185.9,171.0L185.1,170.4L184.2,170.2L182.6,168.9L182.5,168.5L181.8,167.9L181.3,166.7L180.2,165.5L181.4,164.0L181.4,163.7L182.6,162.6L182.6,162.3L184.4,159.8L185.0,160.2L185.6,159.9L187.7,159.9L188.7,160.5L190.4,161.0L190.8,161.4L191.6,161.6L194.0,164.1L194.7,165.3L195.7,168.0L195.7,168.9L196.0,169.2L196.0,169.6L195.7,169.9L196.0,170.6L196.0,172.0Z'},{n:6,d:'M156.2,90.9L154.4,90.6L153.9,90.1L150.8,90.1L150.5,89.8L149.0,90.3L148.2,90.3L147.2,90.8L146.0,90.8L145.1,90.1L145.2,89.2L146.5,87.9L146.6,87.4L147.2,86.8L148.1,86.8L148.9,85.7L150.1,85.3L150.8,83.7L151.3,83.5L152.2,82.4L153.2,82.4L153.5,82.1L153.7,81.2L154.5,79.9L154.5,79.0L154.9,78.3L154.9,77.3L154.6,77.1L154.6,76.6L155.6,76.2L156.1,75.6L157.1,76.3L157.3,77.2L158.2,78.0L159.9,79.1L159.9,79.9L160.2,80.4L161.0,81.0L161.5,81.0L162.6,82.2L162.0,84.4L162.3,85.0L162.3,85.4L163.7,86.9L163.7,87.2L163.1,87.6L162.7,87.4L160.5,87.4L160.3,87.7L158.5,87.8L157.5,88.8L157.5,89.0Z'},{n:3,d:'M54.6,61.5L53.8,59.5L54.3,59.0L54.5,54.7L54.8,54.1L54.9,52.6L55.2,52.3L55.2,49.9L55.7,48.9L55.7,47.7L54.9,46.0L54.3,45.4L53.6,45.1L53.1,44.5L52.1,42.5L51.3,41.4L50.0,41.2L48.4,40.0L47.4,40.0L46.9,39.7L47.4,39.0L47.4,38.4L47.9,37.7L47.8,37.4L48.4,36.9L49.8,36.9L50.8,37.4L51.3,37.4L51.5,37.1L53.7,37.1L53.9,37.4L54.7,37.4L55.1,37.0L56.5,37.3L56.7,37.7L57.9,38.3L58.9,39.3L58.9,39.6L59.6,40.6L59.4,43.4L59.5,44.1L60.0,44.8L59.9,45.8L60.5,47.1L60.5,49.6L58.5,53.0L58.5,54.4L58.3,54.7L58.1,56.1L57.8,56.4L57.1,58.4L55.7,60.7Z'},{n:3,d:'M52.0,77.1L51.3,76.8L51.1,76.6L51.1,76.0L50.0,75.3L48.7,75.2L48.4,75.5L48.0,75.5L47.4,75.1L44.9,75.2L44.7,75.4L44.7,76.6L44.1,76.9L43.8,76.6L43.8,75.4L42.6,74.3L42.2,74.3L40.9,73.4L42.2,70.0L43.2,69.0L45.5,68.8L46.5,68.4L47.7,67.4L48.4,67.4L50.0,66.8L50.6,66.2L50.7,65.6L51.8,64.8L52.7,64.7L53.7,65.2L56.5,65.5L56.7,65.2L57.5,65.2L58.2,64.8L60.0,64.5L60.5,65.4L60.5,66.1L59.7,67.8L58.5,69.0L58.5,69.7L56.6,71.4L56.1,71.4L55.2,72.3L54.4,72.7L52.7,74.3L53.1,76.3L52.8,76.7Z'},{n:4,d:'M16.6,96.8L15.7,96.8L15.0,96.3L14.0,96.5L13.7,96.8L11.0,96.8L10.7,96.5L8.1,96.5L7.7,96.8L7.1,96.5L6.5,95.6L6.5,94.7L7.0,94.0L7.0,93.3L8.2,91.8L8.3,91.0L9.0,90.4L9.5,89.3L11.0,88.6L11.8,87.4L14.3,86.8L15.0,86.2L16.6,86.2L17.4,86.8L18.7,86.6L20.0,87.3L20.3,87.3L21.6,88.6L21.7,89.1L22.3,89.5L23.2,90.4L23.3,91.1L22.9,91.6L22.9,92.1L22.1,93.2L21.8,94.5L21.1,95.2L20.9,96.1L20.5,96.2L20.0,95.8L19.6,95.8L19.3,96.1L18.1,96.2L17.8,96.5L16.9,96.5Z'},{n:1,d:'M36.6,112.9L35.1,111.9L35.1,111.3L34.7,111.0L34.7,109.3L34.4,109.0L34.2,107.6L33.5,106.3L32.9,105.8L30.7,104.6L29.3,104.4L29.1,104.1L27.4,104.1L26.8,104.5L25.0,102.9L23.7,103.2L22.7,102.4L21.4,102.0L21.2,101.7L19.9,101.6L19.3,102.0L17.6,101.7L17.0,101.3L17.0,100.8L17.2,100.0L17.9,99.2L18.0,98.6L18.7,97.8L19.7,97.4L20.8,96.1L21.4,96.2L23.8,96.1L24.8,96.5L25.7,97.4L28.8,97.3L30.1,97.8L30.9,97.9L31.2,98.2L31.9,98.2L32.7,99.4L33.3,99.4L33.6,99.6L33.5,100.9L34.2,101.7L35.5,103.7L37.1,105.2L37.2,105.8L37.7,106.3L37.7,106.9L38.5,108.1L38.4,108.6L37.7,109.6L37.7,111.0L37.3,111.7L37.3,112.3Z'},{n:3,d:'M188.2,126.8L187.5,126.3L186.6,126.2L186.4,125.5L187.2,124.4L187.6,123.1L188.3,121.9L188.5,120.1L189.6,118.7L189.6,118.3L190.0,117.8L190.2,115.1L188.0,112.3L187.0,111.7L186.5,111.7L185.7,111.0L185.7,110.5L185.2,109.5L183.7,107.9L181.2,106.7L179.7,106.7L179.1,107.1L177.6,105.7L176.5,105.1L175.8,104.9L174.8,105.1L172.0,105.0L171.4,103.9L172.3,102.8L173.0,102.5L174.8,102.3L175.1,102.0L176.2,102.0L177.0,101.3L177.3,101.3L178.2,101.7L179.9,101.7L180.1,102.0L182.3,101.7L182.7,102.3L184.9,102.9L185.2,103.8L186.2,105.2L186.4,106.6L187.1,108.2L188.8,110.0L190.3,111.3L191.6,111.7L193.1,113.0L193.5,115.8L193.5,119.5L193.4,120.2L191.9,122.7L190.5,124.0L190.1,124.7L189.0,125.6Z'},{n:1,d:'M99.7,33.3L98.9,33.3L98.5,33.1L98.8,30.7L98.8,28.9L98.7,28.5L98.7,26.7L98.1,26.0L98.7,25.5L98.4,23.4L99.6,22.2L100.8,20.5L101.6,19.9L102.3,19.8L102.8,19.5L104.0,19.5L104.3,19.2L105.6,19.1L106.0,18.8L107.1,19.0L107.3,18.7L108.7,18.5L109.8,17.8L110.4,18.4L110.5,19.6L110.8,19.9L110.8,22.9L110.5,23.2L110.5,24.8L110.2,25.9L110.4,26.8L108.5,28.6L103.2,30.7L102.7,31.2L102.3,31.2L100.9,32.1Z'},{n:9,d:'M25.7,164.0L25.3,163.9L24.8,163.3L24.1,163.2L23.3,162.3L22.8,160.8L22.1,159.8L22.1,159.0L21.8,158.7L21.8,157.9L21.4,157.0L21.6,156.7L21.6,155.3L20.6,154.1L20.6,153.6L19.7,152.5L20.4,151.4L20.6,150.6L20.4,150.3L20.4,148.5L20.1,148.2L19.9,146.8L19.5,145.8L18.9,145.3L18.5,144.2L18.5,143.8L19.0,143.1L19.8,143.4L20.8,144.6L21.1,145.6L21.9,146.4L23.2,146.5L23.4,147.0L23.4,148.2L23.8,148.6L23.9,149.1L24.9,150.3L24.9,151.0L25.4,152.0L26.7,153.1L29.0,155.7L29.7,156.3L30.3,156.4L30.6,156.0L30.6,155.3L31.2,154.7L32.0,154.5L32.7,155.2L33.5,156.5L33.3,157.5L32.7,157.9L32.5,159.1L31.1,161.6L30.9,163.4L30.5,163.8L29.1,163.8L27.8,162.0L27.8,161.3L27.6,161.0L27.0,161.0L26.2,162.1L26.4,163.5Z'},{n:1,d:'M160.3,197.5L159.6,197.4L159.5,196.4L158.5,194.8L158.7,194.2L159.5,193.5L159.7,192.3L160.7,190.6L160.9,186.4L160.4,185.3L159.9,183.0L159.0,181.9L156.6,180.7L156.3,180.1L156.1,177.3L156.5,176.9L157.4,176.9L158.1,176.5L159.2,176.6L160.2,177.0L161.5,177.0L162.3,177.7L164.0,179.5L164.5,180.9L167.0,183.4L167.5,185.0L167.4,188.7L167.1,189.0L167.1,189.7L166.3,191.5L165.4,192.6L165.1,193.5L161.4,197.1Z'},{n:4,d:'M103.8,58.8L102.6,58.2L102.6,55.3L102.2,54.3L101.4,53.8L101.3,52.7L101.7,52.0L101.7,51.5L102.4,50.9L104.2,50.9L105.2,50.5L105.6,49.9L105.5,49.5L105.9,49.1L106.6,49.1L106.9,48.8L109.2,48.8L110.5,48.3L111.2,49.1L112.1,49.1L113.6,50.0L116.2,52.5L117.0,52.7L116.9,54.7L117.5,55.9L117.5,56.7L117.2,57.0L117.0,57.9L116.3,58.5L114.9,58.2L114.2,58.4L111.0,58.4L110.7,58.5L108.8,58.5L108.5,58.4L106.6,58.4L105.4,57.6L104.5,57.6Z'},{n:5,d:'M85.2,264.1L84.4,264.0L83.0,263.3L82.5,263.3L81.4,262.4L80.1,261.9L79.0,261.8L78.9,261.6L79.8,260.2L79.5,259.8L79.5,259.2L78.8,258.4L78.8,257.7L79.3,257.2L79.8,256.2L79.8,254.8L80.4,253.8L79.8,251.7L79.5,251.4L79.5,250.5L79.8,250.2L79.8,249.0L80.5,248.4L80.5,246.7L81.3,245.5L83.2,247.3L83.8,248.6L84.9,250.0L85.0,250.5L86.7,252.0L86.4,252.7L85.9,252.8L85.3,253.3L85.4,254.2L86.2,254.9L86.7,255.0L88.0,254.2L88.5,254.2L89.3,254.7L89.3,255.1L90.3,256.5L90.3,256.9L90.0,257.2L90.0,258.1L90.3,258.4L90.3,259.1L90.0,259.3L90.0,260.5L90.3,260.8L90.5,261.9L90.9,262.3L90.9,262.9L91.5,263.5L91.4,263.9L90.4,264.0L89.4,263.6L87.5,261.6L86.4,261.2L85.4,260.2L84.2,259.9L83.8,260.4L83.8,260.7L85.3,262.5L85.5,263.7Z'},{n:4,d:'M56.5,37.3L55.2,37.1L54.9,36.9L54.9,35.9L54.0,35.1L53.8,32.7L55.1,31.6L53.5,30.5L53.2,30.1L53.2,28.8L53.5,28.6L54.1,28.6L55.6,27.5L56.2,27.4L56.9,26.7L57.7,26.9L59.7,25.4L60.6,25.4L61.7,24.2L62.5,24.1L63.0,23.7L66.0,23.5L66.8,24.0L67.7,24.1L67.8,25.1L67.6,25.7L67.8,26.0L66.6,27.5L66.6,28.1L67.1,28.9L67.1,29.4L66.4,30.1L66.0,31.2L65.4,31.6L65.4,32.6L64.9,33.5L64.1,34.1L62.3,34.2L61.3,34.7L59.4,34.7L59.1,35.0L58.2,35.0L57.9,35.3L58.1,36.2L57.7,36.6L57.0,36.6Z'},{n:3,d:'M153.3,191.6L152.7,191.5L152.5,190.9L153.2,189.7L153.5,187.3L152.6,186.2L152.0,186.2L151.4,185.7L152.4,184.2L152.3,183.0L151.9,182.5L151.9,181.6L150.6,180.3L150.3,180.3L149.8,179.8L150.4,179.0L150.4,176.3L150.8,175.3L150.8,174.1L149.4,172.7L148.4,172.1L147.2,171.9L146.9,171.6L142.7,171.9L142.4,171.5L143.6,169.5L144.3,170.0L146.9,169.8L148.2,168.6L149.0,168.6L150.2,169.4L150.9,169.4L152.2,168.0L152.6,168.1L153.2,168.7L153.4,169.3L154.9,170.1L155.8,172.1L157.8,174.7L158.2,176.4L157.4,176.9L156.5,176.9L156.1,177.3L156.5,180.7L155.3,183.3L155.4,185.3L155.7,185.6L155.7,189.0L155.3,189.4L155.3,189.8Z'},{n:5,d:'M84.8,234.2L83.8,233.3L83.6,231.2L83.0,230.6L82.1,230.6L80.7,229.1L80.7,228.8L79.3,227.4L79.3,226.6L80.0,225.7L79.1,224.7L79.0,224.0L79.8,222.8L79.7,221.8L80.1,221.0L81.1,220.8L81.8,220.4L83.2,220.4L84.2,219.4L85.6,219.4L86.1,219.1L86.5,219.5L86.8,220.4L88.8,221.5L88.8,223.0L89.8,224.5L90.5,226.5L90.5,227.9L91.2,228.8L91.2,229.2L91.7,230.0L91.5,230.7L91.6,232.2L91.5,232.6L90.6,232.7L90.3,233.0L89.6,232.6L88.8,232.5L88.0,232.0L86.8,231.8L85.7,232.5L85.5,232.9L85.5,233.8Z'},{n:1,d:'M98.5,33.0L94.9,32.9L92.5,30.3L91.4,29.8L90.8,29.2L89.5,28.6L89.0,28.2L87.5,27.5L85.5,25.5L85.4,25.0L85.0,24.6L85.0,23.4L84.6,22.5L85.5,21.8L85.7,21.3L86.2,18.8L86.7,17.8L87.6,18.1L89.0,19.0L90.2,19.2L90.9,20.0L90.9,20.2L92.3,21.4L94.2,21.6L95.2,22.1L95.8,22.7L95.8,22.9L97.0,24.3L97.2,25.1L98.7,26.7L98.8,30.7Z'},{n:5,d:'M89.1,205.8L88.8,205.8L87.5,205.1L86.4,205.1L86.1,205.3L85.6,205.3L85.3,205.1L83.8,205.1L83.5,205.3L81.3,205.6L81.0,204.5L81.0,203.1L81.3,202.6L82.0,202.3L82.8,200.9L83.3,200.5L83.8,200.5L84.2,200.1L84.4,199.4L85.0,198.8L85.1,198.7L85.7,199.4L85.7,199.7L86.1,200.0L86.8,200.0L87.1,199.4L87.0,198.1L87.5,195.7L86.7,193.9L85.9,193.0L85.9,191.6L86.4,191.2L87.0,191.2L87.3,190.9L89.1,190.8L90.8,191.2L91.9,190.5L93.5,190.4L94.0,191.4L93.8,191.9L93.5,192.3L93.5,192.8L92.4,193.5L91.8,195.2L92.9,196.1L93.2,196.8L94.5,198.4L94.6,199.2L93.8,200.0L93.6,201.4L92.9,202.1L92.9,203.1L92.2,204.3L92.3,204.9L92.2,205.3L91.7,205.6L89.4,205.5Z'},{n:6,d:'M64.8,89.4L64.3,89.3L63.6,88.0L62.7,87.5L62.2,86.2L61.4,85.5L61.1,84.7L60.5,84.0L60.5,83.3L60.2,82.8L58.3,81.6L58.5,79.9L58.0,79.7L57.8,79.1L57.3,78.7L56.9,77.1L55.6,76.8L54.9,76.9L54.6,77.2L53.3,77.2L52.9,76.7L53.1,75.7L52.8,75.4L52.7,74.3L54.4,72.7L55.2,72.3L56.1,71.4L56.6,71.4L57.9,70.1L58.5,69.8L59.0,70.1L60.9,70.1L61.1,70.3L61.5,71.5L61.1,73.3L61.4,73.5L61.4,75.9L61.6,76.3L63.0,77.2L64.2,77.2L65.3,77.7L66.3,78.6L66.0,79.8L65.9,81.3L66.2,82.8L65.7,85.0L65.4,85.2L65.7,87.1L64.9,88.0Z'},{n:2,d:'M50.3,220.7L49.0,219.2L48.8,217.8L48.2,217.2L46.1,217.2L45.6,216.9L44.4,215.2L44.4,214.9L42.4,212.7L41.8,212.3L41.6,211.4L40.3,209.8L38.6,209.6L38.3,209.2L37.7,209.1L37.1,208.6L36.7,207.7L35.7,206.7L34.5,206.0L33.9,206.0L33.4,205.6L33.2,205.2L33.8,204.5L33.8,203.8L34.4,203.3L35.0,203.8L35.4,205.0L36.2,205.8L41.2,205.8L42.3,206.1L44.1,204.8L45.3,204.8L47.1,205.8L47.6,205.8L48.5,206.3L49.1,206.3L49.9,206.7L50.8,206.7L51.0,207.0L50.6,207.4L50.6,207.8L49.9,208.3L49.4,209.3L49.3,211.3L49.0,211.6L49.3,212.8L49.8,213.6L49.9,214.5L51.4,216.9L51.4,217.8L51.1,218.1L51.1,220.1Z'},{n:4,d:'M163.4,172.1L162.1,172.1L161.3,171.3L160.9,170.3L160.9,169.5L160.4,168.4L160.2,167.0L160.7,164.3L160.9,164.0L161.7,164.0L163.1,164.8L164.1,164.9L164.6,165.5L165.6,165.7L166.6,163.7L166.6,163.0L167.4,161.7L168.0,158.9L168.0,157.3L168.6,156.6L169.4,156.6L170.3,157.3L170.9,157.3L171.5,158.0L172.0,158.0L172.1,159.1L173.0,159.9L172.7,160.6L173.3,161.7L173.3,163.4L173.0,163.7L173.3,164.8L173.0,165.1L173.0,167.5L172.6,168.2L172.6,169.7L172.1,170.1L171.4,171.4L170.8,171.2L170.4,170.6L170.4,169.9L170.0,169.4L169.2,169.3L167.7,169.8L166.8,170.7L164.5,171.4Z'},{n:9,d:'M50.4,145.0L49.3,144.2L48.9,143.3L48.4,142.8L46.7,141.5L46.7,140.8L46.3,140.4L45.5,140.3L45.1,139.2L44.6,139.0L43.5,137.9L43.3,137.4L40.2,134.5L39.9,132.9L40.2,132.5L40.0,131.0L39.3,130.5L39.4,129.8L40.0,129.2L39.5,128.3L39.6,127.8L42.0,126.8L42.4,126.8L43.0,127.2L43.0,128.6L43.4,129.2L45.8,131.2L47.4,132.1L48.4,132.3L49.1,132.8L50.6,132.9L50.6,134.5L50.9,134.8L50.6,137.0L52.1,138.2L52.3,139.1L51.9,139.8L51.9,140.3L52.1,140.6L52.1,141.5L51.9,141.8L51.9,143.4L52.1,143.6L52.1,144.1L51.6,144.6L50.8,144.7Z'},{n:9,d:'M57.3,154.9L57.0,154.7L55.6,154.7L54.6,154.0L51.7,154.0L50.5,152.8L50.0,152.8L49.8,153.1L49.1,153.1L48.8,152.8L47.5,152.8L46.2,153.8L45.0,154.2L44.7,153.7L44.7,152.5L45.0,152.2L45.0,151.7L44.7,151.4L44.7,148.5L44.4,148.2L44.4,146.5L44.0,145.8L44.0,144.4L43.5,143.1L41.9,142.0L42.1,141.2L42.0,139.9L42.6,139.8L43.9,140.6L44.8,140.6L45.4,140.3L46.3,140.4L46.7,140.8L46.7,141.5L48.9,143.3L49.0,143.8L49.5,144.4L50.4,145.0L50.8,144.7L51.7,144.6L52.6,145.8L52.8,147.0L53.9,148.0L54.9,149.5L55.3,150.8L56.5,151.1L56.4,152.9L57.3,153.5L57.8,154.2Z'},{n:4,d:'M143.1,83.0L142.4,82.8L141.8,80.4L141.1,79.7L139.6,78.6L137.6,77.9L136.1,76.6L134.9,74.9L134.9,74.2L134.4,73.4L134.1,71.4L134.8,70.2L134.9,68.1L135.5,67.9L136.4,66.9L136.8,66.0L138.1,64.8L139.1,65.6L140.0,66.9L140.8,67.4L141.8,68.9L143.7,70.3L144.7,71.9L144.8,72.7L145.3,73.5L145.4,74.9L144.2,77.5L144.0,78.9L143.5,79.8L143.5,80.9L143.2,81.2L143.5,82.5Z'},{n:4,d:'M113.5,72.4L112.3,72.4L110.4,71.4L109.0,71.3L108.7,70.8L108.9,69.0L108.4,68.0L108.4,66.1L107.9,65.1L107.9,64.0L106.7,61.6L103.9,58.9L104.5,57.6L105.4,57.6L106.6,58.4L108.5,58.4L108.8,58.5L114.0,58.4L114.3,58.5L114.3,59.3L114.7,60.3L116.3,61.8L116.5,62.3L116.5,66.6L115.6,67.8L115.8,69.9L115.6,70.5L113.8,71.8Z'},{n:9,d:'M53.9,147.9L52.8,147.0L52.6,145.8L51.7,144.6L52.1,144.1L52.1,143.6L51.9,143.4L51.9,141.8L52.1,141.5L52.1,140.6L51.9,140.3L51.9,139.8L52.3,139.1L52.3,138.6L52.0,138.1L50.6,137.0L50.9,134.8L50.6,134.5L50.6,132.9L51.2,132.3L52.2,132.1L52.8,131.7L52.8,130.6L52.1,129.8L52.1,127.4L52.3,127.1L52.2,125.7L52.6,125.3L52.6,124.6L53.1,124.0L53.2,123.3L54.3,123.3L55.6,122.5L56.3,122.5L56.6,122.8L56.6,123.8L55.0,127.7L55.5,128.0L56.1,127.5L56.9,127.5L57.6,128.6L57.6,132.7L57.8,133.8L58.1,134.1L58.2,135.4L57.7,136.8L57.8,137.1L58.5,137.9L58.5,138.8L58.1,139.7L57.2,138.9L56.7,138.9L56.1,139.8L56.1,140.4L55.6,140.9L54.9,142.0L54.9,145.0L54.0,146.8L54.1,147.4Z'},{n:1,d:'M36.7,60.9L35.6,60.1L33.3,58.0L31.8,57.4L30.9,56.9L27.7,56.9L27.3,57.1L26.9,57.0L26.3,57.4L26.3,58.5L26.1,58.8L24.6,58.7L23.4,57.4L22.9,56.5L22.9,54.5L23.8,52.2L23.7,50.7L23.3,49.7L23.4,48.3L25.3,47.1L26.2,46.9L28.4,44.7L29.3,44.5L29.6,44.2L30.5,44.2L30.9,44.8L30.9,46.1L31.2,46.6L30.4,48.2L30.4,49.9L31.0,51.0L32.1,52.0L32.3,52.7L33.3,54.0L34.1,54.5L34.8,54.5L35.6,55.2L35.5,56.3L35.9,57.0L35.9,58.4L36.7,59.8Z'},{n:4,d:'M168.4,99.2L167.9,98.6L166.6,98.2L166.2,97.8L163.1,97.9L162.5,97.7L162.2,97.4L161.3,97.3L159.3,95.8L158.6,95.5L157.5,93.7L156.3,92.6L156.1,92.1L156.2,90.8L157.5,89.0L157.5,88.8L158.5,87.8L160.3,87.7L160.5,87.4L162.7,87.4L163.1,87.6L163.9,87.2L164.7,87.7L164.7,88.3L164.9,88.5L166.7,89.5L167.5,90.3L167.5,90.6L169.0,92.4L169.7,94.5L169.7,98.7Z'},{n:9,d:'M151.2,143.6L150.4,143.4L150.4,141.2L149.9,140.5L150.4,138.3L150.5,136.1L150.2,135.0L150.4,132.7L150.0,131.8L150.0,131.1L150.5,130.6L151.7,130.4L152.3,129.8L152.3,127.7L151.6,126.9L151.1,126.0L151.2,124.9L152.3,124.0L153.3,124.6L155.1,126.1L155.6,126.2L156.0,126.6L156.5,126.6L157.2,127.1L158.5,127.1L159.3,128.0L159.1,128.3L159.1,129.5L159.5,130.6L159.0,131.7L158.4,132.1L157.7,132.1L155.8,133.7L155.2,135.1L155.2,135.8L155.9,136.4L156.3,136.1L157.8,136.0L158.3,136.4L157.8,137.6L155.8,139.4L155.8,139.7L154.4,141.1L153.2,141.7L151.6,143.4Z'},{n:3,d:'M106.4,34.2L105.9,34.0L103.5,34.0L103.2,33.8L100.9,33.8L100.0,33.1L100.9,32.1L102.3,31.2L102.7,31.2L103.2,30.7L108.5,28.6L110.5,26.8L111.5,26.5L112.2,25.8L112.9,25.4L113.7,24.2L115.9,22.1L117.5,19.1L118.8,20.2L120.4,21.0L121.8,22.9L120.8,23.6L119.6,24.1L118.7,25.8L115.9,27.8L114.7,30.9L113.7,32.0L112.8,32.8L111.9,33.0L111.6,33.3L107.8,33.3L107.0,33.7Z'},{n:1,d:'M168.6,78.6L166.8,78.6L165.8,78.0L165.3,77.4L164.2,77.3L162.2,76.0L161.3,74.9L161.3,73.7L161.9,73.0L162.1,71.6L162.3,71.3L162.3,69.5L162.8,68.7L163.3,68.8L164.6,68.1L166.6,67.9L167.2,68.3L167.2,68.6L167.7,69.1L169.4,69.3L169.6,69.6L170.5,69.8L172.7,69.8L173.0,70.1L175.6,70.5L176.5,71.1L176.4,71.7L174.6,73.4L174.5,73.7L171.8,75.9L171.8,76.6L172.1,77.1L171.2,77.9Z'},{n:4,d:'M171.0,157.3L170.3,157.3L169.4,156.6L168.6,156.6L168.0,155.8L167.8,153.4L166.3,150.2L165.2,148.8L162.2,146.8L160.8,146.8L159.8,146.4L158.4,146.6L157.8,146.1L157.3,143.5L158.1,142.6L160.1,141.6L161.5,141.6L162.7,141.0L163.7,142.1L165.1,142.3L165.4,142.6L166.5,142.8L168.2,143.8L168.7,143.7L170.7,147.4L170.9,148.8L171.2,149.1L171.2,151.3L171.6,152.3L171.6,153.9L171.2,154.6L171.2,155.1L171.6,155.8L171.6,156.5Z'},{n:1,d:'M111.1,38.8L105.7,38.6L105.2,37.8L105.8,37.3L105.8,36.8L106.5,35.6L106.4,34.3L107.0,33.7L107.8,33.3L111.6,33.3L111.9,33.0L112.8,32.8L114.7,30.9L115.9,27.8L116.8,27.0L117.2,27.0L118.1,26.4L118.9,25.5L118.9,25.1L119.6,24.1L121.7,23.0L122.6,23.2L123.0,23.7L123.0,24.3L121.5,26.3L120.8,29.1L120.6,29.6L119.2,31.0L118.6,32.3L117.5,33.1L117.2,33.7L117.1,35.0L116.5,36.6L115.5,37.6L114.0,38.3L112.8,38.3L112.5,38.6Z'},{n:1,d:'M89.9,15.6L89.2,15.4L88.3,13.6L88.3,12.2L87.2,11.0L86.5,10.6L85.1,10.6L84.9,10.9L84.3,10.9L84.0,10.3L84.1,9.4L84.5,8.5L84.5,7.7L85.4,6.6L85.9,5.0L87.8,3.2L89.7,2.6L92.0,2.6L94.5,3.4L97.7,2.6L100.3,2.6L101.5,3.3L102.0,3.8L102.0,4.7L101.6,5.3L100.6,5.9L100.2,6.1L99.4,6.1L98.9,5.8L97.6,5.9L96.1,5.4L94.9,6.4L94.1,6.5L92.5,8.0L91.5,10.3L91.5,11.0L92.2,11.7L92.2,12.2L91.2,12.7L90.8,13.6L90.5,15.1Z'},{n:1,d:'M56.4,194.3L52.7,192.4L51.7,192.4L50.6,191.5L49.1,190.9L48.5,190.3L48.5,189.0L51.6,186.0L51.6,185.6L53.0,183.9L54.1,183.1L57.6,179.7L58.1,178.5L59.0,177.7L59.7,177.7L60.2,178.5L60.5,180.9L60.2,181.2L59.7,183.5L59.5,183.8L59.4,185.5L59.0,186.2L58.8,187.5L58.5,187.7L58.5,188.5L57.3,191.1L57.1,192.3L56.9,192.6L56.9,194.1Z'},{n:9,d:'M60.5,101.5L59.5,100.5L59.5,99.5L59.0,98.8L58.8,97.9L58.3,97.3L58.2,96.8L57.3,95.4L56.0,94.6L56.1,92.3L55.7,91.8L55.6,91.3L54.1,90.1L53.0,90.3L53.0,89.6L53.2,89.2L53.2,87.6L54.4,86.5L54.5,85.8L55.0,85.5L55.8,85.4L57.5,85.7L58.7,84.5L59.1,84.5L59.8,85.5L59.3,86.4L59.4,87.1L60.5,87.3L61.6,88.5L61.6,89.7L62.7,90.8L63.4,90.8L64.0,91.0L64.4,91.7L64.4,92.9L64.0,93.3L64.0,94.7L62.8,96.7L62.6,98.1L62.3,98.4L61.6,100.1L61.1,100.5L61.0,101.0Z'},{n:4,d:'M136.4,95.0L135.8,94.4L135.6,93.3L134.9,92.8L134.9,92.3L133.2,89.7L133.1,89.1L132.7,88.8L132.5,87.1L132.0,86.6L131.5,85.6L131.8,82.5L132.1,82.2L132.5,82.2L133.2,83.0L134.2,82.9L134.5,82.1L136.2,81.9L137.9,80.7L140.3,80.5L140.9,81.3L142.0,81.5L142.5,82.9L141.6,83.8L141.4,85.6L141.1,85.9L140.2,88.8L140.2,90.6L139.1,91.9L139.0,92.5L137.4,94.3Z'},{n:3,d:'M22.7,137.3L21.9,137.3L21.6,137.0L21.2,135.7L21.4,135.0L22.1,134.2L22.2,133.6L23.4,132.5L24.1,132.3L25.3,131.3L26.6,131.2L28.9,129.7L29.4,129.6L30.4,128.8L31.3,128.5L31.8,128.0L32.3,127.9L32.9,127.3L35.1,126.3L35.8,125.4L38.5,125.4L38.5,126.2L39.4,127.3L39.5,128.3L40.0,129.2L39.3,130.1L39.3,130.5L40.0,131.0L40.2,132.5L39.9,132.8L38.7,132.2L37.3,130.5L36.5,130.4L34.6,131.8L33.6,132.3L31.7,134.2L30.3,134.4L29.5,135.0L28.4,135.1L27.8,135.5L27.3,136.2L27.3,136.6L26.6,137.1L25.7,136.7L24.9,136.7L24.3,137.0L24.0,136.6L23.3,136.6Z'},{n:2,d:'M21.4,135.0L20.9,134.3L18.8,134.3L18.3,134.0L18.0,133.3L18.0,131.2L17.6,130.6L19.2,129.3L19.3,128.7L17.7,127.1L18.0,126.5L18.8,125.6L20.2,125.4L20.5,125.1L23.1,125.1L23.4,125.4L24.8,125.4L25.7,125.6L26.0,125.9L26.9,125.9L27.2,124.9L27.8,124.8L29.8,126.1L30.5,126.1L32.4,124.9L33.5,123.9L33.8,124.0L33.9,124.5L34.5,125.1L35.5,125.1L35.8,125.3L35.1,126.3L32.9,127.3L32.3,127.9L31.8,128.0L31.3,128.5L30.4,128.8L29.4,129.6L28.9,129.7L26.6,131.2L25.3,131.3L24.1,132.3L23.4,132.5L22.2,133.6L22.1,134.2Z'},{n:4,d:'M50.6,132.8L49.1,132.8L48.4,132.3L47.4,132.1L45.8,131.2L43.4,129.2L43.0,128.6L43.0,127.2L42.4,126.8L42.0,126.8L39.6,127.8L39.4,127.3L38.5,126.2L38.5,125.3L39.5,124.5L39.9,123.7L41.1,122.7L42.2,123.3L42.9,123.3L44.8,121.8L46.0,121.8L46.2,122.1L47.4,122.2L48.2,122.8L48.7,122.9L49.5,123.4L50.6,124.4L50.7,124.9L51.7,125.8L52.2,125.9L52.3,126.2L52.1,129.8L52.8,130.6L52.8,131.7L52.2,132.1L51.2,132.3Z'},{n:4,d:'M66.7,43.6L66.3,43.3L64.9,43.6L63.3,42.0L62.9,41.0L63.1,39.8L63.6,39.1L63.6,37.2L64.5,35.3L64.0,34.2L64.9,33.5L65.5,32.4L66.9,32.4L67.2,32.1L67.8,32.1L69.6,30.9L71.3,30.9L72.7,32.0L72.7,33.4L72.4,33.7L72.4,34.8L72.7,35.2L72.5,35.6L72.7,35.8L72.5,36.5L72.7,37.6L71.9,38.7L71.9,39.8L71.5,40.3L71.5,40.7L70.6,41.6L69.4,42.4L68.2,42.6Z'},{n:1,d:'M161.3,113.3L160.1,112.4L160.2,109.3L160.7,108.5L160.9,107.1L161.1,106.9L161.3,105.0L161.6,104.7L161.5,104.1L163.4,102.0L164.8,101.3L165.7,101.2L166.9,100.7L167.6,100.2L168.5,99.1L169.6,98.7L170.6,99.1L172.7,99.1L173.9,98.5L174.8,98.5L175.9,99.2L177.1,101.0L176.8,101.6L176.2,102.0L175.1,102.0L174.8,102.3L173.0,102.5L171.1,104.0L169.8,103.5L168.9,103.7L167.7,104.4L165.9,106.7L165.8,107.2L165.4,107.6L165.2,108.8L164.9,109.1L164.9,109.8L164.7,110.1L164.2,110.1L163.7,110.5L163.3,112.6L163.0,112.9L161.7,113.0Z'},{n:5,d:'M93.8,252.0L92.8,251.9L92.2,251.0L92.0,247.9L91.7,247.6L91.7,247.1L91.2,246.7L91.0,246.0L91.2,245.7L91.0,244.6L91.5,243.8L91.5,243.4L91.2,243.0L90.4,243.0L89.7,243.5L89.2,243.5L88.5,243.1L87.6,241.9L87.4,239.8L87.9,238.8L87.9,236.7L86.7,235.2L86.5,234.5L85.5,233.8L85.5,232.9L86.0,232.3L86.8,231.8L88.0,232.0L88.8,232.5L89.6,232.6L90.3,233.0L90.6,232.7L91.6,232.6L92.0,233.3L92.2,236.2L91.7,237.0L91.7,237.4L93.6,239.1L93.8,240.0L94.1,240.3L94.3,241.7L95.3,243.2L94.9,244.1L94.9,246.9L95.5,248.4L95.0,249.3L94.8,251.0Z'},{n:9,d:'M94.8,193.2L94.4,192.9L93.5,192.8L93.5,192.3L94.0,191.4L93.7,190.6L93.4,190.3L93.3,189.6L92.9,189.1L92.9,188.5L92.2,187.1L92.4,186.4L93.4,185.7L93.4,183.8L93.9,183.2L94.7,183.5L95.5,183.1L96.0,182.2L96.7,181.5L96.8,179.6L97.6,179.3L98.3,179.5L102.0,179.4L102.5,179.9L102.5,181.3L102.0,182.3L102.0,183.0L102.4,183.6L101.7,184.2L101.3,185.1L101.3,188.7L101.7,189.2L101.9,190.3L101.3,190.8L100.5,190.8L100.2,190.5L98.1,190.5L97.8,190.8L97.3,190.8L95.8,192.2L95.5,192.8Z'},{n:4,d:'M81.8,202.6L81.3,202.6L80.8,201.6L79.2,202.0L77.7,200.4L76.6,200.3L76.1,200.0L74.8,198.1L75.0,197.1L75.4,196.6L75.2,195.9L76.0,194.4L76.0,192.6L75.4,191.8L75.4,191.4L76.8,189.2L78.6,189.2L79.7,189.8L80.7,189.8L81.9,190.9L83.1,192.6L83.3,194.0L83.6,194.2L83.8,198.1L84.2,198.4L85.0,198.5L85.1,198.8L84.4,199.4L84.2,200.1L83.8,200.5L83.3,200.5L82.7,201.0Z'},{n:1,d:'M139.3,203.5L138.2,203.5L134.4,201.6L132.7,199.9L132.6,199.4L132.0,198.5L132.0,198.1L131.3,196.8L131.3,195.9L131.1,195.6L131.1,192.3L130.6,191.6L130.6,190.9L131.2,189.4L131.1,188.9L132.1,187.4L133.1,187.6L133.5,188.0L134.1,190.2L134.7,190.6L135.2,191.7L138.0,194.4L139.0,196.0L139.2,197.6L139.9,198.3L140.1,200.2L140.1,202.5Z'},{n:4,d:'M16.4,181.5L15.8,181.5L15.4,180.9L15.4,178.3L15.6,178.0L15.4,177.5L15.4,175.6L15.6,174.5L17.0,172.1L18.1,171.2L18.7,171.1L19.0,170.7L21.3,170.2L21.9,170.2L23.1,171.0L24.5,171.2L25.2,171.5L25.9,172.5L25.9,173.4L25.1,174.7L25.1,177.3L24.7,178.1L21.9,179.8L21.3,179.8L20.0,180.5L17.6,180.7Z'},{n:1,d:'M68.6,199.6L67.8,199.6L66.1,198.6L66.5,197.2L66.5,195.8L66.2,195.3L64.9,194.0L65.2,193.3L66.8,192.0L67.9,192.2L68.6,192.0L69.6,191.5L71.0,190.4L71.6,189.8L71.6,189.4L72.4,188.2L72.4,187.1L72.7,186.4L74.2,185.8L75.1,187.0L75.4,187.0L76.2,187.7L76.7,189.1L75.4,191.4L75.4,191.8L76.0,192.6L76.0,194.4L75.3,195.8L74.4,196.5L72.3,197.5L71.0,198.7L70.1,198.8Z'},{n:4,d:'M53.2,28.7L51.7,28.6L49.6,27.3L49.4,26.0L49.0,25.1L49.0,22.0L49.3,21.7L49.3,20.5L49.9,18.8L49.9,17.5L50.9,16.2L51.1,15.5L51.8,14.8L52.6,14.8L53.9,16.5L55.1,17.0L57.1,18.8L57.1,19.3L56.9,19.6L56.9,21.0L56.6,21.3L56.6,22.4L56.1,23.4L56.1,23.9L56.9,24.9L57.0,26.6L56.2,27.4L55.6,27.5L54.1,28.6Z'},{n:1,d:'M31.2,46.5L30.9,46.1L30.9,44.8L30.5,44.3L30.9,43.6L31.1,42.1L31.7,41.1L31.8,40.6L32.5,39.8L35.3,37.6L36.5,37.4L36.8,37.1L37.4,37.4L38.6,37.4L40.1,36.4L42.0,35.7L45.0,35.9L45.5,36.3L45.9,36.3L46.6,37.0L47.9,37.5L47.4,38.4L47.4,39.0L46.9,39.8L46.3,39.8L45.0,40.7L43.8,40.9L41.5,40.7L40.4,41.3L39.6,42.1L38.8,41.9L37.4,42.1L36.1,43.1L35.0,44.6L33.4,44.7Z'},{n:4,d:'M58.8,108.3L57.8,108.2L57.5,107.9L56.5,107.9L55.8,107.5L54.2,107.5L53.5,106.5L52.6,106.5L50.8,105.1L49.9,104.9L47.9,103.3L47.8,102.5L47.3,102.1L47.1,101.6L47.1,98.6L47.6,97.8L47.9,96.2L48.5,95.8L49.3,95.7L50.6,96.5L51.4,96.5L52.2,96.9L53.9,98.4L55.5,101.4L57.2,103.4L58.1,105.5L58.4,105.8L59.0,105.8L59.5,106.6L59.5,107.4Z'},{n:3,d:'M144.8,205.3L143.6,205.3L142.9,204.8L141.1,204.8L139.8,203.1L139.9,202.7L140.1,202.5L142.2,202.0L142.4,201.7L143.8,201.5L144.1,201.3L146.7,201.0L149.0,200.3L149.3,200.0L150.2,199.9L151.7,198.8L153.9,198.2L154.4,197.5L157.8,195.0L158.6,194.9L159.1,195.5L159.1,195.9L159.5,196.4L159.6,197.6L158.5,199.0L158.3,199.9L156.8,200.9L153.9,204.1L151.3,204.3L150.5,203.9L149.3,203.9L147.6,204.6L145.8,204.8Z'},{n:5,d:'M83.7,243.0L83.3,243.0L82.5,242.5L81.4,242.3L80.1,241.4L79.3,240.3L77.7,238.9L77.7,237.7L76.5,236.7L76.5,236.2L75.8,235.2L75.2,235.2L74.3,235.9L73.0,235.2L73.3,233.3L74.4,232.0L75.4,230.0L74.6,226.4L75.0,225.8L76.0,226.0L76.5,226.4L77.8,228.2L78.3,228.6L79.2,228.9L79.8,229.8L79.8,231.2L80.6,231.9L80.5,232.9L81.0,234.1L81.9,235.0L82.1,236.2L83.1,238.3L82.8,240.1L83.6,240.9L84.1,242.0L84.1,242.6Z'},{n:4,d:'M95.0,220.2L94.4,220.1L93.3,218.7L91.6,218.7L90.8,217.8L90.0,216.3L89.2,215.4L89.1,214.9L89.1,213.6L89.8,211.9L90.1,210.6L89.8,208.3L91.2,206.9L91.6,206.2L91.6,205.7L92.4,204.9L94.4,205.1L94.7,205.3L95.4,205.4L96.1,206.1L95.5,206.9L94.9,208.6L94.3,209.3L94.2,209.8L93.8,210.2L93.7,211.0L93.4,211.6L93.4,213.6L94.2,214.1L95.2,213.4L95.6,213.4L97.0,212.6L97.4,212.6L98.8,211.6L99.4,211.5L99.5,212.2L99.9,212.6L99.9,213.0L98.7,214.0L97.6,215.8L96.0,217.2L95.8,219.2Z'},{n:1,d:'M163.3,68.8L162.6,68.5L162.1,65.4L161.3,64.2L160.7,62.0L159.7,60.8L159.7,60.4L159.2,59.6L159.2,58.7L161.6,58.4L165.2,55.8L165.7,55.8L165.9,57.3L166.2,57.6L166.2,58.7L166.6,59.4L166.6,60.1L167.9,62.4L168.0,63.0L169.1,63.8L170.0,65.2L170.1,65.8L170.0,67.5L169.4,68.1L167.7,68.1L167.2,68.4L166.6,67.9L165.4,67.9Z'},{n:4,d:'M135.0,82.1L134.5,82.1L134.1,81.3L133.9,79.9L132.0,78.3L131.9,77.2L131.6,76.9L130.0,76.9L128.7,75.8L128.5,74.0L128.2,73.7L128.3,70.8L131.2,69.6L131.7,69.0L132.4,68.8L133.9,67.6L134.5,67.6L134.9,68.0L134.8,70.2L134.1,71.4L134.1,72.2L134.4,72.5L134.4,73.4L134.9,74.2L134.9,74.9L135.1,75.4L137.2,77.7L140.2,79.0L141.8,80.4L142.0,80.9L141.9,81.4L141.2,81.4L140.3,80.5L138.6,80.5L137.9,80.7L136.2,81.9Z'},{n:4,d:'M61.4,163.6L60.6,163.2L59.7,162.3L59.3,162.3L58.9,161.9L58.4,161.9L58.1,162.2L57.3,162.0L57.3,160.6L57.1,160.1L56.6,159.6L56.4,158.4L55.8,157.1L55.8,156.7L57.7,154.6L57.8,154.2L57.3,153.5L59.0,149.4L59.4,148.7L60.9,147.4L61.4,147.9L61.4,148.4L61.9,149.1L61.9,150.2L62.6,151.1L62.8,152.0L63.9,153.9L63.9,154.3L63.0,154.7L62.5,155.5L62.8,156.5L63.3,156.9L63.3,158.4L62.6,159.9L62.8,161.8L61.6,163.0Z'},{n:3,d:'M153.1,73.5L151.9,73.0L151.3,72.2L148.9,71.4L148.2,70.4L148.2,69.9L147.5,69.5L147.0,68.0L145.8,66.8L145.6,65.4L145.4,65.1L145.4,63.0L145.7,62.5L145.8,61.6L146.1,61.3L145.8,58.2L146.1,57.9L146.1,57.3L146.7,56.8L147.9,57.1L149.6,58.9L150.0,59.4L150.2,60.5L150.9,61.4L151.4,63.0L152.8,65.8L152.4,66.4L152.3,67.5L152.5,68.7L152.8,69.0L152.9,72.4Z'},{n:1,d:'M149.8,179.8L149.1,179.8L148.5,179.2L148.2,178.2L147.1,177.0L146.7,177.0L146.2,176.6L144.6,176.5L142.6,175.0L141.7,174.8L141.4,174.5L137.7,173.7L137.3,173.3L137.3,172.5L137.0,172.1L136.2,171.9L135.6,171.3L135.8,170.4L138.2,168.3L138.9,168.0L139.6,168.1L140.7,168.3L141.5,168.8L142.9,169.0L143.6,169.5L143.2,170.4L142.4,171.5L142.7,171.9L146.9,171.6L147.2,171.9L148.1,172.0L149.4,172.7L150.8,174.1L150.8,175.3L150.4,176.3L150.4,179.0Z'},{n:3,d:'M57.4,194.3L56.9,194.1L56.9,192.6L57.1,192.3L57.3,191.1L58.5,188.5L58.5,187.7L58.8,187.5L59.0,186.2L59.4,185.5L59.5,183.8L59.7,183.5L59.9,182.1L60.5,180.9L60.2,178.5L59.7,177.6L60.5,176.3L61.0,173.9L61.3,173.4L61.8,173.1L62.3,173.3L63.6,174.7L64.8,177.0L64.8,177.7L63.8,179.7L63.8,180.1L64.3,180.9L64.3,181.5L64.0,181.8L64.0,183.8L64.0,184.7L64.3,185.1L62.7,188.2L62.7,188.6L61.6,190.0L61.6,190.3L60.7,191.1L60.5,191.5L59.6,192.0Z'},{n:9,d:'M161.3,177.1L160.2,177.0L158.1,176.3L157.8,174.7L155.8,172.1L154.9,170.1L153.4,169.3L153.0,168.3L152.2,168.0L151.9,167.6L152.2,166.9L153.0,166.9L155.1,166.0L155.7,165.4L156.1,164.2L157.9,162.8L158.6,162.8L160.8,164.1L160.2,166.6L160.4,168.4L160.7,168.7L160.9,170.3L161.2,170.8L161.2,171.1L162.1,172.1L162.1,173.4L161.6,174.2L161.6,175.6L161.9,175.9L161.9,176.5Z'},{n:9,d:'M158.7,244.9L157.9,244.5L158.0,243.2L157.8,242.6L157.0,242.1L156.6,240.9L156.0,240.3L155.3,240.3L154.9,240.0L154.9,238.3L154.3,237.7L153.0,237.6L152.5,238.2L152.3,239.0L151.3,239.7L150.6,239.0L150.6,237.0L149.9,235.9L149.7,234.8L149.4,234.5L149.4,233.6L150.2,232.4L150.2,229.5L149.1,227.9L150.1,226.8L151.2,227.8L151.2,228.1L151.6,228.6L151.6,229.5L152.3,230.5L152.4,231.0L153.2,232.4L154.5,233.2L154.9,234.1L156.5,235.3L157.2,236.4L161.2,238.5L161.9,239.3L161.3,240.4L160.9,240.8L160.9,241.3L160.3,241.8L159.8,241.8L159.2,242.4L159.2,244.4Z'},{n:4,d:'M66.2,170.1L65.4,169.5L64.9,168.7L64.3,166.3L62.0,164.8L61.3,163.6L61.6,163.0L62.8,161.8L62.6,159.9L63.3,158.4L63.3,156.9L62.8,156.5L62.5,155.5L63.0,154.7L63.8,154.4L64.3,154.6L64.5,155.3L65.2,156.3L65.3,156.8L66.4,158.7L67.0,159.2L67.1,159.8L67.7,160.4L67.8,161.0L69.5,162.9L69.5,164.2L70.1,164.5L70.4,165.1L70.3,166.4L70.5,166.9L70.1,168.5L69.3,168.8L67.8,168.9Z'},{n:9,d:'M34.3,100.0L33.7,100.0L33.3,99.4L32.7,99.4L31.9,98.2L31.2,98.2L29.5,97.4L28.8,97.3L25.7,97.4L24.8,96.5L23.8,96.1L22.4,96.1L22.1,96.2L21.0,96.1L21.1,95.2L21.8,94.5L21.8,94.1L22.9,92.1L23.2,91.2L25.4,91.0L26.5,91.2L27.4,91.8L29.1,91.8L29.8,90.6L31.0,90.9L31.1,92.3L31.3,92.8L32.7,93.9L33.8,93.9L34.2,94.7L34.4,95.5L34.2,96.8L34.4,97.3L35.1,98.0L35.0,99.3Z'},{n:4,d:'M59.1,105.9L58.4,105.8L58.1,105.5L57.2,103.4L55.5,101.4L53.9,98.4L52.2,96.9L51.4,96.5L50.6,96.5L49.4,95.7L50.9,94.0L50.8,92.4L53.1,90.2L54.1,90.1L54.6,90.3L55.6,91.3L55.7,91.8L56.1,92.3L56.0,94.6L57.3,95.4L58.2,96.8L58.3,97.3L58.8,97.9L59.0,98.8L59.5,99.5L59.5,100.5L60.5,101.6L60.5,103.2Z'},{n:4,d:'M78.5,183.1L77.3,183.1L76.0,182.4L75.4,182.4L75.0,181.8L74.8,180.4L74.5,180.1L74.5,178.0L74.8,177.7L74.8,175.4L74.6,174.9L75.9,173.3L77.3,172.8L78.0,172.1L78.5,172.1L79.2,172.8L80.4,173.1L82.5,174.4L83.2,175.2L83.1,176.3L82.9,176.6L82.9,178.0L81.9,179.7L81.9,180.6L81.5,181.0L79.8,181.6Z'},{n:1,d:'M132.1,28.3L131.4,27.9L131.0,26.2L129.9,24.6L129.7,22.7L129.4,22.4L129.2,21.3L129.2,20.1L128.9,19.8L128.9,18.8L128.6,18.6L128.9,16.0L129.2,15.7L129.2,13.8L130.0,12.6L130.7,12.6L131.5,13.0L132.4,13.0L133.0,13.6L133.2,15.7L134.0,17.2L134.1,17.9L134.7,18.7L134.9,19.8L135.3,20.5L135.3,22.2L134.9,23.2L134.7,24.6L134.1,25.8L133.2,27.0L133.1,27.6Z'},{n:3,d:'M151.9,33.3L151.3,33.3L151.0,33.0L150.1,33.1L149.4,32.2L149.4,30.5L149.9,29.8L149.9,28.9L150.3,28.4L150.4,27.7L150.8,27.3L151.7,25.9L153.4,24.5L154.3,24.0L156.5,22.0L157.7,21.4L159.1,22.0L159.5,22.7L159.5,24.6L159.7,25.1L159.0,26.7L159.0,29.1L158.5,30.0L157.9,30.0L157.4,28.6L156.5,28.6L154.6,31.6L153.8,32.5Z'},{n:1,d:'M84.7,22.4L83.8,21.7L83.3,20.7L79.9,16.4L79.8,15.3L78.8,12.9L78.8,10.8L79.5,9.1L80.6,8.0L81.6,7.6L84.5,7.7L84.5,8.5L84.1,9.4L84.0,10.3L84.3,11.0L83.8,11.5L83.8,13.1L84.2,13.5L84.5,14.6L85.5,15.4L86.8,17.7L86.2,18.8L85.7,21.3L85.5,21.8Z'},{n:1,d:'M14.2,133.9L12.2,133.9L11.7,133.8L10.8,132.9L10.2,131.6L9.7,131.3L8.1,131.2L6.7,130.0L6.6,129.4L6.3,129.1L6.1,126.9L3.7,125.0L3.7,123.1L4.5,122.2L6.6,124.1L7.4,125.6L8.1,126.3L9.1,126.6L10.2,127.8L11.0,127.9L11.4,128.3L13.7,128.3L14.0,128.0L16.0,127.8L16.9,127.3L17.6,127.2L19.2,128.4L19.2,129.3L17.5,130.7L17.3,130.6L16.0,131.3L15.4,131.9L15.1,132.8Z'},{n:1,d:'M24.3,123.1L22.7,122.8L22.4,122.5L20.7,122.5L20.4,122.2L18.8,122.1L17.6,121.3L17.2,120.0L16.4,119.2L15.0,118.5L15.0,117.0L15.4,116.6L16.6,116.6L17.2,116.1L17.2,114.6L17.6,114.2L19.6,114.4L20.1,114.9L20.7,115.1L21.8,115.0L22.4,114.6L25.0,114.6L25.3,114.9L26.1,115.0L24.9,117.9L24.9,119.3L24.5,120.1Z'},{n:10,d:'M192.0,83.1L190.6,83.1L189.7,82.7L188.5,81.6L188.5,80.9L192.0,77.9L193.3,77.4L193.9,76.2L195.4,75.3L196.6,75.3L198.1,76.0L199.4,75.3L200.0,75.3L199.9,83.0L198.7,83.0L197.2,82.3L196.4,82.4L195.5,83.0L194.4,83.0L194.2,82.7L193.5,82.7L193.2,83.0Z'},{n:4,d:'M145.0,170.0L144.3,170.0L143.6,169.4L145.6,166.8L145.6,164.6L146.1,163.9L146.1,163.2L146.6,162.3L147.6,162.2L148.8,161.4L149.7,160.5L150.2,159.8L150.3,158.3L150.5,157.9L152.0,158.7L152.7,158.5L153.5,159.4L153.7,160.8L152.8,163.0L153.0,165.1L152.5,165.8L152.5,166.8L151.9,167.1L152.0,168.2L150.9,169.4L150.2,169.4L149.0,168.6L148.2,168.6L146.9,169.8L145.3,169.8Z'},{n:4,d:'M126.9,44.1L125.7,44.1L125.4,43.8L123.9,43.6L123.3,43.0L122.2,42.9L121.5,42.2L121.5,41.8L120.8,40.6L120.8,38.2L120.4,37.2L120.6,36.3L120.3,36.0L120.6,34.8L121.3,34.2L122.6,34.1L124.0,34.7L125.2,34.7L125.7,35.2L126.6,35.4L127.5,36.3L127.7,37.2L129.2,38.4L129.2,39.6L128.9,39.8L128.9,40.6L128.6,40.9L128.6,41.6L128.1,42.2L128.1,42.6Z'},{n:4,d:'M145.4,229.3L144.6,228.9L142.9,227.3L143.2,225.0L143.5,224.7L143.5,223.6L141.3,220.8L139.8,220.2L139.9,219.5L140.7,218.6L141.4,218.8L142.4,219.8L143.0,219.7L143.4,219.4L145.5,219.4L146.2,220.1L147.4,220.5L147.5,221.4L148.4,222.2L150.7,222.4L151.1,223.1L150.6,224.3L150.6,225.9L150.3,226.7L148.4,228.5L147.8,228.6L146.9,229.2Z'},{n:4,d:'M139.4,59.6L139.0,59.1L139.1,57.2L138.7,56.7L138.5,55.3L137.5,53.9L137.5,53.5L137.0,52.7L137.0,51.8L136.4,50.3L135.4,49.7L135.1,49.2L135.2,48.6L135.7,48.1L141.0,47.9L143.0,50.0L143.5,50.0L144.3,49.4L145.3,50.0L145.2,50.6L144.7,51.3L144.7,52.0L144.1,53.0L144.1,53.6L144.6,54.2L144.5,54.5L143.9,55.0L143.4,54.8L142.9,55.2L142.4,56.5L140.7,57.8L140.3,58.8Z'},{n:2,d:'M60.1,194.8L58.4,194.8L57.7,194.2L57.8,193.8L59.6,192.0L60.5,191.5L60.7,191.1L61.6,190.3L61.6,190.0L62.7,188.6L62.7,188.2L63.6,186.8L63.6,186.4L63.9,186.0L64.3,185.1L64.0,184.7L64.0,183.9L64.0,181.8L64.3,181.5L64.3,180.9L63.8,180.1L63.8,179.7L64.8,177.7L64.7,176.8L65.2,176.6L65.7,175.9L65.7,174.0L66.1,173.4L66.6,174.4L67.4,175.1L67.6,175.9L68.1,176.2L68.8,176.2L68.8,177.1L69.0,177.3L69.7,177.4L69.8,178.5L68.8,180.1L68.3,182.5L67.7,183.8L66.5,185.8L65.3,186.9L63.6,190.2L60.2,194.0L60.3,194.7Z'},{n:4,d:'M136.7,44.5L133.8,44.5L133.1,44.1L132.4,44.1L131.9,43.5L132.3,42.3L132.3,40.1L133.1,39.3L133.7,38.0L134.3,37.4L136.7,36.4L137.0,36.6L138.3,36.6L138.6,36.9L140.4,37.5L142.1,39.5L141.8,42.0L141.4,42.4L140.3,42.9L139.6,43.7L138.3,44.2L137.0,44.2Z'},{n:4,d:'M47.2,104.6L46.2,104.1L45.6,104.1L45.0,102.9L44.5,102.4L42.2,101.3L40.9,100.0L40.4,99.0L40.3,97.9L41.0,97.2L41.1,96.7L41.6,95.9L42.9,94.8L43.8,94.8L44.1,94.6L45.0,94.5L47.6,93.5L48.7,92.7L50.8,92.3L50.9,94.0L49.3,95.7L48.5,95.8L47.8,96.4L47.6,97.8L47.1,98.6L47.1,101.6L47.3,102.1L47.8,102.5L48.0,103.4L47.6,103.8L47.6,104.3Z'},{n:3,d:'M36.7,64.6L35.7,64.6L35.5,64.3L32.7,64.3L32.2,64.1L31.5,63.6L30.2,63.1L29.6,62.1L28.4,61.2L25.3,60.0L24.7,59.4L24.6,58.8L26.1,58.8L26.3,58.5L26.3,57.4L26.9,57.0L27.3,57.1L27.7,56.9L30.9,56.9L31.8,57.4L32.6,57.6L34.0,58.4L35.6,60.1L36.6,60.8L37.9,62.8L38.3,63.5L38.3,64.3Z'},{n:9,d:'M66.3,78.6L65.3,77.7L64.2,77.2L63.0,77.2L61.6,76.3L61.4,75.9L61.4,73.5L61.1,73.3L61.5,71.5L61.0,70.1L61.4,69.8L62.0,69.8L63.0,69.3L65.2,67.3L66.5,67.1L66.9,67.5L67.5,68.8L67.8,69.1L67.8,71.8L68.1,72.1L68.1,73.4L67.8,73.7L67.8,75.2L67.4,75.7L67.4,77.1L67.0,77.5L67.0,77.9Z'},{n:3,d:'M162.6,129.0L161.8,128.8L160.4,127.7L159.2,128.0L158.5,127.1L159.2,126.0L159.2,125.1L158.3,123.1L158.3,122.4L158.0,122.1L157.8,118.8L158.0,117.5L158.3,117.2L158.7,115.5L159.7,114.3L160.4,114.4L160.8,114.9L160.8,115.3L161.1,115.8L161.1,116.4L161.9,117.5L162.1,118.3L162.3,118.6L162.5,120.0L163.3,121.4L163.3,127.7Z'},{n:9,d:'M159.8,104.1L159.1,103.9L156.4,104.1L155.9,103.8L156.3,102.6L157.5,100.9L157.3,99.1L158.0,97.8L158.0,96.4L158.7,95.6L159.3,95.8L161.3,97.3L162.2,97.4L162.5,97.7L163.1,97.9L166.2,97.8L166.6,98.2L167.9,98.6L168.4,99.2L167.9,99.9L166.9,100.7L165.7,101.2L164.8,101.3L163.4,102.0L161.6,104.0L160.1,103.9Z'},{n:4,d:'M57.3,153.5L56.4,152.9L56.5,151.1L55.3,150.8L54.9,149.5L53.8,147.9L54.1,147.4L54.0,146.8L54.9,145.0L54.8,142.2L55.6,140.9L56.1,140.4L56.1,139.8L56.7,138.9L57.2,138.9L58.2,139.7L58.6,141.1L58.5,142.2L59.0,143.2L59.9,144.0L61.0,146.8L61.0,147.4L59.4,148.7L59.0,149.4Z'},{n:4,d:'M142.9,227.3L141.8,226.9L138.3,224.2L136.2,223.2L133.8,223.0L133.5,222.7L132.4,223.2L131.7,223.2L130.8,222.6L130.5,222.6L130.1,222.1L131.0,220.8L132.7,219.4L134.6,218.8L136.0,217.7L136.5,217.6L137.3,218.3L138.0,220.2L138.6,220.8L139.0,220.8L139.8,220.3L140.9,220.6L142.0,221.5L142.0,221.8L143.5,223.6L143.5,224.7L143.2,225.0Z'},{n:3,d:'M53.9,59.5L53.3,59.3L51.7,57.6L50.5,56.9L49.6,56.7L48.8,56.1L49.9,52.3L50.6,51.4L50.9,50.1L52.1,47.9L52.3,46.5L52.7,46.1L52.7,45.8L53.5,45.1L54.3,45.4L54.9,46.0L55.7,47.7L55.7,48.9L55.2,49.9L55.2,52.3L54.9,52.6L54.8,54.1L54.5,54.7L54.3,59.0Z'},{n:2,d:'M61.0,70.1L59.0,70.1L58.5,69.7L58.5,69.0L59.7,67.8L60.5,66.1L60.5,65.4L60.0,64.5L60.8,64.3L61.3,64.7L61.9,64.7L63.9,63.5L64.9,62.4L66.1,59.5L66.8,59.0L67.6,60.4L67.7,61.0L68.6,62.0L68.6,62.8L69.8,64.7L70.0,65.6L69.4,66.2L67.2,66.2L66.4,67.1L65.2,67.3L63.0,69.3L62.0,69.8L61.4,69.8Z'},{n:4,d:'M117.2,52.7L116.2,52.5L113.6,50.0L112.1,49.1L111.2,49.1L110.4,48.3L111.1,47.4L113.0,46.3L114.8,44.2L116.1,44.2L116.5,44.7L119.8,44.5L120.3,44.9L120.1,49.6L119.6,50.6L119.1,50.8Z'},{n:4,d:'M150.0,131.1L149.1,130.5L147.5,128.8L145.8,128.3L145.3,127.9L144.7,127.1L144.7,125.7L143.1,124.2L143.5,123.4L144.6,123.3L145.8,121.8L146.4,122.4L146.8,123.4L146.8,124.0L147.2,124.5L147.6,124.5L149.1,123.0L149.4,122.4L149.3,121.7L149.8,121.4L150.8,121.8L151.1,122.7L152.1,124.0L151.2,124.9L151.1,126.0L151.6,126.9L152.3,127.7L152.3,129.8L151.7,130.4L151.0,130.4Z'},{n:2,d:'M137.6,204.1L135.5,203.7L134.1,202.9L131.4,200.4L130.4,199.9L129.9,199.2L128.7,198.4L126.4,196.0L126.0,195.4L125.5,193.2L126.0,192.6L126.6,192.5L127.9,191.7L128.6,191.7L129.2,191.1L129.2,190.4L128.6,189.7L128.6,188.8L128.9,188.4L129.6,189.2L130.5,189.2L131.1,189.7L131.1,190.2L130.6,190.9L130.6,191.6L131.1,192.3L131.1,195.6L131.3,195.9L131.3,196.8L132.0,198.1L132.0,198.5L132.6,199.4L132.7,199.9L134.4,201.6L135.7,202.5L136.7,202.6L138.0,203.3L138.2,203.6Z'},{n:4,d:'M94.4,198.4L93.2,196.8L92.9,196.1L91.8,195.2L92.2,194.0L93.0,192.9L94.4,192.9L94.8,193.2L95.5,192.8L95.8,192.2L97.3,190.8L97.8,190.8L98.1,190.5L100.2,190.5L100.5,190.8L101.3,190.8L101.9,190.3L102.7,191.1L102.9,191.4L102.7,191.7L102.9,193.5L102.7,193.7L102.1,193.8L101.7,194.3L101.1,194.3L100.2,194.8L99.5,194.9L98.1,195.9L97.0,197.1L96.4,197.4L95.5,197.4Z'},{n:4,d:'M143.5,169.4L142.3,168.8L141.5,168.8L140.7,168.3L139.0,168.0L139.0,167.3L138.2,166.8L138.0,166.3L138.0,165.1L138.4,164.4L139.1,164.0L139.1,163.2L139.6,162.9L140.2,163.1L140.9,162.2L141.5,162.2L142.2,162.7L142.8,162.7L143.6,162.3L144.4,162.3L145.0,161.6L145.7,161.6L146.2,161.9L146.6,162.4L145.6,164.6L145.6,166.8Z'},{n:1,d:'M21.9,139.7L18.8,139.7L17.0,138.4L16.3,137.6L16.3,137.3L15.6,136.5L15.4,135.6L14.3,134.1L15.4,131.9L16.0,131.3L17.5,130.6L18.0,131.2L18.0,133.3L18.3,134.0L19.1,134.4L20.9,134.3L21.4,134.9L21.2,136.0L21.9,137.3L22.7,137.3L23.3,136.6L24.0,136.6L24.4,137.0L23.8,138.4L22.7,139.3L22.4,139.3Z'},{n:5,d:'M52.0,110.6L50.6,110.4L49.9,110.4L49.5,110.6L48.4,110.1L47.4,110.1L45.5,109.3L45.6,104.1L46.2,104.1L47.2,104.6L47.6,104.3L47.6,103.8L48.2,103.5L49.9,104.9L50.8,105.1L52.6,106.5L53.5,106.5L54.0,107.1L54.2,107.4L53.2,108.4L52.6,109.9Z'},{n:9,d:'M62.5,41.2L61.7,41.2L61.0,40.7L59.6,40.6L58.7,39.1L57.9,38.3L56.7,37.7L56.6,37.0L57.0,36.6L57.7,36.6L58.1,36.2L57.9,35.3L58.2,35.0L59.1,35.0L59.4,34.7L61.3,34.7L62.3,34.2L64.0,34.2L64.5,35.3L63.6,37.2L63.6,39.1L63.1,39.8L63.1,40.7Z'},{n:4,d:'M94.2,214.1L93.4,213.6L93.4,211.6L93.6,211.3L93.7,210.5L94.2,209.8L94.3,209.3L94.9,208.6L95.5,206.9L96.4,206.0L97.3,206.0L98.3,206.5L99.2,206.5L99.9,207.1L100.0,207.8L99.9,208.5L100.0,210.7L99.4,211.6L98.8,211.6L97.4,212.6L97.0,212.6L95.6,213.4L95.2,213.4Z'}];
 PICTURES.push({id:'rosegarden',name:'Spring Landscape Rose Garden',level:'hard',cat:'nature',
  viewBox:'0 0 200.0 268.7',palette:["#DA2849", "#AC1735", "#F07792", "#689E47", "#315F37", "#997043", "#41B649", "#8BB844", "#C6EEFA", "#ffffff"],regions:R});
})();
