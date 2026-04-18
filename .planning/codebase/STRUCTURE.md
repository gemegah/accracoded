# Structure

## Top-Level Layout
- [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html): single-page app shell and all content screens.
- [`src/`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src): JavaScript modules plus stylesheet.
- [`scripts/`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/scripts): local utility script (skill ZIP installer helper).
- [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc): Cloudflare deployment config.
- [`.assetsignore`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore): deployment asset allowlist.
- [`README.md`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/README.md): currently documents script helper, not product UX.

## Source Tree
- [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js): entrypoint, bootstraps handlers.
- [`src/styles/app.css`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/styles/app.css): full visual system and responsive CSS.
- [`src/domain/appState.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/domain/appState.js): shared mutable state constants.
- [`src/data/checkinRepository.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js): data persistence abstraction.
- [`src/app/navigation.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/navigation.js): screen and format switching.
- [`src/app/interactionHandlers.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/interactionHandlers.js): user interaction handlers.
- [`src/app/dialog.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/dialog.js): crisis modal behavior.
- [`src/app/typewriter.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/typewriter.js): landing animation.

## Naming Conventions Observed
- App modules under `src/app/` are feature/behavior-oriented.
- Domain and data concerns split into `src/domain/` and `src/data/`.
- File names are lowerCamel-like or descriptive nouns (`navigation`, `dialog`, `typewriter`).
- CSS class naming uses utility-ish prefix style (`c-`, `screen__`, `is-` states).

## Interaction Contract
- HTML uses `data-action` and optional `data-target`, `data-format`, `data-mood`.
- JavaScript maps those actions in one router (`handleActionClick` in [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js)).
- Contract is implicit between markup and JS; no schema file exists.

## Deployment-Relevant Files
- [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc) defines static asset deployment.
- [`.assetsignore`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore) limits published files.
- Keeping deployment config at root allows CI to run `npx wrangler versions upload`.

## Structural Notes
- No test directory (`test/`, `__tests__/`) present.
- No package manager lock or manifest file present.
- No CI workflow file found in this working tree snapshot.
