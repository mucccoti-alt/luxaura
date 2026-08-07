#!/bin/bash
# download_images.sh
# Downloads studio-style Unsplash photos used for Luxaura and saves them to images/
# Run this from the repository root (bash download_images.sh)
set -euo pipefail
mkdir -p images

curl -L -o images/p001.jpg "https://images.unsplash.com/photo-1531799101675-7a8bb0f2873b?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p002.jpg "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p003.jpg "https://images.unsplash.com/photo-1520975911261-9f1fa1b2e3b6?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p004.jpg "https://images.unsplash.com/photo-1534837143817-ec7f2b3e75a2?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p005.jpg "https://images.unsplash.com/photo-1549887534-1e27a1a59d0d?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p006.jpg "https://images.unsplash.com/photo-1570082072637-b31b5f6b2fc8?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p007.jpg "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p008.jpg "https://images.unsplash.com/photo-1562158076-7d4a3b672f0a?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p009.jpg "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p010.jpg "https://images.unsplash.com/photo-1561185127-3d3c2d62c2a0?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p011.jpg "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1600&q=80"
curl -L -o images/p012.jpg "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1600&q=80"

echo "Downloaded images to images/"

echo "Optional: run image optimization (cwebp) to generate WebP versions for better performance:"
echo "For example: for f in images/*.jpg; do cwebp -q 80 "$f" -o "${f%.*}.webp"; done"
