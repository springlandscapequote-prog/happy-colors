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
- [x] 2026-10-18 Dragon & Castle Mountain (Hard, Fantasy) / Moon Base (Medium, Space)
- [x] 2026-10-19 Gingerbread Village (Hard, Holidays) / Hot Air Balloons (Medium, Vehicles)
- [x] 2026-10-20 Penguin Family (Medium, Animals) / Little Red Tractor (Easy, Vehicles)
- [x] 2026-10-21 Floating Astronaut (Easy, Space) / Fairy Mushroom Village (Medium, Fantasy)
- [x] 2026-10-22 Rainbow Kite Festival (Medium, Nature) / Garden Bugs (Hard, Animals)
- [x] 2026-10-23 Jack-o'-Lantern Smile (Easy, Holidays) / Wizard Tower Library (Hard, Fantasy)
- [x] 2026-10-24 Steam Train Station (Hard, Vehicles) / Flying Saucer (Easy, Space)
- [x] 2026-10-25 Harvest Table (Hard, Holidays) / Friendly Whale (Easy, Animals)
- [x] 2026-10-26 Space Station Garden (Hard, Space) / Magic Wand & Stars (Easy, Fantasy)
- [x] 2026-10-27 Sunny Sailboat (Easy, Vehicles) / Hot Cocoa Winter Window (Medium, Holidays)
- [x] 2026-10-28 Digger & Dump Truck (Medium, Vehicles) / Goldfish Bowl (Medium, Animals)
- [x] 2026-10-29 Fairy Tea Party (Medium, Fantasy) / Stargazing Observatory (Hard, Space)
- Design tip learned 10-17: keep the head/crest of an animal off the small eye spots behind it; a nearly hidden small region (label m=1) was mis-tapped on iPhone 390x664. Run a quick label-size check (smallest m >= 2) before the full test.
- Design tip learned: a Hard picture still needs several big regions (>=10 units across) so numbers show at 1x zoom; add large background shapes (nebula, hills, clouds) and thick bands, not only tiny details. Check `visible@1x` in the test output (aim for 25+ for Hard, 12+ for Easy/Medium).
- Design tip learned 10-18: background shapes drawn early (snow caps, clouds) get fully hidden by big foreground subjects (castle, dragon wing) - run nolabel.py after the first render and move or drop them. Also avoid plain two-stripe flags (they can look like real national flags); use a single color with a star.
- Design tip learned 10-19: balloon ropes/basket rims scaled from a small balloon came out 1 unit wide (label m=1); give tiny parts a minimum size (e.g. Math.max(s*.18,5)) or drop them. Stars placed close to a roof edge get partly covered - keep them 8+ units clear.
- Design tip learned 10-20: a small face patch (chick's white mask) with eyes and beak drawn on top had its label squeezed between them and was mis-tapped on Pixel 7 375x553 only; make such patches clearly larger than the details on them (label m >= 4) and keep beaks at least ~7x5 units (a 5x3.5 beak gave m=1). Also: if Playwright reports missing host libraries for WebKit, run `playwright install-deps webkit chromium` with sudo (using the user's Python playwright module).
- Design tip learned 10-21: before picking a subject, grep `pictures*.js` comments too, not only names (Rocket Trip already has a small UFO, so the Easy Space pick became an astronaut). A shared rounded-rectangle helper `rr(x,y,w,h,q)` (defined inside the day's block) makes friendly body/stalk/boot shapes; giving each picture 3+ big shapes (>=40 units) kept visible@1x at 17 (Easy) / 25 (Medium) with zero fixes needed.
- Design tip learned 10-22: kite tail bows floating without a string looked like butterflies; draw a wavy ribbon region (~4.4 wide, sampled sine strip with perpendicular offsets) from the kite's bottom point and sit the bows on it - it kept a label and tapped fine on all 4 viewports. Hard with 3 big 8-petal flowers + large bugs gave visible@1x 46.
- Design tip learned 10-23: count the grid from the `daily_test.py` output, not by grepping `add(` (pictures.js has more pictures than the `add(` lines, e.g. Winter Bright House), and break slot ties by the lowest category total. Bookshelves are a fast, safe way to reach Hard: 3 compartments x 6 books (6-8 wide) per shelf plus 4-unit gold bands gave 112 regions, 0 overlaps and 0 misfills on all 4 viewports. Use every palette color at least once (an unused swatch was caught in the first render and turned into wall stone blocks). A finished Friendly Whale (Easy, Animals, 28 regions, 10 colors) is saved in /workspace/happy-colors/work/whale-block-2026-10-23.js for a later day.
- Design tip learned 10-24: a Hard vehicle scene reaches 100 regions fast with repeated parts (14 track ties, 2 identical passenger cars via a forEach, wheels + hubs); keep hubs r>=2.6 (m>=2). An Easy picture of small stars only gave visible@1x 8; growing the stars to radius 10-11, the planet to r19 and craters to 15x6 raised it to 22 with no other change.
- Design tip learned 10-25: a Hard table scene reaches 90+ regions safely with a checkered tablecloth drape (3 rows x 5 squares of 20x15), paper bunting triangles along the top and a fruit basket drawn fruits-first so the basket body/bands/rim sit in front; gave visible@1x 51 and 0 overlaps/misfills on all 4 viewports first try. A wreath = big circle + same-as-wall inner circle on top.
- Design tip learned 10-26: a Hard space scene reaches 100 regions with 4 solar panel wings of 3x3 cells (12x10, 1-unit gaps, alternating two blues) plus a station, greenhouse dome and an astronaut; gave visible@1x 49, 0 overlaps/misfills on all 4 viewports first try. Draw a dome as a half-circle path (`M72,80A28,28 0 0,1 128,80Z`) and keep plants/flowers inside the dome curve (check y = cy - sqrt(r^2-dx^2)). A crescent moon = yellow circle + same-as-sky circle on top (both tappable). Grid after 10-26: every slot has 2+; thinnest are Vehicles E:2 and the M:2 slots in every category (Medium is now the thinnest level).
- Design tip learned 10-27: a cozy window scene is a fast safe Medium (61 regions, 0 fixes): draw glass + outside scene first, then the window cross bars on top, curtains over the frame edges, then table, mug (handle ring = colored circle + same-as-wall inner circle, drawn before the body) and steam as vertical sampled sine strips (5 wide). An Easy sailboat close-up with a 3-band striped triangle sail (x along the hypotenuse computed per band) gave visible@1x 16. Grid after 10-27: Vehicles E:3, Holidays M:3; thinnest now the M:2 slots (Animals, Nature, Vehicles, Fantasy, Space) and every H:2; Vehicles total is still lowest (7).
- Design tip learned 10-28: a construction scene is a fast safe Medium (61 regions, 0 fixes): boom/stick/bucket drawn before the excavator cab, track = rounded rect with 4 wheels + hubs (r>=2.8), dump truck bed load drawn first, cones = triangle + white trapezoid band + base. A fish bowl = big glass circle + `band()` of a slightly smaller circle for the water and another band for the sand; keep fish/seaweed inside the circle (check dist from center < r-6). WebKit fix 10-28: `playwright install-deps` failed because apt can't reach the Debian mirror from this box (proxy 500 / SSL EOF), so the missing libs (libevent, libmanette, libavif, libenchant, gst gl/codecparsers, libsoup3...) were downloaded with curl from deb.debian.org, extracted to /workspace/happy-colors/wklibs and copied into ~/.cache/ms-playwright/webkit-*/minibrowser-*/sys/lib (the MiniBrowser wrapper overwrites LD_LIBRARY_PATH). For the LIVE https test also export GIO_EXTRA_MODULES=/workspace/happy-colors/wklibs/gio-tls (TLS module only; the full gio/modules dir breaks loading). Grid after 10-28: Animals M:3, Vehicles M:3; thinnest now Fantasy M:2, Space M:2, Nature M:2 and every H:2; Fantasy and Space totals are lowest (7).
- Design tip learned 10-29: the test does not flag palette size, so check colors yourself (Medium max 14): the first Fairy Tea Party had 15 colors and passed; the toadstool stems were moved to white to get 14. A Hard night scene reaches 94 regions with 20 stars + checkered picnic blanket (2x4 parallelogram squares 16x10) + 3 five-petal flowers; a shooting star tail drawn after a small star hid it (nolabel caught it) - keep small stars clear of tails. A fairy-light garland = horizontal sampled sine strip (4 wide) with bulbs r5.2 hung 6 below it. Grid after 10-29: Fantasy M:3, Space H:3; thinnest now Nature M:2, Space M:2 and H:2 in Animals/Nature/Vehicles/Holidays/Fantasy; all 6 category totals are now 8.
- Hard: ~~Peacock Parade (animals)~~ (done 10-17), ~~Gingerbread Village (holidays)~~ (done 10-19), ~~Dragon & Castle Mountain (fantasy)~~ (done 10-18), Jungle Treehouse (animals/nature), ~~Garden Bugs (animals)~~ (done 10-22), Snow Day Sledding Hill (holidays), ~~Wizard Tower Library (fantasy)~~ (done 10-23), ~~Train Station with steam train (vehicles)~~ (done 10-24), Octopus Coral Garden (animals), Fairy Garden Village (fantasy), ~~Thanksgiving Harvest Table with fruits & pies (holidays)~~ (done 10-25 as Harvest Table), ~~Space Station with astronauts' garden (space)~~ (done 10-26 as Space Station Garden), Sweets Express candy train (vehicles), Comet & Star Nursery (space), Aquarium Tunnel (animals), ~~Stargazing Observatory (space)~~ (done 10-29), Autumn Forest Waterfall (nature), Coral Castle under the sea (fantasy)
- Medium: ~~Fish Bowl (animals)~~ (done 10-28 as Goldfish Bowl), Seahorse (animals), Sailboat Bay (vehicles), Unicorn Meadow (fantasy), Rainbow Snail Garden (animals), ~~Fairy Tea Party (fantasy)~~ (done 10-29), Robot Rover on Mars (space), Gift Sleigh (holidays), ~~Moon Base with rover (space)~~ (done 10-18), ~~Hot Air Balloons (vehicles)~~ (done 10-19), ~~Pumpkin Patch with hay bales (holidays)~~ (done 10-17), ~~Penguin Family on ice (animals)~~ (done 10-20), Dragon Egg Nest (fantasy), Ice Skating Pond (holidays), Bee Hive & Flowers (animals), Fire Station dog & hose (vehicles), ~~Rainbow Kite Festival (nature)~~ (done 10-22), ~~Construction Digger & Dump Truck (vehicles)~~ (done 10-28), ~~Hot Cocoa Winter Window (holidays)~~ (done 10-27)
- Easy: ~~Sailboat (vehicles; Busy Harbor already has a small one, so make it a close-up)~~ (done 10-27 as Sunny Sailboat), ~~Jack-o-lantern smile (holidays)~~ (done 10-23), Turtle (animals), Fish (animals), ~~Spaceship UFO (space; Rocket Trip already has a small UFO, so make it a close-up)~~ (done 10-24 as Flying Saucer), ~~Fairy Mushroom House (fantasy)~~ (done 10-21 as Medium Fairy Mushroom Village), ~~Floating Astronaut (space)~~ (done 10-21), Crescent Moon & Stars (space), Valentine heart (holidays), ~~Tractor (vehicles)~~ (done 10-20), ~~Friendly Whale (animals)~~ (published 10-25), ~~Magic Wand & Stars (fantasy)~~ (done 10-26), Autumn Leaf (nature), Kite in the sky (toys/nature), Hedgehog (animals), Mermaid Tail Seashells (fantasy, no face), Snow Globe (holidays), Scooter (vehicles), Little Fire Boat (vehicles), Rainbow Umbrella in the rain (nature)
