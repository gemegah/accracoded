CREATE TABLE IF NOT EXISTS checkins (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  mood TEXT NOT NULL,
  format TEXT NOT NULL,
  age_band TEXT,
  gender TEXT,
  network_tier TEXT,
  locale TEXT,
  session_hash TEXT
);

CREATE TABLE IF NOT EXISTS telemetry_events (
  id TEXT PRIMARY KEY,
  ts INTEGER NOT NULL,
  session_hash TEXT,
  event_name TEXT NOT NULL,
  screen_id TEXT,
  action TEXT,
  tti_ms INTEGER
);

CREATE TABLE IF NOT EXISTS resources_catalog (
  id TEXT PRIMARY KEY,
  group_key TEXT NOT NULL,
  name TEXT NOT NULL,
  summary TEXT NOT NULL,
  coverage TEXT NOT NULL,
  offerings TEXT NOT NULL,
  contacts_json TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 999
);

CREATE INDEX IF NOT EXISTS idx_checkins_created_at ON checkins(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_ts ON telemetry_events(ts DESC);
CREATE INDEX IF NOT EXISTS idx_resources_priority ON resources_catalog(priority ASC);
