import { json } from '../utils/response.js';

function parseJson(value, fallback) {
  try {
    return JSON.parse(value || '');
  } catch {
    return fallback;
  }
}

export function serializeHomeMetric(row) {
  return {
    id: row.id,
    label: row.label,
    icon: row.icon,
    meta: row.count_label,
    category: row.category,
    className: row.card_class,
    sortOrder: Number(row.sort_order || 999),
    enabled: Boolean(row.enabled)
  };
}

export function serializeDirectoryResource(row) {
  return {
    id: row.id,
    resourceType: row.resource_type,
    name: row.name,
    categories: parseJson(row.categories_json, []),
    tags: parseJson(row.tags_json, []),
    location: row.location,
    summary: row.summary,
    description: row.description || '',
    actionLabel: row.action_label || 'View',
    href: row.href || '',
    logoText: row.logo_text || row.name?.slice(0, 2).toUpperCase() || '',
    featured: Boolean(row.featured),
    featuredRank: Number(row.featured_rank || 999),
    cardImage: row.card_image || '',
    cardType: row.card_type || '',
    cardLocation: row.card_location || row.location,
    cardDescription: row.card_description || row.summary,
    cardBadges: parseJson(row.card_badges_json, []),
    gallery: parseJson(row.gallery_json, []),
    about: parseJson(row.about_json, []),
    services: parseJson(row.services_json, []),
    contactLabel: row.contact_label || '',
    contactHref: row.contact_href || '',
    email: row.email || '',
    mapHref: row.map_href || '',
    enabled: Boolean(row.enabled)
  };
}

export async function getHomeMetrics(env, { admin = false } = {}) {
  if (!env.DB) {
    return [];
  }

  const where = admin ? '' : 'WHERE enabled = 1';
  const query = await env.DB.prepare(
    `SELECT id, label, icon, count_label, category, card_class, sort_order, enabled
     FROM home_category_metrics ${where}
     ORDER BY sort_order ASC`
  ).all();

  return (query.results || []).map(serializeHomeMetric);
}

export async function getDirectoryResources(env, { admin = false } = {}) {
  if (!env.DB) {
    return [];
  }

  const where = admin ? '' : 'WHERE enabled = 1';
  const query = await env.DB.prepare(
    `SELECT * FROM directory_resources ${where}
     ORDER BY featured DESC, featured_rank ASC, name ASC`
  ).all();

  return (query.results || []).map(serializeDirectoryResource);
}

export async function handlePublicHomeMetrics(_request, env) {
  return json({ metrics: await getHomeMetrics(env) }, 200, { 'Cache-Control': 'public, max-age=60' });
}

export async function handlePublicDirectoryResources(_request, env) {
  return json({ resources: await getDirectoryResources(env) }, 200, { 'Cache-Control': 'public, max-age=60' });
}
