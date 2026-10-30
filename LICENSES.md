# Image sources and licenses

Happy Colors is a private family app. Pictures that come from real photos use only public-domain or CC0 sources.

## Mountain Lake Sunset (Easy, Medium and Hard, `pictures-real.js`)

- **Source photo:** "Lake McDonald Sunset 11.20.15", Glacier National Park, Montana, USA (taken 20 November 2015)
- **Page:** https://commons.wikimedia.org/wiki/File:Lake_McDonald_Sunset_11_20_15_(23218648701).jpg
- **Author:** Jacob W. Frank / National Park Service (Glacier NPS)
- **License:** Public domain (work of a U.S. federal government employee; Commons category "PD US NPS")
- **How it was changed:** center-cropped to a square, downscaled to 300x300, smoothed, reduced to 8 colors (Easy) or 20 colors (Hard) with k-means in Lab color space, split into regions, tiny regions merged into neighbors, outlines traced and smoothed into SVG paths. The result is a simplified derivative; no pixels of the original are included in the app.
- **Generator:** `tools/build_realistic.py`

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
