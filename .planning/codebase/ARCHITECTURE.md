# Architecture

## High-Level Intent
- Provide a short, low-friction mental health support flow tailored to Accra context.
- Keep UX private and lightweight: no sign-in, no backend dependency in current version.

## Runtime Model
- Single HTML document app in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).
- Behavior mounted through one JS entrypoint: [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js).
- Styling isolated into [`src/styles/app.css`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/styles/app.css).

## Screen Flow
- `s-landing` -> `s-format` -> `s-content` -> `s-checkin` -> `s-resources`.
- Each screen is a `<section class="screen"...>` and active screen uses `.is-active`.
- Navigation is class toggling, not route changes.

## Composition Layers
- Domain state:
- [`src/domain/appState.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/domain/appState.js) stores app-level mutable state.
- Navigation/view layer:
- [`src/app/navigation.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/navigation.js) handles screen transitions and format tab sync.
- Interaction layer:
- [`src/app/interactionHandlers.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/interactionHandlers.js) handles play/audio/mood/check-in/copy-link actions.
- Dialog accessibility layer:
- [`src/app/dialog.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/dialog.js) handles crisis modal open/close/focus trapping.
- Presentation effect layer:
- [`src/app/typewriter.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/typewriter.js) animates landing text.
- Data adapter layer:
- [`src/data/checkinRepository.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js) abstracts check-in save behavior.

## Event Architecture
- Event delegation in [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js):
- One document click handler routes by `data-action`.
- One keydown handler supports modal escape/tab trapping.
- This avoids per-element listener sprawl.

## Data Flow
- UI input -> event action -> handler function -> state mutation -> DOM updates.
- Check-in submit path:
- `submitCheckin()` creates payload.
- `saveCheckin(payload)` persists to global window variable.
- `goTo('s-resources')` advances flow.

## Adaptivity And Accessibility
- Network-aware default format picks text/audio for slower connections.
- Reduced-motion preference disables typewriter animation.
- Crisis dialog includes `aria-modal`, keyboard trap, escape-to-close, focus return.

## Deployment Shape
- Static asset deployment via Cloudflare Worker assets configuration in [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc).
- No server-side render or API layer in this repo.
