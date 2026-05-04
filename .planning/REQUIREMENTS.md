# Requirements: Accra Coded

**Defined:** 2026-04-18  
**Core Value:** A person under pressure can quickly get emotional support and real help contacts in one uninterrupted, low-friction flow.

## v1 Requirements

### Core Journey

- [ ] **JOUR-01**: User can move through landing, format, content, check-in, and resources screens without dead ends.
- [ ] **JOUR-02**: User can switch between video, audio, and text content formats in-app.
- [ ] **JOUR-03**: User can restart the journey from resources back to landing.

### Safety And Support

- [ ] **SAFE-01**: User can open and close crisis support dialog from entry points.
- [ ] **SAFE-02**: User can reach support contacts via `tel:` links from modal/resources screen.
- [ ] **SAFE-03**: Dialog supports keyboard interaction (`Esc`, tab focus trap, focus return).

### Reliability And Quality

- [ ] **QUAL-01**: Critical flow has automated smoke coverage.
- [ ] **QUAL-02**: Action routing contract between HTML and JS is validated by tests.
- [ ] **QUAL-03**: Deployment config remains valid and protected from accidental asset exposure.

## v2 Requirements

### Data And Operations

- **DATA-01**: Replace check-in window adapter with backend persistence endpoint.
- **DATA-02**: Introduce configurable content source for support contacts.
- **DATA-03**: Add content validation/update workflow for support resources.

## Out of Scope

| Feature | Reason |
|---------|--------|
| User accounts and login | Not required for current low-friction support objective |
| Full analytics tracking pipeline | Deferred until privacy and data governance are finalized |
| Native mobile app | Web-first approach for initial scope |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| JOUR-01 | Phase 1 | Pending |
| JOUR-02 | Phase 1 | Pending |
| JOUR-03 | Phase 1 | Pending |
| SAFE-01 | Phase 1 | Pending |
| SAFE-02 | Phase 1 | Pending |
| SAFE-03 | Phase 1 | Pending |
| QUAL-01 | Phase 2 | Pending |
| QUAL-02 | Phase 2 | Pending |
| QUAL-03 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 9 total
- Mapped to phases: 9
- Unmapped: 0

---
*Requirements defined: 2026-04-18*  
*Last updated: 2026-04-18 after initialization*
