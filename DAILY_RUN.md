# Happy Colors - DAILY RUN (add 2 new pictures every day)

Goal: every day add **exactly 2 new pictures** (different categories, mixed Easy/Medium/Hard over time, thinnest slots first), test, push, verify live, report.
Players: Gabriela (9) and family. Family-only app. No ads/logins/tracking/personal data in the public code. Never print tokens.
Repo: `/workspace/happy-colors/repo` (push to `main` of `springlandscapequote-prog/happy-colors`, `gh` is logged in).
Live: https://springlandscapequote-prog.github.io/happy-colors/  (live `version.json` changes after each push; the app auto-updates on open).
Use **headless Playwright only** (never the box desktop browser). Kill every browser and http.server you start. Leave nothing running.

## 0. Setup (1 min)
```
cd /workspace/happy-colors/repo && git pull --rebase origin main
DAY=$(date +%F); mkdir -p /workspace/happy-colors/daily/$DAY
(python3 -m http.server 8777 >/dev/null 2>&1 & echo $! > /tmp/hc_server.pid)      # local preview, kill it at the end
curl -s https://springlandscapequote-prog.github.io/happy-colors/version.json     # remember the OLD live version
```

## Collect suggestions (do this first, every run; also at least every 6 hours if you can)
Kids' ideas from the "Suggest a picture" button arrive in a free ntfy.sh topic (see README.md; ntfy keeps them only ~12 h).
```
cd /workspace/happy-colors/repo && python3 tools/pull_suggestions.py      # writes /workspace/happy-colors/suggestions-new.json (+ appends suggestions-all.csv backup)
```
- The **main agent** appends the rows of `suggestions-new.json` (`[when_pacific, category, idea]`) to the Google Sheet "Happy Colors - Picture Suggestions" (id 1acjcZZAUS20Q6eAut7pa5Ru04p-VoBT3OVe4a0z-sEQ, tab Sheet1) with the Sheets connector. The script itself never writes to the Sheet. Append before the next run (the next run overwrites `suggestions-new.json`; `suggestions-all.csv` keeps everything).
- Never commit `suggestions-*` files. Report how many new ideas were collected/added.
- **Prefer Gabriela's suggested ideas** (and other kids' ideas that are kid-friendly and not duplicates) when choosing the day's pictures in step (b). Credit them in `PICTURE_LOG.md` as `idea from Gabriela's suggestion` (or `idea from a kid's suggestion`).

## (a) Read the picture log
Read `PICTURE_LOG.md` (every picture ever added) and look at the live grid of counts per category and level, which is printed at the top of every `tools/daily_test.py` run.
Grid format: `Animals: E:2 M:1 H:0`. Categories (ids in `pictures.js` `CATEGORIES`):
`animals`, `nature`, `vehicles`, `holidays` (Holidays & Winter), `fantasy` (Fantasy & Castles), `space`. **Math Colors is a separate section: do not add pictures there**
(every picture automatically also appears in Math Colors with equations, that is expected and tested).

## (b) Pick 2 new ideas (no duplicates)
- First look at the new suggestions (Collect suggestions step above): a fitting, new, kid-friendly suggestion wins over the backlog.
- Check names AND subjects in `PICTURE_LOG.md` / `pictures.js` / `pictures-real.js` / `pictures-daily.js` (e.g. no second "Fire Truck", "Owl", "Rocket", "Castle", "Snowman", "Planets").
- Choose the 2 thinnest (category, level) slots, in two **different categories**. Goal: over time every category has several Easy, Medium and Hard.
  Rotation: fill the lowest total first; Hard is thinnest overall, so most days include one Hard or Medium plus one Easy/Medium. Never two Hard on one day (Hard takes the longest).
- Keep a short idea backlog at the bottom of this file; tick off used ideas and add new ones.
- Kid-friendly only: animals, nature, vehicles, space, holidays, fantasy, food, toys... Nothing scary/violent, no real people or faces of identifiable people, no logos, brands or characters owned by anyone, no text/slogans.
- Level rules (count of region objects in the picture): **Easy <= 35, Medium 36-80, Hard 81+**. Colors: Easy 6-10, Medium 10-14, Hard 12-16.

