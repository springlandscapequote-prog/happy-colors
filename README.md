# Happy Colors
Static color-by-number app. No login, ads, tracking or network calls; progress saved in localStorage. Open index.html or host the folder anywhere static.

## Add a picture
Append an object to `PICTURES` in `pictures.js`:
```js
{id:'cat', name:'Cat', viewBox:'0 0 200 200',
 palette:['#ffd','#f90'],            // color #1, #2, ...
 regions:[{n:1,d:'M0,0h200v200h-200Z'}, {n:2,d:circ(100,100,40)}]}
```
`n` = color number, `d` = SVG path (helpers: `rect`, `circ`, `star`, `petals`). Later regions draw on top. Rendered paths get `data-number`. Use a unique `id` (it keys saved progress).
