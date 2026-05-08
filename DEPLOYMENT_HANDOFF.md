# Accra Coded Deployment Handoff

This project is currently set up to use:

- Vercel for the React frontend.
- Cloudflare Worker for `/api/v1/*`.
- Cloudflare D1 for admin content, directory resources, and waitlist data.

## 1. Cloudflare D1

Confirm that the D1 database exists and matches `wrangler.jsonc`:

```txt
accracoded-db
```

Run the schema from the repo root:

```bash
npx wrangler d1 execute accracoded-db --file worker/db/schema.sql
```

## 2. Cloudflare Worker Secrets

Set the required admin password:

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Optional, for forwarding waitlist notifications to Formspree:

```bash
npx wrangler secret put FORMSPREE_ENDPOINT
```

Use this value:

```txt
https://formspree.io/f/xwvynqzd
```

## 3. Deploy Cloudflare Worker

Deploy the Worker:

```bash
npx wrangler deploy
```

Save the deployed Worker URL. It should look similar to:

```txt
https://accracoded.<account>.workers.dev
```

## 4. Vercel API Rewrite

The frontend calls API routes using `/api/v1/...`.

In Vercel, forward those requests to the Cloudflare Worker. Add or update `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/v1/:path*",
      "destination": "https://YOUR-WORKER-URL.workers.dev/api/v1/:path*"
    }
  ]
}
```

Replace `YOUR-WORKER-URL.workers.dev` with the deployed Worker URL.

## 5. Vercel Build Settings

Use:

```bash
npm run build
```

Output directory:

```txt
dist
```

## 6. Seed Admin Content

After deployment:

1. Open `/admin/login`.
2. Log in with the `ADMIN_PASSWORD`.
3. Go to `/admin/directory`.
4. Click **Seed content**.

This pushes the current static homepage metrics and directory resources into D1.

## 7. Verification Checklist

Confirm the following:

- `/explore` loads directory resources.
- Explore listing images show correctly.
- Clicking an Explore card opens `/explore/:resourceSlug`.
- Back to Explore returns to `/explore`.
- Waitlist submissions save successfully.
- Waitlist submissions appear under `/admin/membership`.
- `/admin/login` rejects the wrong password.
- Admin pages are blocked when logged out.
- `/admin/metrics`, `/admin/directory`, `/admin/membership`, and `/admin/qr-analytics` load after login.

## Ownership Note

Vercel hosts the React frontend only.

Cloudflare Worker owns:

- `/api/v1/*`
- Admin login/session APIs
- D1 reads and writes
- Directory resource storage
- Homepage category metrics
- Waitlist storage
- Optional Formspree notification forwarding
