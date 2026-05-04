import { enforceRateLimit } from '../middleware/rateLimit.js';
import { parseJsonBody, validateCheckin } from '../middleware/validate.js';
import { json } from '../utils/response.js';

function normalizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, 64);
}

function inferNetworkTier(request) {
  const ect = request.headers.get('ECT');
  if (!ect) {
    return 'unknown';
  }
  return ect.toLowerCase();
}

export async function handleCheckins(request, env) {
  if (!env.DB) {
    return json({ error: 'db_not_configured' }, 500);
  }

  const rateLimitResponse = await enforceRateLimit(request, env);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const payload = await parseJsonBody(request);
  const validation = validateCheckin(payload);
  if (!validation.ok) {
    return validation.response;
  }

  const item = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    mood: payload.mood || 'unknown',
    format: payload.format || 'unknown',
    ageBand: normalizeText(payload.age),
    gender: normalizeText(payload.gender),
    networkTier: inferNetworkTier(request),
    locale: normalizeText(request.headers.get('Accept-Language') || 'unknown').slice(0, 10),
    sessionHash: normalizeText(payload.sessionId || '')
  };

  await env.DB.prepare(
    `INSERT INTO checkins (id, created_at, mood, format, age_band, gender, network_tier, locale, session_hash)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`
  )
    .bind(
      item.id,
      item.createdAt,
      item.mood,
      item.format,
      item.ageBand,
      item.gender,
      item.networkTier,
      item.locale,
      item.sessionHash
    )
    .run();

  return json({ accepted: true, id: item.id }, 202);
}
