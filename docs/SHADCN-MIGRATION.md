# shadcn Migration Guide

## Current State
- Runtime is vanilla HTML/CSS/JS.
- Reusable UI primitives now live in `src/ui/primitives.js`.
- `components.json` is added to align with shadcn project conventions.

## Why We Cannot Directly Drop-In shadcn React Components Yet
- shadcn/ui components are generated for React + Tailwind pipelines.
- This repository currently has no React runtime or Tailwind build integration.

## Safe Migration Path
1. Introduce React runtime entry and build step.
2. Add Tailwind build pipeline and token mapping from `src/styles/app.css`.
3. Initialize shadcn CLI and generate core components:
- `button`, `card`, `dialog`, `tabs`, `select`, `sheet`.
4. Migrate one screen at a time behind parity checks:
- accessibility parity
- crisis flow parity
- navigation contract parity
5. Remove legacy primitives only after all screens are migrated.

## Immediate Rule
- New dynamic UI code should use shared primitives in `src/ui/` instead of ad hoc element construction in feature modules.
