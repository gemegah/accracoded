import { postJson } from '../lib/apiClient.js';

const SESSION_SCAN_KEY_PREFIX = 'accracoded.qrscan.sent:';
const GEO_TIMEOUT_MS = 5000;

function clean(value, max = 200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function getQrContextFromUrl(url) {
  const qrKey = clean(url.searchParams.get('qr') || url.searchParams.get('qr_key') || '', 80);
  const source = clean(url.searchParams.get('utm_source') || '', 40).toLowerCase();
  const hasQrHint = qrKey || source === 'qr';

  if (!hasQrHint) {
    return null;
  }

  return {
    qrKey: qrKey || 'unknown',
    target: `${url.pathname}${url.search}`.slice(0, 500),
    referrer: clean(document.referrer, 500) || ''
  };
}

function getSessionKey(context) {
  return `${SESSION_SCAN_KEY_PREFIX}${context.qrKey}:${context.target}`;
}

function readSessionFlag(key) {
  try {
    return window.sessionStorage.getItem(key) === '1';
  } catch {
    return false;
  }
}

function writeSessionFlag(key) {
  try {
    window.sessionStorage.setItem(key, '1');
  } catch {
    // Ignore storage failures
  }
}

function getCurrentPosition() {
  if (!navigator.geolocation) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve(null);
      }
    }, GEO_TIMEOUT_MS);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (settled) {
          return;
        }
        settled = true;
        window.clearTimeout(timeout);
        resolve(position);
      },
      () => {
        if (settled) {
          return;
        }
        settled = true;
        window.clearTimeout(timeout);
        resolve(null);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 60_000,
        timeout: GEO_TIMEOUT_MS
      }
    );
  });
}

export async function trackQrScanFromUrl() {
  const context = getQrContextFromUrl(new URL(window.location.href));
  if (!context) {
    return { accepted: false, reason: 'no_qr_context' };
  }

  const sessionKey = getSessionKey(context);
  if (readSessionFlag(sessionKey)) {
    return { accepted: false, reason: 'already_tracked' };
  }

  const position = await getCurrentPosition();
  const payload = {
    ...context,
    latitude: position?.coords?.latitude ?? null,
    longitude: position?.coords?.longitude ?? null,
    accuracyMeters: position?.coords?.accuracy ?? null
  };

  try {
    await postJson('/qr-scans', payload);
    writeSessionFlag(sessionKey);
    return { accepted: true };
  } catch {
    return { accepted: false, reason: 'request_failed' };
  }
}
