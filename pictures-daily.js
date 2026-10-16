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
})();
