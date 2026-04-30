import { postJson } from '../lib/apiClient.js';

const QUEUE_KEY = 'accracoded.checkins.queue';
const MAX_QUEUE_ITEMS = 20;

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

async function flushQueuedCheckins() {
  const queued = readQueue();
  if (queued.length === 0) {
    return;
  }

  const remaining = [];
  for (const item of queued) {
    try {
      await postJson('/checkins', item);
    } catch {
      remaining.push(item);
    }
  }

  writeQueue(remaining);
}

export async function saveCheckin(payload) {
  window.__accracodedCheckin = payload;

  try {
    await postJson('/checkins', payload);
    await flushQueuedCheckins();
    return { ok: true };
  } catch {
    writeQueue([...readQueue(), payload]);
    return { ok: false };
  }
}

export async function flushCheckins() {
  await flushQueuedCheckins();
}
