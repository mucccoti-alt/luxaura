#!/bin/bash
# download_images.sh
# Downloads studio-style googledrive photos used for Luxaura and saves them to images/
# Run this from the repository root (bash download_images.sh)
set -euo pipefail
mkdir -p images

curl -L -o images/p001.jpg "https://drive.google.com/file/d/1IkZn0X70Kz35OXf1DT1B7px-OjFUfDvb/view?usp=drivesdk"
curl -L -o images/p002.jpg "https://drive.google.com/file/d/1F1HrmdQmvuHser1XLnpCoIr_g4614MZn/view?usp=drivesdk"
curl -L -o images/p003.jpg "https://drive.google.com/file/d/1KZY0USmQsSdhIdd1pNLHUze1xlFvom9-/view?usp=drivesdk"
curl -L -o images/p004.jpg "https://drive.google.com/file/d/1Yvr1pQxGcIJpWbxUTQf6fiP3M-S2p7X6/view?usp=drivesdk"
curl -L -o images/p005.jpg "https://drive.google.com/file/d/17Wb8-ay4xFi3wWEIQrRK2SdZnwt_ZrcY/view?usp=drivesdk"
curl -L -o images/p006.jpg "https://drive.google.com/file/d/1y2AzyIHpdShwMv1UcDTzvzHk0hlHLPxa/view?usp=drivesdk"
curl -L -o images/p007.jpg "https://drive.google.com/file/d/1iw7WBp7UiGHGs6lDmpcFxWA98NyN3wSJ/view?usp=drivesdk"
curl -L -o images/p008.jpg "https://drive.google.com/file/d/1OD1vogO7r_k6fSermzY3CnrcK66k3abA/view?usp=drivesdk"
curl -L -o images/p009.jpg "https://drive.google.com/file/d/1ct-7FQjeLZXpB3gHFhCq0U_lTIi0OKE9/view?usp=drivesdk"
curl -L -o images/p010.jpg "https://drive.google.com/file/d/1pTwwKmFFiZrXNkrmI_wxVkDSLFGL2Zku/view?usp=drivesdk"
curl -L -o images/p011.jpg "https://drive.google.com/file/d/1TkQCeo0MjCePmESUmwUoh9lCf-Ul2y36/view?usp=drivesdk"
curl -L -o images/p012.jpg "https://drive.google.com/file/d/1NB5-GujB2UNsnmkrUn6iV-M4BmK8D3eG/view?usp=drivesdk"
echo "Downloaded images to images/"

echo "Optional: run image optimization (cwebp) to generate WebP versions for better performance:"
echo "For example: for f in images/*.jpg; do cwebp -q 80 "$f" -o "${f%.*}.webp"; done"
