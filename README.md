# Vetora Clothing — Website

A React + Tailwind CSS landing/shop page for Vetora Clothing, with a scroll-driven
3D hero animation, a product grid with hover-tilt cards, and ordering via WhatsApp
(no payment gateway).

## 1. Before you do anything: set your WhatsApp number

Open `src/config.js` and replace the placeholder with your real WhatsApp Business
number (country code + number, no `+`, no spaces):

```js
export const WHATSAPP_NUMBER = '94770000000'
```

Every "Order on WhatsApp" button links to `https://wa.me/<number>` with the
product name, size, and price pre-filled in the message.

## 2. Swap in your own hero video

The hero (`src/components/CinematicHero.jsx`) is a scroll-scrubbed video: as you
scroll, it plays through the clip frame-by-frame instead of moving the page, while
three text panels cross-fade over it. It currently uses a placeholder video.

Once you have your own footage, open `src/config.js` and replace `HERO_VIDEO_URL`
with your video's URL:

```js
export const HERO_VIDEO_URL = 'https://your-cdn.com/your-video.mp4'
```

For the smoothest scrubbing, export it as:
- **Format:** mp4, H.264, 1920×1080
- **Length:** roughly 8–12 seconds
- **Keyframes:** all-intra (every frame is a keyframe) if your export tool supports
  it — this is what lets the scroll land on an exact frame instantly instead of
  jumping to the nearest keyframe
- **Hosted somewhere with CORS enabled**, since the page fetches the video as a
  blob for smooth seeking. If it's blocked by CORS, it falls back to streaming
  the video directly (slightly less smooth, but it still works).

If you don't have footage yet and want to reuse the current placeholder scene
until you do, no changes are needed — it already works out of the box.

## 3. Add your real product photos (optional)

Right now every product uses the same shirt photo (`public/tshirt-black.png`).
To use different photos per product:
1. Drop new images into the `public/` folder.
2. Open `src/data/products.js` and change each product's `image` path.

## 4. Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

## 5. Deploy to Cloudflare Pages

**Option A — Cloudflare dashboard (no command line needed)**
1. Push this folder to a GitHub repository.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select your repository.
4. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click **Save and Deploy**.

**Option B — Wrangler CLI**

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name=vetora-clothing
```

(The first run will ask you to log in to Cloudflare in your browser.)

## Project structure

```
src/
  components/
    Navbar.jsx         top nav bar (auto light/dark text for the hero vs. rest of page)
    CinematicHero.jsx  scroll-scrubbed video hero with cross-fading text panels
    Products.jsx       product grid section
    ProductCard.jsx     single product card (tilt + WhatsApp button)
    Footer.jsx          closing CTA + footer
  data/products.js     product catalog — edit names, prices, sizes here
  config.js             WhatsApp number, hero video URL, brand name
```

## Notes

- No payment gateway is wired up — every order routes to WhatsApp as requested.
- Colors, fonts, and the type scale live in `tailwind.config.js` if you want to
  adjust the palette later.
