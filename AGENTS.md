# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Nuxt 4 portfolio/landing site** (Nuxt UI + Nuxt Content, i18n) for a doctor. There is no separate backend service; the only service to run is the Nuxt dev server.

### Package manager
- Despite the `packageManager` field (`pnpm`) and README mentioning `pnpm`, the committed lockfile is `package-lock.json`. Use **npm** (`npm install`, `npm run dev`, etc.) so the committed lockfile is respected. The update script already runs `npm install` on startup.
- `postinstall` runs `nuxt prepare` and `scripts/fix-sharp.js` automatically (removes an incompatible nested `ipx/sharp` build). This is expected output, not an error.

### Run / lint / build (see `package.json` scripts)
- Dev server: `npm run dev` → serves on `http://localhost:3000` (no `--host` by default).
- Lint: `npm run lint`. Note: the checkout currently has **pre-existing lint errors** in several `app/pages/*.vue` files (unused vars, missing `v-for` keys). These are not environment problems — do not "fix" them unless asked.
- Build / preview: `npm run build` / `npm run preview`.

### Non-obvious notes
- Default locale is **Persian (RTL)**; the homepage renders in Persian. The English version is served under the `/en` prefix (e.g. `/en/contact`).
- Server API routes in `server/api/` (e.g. `doctorTo.ts`, `paziresh24.ts`) fetch from external services and may fail without outbound network access; the site's static/content pages still render fine.
- The `contact` page (`/en/contact`) form does not POST to a backend — on submit it shows a Nuxt UI success toast (handled client-side). Good lightweight smoke test of the running app.
