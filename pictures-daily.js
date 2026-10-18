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
})();
