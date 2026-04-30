# Accra Coded

Static browser-first mental wellness flow targeted at Accra users.

## Architecture

- Frontend: static SPA (`index.html` + `src/**`) served as Cloudflare assets.
- Component primitives: Web Components via Shoelace CDN for compatible reusable UI in vanilla runtime.
- Edge API: Cloudflare Worker entry at `worker/index.js`.
- Persistence: Cloudflare D1 (`checkins`, `telemetry_events`, optional `resources_catalog`).
- Edge controls: KV-backed rate limiting (`RATE_LIMIT_KV` binding).

## Local Development

Run the app locally with no external dependencies:

```bash
npm run dev
```

Default URL: `http://127.0.0.1:4173`

LAN mode:

```bash
npm run dev:lan
```

## Edge API Setup

1. Create D1 and KV resources in Cloudflare.
2. Replace placeholder IDs in [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc):
- `d1_databases[0].database_id`
- `kv_namespaces[0].id`
3. Run schema migration:

```bash
npm run db:migrate
```

4. Deploy:

```bash
npm run deploy
```

## Planning Docs

- Product and execution context: [.planning/PROJECT.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/PROJECT.md)
- Requirements baseline: [.planning/REQUIREMENTS.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/REQUIREMENTS.md)
- Roadmap baseline: [.planning/ROADMAP.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/ROADMAP.md)
- Product requirements detail: [.planning/PRD.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/PRD.md)
- Design-specific agent guidance: [AGENTS.design.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/AGENTS.design.md)

## Skill ZIP Installer Helper

This repo includes a helper script to install a Codex skill from a local ZIP file:

```bash
./scripts/install-skill-from-zip.sh /path/to/skill.zip [optional-skill-name]
```
