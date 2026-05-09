import { json } from './response.js';

const SESSION_COOKIE = 'accracoded_admin';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function getCookie(request, name) {
  const header = request.headers.get('Cookie') || '';
  const cookies = header.split(';').map((item) => item.trim());
  const match = cookies.find((item) => item.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : '';
}

function buildSessionCookie(id, request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_MS / 1000}${secure}`;
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`;
}

export async function createAdminSession(request, env) {
  const id = crypto.randomUUID();
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  await env.DB.prepare('INSERT INTO admin_sessions (id, created_at, expires_at) VALUES (?1, ?2, ?3)')
    .bind(id, now, expiresAt)
    .run();

  return {
    cookie: buildSessionCookie(id, request),
    expiresAt,
    id
  };
}

export async function destroyAdminSession(request, env) {
  const id = getCookie(request, SESSION_COOKIE);
  if (id && env.DB) {
    await env.DB.prepare('DELETE FROM admin_sessions WHERE id = ?1').bind(id).run();
  }
}

export async function requireAdmin(request, env) {
  if (!env.DB) {
    return { ok: false, response: json({ error: 'db_not_configured' }, 500) };
  }

  const id = getCookie(request, SESSION_COOKIE);
  if (!id) {
    return { ok: false, response: json({ error: 'unauthorized' }, 401) };
  }

  const row = await env.DB.prepare('SELECT id, expires_at FROM admin_sessions WHERE id = ?1').bind(id).first();
  if (!row || Number(row.expires_at) <= Date.now()) {
    if (row) {
      await env.DB.prepare('DELETE FROM admin_sessions WHERE id = ?1').bind(id).run();
    }
    return { ok: false, response: json({ error: 'unauthorized' }, 401) };
  }

  return { ok: true, session: row };
}

export function sessionCookieName() {
  return SESSION_COOKIE;
}
