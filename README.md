# Accra Coded

Browser-first mental wellness and wellness-directory flow targeted at Accra users.

## Architecture

- Frontend: React SPA (`index.html` + `src/**`) built to `dist` and served by Cloudflare Workers Static Assets.
- Edge/API runtime: Cloudflare Worker entry at `worker/index.js`.
- Production domain: `accracoded.com` and `www.accracoded.com`, configured in `wrangler.jsonc` as Worker custom domains.
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

## Cloudflare Production Setup

1. Confirm `accracoded.com` is active in the same Cloudflare account used by Wrangler.
2. Confirm the D1 database and KV namespace IDs in [`wrangler.jsonc`](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/wrangler.jsonc) match the production Cloudflare resources:
- `d1_databases[0].database_id`
- `kv_namespaces[0].id`
3. Set the required Worker secret:

```bash
wrangler secret put ADMIN_PASSWORD
```

4. Optional: set Formspree forwarding for waitlist notifications:

```bash
wrangler secret put FORMSPREE_ENDPOINT
```

5. Run the remote D1 schema migration:

```bash
npm run db:migrate:remote
```

6. Deploy the Worker and static assets:

```bash
npm run deploy
```

7. Verify `https://accracoded.com`, `https://www.accracoded.com`, and `https://accracoded.com/api/v1/health`.

## Planning Docs

- Product and execution context: [.planning/PROJECT.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/PROJECT.md)
- Requirements baseline: [.planning/REQUIREMENTS.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/REQUIREMENTS.md)
- Roadmap baseline: [.planning/ROADMAP.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/ROADMAP.md)
- Product requirements detail: [.planning/PRD.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/.planning/PRD.md)
- Design-specific agent guidance: [AGENTS.design.md](C:/Users/LENOVO THINKPAD X1/Desktop/accracoded/AGENTS.design.md)

