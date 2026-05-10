import { enforceRateLimit } from '../middleware/rateLimit.js';
import { parseJsonBody } from '../middleware/validate.js';
import { json } from '../utils/response.js';

const AREA_PRECISION = 3;
let schemaReadyPromise = null;

function clean(value, max = 240) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function toFiniteNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

function normalizeCoordinate(value, min, max) {
  const numeric = toFiniteNumber(value);
  if (numeric === null || numeric < min || numeric > max) {
    return null;
  }
  return numeric;
}

function toAreaBucket(latitude, longitude) {
  if (latitude === null || longitude === null) {
    return 'unknown';
  }

  return `${latitude.toFixed(AREA_PRECISION)},${longitude.toFixed(AREA_PRECISION)}`;
}

async function ensureQrSchema(env) {
  if (schemaReadyPromise) {
    return schemaReadyPromise;
  }

  schemaReadyPromise = (async () => {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS qr_scan_events (
        id TEXT PRIMARY KEY,
        created_at INTEGER NOT NULL,
        qr_key TEXT NOT NULL,
        target TEXT,
        user_agent TEXT,
        referrer TEXT,
        latitude REAL,
        longitude REAL,
        accuracy_meters REAL,
        area_bucket TEXT
      )`
    ).run();

    const tableInfo = await env.DB.prepare('PRAGMA table_info("qr_scan_events")').all();
    const columns = new Set((tableInfo.results || []).map((row) => String(row.name)));
    const migrations = [];

    if (!columns.has('latitude')) {
      migrations.push('ALTER TABLE qr_scan_events ADD COLUMN latitude REAL');
    }
    if (!columns.has('longitude')) {
      migrations.push('ALTER TABLE qr_scan_events ADD COLUMN longitude REAL');
    }
    if (!columns.has('accuracy_meters')) {
      migrations.push('ALTER TABLE qr_scan_events ADD COLUMN accuracy_meters REAL');
    }
    if (!columns.has('area_bucket')) {
      migrations.push('ALTER TABLE qr_scan_events ADD COLUMN area_bucket TEXT');
    }

    for (const migration of migrations) {
      await env.DB.prepare(migration).run();
    }

    await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_qr_scan_events_created_at ON qr_scan_events(created_at DESC)').run();
    await env.DB.prepare('CREATE INDEX IF NOT EXISTS idx_qr_scan_events_area_bucket ON qr_scan_events(area_bucket ASC)').run();
  })().catch((error) => {
    schemaReadyPromise = null;
    throw error;
  });

  return schemaReadyPromise;
}

export async function handleQrScanSubmit(request, env) {
  if (!env.DB) {
    return json({ error: 'db_not_configured' }, 500);
  }

  const rateLimitResponse = await enforceRateLimit(request, env);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  await ensureQrSchema(env);

  const payload = await parseJsonBody(request);
  if (!payload || typeof payload !== 'object') {
    return json({ error: 'invalid_payload' }, 400);
  }

  const latitude = normalizeCoordinate(payload.latitude, -90, 90);
  const longitude = normalizeCoordinate(payload.longitude, -180, 180);
  const accuracyMeters = toFiniteNumber(payload.accuracyMeters);
  const qrKey = clean(payload.qrKey, 80) || 'unknown';
  const target = clean(payload.target, 500);
  const referrer = clean(payload.referrer, 500) || clean(request.headers.get('Referer') || '', 500);
  const userAgent = clean(request.headers.get('User-Agent') || '', 240);
  const areaBucket = clean(payload.areaBucket, 80) || toAreaBucket(latitude, longitude);

  const item = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    qrKey,
    target,
    userAgent,
    referrer,
    latitude,
    longitude,
    accuracyMeters,
    areaBucket
  };

  await env.DB.prepare(
    `INSERT INTO qr_scan_events (
      id, created_at, qr_key, target, user_agent, referrer, latitude, longitude, accuracy_meters, area_bucket
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
  )
    .bind(
      item.id,
      item.createdAt,
      item.qrKey,
      item.target,
      item.userAgent,
      item.referrer,
      item.latitude,
      item.longitude,
      item.accuracyMeters,
      item.areaBucket
    )
    .run();

  return json({ accepted: true, id: item.id, areaBucket: item.areaBucket }, 202);
}
