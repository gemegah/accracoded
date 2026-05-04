import { postJson } from '../lib/apiClient.js';

const SESSION_KEY = 'accracoded.session';
const QUEUE_KEY = 'accracoded.telemetry.queue';
const MAX_QUEUE_ITEMS = 50;

function readQueue() {
  try {
    return JSON.parse(window.localStorage.getItem(QUEUE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeQueue(items) {
  window.localStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(-MAX_QUEUE_ITEMS)));
}

function getSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_KEY);
  if (existing) {
    return existing;
  }

  const generated = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, generated);
  return generated;
}

export function buildTelemetryEvent(eventName, details = {}) {
  return {
    id: crypto.randomUUID(),
    eventName,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    ...details
  };
}

export async function trackEvent(eventName, details = {}) {
  const event = buildTelemetryEvent(eventName, details);
  const pending = [...readQueue(), event];
  writeQueue(pending);
  return flushTelemetry();
}

export async function flushTelemetry() {
  const queued = readQueue();
  if (queued.length === 0) {
    return { accepted: 0 };
  }

  try {
    const result = await postJson('/telemetry', { events: queued });
    writeQueue([]);
    return result;
  } catch {
    return { accepted: 0 };
  }
}
