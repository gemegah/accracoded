# Accra Coded Deployment Handoff

This project is now set up for a single Cloudflare deployment:

- Cloudflare Workers Static Assets serves the React build from `dist`.
- The same Cloudflare Worker owns `/api/v1/*`, admin APIs, and SPA route fallback.
- Cloudflare D1 stores admin content, directory resources, check-ins, QR scans, and waitlist submissions.
- Cloudflare KV backs rate limiting.
- Production domains are `accracoded.com` and `www.accracoded.com`.

## 1. Cloudflare Domain

Confirm that `accracoded.com` is active in Cloudflare and belongs to the same account Wrangler is logged into.

The Worker custom domains are configured in `wrangler.jsonc`:

```jsonc
"routes": [
  { "pattern": "accracoded.com", "custom_domain": true },
  { "pattern": "www.accracoded.com", "custom_domain": true }
]
```

Cloudflare creates the DNS records and certificates for Worker custom domains during deploy. If either hostname already has a conflicting DNS record or Worker route in the dashboard, remove the conflict before deploying.

SPA deep links such as `/admin/login`, `/explore/:resourceSlug`, and `/campaign` are handled by the Static Assets SPA fallback plus the Worker script. The assets config intentionally runs the Worker first for app routes while excluding hashed files under `/assets/*`.

## 2. Cloudflare D1 And KV

Confirm that `wrangler.jsonc` points to the production resources:

```txt
D1 binding: DB
D1 database: accracoded-db
KV binding: RATE_LIMIT_KV
```

Run the production schema migration from the repo root:

```bash
npm run db:migrate:remote
```

For local-only D1 testing, use:

```bash
npm run db:migrate
```

## 3. Worker Secrets

Set the required admin password:

```bash
wrangler secret put ADMIN_PASSWORD
```

Optional, for forwarding waitlist notifications to Formspree:

```bash
wrangler secret put FORMSPREE_ENDPOINT
```

Use this value if Formspree forwarding should stay enabled:

```txt
https://formspree.io/f/xwvynqzd
```

## 4. Deploy

Deploy the React build, static assets, Worker API, and custom domains:

```bash
npm run deploy
```

The deploy script runs `npm run build` first, then `wrangler deploy`.

## 5. Seed Admin Content

After deployment:

1. Open `https://accracoded.com/admin/login`.
2. Log in with the `ADMIN_PASSWORD`.
3. Go to `/admin/directory`.
4. Click **Seed content**.

This pushes the current static homepage metrics and directory resources into D1.

## 6. Verification Checklist

Confirm the following after deploy:

- `https://accracoded.com` loads the homepage.
- `https://www.accracoded.com` loads or resolves correctly.
- `https://accracoded.com/api/v1/health` returns JSON with `"ok": true`.
- `/explore` loads directory resources.
- Explore listing images show correctly.
- Clicking an Explore card opens `/explore/:resourceSlug`.
- Refreshing `/explore/:resourceSlug`, `/about`, `/campaign`, and `/admin/login` serves the React app rather than a 404.
- Waitlist submissions save successfully after the frontend is wired to `/api/v1/waitlist`.
- Waitlist submissions appear under `/admin/membership`.
- `/admin/login` rejects the wrong password.
- Admin pages are blocked when logged out.
- `/admin/metrics`, `/admin/directory`, `/admin/membership`, and `/admin/qr-analytics` load after login.

## Ownership Note

Cloudflare owns the whole production surface:

- `accracoded.com`
- `www.accracoded.com`
- React static assets
- `/api/v1/*`
- Admin login/session APIs
- D1 reads and writes
- Directory resource storage
- Homepage category metrics
- Check-in, telemetry, QR scan, and waitlist storage
- Optional Formspree notification forwarding