## (c) Create each picture
Option 1 (preferred, fast, no license risk): **hand-drawn in code**, original art of this project, license **CC0 / original work of this project**.
- Append a dated block to `pictures-daily.js` (newest last), inside the existing IIFE: copy the Snowman or Planet block as a template.
  Helpers there: `R(n,d)` region (n = color number, d = SVG path), `rect, circ, star, ell, poly, rell` (rotated ellipse polygon), `band` (stripe of a circle), `add(id,name,level,cat,palette,regions)`.
  viewBox is always `0 0 200 200`. **Later regions draw on top of earlier ones** (painter's algorithm): background first, then big shapes, then details.
- Rules that avoided bugs: never fully cover a region (it would have no number and could not be tapped; the test reports it); keep every region at least ~3.5 units wide (circle radius >= 1.8) so a finger can hit it;
  put things that must be behind (arms, ring backs) earlier in the list; use unique `id` (it keys saved progress; never rename an id of a published picture).
- Preview while designing: `python3 tools/render.py http://localhost:8777/ <id> /tmp/<id>.png` (fully colored screenshot + region/label counts) and
  `python3 tools/nolabel.py http://localhost:8777/ <id>` (lists regions that lost their number because they are covered). Look at the PNG with the Read tool; iterate until it looks good.

Option 2: **traced from a free photo** with `tools/build_realistic.py` (produces `pictures-real.js` entries, see the header of that script and LICENSES.md "Mountain Lake Sunset" for the exact process).
Only **public domain / CC0** sources: Wikimedia Commons (PD / CC0 files; check the license box on the file page), NASA media (images.nasa.gov, public domain unless marked), NPS/USFWS/USGS (US federal), Openverse filtered to CC0/PDM,
or Pixabay/Unsplash-type only if the license text clearly allows free use without attribution (copy the license URL into the log). If in doubt, skip the photo and draw it yourself.
No photos with identifiable people, logos, brands, artwork by living artists. Record: page URL, author, license, date retrieved.

## (d) Log it
- Append one row per picture to `PICTURE_LOG.md`: date, id, name, category, level, regions/colors, source URL, author, license, how made.
- If an outside source was used, add a section to `LICENSES.md` (page URL, author, license, what was changed). Own drawings only need the log row.

## (e) Test (must all pass before pushing)
```
cd /workspace/happy-colors && python3 daily_test.py http://localhost:8777/ daily/$DAY '[["<cat id>","<Name>","<Easy|Medium|Hard>","<id>"],["<cat id>","<Name>","<Level>","<id>"]]'
```
(`daily_test.py` is also kept in `repo/tools/daily_test.py`; add the word `quick` as a 4th argument for iPhone-only during design.) It runs iPhone 13 WebKit 390x664 and 375x553, Pixel 7 Chromium 390x664 and 375x553 (4x CPU slowdown) with real touch taps and checks:
card + level badge in the category list, region count within the level range, every region has a number, no overlapping number labels, tapping every region fills it with the right color, completion popup shows,
Math Colors mode works for the picture (equations correct, completes), all old pictures still open with every region numbered, **no console errors**. Look at the screenshots too (Read tool) - the test cannot judge beauty.
Failures: fix the picture and rerun. A test failure caused by the test itself must be explained in the report, never hidden.

## (f) Commit, push, verify live
```
cd /workspace/happy-colors/repo && git add -A && git commit -m "Daily pictures YYYY-MM-DD: <Name1> (<Level> <Cat>), <Name2> (<Level> <Cat>)" && git pull --rebase origin main && git push origin main
```
(`./release.sh "msg"` does stamp + commit + push; the GitHub Action also stamps `version.json`, creating a second commit "chore: stamp version [skip ci]" about a minute later, so `git pull` before the next change.)
Verify (wait up to ~3 min, poll every 20 s):
```
curl -s "https://springlandscapequote-prog.github.io/happy-colors/version.json?t=$(date +%s)"            # must differ from the OLD version
curl -s "https://springlandscapequote-prog.github.io/happy-colors/pictures-daily.js?t=$(date +%s)" | grep -c "add('<id>'"   # new ids are live (add() takes the id as its first argument)
```
Then run `daily_test.py` once with `quick` against the LIVE URL (`https://springlandscapequote-prog.github.io/happy-colors/`) and check the new pictures open.
Also report the Suggest button status: `curl -s .../config.js` (SUGGEST_URL = the ntfy.sh topic; empty = suggestions stay on the device only).

## (g) Screenshots
`daily_test.py` saves to `/workspace/happy-colors/daily/YYYY-MM-DD/`: `<id>-picker.png` (category list with the card), `<id>-unfilled.png`, `<id>-partly-colored.png`, `<id>-finished.png`, `<id>-zoomed.png` (iPhone 390x664).
Use the **live** run's screenshots if you re-run against live (save them in the same folder; the folder name is the day).

## (h) Report format (send to Gabriela's Marketing Helper and Grok Bot)
```
Happy Colors daily run YYYY-MM-DD  -  OK / PROBLEM
New today:
 1. <Name> - <Level> - <Category> - <N> regions, <C> colors - <source/license> - id <id>
 2. ...
Live: https://springlandscapequote-prog.github.io/happy-colors/ (version old -> new)  commit <hash>
Screenshots: /workspace/happy-colors/daily/YYYY-MM-DD/ (list files)
Tested: <viewports>, touch, completion, math mode, old pictures, console errors -> pass/fail
Library now: Animals E/M/H, Nature ..., (grid)
Suggest-a-picture: <SUGGEST_URL status>
Problems / not done: ...
```
If a day cannot be completed (no time, a test fails and can't be fixed), say so plainly with the reason; add fewer pictures rather than shipping a broken one, and catch up the next day.
Clean up: `kill $(cat /tmp/hc_server.pid)`, make sure no Playwright browser (`pgrep -fa 'playwright|chromium|webkit'`) and no http.server of yours is left.

## Idea backlog (tick when used)
- [x] 2026-10-15 Happy Snowman (Easy, Holidays) / Planet Parade (Hard, Space)
- [x] 2026-10-16 Busy Harbor (Hard, Vehicles) / Rainbow Unicorn (Easy, Fantasy)
- [x] 2026-10-17 Peacock Parade (Hard, Animals) / Pumpkin Patch (Medium, Holidays)
- Design tip learned 10-17: keep the head/crest of an animal off the small eye spots behind it; a nearly hidden small region (label m=1) was mis-tapped on iPhone 390x664. Run a quick label-size check (smallest m >= 2) before the full test.
- Design tip learned: a Hard picture still needs several big regions (>=10 units across) so numbers show at 1x zoom; add large background shapes (nebula, hills, clouds) and thick bands, not only tiny details. Check `visible@1x` in the test output (aim for 25+ for Hard, 12+ for Easy/Medium).
- Hard: ~~Peacock Parade (animals)~~ (done 10-17), Gingerbread Village (holidays), Dragon & Castle Mountain (fantasy), Jungle Treehouse (animals/nature), Garden Bugs (animals), Snow Day Sledding Hill (holidays), Wizard Tower Library (fantasy), Train Station with steam train (vehicles), Octopus Coral Garden (animals), Fairy Garden Village (fantasy), Thanksgiving Harvest Table with fruits & pies (holidays)
- Medium: Fish Bowl / Seahorse (animals), Sailboat Bay (vehicles), Unicorn Meadow (fantasy), Gift Sleigh (holidays), Moon Base with rover (space), Hot Air Balloons (vehicles), ~~Pumpkin Patch with hay bales (holidays)~~ (done 10-17), Penguin Family on ice (animals), Dragon Egg Nest (fantasy), Ice Skating Pond (holidays), Bee Hive & Flowers (animals)
- Easy: Sailboat (vehicles; Busy Harbor already has a small one, so make it a close-up), Jack-o-lantern smile (holidays), Turtle (animals), Fish (animals), Spaceship UFO (space), Fairy Mushroom House (fantasy), Valentine heart (holidays), Tractor (vehicles), Friendly Whale (animals), Magic Wand & Stars (fantasy), Autumn Leaf (nature), Kite in the sky (toys/nature), Hedgehog (animals), Mermaid Tail Seashells (fantasy, no face)
