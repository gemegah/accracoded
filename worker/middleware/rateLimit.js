import { json } from '../utils/response.js';

const WINDOW_SECONDS = 60;
const MAX_REQUESTS_PER_WINDOW = 40;

export async function enforceRateLimit(request, env) {
  if (!env.RATE_LIMIT_KV) {
    return null;
  }

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = `rl:${ip}`;
  const currentRaw = await env.RATE_LIMIT_KV.get(key);
  const currentCount = Number(currentRaw || '0') + 1;

  if (currentCount === 1) {
    await env.RATE_LIMIT_KV.put(key, String(currentCount), { expirationTtl: WINDOW_SECONDS });
  } else {
    await env.RATE_LIMIT_KV.put(key, String(currentCount), { expirationTtl: WINDOW_SECONDS });
  }

  if (currentCount > MAX_REQUESTS_PER_WINDOW) {
    return json({ error: 'rate_limited' }, 429);
  }

  return null;
}
