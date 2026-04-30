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
