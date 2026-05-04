import { handleCheckins } from './routes/checkins.js';
import { handleTelemetry } from './routes/telemetry.js';
import { handleResources } from './routes/resources.js';
import { json } from './utils/response.js';

function withCors(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

function routeRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method.toUpperCase();

  if (path === '/api/v1/health' && method === 'GET') {
    return json({ ok: true, service: 'accracoded-edge-api' });
  }

  if (path === '/api/v1/resources' && method === 'GET') {
    return handleResources(request, env);
  }

  if (path === '/api/v1/checkins' && method === 'POST') {
    return handleCheckins(request, env);
  }

  if (path === '/api/v1/telemetry' && method === 'POST') {
    return handleTelemetry(request, env);
  }

  return json({ error: 'not_found' }, 404);
}

export default {
  async fetch(request, env) {
    if (request.method.toUpperCase() === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }));
    }

    try {
      const response = await routeRequest(request, env);
      return withCors(response);
    } catch (error) {
      return withCors(json({ error: 'internal_error', detail: String(error?.message || error) }, 500));
    }
  }
};
