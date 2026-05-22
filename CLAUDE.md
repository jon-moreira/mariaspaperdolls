# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing/portfolio site for "Marias Paperdolls" — a Create React App (react-scripts 4.0.3, React 17) deployed to GitHub Pages at the custom domain `https://mariaspaperdolls.com`. The site is served from the root, not a subpath; `public/CNAME` pins the domain and `package.json#homepage` matches.

## Commands

- `npm start` — dev server on http://localhost:3000
- `npm run build` — production build into `./build` (also runs `build:sitemap` via `postbuild`)
- `npm run lint` — `eslint src/**/*.js src/**/*.jsx` (CRA's `react-app` config)
- `npm test` — react-scripts Jest in watch mode. Run a single file with `npm test -- src/App.test.js` (only `App.test.js` exists currently).
- `npm run deploy` — manual release fallback: clean build, copy `index.html` → `404.html` (SPA fallback for client-side routes), then `gh-pages -d build -b gh-pages` to push the published artifact.
- `npm run build:sitemap` — runs `src/sitemap-builder.js`; requires `./build` to exist (normally invoked by `postbuild`).

`README.md` is listed in `.gitignore` — don't be surprised when it's untracked.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Node 16 + yarn and publishes `./build` to the `gh-pages` branch via `peaceiris/actions-gh-pages`. The branch contents are what GitHub Pages serves; `public/CNAME` (copied into the build) keeps the domain pinned to `mariaspaperdolls.com`, and `public/.nojekyll` prevents Jekyll from filtering files that start with `_`.

Manual deploys via `npm run deploy` push to the same branch and are equivalent. Local builds on Node 17+ may need `NODE_OPTIONS=--openssl-legacy-provider` because react-scripts 4 predates OpenSSL 3; the CI workflow uses Node 16 to sidestep this.

If the canonical URL ever changes, four things must stay in sync: `package.json#homepage`, `public/CNAME`, `public/manifest.json` (`scope`/`start_url`), and the hardcoded base URL in `src/sitemap-builder.js`. Switching to a subpath deployment (e.g. `username.github.io/repo`) also requires giving `<BrowserRouter>` a `basename` in `src/routing.js` — currently it has none because the site is served at root.

## Architecture

### Routing & layout shell
- `src/index.js` mounts `<Routing>` inside `I18nextProvider`. `src/routing.js` declares all routes with `react-router-dom@5` (`BrowserRouter` + `Switch`).
- Every route component is wrapped by `src/components/Wrapper.js`, an HoC that renders `<Header/>`, shows `<Spinner/>` for **600ms on each route change**, then renders the page and `<Footer/>`. New routes must be wrapped with `Wrapper(...)` to get this chrome and the route-change loading behavior; bypassing it (see `NotFound`) skips both.
- `src/components/PageTracking.js` is invoked from `Wrapper` and pushes pageviews to react-ga.

### Content model — `src/assets/data.json`
This file is the single source of truth for the gallery. Top-level keys `works`, `catalog`, `creations`, `exhibitions` are each arrays of `{ name, highligthImage, images[], expositions?[] }` (note the misspelling `highligthImage` is the actual key — match it). Adding a new gallery item means: add an entry here, drop images under `public/imgs/works/<category>/<name>/`, and add translation keys under `elements.<name>` in the locale files.

The three category routes (`/works/catalog/:catalog`, `/works/creations/:creations`, `/works/exhibitions/:exhibitions`) all resolve to `src/pages/catalog-item.js`, which reads the dynamic param name to pick which `data.json` array to filter — so the URL segment **must** match a top-level key in `data.json`.

### i18n
- Runtime: `src/i18n.js` using `i18next` + `react-i18next`, sourced from `src/locales/{en,pt}.json`. `de.json` exists in the folder but is **not registered** in `i18n.js` — only English and Portuguese are active.
- The `extract:messages` / `manage:translations` scripts target `src/i18n/` (a separate `react-intl` workflow) and are not wired to the runtime locales used by the app. Treat them as legacy unless deliberately reviving react-intl.
- Many translations are rendered via `dangerouslySetInnerHTML` (e.g. `App.js`, `catalog-item.js`) — locale strings intentionally contain HTML.

### Sitemap build
`src/sitemap-builder.js` runs **after** `npm run build` (via the `postbuild` hook). It uses `babel-register` with `babel-preset-es2015`/`react` to require the React routing module from Node, expands the three category routes against `data.json`, and writes `build/sitemap.xml` against `https://mariaspaperdolls.com`. Changing route shapes in `routing.js` or category keys in `data.json` requires updating `paramsConfig` in this file too.

### Styles
- `src/App.scss` is the source-of-truth SCSS but is **not imported** at runtime. The compiled `src/App.css` is imported by `src/index.js` and `src/App.js`, and a copy at `public/App.css` is loaded directly via `<link>` in `public/index.html`. Style changes typically need to be reflected in `src/App.css` (and `public/App.css` if you want the pre-mount stylesheet to match) — don't expect the SCSS to be compiled by the build.
- Only `bootstrap/dist/css/bootstrap-grid.css` is imported; the full Bootstrap CSS is intentionally commented out.

### Static assets & SEO
- `public/index.html` sets `<base href="%PUBLIC_URL%/">`; image URLs throughout components are built from `process.env.PUBLIC_URL`. Don't hardcode `/imgs/...` — keep using `PUBLIC_URL` so the gh-pages subpath keeps working.
- `BingSiteAuth.xml`, `yandex_*.html` at the repo root are search-engine site verification files copied into the build (CRA serves `public/` contents at the site root; these two live at the repo root, not `public/`, so they're shipped as-is by the deploy script's `cp -R build/*` step only if also placed under `public/` — verify before relying on them).
