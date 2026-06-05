# Venus Foundation

The official website for **Venus Foundation** — _Planting Seeds of Change_ — an NGO in Panchkula, Haryana (a CSR initiative by Venus Remedies). A fast, fully responsive, animation-rich, content-driven single-page app.

Built with **Vite · React 19 · TypeScript (strict) · Tailwind CSS v4**, formatted and linted with **Biome**.

---

## Highlights

- **Content-driven** — every section reads from typed content files in `src/content/`, so copy, imagery, navigation and blog posts are edited without touching layout or component code.
- **Custom animation engine** — scroll reveals, split-text headings, animated counters, parallax, the slideshow hero, drag rails with prev/next controls, tilt cards, the journey progress line, a scroll-scrubbed media sequence and an article table-of-contents scroll-spy — all hand-built React hooks on `IntersectionObserver` + `requestAnimationFrame`, with **no animation library**.
- **Fully responsive** with a bespoke ivory mobile menu, and **`prefers-reduced-motion`** respected throughout.
- **Real blog engine** — typed, block-based articles; category filtering; featured + related-post logic; generated tables of contents; dynamic routes.
- **Accessibility-minded** — semantic landmarks, labelled controls, `aria-current` nav state, keyboard-operable dialogs/menus, focus-visible affordances.
- **SEO-ready** — per-route `<title>`/description, Open Graph + Twitter meta, `robots.txt`.

## Tech stack

| Concern       | Choice                                            |
| ------------- | ------------------------------------------------- |
| Build tool    | Vite 6                                            |
| UI            | React 19 + React Router 7                         |
| Language      | TypeScript 5 (strict, `noUnusedLocals`/`Parameters`) |
| Styling       | Tailwind CSS v4 (`@theme` tokens) + layered design-system CSS |
| Lint / format | Biome 2                                           |
| Animations    | Custom React hooks (`IntersectionObserver` + rAF) |

## Getting started

