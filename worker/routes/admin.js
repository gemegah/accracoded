import { parseJsonBody } from '../middleware/validate.js';
import { clearSessionCookie, createAdminSession, destroyAdminSession, requireAdmin } from '../utils/adminAuth.js';
import { json } from '../utils/response.js';
import { getDirectoryResources, getHomeMetrics } from './content.js';

function clean(value, max = 5000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function asJson(value) {
  return JSON.stringify(Array.isArray(value) ? value : []);
}

function bool(value) {
  return value ? 1 : 0;
}

function metricPayload(item, index) {
  return {
    id: clean(item.id, 80) || crypto.randomUUID(),
    label: clean(item.label, 120),
    icon: clean(item.icon, 80) || 'tabler:sparkles',
    countLabel: clean(item.meta || item.countLabel, 80),
    category: clean(item.category, 80),
    className: clean(item.className, 120),
    sortOrder: Number.isFinite(Number(item.sortOrder)) ? Number(item.sortOrder) : index + 1,
    enabled: item.enabled !== false
  };
}

function resourcePayload(item = {}) {
  const now = Date.now();
  const name = clean(item.name, 180);
  const summary = clean(item.summary, 1000);

  return {
    id: clean(item.id, 100) || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || crypto.randomUUID(),
    resourceType: clean(item.resourceType, 80) || 'organization',
    name,
    categories: Array.isArray(item.categories) ? item.categories.map((value) => clean(value, 80)).filter(Boolean) : [],
    tags: Array.isArray(item.tags) ? item.tags.map((value) => clean(value, 80)).filter(Boolean) : [],
    location: clean(item.location, 180),
    summary,
    description: clean(item.description, 3000),
    actionLabel: clean(item.actionLabel, 80) || 'View',
    href: clean(item.href, 500),
    logoText: clean(item.logoText, 16),
    featured: Boolean(item.featured),
    featuredRank: Number.isFinite(Number(item.featuredRank)) ? Number(item.featuredRank) : 999,
    cardImage: clean(item.cardImage, 2_200_000),
    cardType: clean(item.cardType, 120),
    cardLocation: clean(item.cardLocation, 180),
    cardDescription: clean(item.cardDescription, 1000),
    cardBadges: Array.isArray(item.cardBadges) ? item.cardBadges.map((value) => clean(value, 80)).filter(Boolean) : [],
    gallery: Array.isArray(item.gallery) ? item.gallery : [],
    about: Array.isArray(item.about) ? item.about.map((value) => clean(value, 2000)).filter(Boolean) : [],
    services: Array.isArray(item.services) ? item.services.map((value) => clean(value, 300)).filter(Boolean) : [],
    contactLabel: clean(item.contactLabel, 80),
    contactHref: clean(item.contactHref, 500),
    email: clean(item.email, 160),
    mapHref: clean(item.mapHref, 500),
    enabled: item.enabled !== false,
    now
  };
}

function validateResource(item) {
  if (!item.name || !item.summary || item.categories.length === 0) {
    return json({ error: 'invalid_resource' }, 400);
  }
  return null;
}

async function handleLogin(request, env) {
  if (!env.DB) {
    return json({ error: 'db_not_configured' }, 500);
  }

  if (!env.ADMIN_PASSWORD) {
    return json({ error: 'admin_password_not_configured' }, 500);
  }

  const payload = await parseJsonBody(request);
  if (!payload || payload.password !== env.ADMIN_PASSWORD) {
    return json({ error: 'invalid_credentials' }, 401);
  }

  const session = await createAdminSession(request, env);
  const response = json({ ok: true, expiresAt: session.expiresAt });
  response.headers.append('Set-Cookie', session.cookie);
  return response;
}

async function handleLogout(request, env) {
  await destroyAdminSession(request, env);
  const response = json({ ok: true });
  response.headers.append('Set-Cookie', clearSessionCookie(request));
  return response;
}

async function handleHomeMetrics(request, env) {
  if (request.method === 'GET') {
    return json({ metrics: await getHomeMetrics(env, { admin: true }) });
  }

  const payload = await parseJsonBody(request);
  const items = Array.isArray(payload?.metrics) ? payload.metrics.map(metricPayload) : [];
  if (items.length === 0) {
    return json({ error: 'invalid_metrics' }, 400);
  }

  const now = Date.now();
  const statement = env.DB.prepare(
    `INSERT INTO home_category_metrics (id, label, icon, count_label, category, card_class, sort_order, enabled, updated_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
     ON CONFLICT(id) DO UPDATE SET
      label = excluded.label,
      icon = excluded.icon,
      count_label = excluded.count_label,
      category = excluded.category,
      card_class = excluded.card_class,
      sort_order = excluded.sort_order,
      enabled = excluded.enabled,
      updated_at = excluded.updated_at`
  );

  await env.DB.batch(
    items.map((item) =>
      statement.bind(item.id, item.label, item.icon, item.countLabel, item.category, item.className, item.sortOrder, bool(item.enabled), now)
    )
  );

  return json({ metrics: await getHomeMetrics(env, { admin: true }) });
}

async function handleResources(request, env, resourceId) {
  if (request.method === 'GET') {
    return json({ resources: await getDirectoryResources(env, { admin: true }) });
  }

  if (request.method === 'DELETE') {
    if (!resourceId) {
      return json({ error: 'missing_resource_id' }, 400);
    }
    await env.DB.prepare('DELETE FROM directory_resources WHERE id = ?1').bind(resourceId).run();
    return json({ ok: true });
  }

  const payload = await parseJsonBody(request);
  const item = resourcePayload({ ...payload, id: resourceId || payload?.id });
  const invalid = validateResource(item);
  if (invalid) {
    return invalid;
  }

  await env.DB.prepare(
    `INSERT INTO directory_resources (
      id, resource_type, name, categories_json, tags_json, location, summary, description, action_label, href,
      logo_text, featured, featured_rank, card_image, card_type, card_location, card_description, card_badges_json,
      gallery_json, about_json, services_json, contact_label, contact_href, email, map_href, enabled, created_at, updated_at
    ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, ?26, ?27, ?28)
    ON CONFLICT(id) DO UPDATE SET
      resource_type = excluded.resource_type,
      name = excluded.name,
      categories_json = excluded.categories_json,
      tags_json = excluded.tags_json,
      location = excluded.location,
      summary = excluded.summary,
      description = excluded.description,
      action_label = excluded.action_label,
      href = excluded.href,
      logo_text = excluded.logo_text,
      featured = excluded.featured,
      featured_rank = excluded.featured_rank,
      card_image = excluded.card_image,
      card_type = excluded.card_type,
      card_location = excluded.card_location,
      card_description = excluded.card_description,
      card_badges_json = excluded.card_badges_json,
      gallery_json = excluded.gallery_json,
      about_json = excluded.about_json,
      services_json = excluded.services_json,
      contact_label = excluded.contact_label,
      contact_href = excluded.contact_href,
      email = excluded.email,
      map_href = excluded.map_href,
      enabled = excluded.enabled,
      updated_at = excluded.updated_at`
  )
    .bind(
      item.id,
      item.resourceType,
      item.name,
      asJson(item.categories),
      asJson(item.tags),
      item.location,
      item.summary,
      item.description,
      item.actionLabel,
      item.href,
      item.logoText,
      bool(item.featured),
      item.featuredRank,
      item.cardImage,
      item.cardType,
      item.cardLocation,
      item.cardDescription,
      asJson(item.cardBadges),
      JSON.stringify(item.gallery),
      asJson(item.about),
      asJson(item.services),
      item.contactLabel,
      item.contactHref,
      item.email,
      item.mapHref,
      bool(item.enabled),
      item.now,
      item.now
    )
    .run();

  return json({ resource: item });
}

async function handleWaitlist(_request, env) {
  const query = await env.DB.prepare(
    `SELECT id, created_at, name, email, interest, location, source, email_status
     FROM waitlist_submissions
     ORDER BY created_at DESC
     LIMIT 500`
  ).all();

  return json({
    submissions: (query.results || []).map((row) => ({
      id: row.id,
      createdAt: Number(row.created_at),
      name: row.name,
      email: row.email,
      interest: row.interest,
      location: row.location || '',
      source: row.source,
      emailStatus: row.email_status
    }))
  });
}

async function handleOverview(env) {
  const [resources, waitlist, metrics, qr] = await Promise.all([
    env.DB.prepare('SELECT COUNT(*) AS count FROM directory_resources').first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM waitlist_submissions').first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM home_category_metrics').first(),
    env.DB.prepare('SELECT COUNT(*) AS count FROM qr_scan_events').first()
  ]);

  return json({
    overview: {
      resources: Number(resources?.count || 0),
      waitlist: Number(waitlist?.count || 0),
      categories: Number(metrics?.count || 0),
      qrScans: Number(qr?.count || 0),
      qrStatus: 'coming_soon'
    }
  });
}

