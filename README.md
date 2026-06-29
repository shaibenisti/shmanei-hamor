# שמני המור · Shmanei Hamor

Production-quality Hebrew RTL website for the aromatherapy brand **שמני המור**
(owner: לימור בניסטי). Built with Next.js (App Router), TypeScript and Tailwind
CSS, statically exported for GitHub Pages.

See [`docs/BRIEF.md`](docs/BRIEF.md) for the full project brief.

## Scripts

```bash
npm install    # install dependencies
npm run dev    # local dev server → http://localhost:3000
npm run build  # static export → ./out
npm run lint   # eslint
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the
static site (with `NEXT_PUBLIC_BASE_PATH=/shmanei-hamor`) and publishes it to
GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions** in the
`shmanei-hamor` repository.
