# Testing

## Current Testing State
- No automated test framework configuration found.
- No test files (`*.test.*`, `*.spec.*`) detected in `src/`.
- No CI workflow config for tests detected in repository root.

## Existing Validation Practices (Observed)
- Manual browser interaction appears to be the primary verification method.
- UI behavior is deterministic enough for smoke checks:
- Screen transitions.
- Format toggles.
- Audio/video play state button toggles.
- Mood selection state.
- Crisis dialog keyboard handling.

## Areas That Need Coverage
- Action router in [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js):
- Ensure each `data-action` maps to the intended handler.
- Navigation behavior in [`src/app/navigation.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/navigation.js):
- State transitions and tab/view sync.
- Interaction logic in [`src/app/interactionHandlers.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/interactionHandlers.js):
- Clipboard success/failure branches.
- Check-in payload shape.
- Dialog focus trap in [`src/app/dialog.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/dialog.js):
- Tab loop, Escape close, focus return.

## Suggested Test Layers
- Unit tests:
- Pure-ish functions and state transitions in `src/app/*`.
- Component/DOM tests:
- Use a DOM harness (e.g., JSDOM) to validate class/ARIA updates.
- E2E smoke tests:
- Basic flow from landing to resources and dialog interactions.

## Suggested Tooling (If Added)
- Test runner: Vitest or Jest.
- DOM testing: Testing Library + JSDOM.
- E2E: Playwright for real browser behavior.

## Deployment Testing
- Deploy sanity check command is currently Wrangler dry-run.
- Config regression tests should include:
- Presence/validity of [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc).
- Asset include scope from [`.assetsignore`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore).

## Minimal Immediate Test Plan
- Add one smoke E2E path:
- navigate screens, select mood, submit check-in, open/close crisis dialog.
- Add one unit test file for `navigation.js`.
- Add one unit test file for `interactionHandlers.js` clipboard fallback logic.
