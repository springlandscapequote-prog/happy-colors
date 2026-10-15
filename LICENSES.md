# Image sources and licenses

Happy Colors is a private family app. Pictures that come from real photos use only public-domain or CC0 sources.

## Mountain Lake Sunset (Easy and Hard, `pictures-real.js`)

- **Source photo:** "Lake McDonald Sunset 11.20.15", Glacier National Park, Montana, USA (taken 20 November 2015)
- **Page:** https://commons.wikimedia.org/wiki/File:Lake_McDonald_Sunset_11_20_15_(23218648701).jpg
- **Author:** Jacob W. Frank / National Park Service (Glacier NPS)
- **License:** Public domain (work of a U.S. federal government employee; Commons category "PD US NPS")
- **How it was changed:** center-cropped to a square, downscaled to 300x300, smoothed, reduced to 8 colors (Easy) or 20 colors (Hard) with k-means in Lab color space, split into regions, tiny regions merged into neighbors, outlines traced and smoothed into SVG paths. The result is a simplified derivative; no pixels of the original are included in the app.
- **Generator:** `tools/build_realistic.py`

## Everything else

Other pictures (stars, butterfly, garden, winter house, puppy, rainbow, ocean, castle, sunflower mandala) are drawn in code by this project and have no outside sources.
