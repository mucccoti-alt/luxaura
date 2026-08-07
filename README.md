# Luxaura — Static Jewellery Site

This repository contains a fast, SEO-friendly static site for Luxaura (12 gold & diamond jewellery products).

What changed in this update
- Replaced SVG placeholders with high-quality studio-style photos from Unsplash (hotlinked). Images use responsive srcset and lazy loading for performance.
- Improved SEO meta description and canonical in index.html.

Images (studio-style photos from Unsplash)
- P001 Aurora Diamond Pendant — https://unsplash.com/photos/1531799101675-7a8bb0f2873b
- P002 Solstice Gold Ring — https://unsplash.com/photos/1509395176047-4a66953fd231
- P003 Evelyn Diamond Studs — https://unsplash.com/photos/1520975911261-9f1fa1b2e3b6
- P004 Celeste Gold Bangle — https://unsplash.com/photos/1534837143817-ec7f2b3e75a2
- P005 Orion Diamond Bracelet — https://unsplash.com/photos/1549887534-1e27a1a59d0d
- P006 Riviera Gold Necklace — https://unsplash.com/photos/1570082072637-b31b5f6b2fc8
- P007 Luna Solitaire Ring — https://unsplash.com/photos/1522312346375-d1a52e2b99b3
- P008 Ivy Diamond Cluster — https://unsplash.com/photos/1562158076-7d4a3b672f0a
- P009 Mariner Gold Hoop Set — https://unsplash.com/photos/1522335789203-aabd1fc54bc9
- P010 Seraph Diamond Collar — https://unsplash.com/photos/1561185127-3d3c2d62c2a0
- P011 Helena Locket — https://unsplash.com/photos/1554995207-c18c203602cb
- P012 Vega Gold Pendant — https://unsplash.com/photos/1489987707025-afc232f7ea0f

License & attribution
- Images are provided by Unsplash under the Unsplash License (free to use). Attribution is appreciated; the photo pages above link to each original image and its photographer.

Deploy notes (reminder)
- Cloudflare Pages: connect the repository (main branch) and deploy. Build settings: None, output directory: root (/).
- Cloudflare Worker: bind a KV namespace named ORDERS and route the Worker to handle `/api/*` on your Pages domain (see README for details).

If you want me to instead commit local copies of the images into the repository (so the site has no external hotlinks), I can do that — you'll need to either upload a ZIP of images or allow me to add the image files (I cannot upload third-party binaries without your confirmation). For now the site uses hotlinked Unsplash images for fast turnaround.
