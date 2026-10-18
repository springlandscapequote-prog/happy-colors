# Happy Colors
Static color-by-number app. No login, ads or tracking; progress saved in localStorage. The only network use is the optional "Suggest a picture" button (below) and the version check for auto-update. Open index.html or host the folder anywhere static.

## Add a picture
Append an object to `PICTURES` in `pictures.js`:
```js
{id:'cat', name:'Cat', viewBox:'0 0 200 200',
 palette:['#ffd','#f90'],            // color #1, #2, ...
 regions:[{n:1,d:'M0,0h200v200h-200Z'}, {n:2,d:circ(100,100,40)}]}
```
`n` = color number, `d` = SVG path (helpers: `rect`, `circ`, `star`, `petals`). Later regions draw on top. Rendered paths get `data-number`. Use a unique `id` (it keys saved progress).

## Daily pictures
New pictures are added every day in `pictures-daily.js`; the procedure is in `DAILY_RUN.md`, the list of all pictures in `PICTURE_LOG.md`, helper/test scripts in `tools/`.

## Suggest a picture (how kids' ideas reach us)
- The welcome page has a **Suggest a picture** button. The kid picks a category chip and/or types a short idea (max 60 chars; the dialog says "Only type your picture idea. No names or addresses please."), taps Send, and sees a thank-you.
- The idea is always saved on the device (`localStorage` key `hc_suggestions`; grown-ups can view them at `?suggestions=1`). If `config.js` `SUGGEST_URL` is set, the same item `{when, category, text}` is also POSTed (no-cors, text/plain, fire-and-forget; offline just fails silently) to a free **ntfy.sh** topic (no account). The random topic name is in `config.js`; it only ever receives kids' picture ideas.
- **Collector:** `python3 tools/pull_suggestions.py` (run at least every 6 hours; ntfy keeps messages ~12 h). It de-duplicates by ntfy message id, ignores non-items and test messages (body contains `TEST`), strips URLs/emails/phone numbers, caps ideas at 200 chars, and writes the new rows `[when_pacific, category, idea]` to `suggestions-new.json`, plus appends every collected row to `suggestions-all.csv` (backup). The data files live next to the repo (`/workspace/happy-colors/`, override with `HC_DATA_DIR`) and are never committed. The script never writes to the Google Sheet; the main agent appends the rows to the sheet "Happy Colors - Picture Suggestions" (Sheet1: When (Pacific) | Category | Idea) with the Sheets connector.
- Set `SUGGEST_URL=''` in `config.js` to turn off sending (ideas then stay on the device only).
