# Conventions

## JavaScript Style
- ES module imports/exports are used throughout `src/`.
- Functions are small and single-purpose in `src/app/*`.
- `return`-early guards are common for null checks and invalid state.
- Optional chaining (`?.`) is used for defensive DOM access.

## State Management Pattern
- Central mutable object `state` in [`src/domain/appState.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/domain/appState.js).
- Modules read/write the shared state directly rather than using events/store libraries.
- Transition duration constant (`SCREEN_TRANSITION_MS`) is colocated with state.

## UI Interaction Pattern
- Declarative markup triggers:
- Buttons and controls set `data-action` attributes in [`index.html`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html).
- Imperative handler routing:
- [`src/main.js`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.js) maps action strings to functions.
- Accessibility attributes are updated in handlers (`aria-pressed`, `aria-label`, focus behavior).

## CSS Conventions
- Design tokens defined in `:root` in [`src/styles/app.css`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/styles/app.css).
- Component classes prefixed with `c-` (`c-button`, `c-card`, `c-dialog`).
- State classes prefixed with `is-` (`is-active`, `is-playing`, `is-hidden`).
- Block/element-like class naming appears in places (`screen__inner`, `format-card__title`).

## Animation And Motion Rules
- Transition timing tokens (`--motion-fast`, `--motion-normal`) used consistently.
- Reduced-motion media query disables transitions and animations globally.
- Typewriter feature explicitly checks reduced-motion preference.

## Accessibility Conventions
- Keyboard support in crisis dialog (`Escape`, `Tab` loop).
- `aria-modal`, `aria-labelledby`, `aria-describedby` included for dialog semantics.
- Hidden assistive labels (`.sr-only`) used for icon-only share buttons.

## Error Handling Patterns
- Mostly silent defensive handling (no throws, no centralized logger).
- Fallback behavior implemented where API support varies (clipboard fallback).

## Documentation Conventions
- Inline code comments are minimal and pragmatic (not verbose).
- Current [`README.md`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/README.md) does not describe the app architecture yet.

## Conventions Gaps
- No linting config (ESLint/Prettier) detected.
- No formal typing (TypeScript/JSDoc types) detected.
- No shared constants file for action names; strings are currently hardcoded.
