# Image sources and licenses

Happy Colors is a private family app. Pictures that come from real photos use only public-domain or CC0 sources.

## Mountain Lake Sunset (Easy, Medium and Hard, `pictures-real.js`)

- **Source photo:** "Lake McDonald Sunset 11.20.15", Glacier National Park, Montana, USA (taken 20 November 2015)
- **Page:** https://commons.wikimedia.org/wiki/File:Lake_McDonald_Sunset_11_20_15_(23218648701).jpg
- **Author:** Jacob W. Frank / National Park Service (Glacier NPS)
- **License:** Public domain (work of a U.S. federal government employee; Commons category "PD US NPS")
- **How it was changed:** center-cropped to a square, downscaled to 300x300, smoothed, reduced to 8 colors (Easy) or 20 colors (Hard) with k-means in Lab color space, split into regions, tiny regions merged into neighbors, outlines traced and smoothed into SVG paths. The result is a simplified derivative; no pixels of the original are included in the app.
- **Generator:** `tools/build_realistic.py`

## Spring Landscape Rose Garden (`rosegarden`, Hard, Nature)

- **Source:** color-by-number page titled "Spring Landscape / Rose Garden", supplied by the owner with this change (numbered line art, 10-color key, and a fully colored answer key). Not downloaded from a public URL.
- **Author:** owner-supplied art
- **License:** supplied by the owner for use in Happy Colors
- **How it was changed:** the numbered cells were vectorized into SVG paths (no pixels of the page are shipped). Each cell keeps the number printed on the line art, which matched the answer-key color for all 192 cells. Colors are the 10 key swatches (red, dark red, pink, leaf green, dark green, brown, logo green, grass green, sky blue, white). Two unnumbered flecks — a thin leaf-green gap between stems and a tiny sky speck caught in a line junction — were merged into the neighboring cell of the same color. The black outlines were split between the cells they separate so every cell meets its neighbors and can be tapped. Paths are slightly smoothed (about 1.6px on the source page). The white cells (clouds and the area behind the green S) use the key's white.

## Everything else

Other pictures (stars, butterfly, garden, winter house, puppy, rainbow, ocean, castle, sunflower mandala, bus, fire truck, owl, Christmas tree, rainbow castle, rocket) are drawn in code by this project and have no outside sources.

## Daily pictures (`pictures-daily.js`)

Happy Snowman, Planet Parade and all later daily pictures are original drawings made in code for this project (no outside images or photos), released as CC0 / original work of this project. Any daily picture that is traced from an outside photo gets its own section above with page URL, author, license and changes. Full list: `PICTURE_LOG.md`. Procedure: `DAILY_RUN.md`.

- 2026-10-24: Steam Train Station (`steamtrain`, Hard, Vehicles) and Flying Saucer (`saucer`, Easy, Space): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-25: Harvest Table (`harvest`, Hard, Holidays & Winter) and Friendly Whale (`whale`, Easy, Animals): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-26: Space Station Garden (`spacegarden`, Hard, Space) and Magic Wand & Stars (`magicwand`, Easy, Fantasy & Castles): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-27: Sunny Sailboat (`sailboat`, Easy, Vehicles) and Hot Cocoa Winter Window (`cocoawindow`, Medium, Holidays & Winter): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-28: Digger & Dump Truck (`digger`, Medium, Vehicles) and Goldfish Bowl (`fishbowl`, Medium, Animals): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-29: Fairy Tea Party (`teaparty`, Medium, Fantasy & Castles) and Stargazing Observatory (`observatory`, Hard, Space): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-30: Autumn Waterfall (`waterfall`, Medium, Nature) and Octopus Coral Garden (`octopus`, Hard, Animals): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-10-31: Mars Rover Canyon (`marsrover`, Medium, Space) and Halloween Candy Porch (`candyporch`, Hard, Holidays & Winter): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-11-01: Race Car Track (`racetrack`, Hard, Vehicles) and Dragon Egg Nest (`dragonegg`, Medium, Fantasy & Castles): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-11-02: Enchanted Treehouse Lanterns (`treehouse`, Hard, Fantasy & Castles) and Snow Globe (`snowglobe`, Easy, Holidays & Winter): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-11-03: Rainy Rainforest Canopy (`rainforest`, Hard, Nature) and Little Sea Turtle (`turtle`, Easy, Animals): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
- 2026-11-04: Little Fire Boat (`fireboat`, Easy, Vehicles) and Comet & Star Nursery (`cometnursery`, Medium, Space): original drawings made in code for this project, no outside sources; license CC0 / original work of this project.
