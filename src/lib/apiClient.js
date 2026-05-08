import { API_BASE, API_TIMEOUT_MS } from '../domain/appState.js';

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error('request_timeout')), ms);
    })
  ]);
}

export async function postJson(path, payload, timeoutMs = API_TIMEOUT_MS) {
  const request = fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload)
  });

  const response = await withTimeout(request, timeoutMs);
  if (!response.ok) {
    throw new Error(`request_failed_${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

export async function getJson(path, timeoutMs = API_TIMEOUT_MS) {
  const request = fetch(`${API_BASE}${path}`, {
    method: 'GET',
    credentials: 'same-origin'
  });

  const response = await withTimeout(request, timeoutMs);
  if (!response.ok) {
    throw new Error(`request_failed_${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

export async function putJson(path, payload, timeoutMs = API_TIMEOUT_MS) {
  const request = fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify(payload)
  });

  const response = await withTimeout(request, timeoutMs);
  if (!response.ok) {
    throw new Error(`request_failed_${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}

export async function deleteJson(path, timeoutMs = API_TIMEOUT_MS) {
  const request = fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    credentials: 'same-origin'
  });

  const response = await withTimeout(request, timeoutMs);
  if (!response.ok) {
    throw new Error(`request_failed_${response.status}`);
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return null;
  }

  return response.json();
}
