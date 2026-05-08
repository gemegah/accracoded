import { handleCheckins } from './routes/checkins.js';
import { handleAdmin } from './routes/admin.js';
import { handlePublicDirectoryResources, handlePublicHomeMetrics } from './routes/content.js';
import { handleTelemetry } from './routes/telemetry.js';
import { handleResources } from './routes/resources.js';
import { handleWaitlistSubmit } from './routes/waitlist.js';
import { json } from './utils/response.js';

function withCors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

function isApiRequest(path) {
  return path.startsWith('/api/');
}

function isAppNavigationRequest(request, path) {
  const method = request.method.toUpperCase();
  const accept = request.headers.get('Accept') || '';

  if (method !== 'GET' && method !== 'HEAD') {
    return false;
  }

  if (path.includes('.') || path.startsWith('/assets/')) {
    return false;
  }

  return accept.includes('text/html') || accept.includes('*/*');
}

async function serveStaticAsset(request, env) {
  if (!env.ASSETS) {
    return json({ error: 'asset_binding_not_configured' }, 500);
  }

  return env.ASSETS.fetch(request);
}

async function serveReactApp(request, env) {
  const url = new URL(request.url);
  const assetResponse = await serveStaticAsset(request, env);

  if (assetResponse.status !== 404 || !isAppNavigationRequest(request, url.pathname)) {
    return assetResponse;
  }

  const indexUrl = new URL(request.url);
  indexUrl.pathname = '/index.html';
  indexUrl.search = '';

  return env.ASSETS.fetch(new Request(indexUrl, request));
}

function routeApiRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  if (path === '/api/v1/health' && method === 'GET') {
    return json({ ok: true, service: 'accracoded-edge-api' });
  }

  if (path === '/api/v1/resources' && method === 'GET') {
    return handleResources(request, env);
  }

  if (path === '/api/v1/home-metrics' && method === 'GET') {
    return handlePublicHomeMetrics(request, env);
  }

  if (path === '/api/v1/directory-resources' && method === 'GET') {
    return handlePublicDirectoryResources(request, env);
  }

  if (path === '/api/v1/checkins' && method === 'POST') {
    return handleCheckins(request, env);
  }

  if (path === '/api/v1/waitlist' && method === 'POST') {
    return handleWaitlistSubmit(request, env);
  }

  if (path === '/api/v1/telemetry' && method === 'POST') {
    return handleTelemetry(request, env);
  }

  if (path.startsWith('/api/v1/admin/')) {
    return handleAdmin(request, env);
  }

  return json({ error: 'not_found' }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method.toUpperCase() === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }));
    }

    try {
      if (isApiRequest(url.pathname)) {
        const response = await routeApiRequest(request, env);
        return withCors(response);
      }

      return serveReactApp(request, env);
    } catch (error) {
      return withCors(json({ error: 'internal_error', detail: String(error?.message || error) }, 500));
    }
  }
};
