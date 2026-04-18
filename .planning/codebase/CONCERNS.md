# Concerns

## High Priority Concerns
- README mismatch:
- [`README.md`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/README.md) documents a skill ZIP installer helper, not the mental-health web app.
- This creates onboarding confusion and weak project discoverability.
- Data persistence is placeholder-only:
- [`src/data/checkinRepository.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js) writes to `window.__accracodedCheckin`.
- No durable storage, no analytics pipeline, no backend transport.

## Medium Priority Concerns
- No automated test suite:
- Regression risk is high when editing markup/action wiring.
- `data-action` strings are hardcoded across HTML and JS:
- Typos can silently break features (no compile-time safety).
- No lint/type guardrails:
- JavaScript-only project with no lint config can accumulate subtle runtime issues.

## Deployment/Operational Concerns
- Current deployment publishes root-level assets filtered by [`.assetsignore`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore).
- If `.assetsignore` is changed carelessly, sensitive or irrelevant files could be exposed.
- No `.gitignore` currently in main branch for Wrangler/env artifacts.

## Security And Privacy Concerns
- App claims privacy/no tracking in UX copy, but there is no explicit privacy policy document in repo.
- External third-party scripts (Iconify CDN) introduce supply-chain/runtime availability dependency.
- Social links are hardcoded and may drift from product intent without validation checks.

## Accessibility/UX Risks
- Multi-screen flow depends heavily on class toggling.
- Any broken state sync can trap users on hidden screens.
- Focus trap logic is custom; needs regression tests for keyboard-only users.
- Audio/video interactions are simulated toggles, not actual media playback integration.

## Content And Product Risks
- Crisis contacts are hardcoded in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).
- Contact numbers and organizations can become outdated without a content update process.
- No localization/i18n structure for expansion beyond current copy.

## Recommended Next Actions
- Align README with actual app purpose and architecture.
- Add `.gitignore` for `.wrangler`, `.env*`, `.dev.vars*` patterns.
- Introduce baseline automated tests (unit + one E2E smoke).
- Add a configurable content data source for emergency/support contacts.
- Keep `checkinRepository` abstraction and swap window storage for real API integration.
