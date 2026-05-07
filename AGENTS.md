# AGENTS

## Mission Snapshot
- This codebase is a static, browser-only mental wellness flow targeted at Accra users.
- Product journey: landing -> format selection (video/audio/text) -> content -> quick check-in -> support resources.
- It prioritizes low-friction access (no sign-in) and currently has no backend service.

## Current Architecture At A Glance
- Entry shell: [index.html](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/index.html)
- App bootstrap: [src/main.tsx](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/main.tsx)
- React router shell: [src/App.tsx](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/App.tsx)
- Screen/navigation logic: [src/app/navigation.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/navigation.js)
- Interaction handlers: [src/app/interactionHandlers.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/interactionHandlers.js)
- Crisis dialog accessibility: [src/app/dialog.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/dialog.js)
- Typewriter effect: [src/app/typewriter.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/app/typewriter.js)
- Shared state: [src/domain/appState.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/domain/appState.js)
- Check-in data boundary: [src/data/checkinRepository.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js)
- Styling system: [src/styles/app.css](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/styles/app.css)
- Cloudflare static deploy config: [wrangler.jsonc](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc)

## Findings And Codebase Map Docs
- Stack: [.planning/codebase/STACK.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/STACK.md)
- Integrations: [.planning/codebase/INTEGRATIONS.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/INTEGRATIONS.md)
- Architecture: [.planning/codebase/ARCHITECTURE.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/ARCHITECTURE.md)
- Structure: [.planning/codebase/STRUCTURE.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/STRUCTURE.md)
- Conventions: [.planning/codebase/CONVENTIONS.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/CONVENTIONS.md)
- Testing: [.planning/codebase/TESTING.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/TESTING.md)
- Concerns: [.planning/codebase/CONCERNS.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/codebase/CONCERNS.md)
- Design guardrails: [AGENTS.design.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/AGENTS.design.md)
- Product requirements detail: [.planning/PRD.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/PRD.md)

## Guidance For Future Agents
- Keep `data-action` contracts in sync between page components and [src/hooks/useAccraCodedApp.ts](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/hooks/useAccraCodedApp.ts).
- Preserve accessibility behavior in crisis modal flows (`Escape`, focus trap, focus return).
- Treat [src/data/checkinRepository.js](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/src/data/checkinRepository.js) as the adapter boundary for backend migration.
- When touching deployment behavior, validate [wrangler.jsonc](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc) and [.assetsignore](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.assetsignore) together.
