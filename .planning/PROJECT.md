# Accra Coded

## What This Is

Accra Coded is a browser-first mental wellness support flow for people in Accra who need a short, private moment of emotional support. It offers video, audio, or text comfort content, followed by an optional check-in and immediate support resources. The product prioritizes low-friction access and currently runs fully as a static web app.

## Core Value

A person under pressure can quickly get emotional support and real help contacts in one uninterrupted, low-friction flow.

## Requirements

### Validated

- `s-landing` to `s-resources` multi-screen flow is implemented.
- Users can choose content format (video/audio/text) and continue through the journey.
- Crisis/help resources are available through in-app modal and resource screen.

### Active

- [ ] Add baseline automated test coverage for critical user flows.
- [ ] Reduce operational risk from hardcoded contacts and fragile UI action contracts.
- [ ] Improve maintainability and onboarding documentation consistency.

### Out of Scope

- Full authentication/account system - not required for current low-friction support objective.
- Full backend analytics platform - deferred until data strategy and privacy policy are defined.

## Context

- Stack is static HTML/CSS/JS with module-based frontend structure in `src/`.
- Deployment target is Cloudflare static assets via `wrangler.jsonc`.
- Existing codebase map and risk review docs are in `.planning/codebase/`.
- Check-in persistence is currently a placeholder adapter (`window.__accracodedCheckin`).

## Constraints

- **Architecture**: Static frontend only - keeps hosting simple and access lightweight.
- **Privacy**: No required account/sign-in - aligns with low-friction support intent.
- **Reliability**: Crisis contacts must remain accessible across devices and low bandwidth conditions.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Keep current app frontend-only for now | Fast iteration and minimal operational overhead | - Pending |
| Use modular JS/CSS structure under `src/` | Improve maintainability over monolithic inline code | - Pending |
| Prioritize risk-hardening next | Architecture review identified testing and content/config risks | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

After each phase transition:
1. Requirements invalidated? Move to Out of Scope with reason.
2. Requirements validated? Move to Validated with phase reference.
3. New requirements emerged? Add to Active.
4. Decisions to log? Add to Key Decisions.
5. "What This Is" still accurate? Update if drifted.

After each milestone:
1. Full review of all sections.
2. Core Value check.
3. Audit Out of Scope reasons.
4. Update Context with current state.

---
*Last updated: 2026-04-18 after initialization*
