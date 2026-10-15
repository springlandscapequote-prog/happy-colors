# Always load the newest version (auto-update) - copy-paste recipe for a static GitHub Pages game

What it does: every time the page is opened (and when the tab becomes visible again, and when restored from the back/forward cache) it
fetches `version.json` with `cache:'no-store'` and compares it with the `APP_VERSION` baked into the loaded code.
If different: auto-reloads ONCE (only if the player is on the menu / nothing in progress; a sessionStorage flag prevents loops),
otherwise shows a big "New version ready! Tap to refresh" banner. Offline / fetch failure = silent. No service worker. localStorage is never touched.
A GitHub Action re-stamps the version on every push to main, so it cannot be forgotten.

## Steps for Color Clash Cubes (springlandscapequote-prog/color-clash-cubes)
1. Copy into the repo root: `auto-update.js`, `tools/stamp.sh`, `release.sh`, `.github/workflows/stamp-version.yml`.
2. Create initial stamp files: `echo "var APP_VERSION='0';" > version.js` and `echo '{"v":"0"}' > version.json`.
3. In `index.html`:
   - add to `<head>`: `<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="Expires" content="0">`
   - load scripts like this (each local script gets `?v=0`; the stamp script rewrites it): `<script src="version.js?v=0"></script>` FIRST, your game scripts, then `<script src="auto-update.js?v=0"></script>` LAST. Same `?v=0` on local `<link rel="stylesheet" href="style.css?v=0">`.
4. Edit `isIdle()` at the top of `auto-update.js` so it returns true only when the player is on the title/menu screen (nothing in progress). Return false if unsure (then they just get the banner).
5. Edit `tools/stamp.sh`: the grep exclusion list (version.js, version.json, index.html, README, tools/, .github/, release.sh, UPDATE.md) should cover non-game files; the sed line stamps `src="x.js?v=..."` - if you also use `href="x.css?v=..."` change the sed to `s/\(\(src\|href\)="[A-Za-z0-9._-]*\.\(js\|css\)\)?v=[A-Za-z0-9._-]*"/\1?v=$H"/g`.
6. Repo settings: Settings > Actions > General > Workflow permissions = "Read and write". Pages source = "Deploy from a branch" (main / root). The workflow ends with a `gh api -X POST repos/.../pages/builds` call because pushes made with GITHUB_TOKEN do not trigger a Pages build by themselves.
7. Run `sh tools/stamp.sh`, commit and push once.

## How a future deploy bumps the version
Just push to main. The workflow (`stamp-version.yml`) runs `tools/stamp.sh` (SHA-256 of all app files -> 10 chars), writes `version.js`, `version.json` and the `?v=` on script tags, commits "chore: stamp version [skip ci]" (paths-ignore on version files prevents loops), then asks Pages to rebuild. Live ~1-2 minutes after the push.
Optional: `./release.sh "message"` stamps + commits + pushes in one step.

## Tested (Happy Colors, WebKit iPhone 13 + Chromium Pixel 7 at 390x664)
stale cached index/app.js on menu -> auto reload once, progress kept; stale mid-game -> banner, tap -> reload; server stays stale -> banner, no reload loop;
offline / blocked version.json -> silent; visibilitychange and pageshow(persisted) trigger a re-check; up-to-date -> no banner, no reload.
