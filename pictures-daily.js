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
})();
