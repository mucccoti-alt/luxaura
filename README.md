# Luxaura — Static Jewellery Site

This repository contains a fast, SEO-friendly static site for Luxaura (12 gold & diamond jewellery products).

What is included
- index.html, styles.css, script.js
- 12 inline SVG product images in /images (served from the repo)
- A Cloudflare Worker (worker/worker.js) that accepts order POSTs at /api/orders and stores them into a KV namespace (ORDERS). You must bind the KV namespace in Cloudflare.

Key behaviour
- Single-item checkout only (no cart). "Buy Now" opens a checkout modal for that product only.
- Mandatory bank transfer payment. Bank account: 4890010100591001 (required confirmation and bank_reference field).
- Uses EB Garamond (web Garamond-like font) with fallbacks.
- Images are embedded as SVG files in /images for fast delivery and no external dependencies.

Deploying to Cloudflare Pages + Worker (recommended)
1. Push this repository to GitHub (already done).
2. On Cloudflare, create a Pages project and connect the repository (build settings: none, root directory: /).
3. Create a Cloudflare Worker to handle orders:
   - In Cloudflare dashboard, go to Workers & Pages → Workers → Create a Worker.
   - Use the code from `worker/worker.js` in the Worker editor.
   - Create a KV namespace named `ORDERS` in the Workers dashboard (Workers → KV → Create namespace).
   - Bind the KV namespace to the Worker with the variable name `ORDERS`.
   - Configure the Worker route to match your Pages site, e.g. `https://<project>.pages.dev/api/*` or the custom domain once configured. Alternatively deploy the Worker as a service and use the Worker URL directly in the site by replacing `/api/orders` with the Worker URL.

4. Deploy the Worker and test the POST endpoint. The site expects the endpoint at `/api/orders` on the same origin.

Notes on security & production
- The Worker stores orders in KV in plaintext. For production you may want to:
  - Add basic authentication or spam protection (reCAPTCHA) before accepting orders.
  - Send an email notification on new orders (integrate SendGrid/Mailgun or use Cloudflare's outbound request to an email API).
  - Allow customers to upload receipts (store in R2 or external storage).

If you want, I can continue and:
- Configure Cloudflare Pages for you and set the Worker route, or
- Add reCAPTCHA support, email notifications, and an admin UI to view orders.
