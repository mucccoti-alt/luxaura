This PR updates absolute image references and the canonical URL to use the Pages domain (https://luxaura.pages.dev/) so Open Graph, Twitter cards, and JSON-LD product images resolve correctly after the branch is merged and the Pages site is published. It also confirms that images/p001.jpg–images/p012.jpg exist in the repository.

Files touched:
- index.html (OG/twitter/image_src/json-ld updated to https://luxaura.pages.dev/...)
- images/NOTICE-p001-p012.txt (added earlier)

Deployment notes:
- After merging this PR into main, GitHub Pages will rebuild the site at https://luxaura.pages.dev/. It can take a few minutes for changes to appear.
- If you want responsive images or WebP variants generated, I can add that in a follow-up commit.

If everything looks fine, please merge the PR to publish the images and updated metadata to the live site.
