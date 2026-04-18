# Integrations

## Overview
- The app has minimal external integrations and no backend API calls.
- All primary functionality runs in-browser using local DOM state.

## Third-Party Network Integrations
- Google Fonts:
- Loaded in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html) via `<link>` tags.
- Affects typography only; no app logic dependency.
- Iconify:
- Loaded in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html) via `<script src="https://code.iconify.design/...">`.
- Used for social/share icons and link icon rendering.

## Platform Integrations (Browser APIs)
- Clipboard API in [`src/app/interactionHandlers.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/interactionHandlers.js):
- `navigator.clipboard.writeText(...)` with fallback to `document.execCommand('copy')`.
- Network Information API in [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js):
- Reads `navigator.connection.effectiveType` to choose default content format.
- Reduced motion preference in [`src/app/typewriter.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/typewriter.js):
- Uses `window.matchMedia('(prefers-reduced-motion: reduce)')`.

## Social / External Link Integrations
- WhatsApp share URL.
- X/Twitter intent URL.
- Instagram and Snapchat links.
- Defined in resource/share area inside [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).

## Telephony Integrations
- Crisis/support lines are exposed through `tel:` anchors in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).
- Includes Ghana mental health contacts and emergency number.

## Data Storage Integrations
- There is no database connection.
- Check-in persistence is an adapter writing to `window.__accracodedCheckin` in [`src/data/checkinRepository.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js).
- This is a placeholder boundary for future API integration.

## Deployment Integration
- Cloudflare Wrangler config exists in [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc).
- Static asset upload boundary controlled by [`.assetsignore`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore).

## Not Present (Important)
- No auth provider integration.
- No analytics SDK.
- No error tracking service.
- No webhook handlers.
- No server-side business logic.
