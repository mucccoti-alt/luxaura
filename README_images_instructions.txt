Added instructions and a download script to fetch Unsplash studio photos into images/. Run `bash download_images.sh` locally to save images into the repository. After downloading, the site will display the exact studio photos from images/.

Notes:
- The script downloads high-resolution JPEGs (1600px wide). For best performance, consider generating WebP variants and smaller responsive sizes locally (I can provide commands).
- Unsplash license: images are free to use; attribution is included in README.

Next steps I recommend you run locally:
1. From the repo root: bash download_images.sh
2. (Optional) Generate WebP versions: `for f in images/*.jpg; do cwebp -q 80 "$f" -o "${f%.*}.webp"; done`
3. Commit images: `git add images && git commit -m "Add product photos" && git push`

After you push the images, the site will serve the photos from images/ (script-local-images.js is already in the repo). If you want, I can instead update the live script.js to reference local images once you confirm the images are pushed (or I can perform the image commit for you if you provide the image files here).
