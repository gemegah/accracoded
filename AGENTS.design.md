# AGENTS (Design)

## Purpose
- This file defines design-specific constraints for UI changes in Accra Coded.
- It complements `AGENTS.md` and applies when creating or modifying visual or UX behavior.

## UX Principles
- Keep the support flow calm, direct, and low-friction.
- Prioritize clarity over novelty on high-stress screens.
- Never hide crisis/support exits behind multiple interactions.
- Prefer one primary action per screen and predictable back navigation.

## Copy And Tone
- Use concise, empathetic, non-judgmental language.
- Avoid clinical jargon unless naming real support providers.
- Keep CTA labels explicit to user intent (for example, "Go to support options").
- Avoid dead-end feedback messages; provide recovery actions.

## Accessibility Standards
- Preserve keyboard access for all actions.
- Preserve dialog behavior: `Escape`, focus trap, focus return.
- Keep semantic labels for icon-only controls (`aria-label` required).
- Ensure focus-visible styles remain clearly visible on all backgrounds.

## Visual System Guardrails
- Reuse existing CSS tokens in `src/styles/app.css` before adding new colors.
- Keep typography to a small semantic scale; avoid one-off font sizes.
- Keep spacing rhythm consistent with existing 8/10/12/14/16/24 cadence.
- Preserve responsive behavior on mobile first, then tablet/desktop.

## Design Spec (Implementation-Level)

### Color System
- Use semantic tokens only. Do not hardcode hex values in feature code.
- Core tokens (light theme, current baseline):
- `--bg: #F2EEE4` (page background)
- `--surface: #A8A090` (surface tint)
- `--surface-2: #B0A898` (secondary surface)
- `--accent: #109088` (interactive brand accent)
- `--accent-strong: #0E8179` (primary CTA)
- `--text: #1F1B16` (default text)
- `--text-muted: #3A332A` (secondary body text)
- `--text-soft: #564D40` (meta/supporting text)
- `--text-inverse: #FDFDFA` (text on dark/saturated backgrounds)
- `--border: #CFC6B5` and `--border-strong: #B7AB96`
- Status tokens:
- `--success: #2F6F4F`
- `--warning: #A26A2A`
- `--danger: #9B3A34`

### Color Usage Rules
- Primary action: `--accent-strong` background + `--text-inverse` text.
- Secondary action: `--text-inverse` background + `--text` text.
- Ghost action on dark surfaces: transparent background + inverse border/text.
- Danger action: `--danger` background + `--text-inverse` text.
- Body text defaults to `--text`; helper copy defaults to `--text-soft`.
- Minimum contrast target:
- Body text: WCAG AA (4.5:1)
- Large headings and button text: WCAG AA large text (3:1)

### Typography System
- Font families:
- Display/headings: `'Cormorant Garamond', serif`
- Body/UI: `'Outfit', sans-serif`
- Semantic type scale:
- `display`: `clamp(36px, 10vw, 56px)`, line-height `1.06`, weight `400`
- `title`: `clamp(30px, 8vw, 40px)`, line-height `1.15`, weight `500`
- `h3/resource title`: `16px`, line-height `1.3`, weight `600`
- `body`: `16px`, line-height `1.7`, weight `400`
- `body-sub`: `14px`, line-height `1.6`, weight `400`
- `meta/caption`: `13-14px`, line-height `1.4-1.55`, weight `400-500`
- Buttons:
- Size `16px`, weight `500`, min-height `44px` (48px preferred for primary CTAs)

### Spacing, Radius, Elevation
- Spacing cadence: `8, 10, 12, 14, 16, 24, 28, 32`.
- Radius tokens:
- `--radius-sm: 12px`
- `--radius-md: 16px`
- `--radius-lg: 22px`
- Shadow token:
- `--shadow-soft: 0 12px 30px -20px rgba(31, 27, 22, 0.45)`

### Motion
- Timing tokens:
- `--motion-fast: 120ms`
- `--motion-normal: 170ms`
- Easing: `--ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1)`
- Respect `prefers-reduced-motion: reduce` by disabling non-essential animation.

### Component Contract (Library-Style)
- Required primitives:
- Button: variants `primary | secondary | ghost | danger`
- Card: variants `solid | subtle`
- Dialog: focus trap + `Esc` close + focus return
- Tabs: active state via `aria-pressed`
- List item: title + description + metadata + action row
- All interactive primitives must expose semantic attributes (`type`, `aria-label`, `aria-pressed`, `role`) where applicable.

### shadcn Adoption Policy
- Target direction is shadcn-style reusable primitives, not one-off hand-built UI in feature modules.
- Because this app is currently vanilla JS (not React/Tailwind), do not copy shadcn React code directly into runtime files.
- Use a compatibility approach:
- Keep current runtime stable.
- Centralize reusable primitives in a shared UI module.
- Prepare a migration scaffold (`components.json` and aliases) for future React/Tailwind adoption.
- Future React migration must keep current accessibility behavior and crisis flow invariants.

### Compatible Library Choice (Current Runtime)
- Preferred compatible component library for this repository: Shoelace/Web Components.
- Rationale:
- Works in vanilla HTML/CSS/JS with no framework lock-in.
- Accessible, themeable primitives (`button`, `dialog`, `tabs`, form controls).
- Enables incremental adoption without rewriting the app architecture.

## About Screen Rules
- "About" should explain purpose, privacy stance, and boundaries of support.
- Include a clear return path to the primary support flow.
- Keep About content scannable: short sections and clear headings.
- Do not dilute emergency pathways: crisis action stays visible from About.

## Accra Support Directory Rules
- Treat contacts as structured content, not hardcoded repeated markup.
- Every directory entry should include: name, what they offer, and contact method.
- Flag urgent resources clearly (for example, emergency/crisis options first).
- Keep directory data in one source boundary to enable future backend migration.

## Implementation Handshake
- If a UI interaction is driven by `data-action`, update both `index.html` and `src/main.js`.
- If a new screen is added, update navigation and progress indicators consistently.
- If resource content changes, keep crisis modal and resources screen aligned.
