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

CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS home_category_metrics (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  count_label TEXT NOT NULL,
  category TEXT NOT NULL,
  card_class TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 999,
  enabled INTEGER NOT NULL DEFAULT 1,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS directory_resources (
  id TEXT PRIMARY KEY,
  resource_type TEXT NOT NULL,
  name TEXT NOT NULL,
  categories_json TEXT NOT NULL,
  tags_json TEXT NOT NULL,
  location TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  action_label TEXT,
  href TEXT,
  logo_text TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  featured_rank INTEGER NOT NULL DEFAULT 999,
  card_image TEXT,
  card_type TEXT,
  card_location TEXT,
  card_description TEXT,
  card_badges_json TEXT NOT NULL DEFAULT '[]',
  gallery_json TEXT NOT NULL DEFAULT '[]',
  about_json TEXT NOT NULL DEFAULT '[]',
  services_json TEXT NOT NULL DEFAULT '[]',
  contact_label TEXT,
  contact_href TEXT,
  email TEXT,
  map_href TEXT,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interest TEXT NOT NULL,
  location TEXT,
  source TEXT NOT NULL DEFAULT 'site',
  email_status TEXT NOT NULL DEFAULT 'skipped'
);

CREATE TABLE IF NOT EXISTS qr_scan_events (
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
);

CREATE INDEX IF NOT EXISTS idx_checkins_created_at ON checkins(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_ts ON telemetry_events(ts DESC);
CREATE INDEX IF NOT EXISTS idx_resources_priority ON resources_catalog(priority ASC);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at ASC);
CREATE INDEX IF NOT EXISTS idx_home_category_metrics_order ON home_category_metrics(sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_directory_resources_featured ON directory_resources(featured DESC, featured_rank ASC);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qr_scan_events_created_at ON qr_scan_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_qr_scan_events_area_bucket ON qr_scan_events(area_bucket ASC);

INSERT OR IGNORE INTO home_category_metrics
  (id, label, icon, count_label, category, card_class, sort_order, enabled, updated_at)
VALUES
  ('mental-health', 'Mental Health', 'tabler:brain', '42 spaces', 'mental-health', 'discover-card--mental-health', 10, 1, strftime('%s','now') * 1000),
  ('fitness-movement', 'Fitness & Movement', 'tabler:stretching', '68 spaces', 'vitality', 'discover-card--fitness', 20, 1, strftime('%s','now') * 1000),
  ('beauty-self-care', 'Beauty & Self-Care', 'tabler:brush', '57 spaces', 'beauty', 'discover-card--beauty', 30, 1, strftime('%s','now') * 1000),
  ('nutrition', 'Nutrition', 'tabler:salad', '49 spaces', 'vitality', 'discover-card--nutrition', 40, 1, strftime('%s','now') * 1000),
  ('holistic-wellness', 'Holistic Wellness', 'tabler:flower', '64 spaces', 'wellness', 'discover-card--holistic', 50, 1, strftime('%s','now') * 1000),
  ('community-support', 'Community Support', 'tabler:users', '38 spaces', 'wellness', 'discover-card--community', 60, 1, strftime('%s','now') * 1000),
  ('retreats-experiences', 'Retreats & Experiences', 'tabler:sun', '31 spaces', 'wellness', 'discover-card--retreats', 70, 1, strftime('%s','now') * 1000);
