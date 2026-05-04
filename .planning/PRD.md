# Product Requirements Document (PRD)

## Product
Accra Coded

## Date
2026-04-21

## Problem
People in Accra under emotional pressure need immediate, private, low-friction support and quick access to trusted help resources without account creation or complex onboarding.

## Product Goal
Deliver a stable, browser-only emotional support journey that moves users from grounding content to practical support options in under two minutes.

## Current Scope (Implemented)
- Landing -> format selection -> content -> check-in -> support resources.
- Crisis dialog with keyboard and focus accessibility.
- Static frontend deployment via Cloudflare assets.

## Upcoming Scope (Next)
- Add navigation to an About screen.
- Add curated Accra mental health support directory entries with clearer structure and prioritization.

## Non-Goals
- User accounts or sign-in.
- Full clinical workflows.
- Full analytics backend.

## Users
- Primary: Accra users in moments of emotional stress who need immediate support.
- Secondary: Caregivers/friends helping someone find support options quickly.

## Success Metrics
- User can reach About from core flow and return in one interaction.
- User can find at least one relevant Accra support contact in under 30 seconds.
- No broken navigation paths in the journey.
- Crisis support access remains available and accessible.

## Functional Requirements

### Navigation: About
- `ABOUT-01`: Add an About screen in the same screen-router model (`.screen` + `data-action="go-to"`).
- `ABOUT-02`: Add entry point(s) from landing/resources, with explicit "Back to support flow" action.
- `ABOUT-03`: Preserve crisis support entry point from About.

### Accra Directory
- `DIR-01`: Directory entries must be structured content objects (not repeated hardcoded blocks).
- `DIR-02`: Each entry includes name, service description, location coverage, and contact method.
- `DIR-03`: Sort urgent support options first.
- `DIR-04`: Render entries in resources screen from one data boundary module to support future backend migration.

### UX and Quality
- `UX-01`: Progress/wayfinding remains clear when About is introduced (no dead-end screens).
- `UX-02`: New actions follow existing `data-action` contracts in `index.html` and `src/main.js`.
- `UX-03`: Accessibility behavior for dialogs and interactive controls remains intact.

## Proposed Technical Approach

### Screen Integration
- Add `section#s-about` to `index.html`.
- Reuse `goTo()` routing from `src/app/navigation.js`.
- Add buttons with `data-action="go-to"` to and from About.

### Directory Content Boundary
- Introduce a dedicated data module for support directory content (for example, `src/data/supportDirectory.js`).
- Render directory entries from data into resources markup.
- Keep crisis modal high-priority contacts mirrored from the same source data where possible.

### Styling
- Reuse existing style tokens/classes first.
- Add only minimal new classes for About layout and directory metadata rows.

## Risks And Mitigations
- Risk: Navigation contract drift.
  - Mitigation: Validate every new `data-action` path in `src/main.js`.
- Risk: Content drift between crisis modal and resources list.
  - Mitigation: Centralize support contact data source.
- Risk: Visual clutter from expanded resource list.
  - Mitigation: Group by urgency/type and keep cards short/scannable.

## Open Decisions To Finalize Before Build
1. Should About be a full step in progress dots, or a utility screen outside the primary journey?
2. Should directory entries be grouped by urgency, cost, language, or channel first?
3. Which fields are mandatory for each support provider entry in v1?

## Recommended Sequence
1. Implement About screen navigation as a utility screen outside the linear progress flow.
2. Introduce `supportDirectory` data module and migrate current resource cards to data-driven rendering.
3. Add/curate Accra-specific directory entries and urgency grouping.
4. Run regression pass for crisis modal accessibility and end-to-end flow navigation.
