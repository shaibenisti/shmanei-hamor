# שמני המור — Project Brief

A production-quality Hebrew RTL marketing website for the aromatherapy brand
**שמני המור** (Shmanei Hamor), owned by **לימור בניסטי** (Limor Benisti).

> Frontend copy is Hebrew. All code, filenames, ids, routes, components,
> variables and folders are English only.

---

## Brand

| | |
| --- | --- |
| Brand name | שמני המור |
| Owner | לימור בניסטי |
| Tagline | חיבור טבעי בין גוף, נפש וצמחי מרפא |
| Style | luxurious, spiritual, professional, natural, calm, feminine |
| Phone / WhatsApp | 0502551350 |
| WhatsApp link | https://wa.me/972502551350 |
| Location | מושב שדה תרומות |

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3** for styling
- Static export (`output: "export"`) — no backend, no database
- Deployed to **GitHub Pages** via GitHub Actions
- Full RTL (`dir="rtl"`, `lang="he"`), mobile-first responsive design

## Pages & routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | Home | Hero, values, featured products, treatment & about previews, CTA |
| `/products` | Products | Full product grid with WhatsApp order buttons |
| `/treatments` | Treatments | עיסוי גוף עם צמחי מרפא לנשים — details + booking |
| `/about` | About | Limor's story |
| `/contact` | Contact | Phone, WhatsApp, location |

## Project structure

```
src/
  app/            layout + 5 routes (page.tsx per folder)
  components/     Header, Footer, Hero, ProductCard, ProductGrid,
                  ProductDetailDialog, BotanicalMark, GiftVoucher,
                  WhatsAppButton, SectionTitle, AboutPreview,
                  TreatmentPreview, ContactCard
  data/           products.ts, productDetails.ts, site.ts
public/images/    products/ , about/ , treatments/
docs/             BRIEF.md, product-guides/ (source information sheets)
.github/workflows deploy.yml (GitHub Pages)
```

## Product information sheets (סגולות ושימוש)

Products that ship with a printed information sheet get a second, quiet button
on their card next to the WhatsApp order button. It opens `ProductDetailDialog`
— a modal that expands out of the button (Web Animations API, no motion
library), locks the page behind it, traps focus, closes on `Esc`, and falls back
to a plain fade under `prefers-reduced-motion`.

The Hebrew copy is transcribed verbatim into `src/data/productDetails.ts`, one
entry per `Product.id`; a product without an entry simply has no button. Each
entry carries its own accent colour, and sections render only when present, so a
sheet with no אזהרות block never shows an empty heading. The original `.txt`
sheets are kept, unread at runtime, in `docs/product-guides/`.

## Design tokens (Tailwind theme)

| Token | Hex |
| --- | --- |
| cream | #F7F1E8 |
| gold | #C6A15B |
| deep-green | #526B4E |
| sage | #8FA58C |
| brown | #7A5C45 |
| ink (text dark) | #2F2A25 |
| white | #FFFFFF |

Fonts: **Frank Ruhl Libre** (serif headings) + **Heebo** (sans body), both
loaded via `next/font/google` with Hebrew subsets.

## Content / wording rules

Avoid strong medical promises (no "מרפא מחלות", "מעלים כאבים" etc.). Use careful
wording: רוגע, שלווה, טיפול טבעי, שגרת טיפוח, חיבור לגוף ולנפש, נרקח בעבודת יד,
מצמחי מרפא.

Disclaimer (footer + product/treatment pages):

> המידע באתר אינו מהווה ייעוץ רפואי או תחליף להתייעצות עם גורם מקצועי. השימוש
> במוצרים בהתאם להנחיות המצורפות.

## Local development

```bash
npm install      # install dependencies
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
npm run lint     # eslint
```

## Deployment (GitHub Pages)

- Future repository name: **shmanei-hamor**
- Project site URL: `https://<user>.github.io/shmanei-hamor/`
- `next.config.mjs` reads `NEXT_PUBLIC_BASE_PATH`. The GitHub Action sets it to
  `/shmanei-hamor` so `basePath` + `assetPrefix` resolve correctly. Locally the
  variable is empty, so dev runs cleanly at `/`.
- `output: "export"`, `trailingSlash: true`, `images.unoptimized: true`.
- `public/.nojekyll` ensures GitHub Pages serves `_next/` assets.

Push to `main` → GitHub Actions builds and publishes the `out/` folder.
