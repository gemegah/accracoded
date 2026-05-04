import { enforceRateLimit } from '../middleware/rateLimit.js';
import { parseJsonBody, validateTelemetryBatch } from '../middleware/validate.js';
import { json } from '../utils/response.js';

function normalizeEvent(event) {
  return {
    id: typeof event.id === 'string' ? event.id.slice(0, 64) : crypto.randomUUID(),
    ts: Date.parse(event.timestamp || '') || Date.now(),
    sessionHash: typeof event.sessionId === 'string' ? event.sessionId.slice(0, 64) : '',
    eventName: typeof event.eventName === 'string' ? event.eventName.slice(0, 64) : 'unknown',
    screenId: typeof event.screenId === 'string' ? event.screenId.slice(0, 64) : '',
    action: typeof event.action === 'string' ? event.action.slice(0, 64) : '',
    ttiMs: Number.isFinite(event.ttiMs) ? Number(event.ttiMs) : null
  };
}

export async function handleTelemetry(request, env) {
  if (!env.DB) {
    return json({ error: 'db_not_configured' }, 500);
  }

  const rateLimitResponse = await enforceRateLimit(request, env);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  const payload = await parseJsonBody(request);
  const validation = validateTelemetryBatch(payload);
  if (!validation.ok) {
    return validation.response;
  }

  const events = payload.events.map(normalizeEvent);
  const statement = env.DB.prepare(
    `INSERT INTO telemetry_events (id, ts, session_hash, event_name, screen_id, action, tti_ms)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
  );

  const batches = events.map((event) =>
    statement.bind(event.id, event.ts, event.sessionHash, event.eventName, event.screenId, event.action, event.ttiMs)
  );

  await env.DB.batch(batches);
  return json({ accepted: events.length }, 202);
}