export async function handleAdmin(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  if (path === '/api/v1/admin/login' && method === 'POST') {
    return handleLogin(request, env);
  }

  if (path === '/api/v1/admin/logout' && method === 'POST') {
    return handleLogout(request, env);
  }

  const auth = await requireAdmin(request, env);
  if (!auth.ok) {
    return auth.response;
  }

  if (path === '/api/v1/admin/me' && method === 'GET') {
    return json({ authenticated: true });
  }

  if (path === '/api/v1/admin/overview' && method === 'GET') {
    return handleOverview(env);
  }

  if (path === '/api/v1/admin/home-metrics' && (method === 'GET' || method === 'PUT')) {
    return handleHomeMetrics(request, env);
  }

  if (path === '/api/v1/admin/resources' && (method === 'GET' || method === 'POST')) {
    return handleResources(request, env);
  }

  const resourceMatch = path.match(/^\/api\/v1\/admin\/resources\/([^/]+)$/);
  if (resourceMatch && (method === 'PUT' || method === 'DELETE')) {
    return handleResources(request, env, decodeURIComponent(resourceMatch[1]));
  }

  if (path === '/api/v1/admin/waitlist' && method === 'GET') {
    return handleWaitlist(request, env);
  }

  return json({ error: 'not_found' }, 404);
}
