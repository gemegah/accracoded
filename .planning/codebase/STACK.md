# Stack

## Purpose Of This Project
- A front-end-only mental wellness microsite for Accra users.
- Provides a guided flow: landing -> format selection -> content -> check-in -> support resources.
- Main user-facing entrypoint is [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).

## Languages And Runtime
- HTML: page structure and semantic sections in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).
- CSS: UI styling and responsive rules in [`src/styles/app.css`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/styles/app.css).
- JavaScript (ES modules): app orchestration and behavior in [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js).
- Browser runtime only; no Node server app in this repository.

## Frontend Architecture Style
- Multi-screen single-page pattern using section toggling (`.screen` + `.is-active`).
- Event delegation via `data-action` attributes in [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js).
- Module boundaries:
- App behaviors: `src/app/*`.
- State: [`src/domain/appState.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/domain/appState.js).
- Data adapter: [`src/data/checkinRepository.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js).

## Dependencies And External Libraries
- No package manager manifest (`package.json`) is present.
- Uses external web assets through CDN:
- Google Fonts (`Cormorant Garamond`, `Outfit`) from `fonts.googleapis.com`.
- Iconify web component script from `https://code.iconify.design`.
- No framework (React/Vue/Svelte) in use.

## Build And Deployment
- Cloudflare Workers static assets deployment configured in [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc).
- Assets directory is repository root (`"."`), then narrowed by [`.assetsignore`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore).
- `.assetsignore` currently allows only `index.html` and `src/**`.
- This means `scripts/` and docs are not deployed as public assets.

## Environment And Configuration
- No runtime `.env` or secret config detected in tracked files.
- One local helper shell script exists in [`scripts/install-skill-from-zip.sh`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/scripts/install-skill-from-zip.sh), unrelated to app runtime.

## Practical Summary
- This is a lean static web app intentionally avoiding backend dependencies.
- The deployment target is Cloudflare static asset serving via Wrangler versions upload.
