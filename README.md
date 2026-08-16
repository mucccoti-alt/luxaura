# Luxaura — Static Jewellery Site

This repository contains a fast, SEO-friendly static site for Luxaura (12 gold & diamond jewellery products).

What changed in this update
- Replaced SVG placeholders with high-quality studio-style photos from Unsplash (hotlinked). Images use responsive srcset and lazy loading for performance.
- Improved SEO meta description and canonical in index.html.

Images (studio-style photos from Unsplash)
- P001 Aurora Diamond Pendant — p001
- P002 Solstice Gold Ring — p002
- P003 Evelyn Diamond Studs — p003
- P004 Celeste Gold Bangle — p004
- P005 Orion Diamond Bracelet — p005
- P006 Riviera Gold Necklace — p006
- P007 Luna Solitaire Ring — p007
- P008 Ivy Diamond Cluster — p008
- P009 Mariner Gold Hoop Set — p009
- P010 Seraph Diamond Collar — p010
- P011 Helena Locket — p011
- P012 Vega Gold Pendant — p012

License & attribution
- Images are provided by Unsplash under the Unsplash License (free to use). Attribution is appreciated; the photo pages above link to each original image and its photographer.

Deploy notes (reminder)
- Cloudflare Pages: connect the repository (main branch) and deploy. Build settings: None, output directory: root (/).
- Cloudflare Worker: bind a KV namespace named ORDERS and route the Worker to handle `/api/*` on your Pages domain (see README for details).

If you want me to instead commit local copies of the images into the repository (so the site has no external hotlinks), I can do that — you'll need to either upload a ZIP of images or allow me to add the image files (I cannot upload third-party binaries without your confirmation). For now the site uses hotlinked Unsplash images for fast turnaround.
