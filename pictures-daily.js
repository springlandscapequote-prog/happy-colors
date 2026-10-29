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
})();