Requires **Node 20+** (developed on Node 22).

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check (tsc -b) + production build to dist/
npm run preview    # preview the production build
npm run lint       # Biome: lint + format + import-order check
npm run lint:fix   # Biome autofix
npm run typecheck  # tsc project type-check (no emit)
```

## Project structure

```
src/
├─ main.tsx                 # entry — Router + StrictMode
├─ App.tsx                  # route table
├─ styles/                  # Tailwind v4 entry + ported design-system layers
│  ├─ index.css             #   @theme tokens + layer imports
│  ├─ base.css              #   typography, utilities, animation classes
│  ├─ components.css        #   buttons, nav, mobile menu, footer, surfaces, lightbox
│  └─ pages.css             #   home + inner-page section styles
├─ content/                 # ◀ ALL editable content lives here
│  ├─ site.ts               #   brand, nav (desktop + mobile), footer, socials, contact
│  ├─ images.ts             #   single registry of every image URL
│  ├─ home.ts · about.ts · seeds.ts · media.ts · contact.ts
│  └─ blog/                 #   blog engine
│     ├─ index.ts           #     post registry + helpers (featured, related, filters)
│     ├─ types.ts · authors.ts
│     └─ posts/*.ts         #     one file per article (typed block content)
├─ types/content.ts         # shared content types
├─ hooks/                   # reveal, parallax, counters, drag-rail, rail controls, tilt, TOC, slides, instant-reveal
├─ lib/                     # small utilities (mergeRefs)
├─ components/
│  ├─ primitives/           # Button, Chip, Eyebrow, Icon, Reveal, SplitText, Counter, InstantReveal
│  ├─ layout/               # SiteHeader, SiteFooter, Layout, ScrollProgress, Lightbox
│  ├─ sections/             # one module per page's sections (dynamic, content-driven)
│  └─ blog/Article.tsx      # article renderer + sticky table of contents
└─ pages/                   # Home, About, Seeds, Blog, BlogPost, Media, Contact, NotFound
```

## Editing content

Content is intentionally decoupled from presentation:

- **Text & images** — edit the relevant file in `src/content/`. Sections re-render automatically.
- **Images** — every URL is named once in `src/content/images.ts`; swap a photo in one place.
- **Navigation / footer / contact details** — `src/content/site.ts`.
- **Add a blog post**:
  1. Create `src/content/blog/posts/your-slug.ts` exporting a `BlogPost` (copy an existing post; the body is a typed list of blocks: `lead`, `p`, `h2`, `quote`, `callout`, `figure`, `list`, `stat`, `takeaways`).
  2. Import it into `src/content/blog/index.ts` and add it to the `posts` array.
  3. It instantly appears in the grid, gets a route at `/blog/your-slug`, a generated table of contents, related-post suggestions and category filtering — no other changes.

## Routes

`/` · `/about` · `/our-seeds` · `/blog` · `/blog/:slug` · `/media` · `/contact` · `*` (styled 404)

## Accessibility & motion

Reveals, split-text, counters, parallax, the hero slideshow, drag rails, tilt cards, the journey line, the scrubbed media sequence and the article scroll-spy are all small hooks using `IntersectionObserver` and `requestAnimationFrame`. They work on touch devices and fully respect `prefers-reduced-motion` (animations collapse to instant, transforms reset). Above-the-fold hero content reveals on load via an `InstantReveal` context so it is never left hidden.

## Performance notes

- Fonts are preconnected and preloaded; the image CDN is `preconnect`ed.
- Below-the-fold images use `loading="lazy"`; the LCP hero image uses `fetchPriority="high"`.
- `react`/`react-dom`/`react-router` are split into a separate vendor chunk.
- Imagery is served from a third-party CDN (Webflow assets). For the best possible mobile performance scores, self-host and pre-size/compress these assets (AVIF/WebP with explicit `width`/`height`) and add a CDN cache layer — see "Production / Lighthouse" below.

## Deployment

This is a client-side SPA. Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3 + CloudFront):

```bash
npm run build      # outputs static assets to dist/
```

Serve `dist/` and add a **SPA fallback** so deep links resolve — rewrite all unknown paths to `/index.html`:

- **Netlify** — `/* /index.html 200` in `_redirects`
- **Vercel** — `{"rewrites":[{"source":"/(.*)","destination":"/index.html"}]}`
- **Nginx** — `try_files $uri /index.html;`

## Production / Lighthouse

Verified locally before release:

- `npm run typecheck` — TypeScript strict, **0 errors**
- `npm run lint` — Biome, **0 errors / 0 warnings**
- `npm run build` — production build succeeds

For Lighthouse, run against the production preview (not the dev server):

```bash
npm run build && npm run preview
npx lighthouse http://localhost:4173 --view                 # desktop
npx lighthouse http://localhost:4173 --preset=desktop --view
```

The app is built to score top marks on **Accessibility, Best Practices and SEO**. **Performance** depends on the third-party CDN imagery and web fonts; to reach a perfect mobile performance score, self-host and optimise those assets as noted above.

## Dynamic video sync (headless-CMS style)

The Media page treats the **YouTube channel as the content source** — upload a video and it appears on the site **with no rebuild**, fetched live (no snapshot, no fallback):

- **`/api/videos`** (a serverless function in `api/videos.js`) fetches the channel server-side using `YOUTUBE_API_KEY`, classifies Shorts, and returns JSON. The response is **CDN-cached** (`s-maxage=6h, stale-while-revalidate=1d`), so it's fast and uses almost no API quota regardless of traffic. The key stays **server-side — never shipped to the browser**.
- The site (`useYouTubeVideos`) fetches `/api/videos` at runtime. New uploads show up on the next visit, automatically.
- **No key configured → no videos shown.** There is intentionally no baked-in fallback list; the channel is the single source of truth.

**Deploy (Vercel):** import the repo, add an env var **`YOUTUBE_API_KEY`** (restrict it to *YouTube Data API v3*; optionally `YOUTUBE_CHANNEL_ID`), deploy. `vercel.json` handles SPA routing and leaves `/api/*` to the function.

## License

© Venus Foundation. A CSR initiative by Venus Remedies. All rights reserved.
