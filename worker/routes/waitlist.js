import { enforceRateLimit } from '../middleware/rateLimit.js';
import { parseJsonBody } from '../middleware/validate.js';
import { json } from '../utils/response.js';

function clean(value, max = 240) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function notifyFormspree(payload, env) {
  const endpoint = env.FORMSPREE_ENDPOINT || (env.FORMSPREE_FORM_ID ? `https://formspree.io/f/${env.FORMSPREE_FORM_ID}` : '');
  if (!endpoint) {
    return 'skipped';
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: 'New Accra Coded waitlist signup',
        name: payload.name,
        email: payload.email,
        interest: payload.interest,
        location: payload.location
      })
    });

    return response.ok ? 'sent' : 'failed';
  } catch {
    return 'failed';
  }
}

export async function handleWaitlistSubmit(request, env) {
  if (!env.DB) {
    return json({ error: 'db_not_configured' }, 500);
  }

  const rateLimitResponse = await enforceRateLimit(request, env);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const payload = await parseJsonBody(request);
  const item = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    name: clean(payload?.name, 120),
    email: clean(payload?.email, 160).toLowerCase(),
    interest: clean(payload?.interest, 80),
    location: clean(payload?.location, 120),
    source: clean(payload?.source, 40) || 'site'
  };

  if (!item.name || !isEmail(item.email) || !item.interest) {
    return json({ error: 'invalid_waitlist_submission' }, 400);
  }

  const emailStatus = await notifyFormspree(item, env);
  await env.DB.prepare(
    `INSERT INTO waitlist_submissions (id, created_at, name, email, interest, location, source, email_status)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
  )
    .bind(item.id, item.createdAt, item.name, item.email, item.interest, item.location, item.source, emailStatus)
    .run();

  return json({ accepted: true, id: item.id, emailStatus }, 202);
}
