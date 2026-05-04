import { json } from '../utils/response.js';

const VALID_MOODS = new Set(['heavy', 'better', 'needed', 'unknown', null]);
const VALID_FORMATS = new Set(['video', 'audio', 'text', 'unknown']);

export function parseJsonBody(request) {
  return request.json().catch(() => null);
}

export function validateCheckin(payload) {
  if (!payload || typeof payload !== 'object') {
    return { ok: false, response: json({ error: 'invalid_payload' }, 400) };
  }

  const mood = payload.mood ?? 'unknown';
  const format = payload.format ?? 'unknown';
  if (!VALID_MOODS.has(mood)) {
    return { ok: false, response: json({ error: 'invalid_mood' }, 400) };
  }

  if (!VALID_FORMATS.has(format)) {
    return { ok: false, response: json({ error: 'invalid_format' }, 400) };
  }

  return { ok: true };
}

export function validateTelemetryBatch(payload) {
  if (!payload || !Array.isArray(payload.events)) {
    return { ok: false, response: json({ error: 'invalid_payload' }, 400) };
  }

  if (payload.events.length > 100) {
    return { ok: false, response: json({ error: 'too_many_events' }, 413) };
  }

  return { ok: true };
}
