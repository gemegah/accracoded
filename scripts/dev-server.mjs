import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ROOT = resolve(fileURLToPath(new URL('../', import.meta.url)));

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function parseArgs(argv) {
  const defaults = { host: '127.0.0.1', port: 4173 };
  const args = { ...defaults };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--host' && argv[i + 1]) {
      args.host = argv[i + 1];
      i += 1;
      continue;
    }

    if (arg === '--port' && argv[i + 1]) {
      const value = Number(argv[i + 1]);
      if (!Number.isNaN(value)) {
        args.port = value;
      }
      i += 1;
    }
  }

  return args;
}

function resolvePath(pathname) {
  const decoded = decodeURIComponent(pathname.split('?')[0] || '/');
  const safePath = normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const basePath = safePath === '/' ? '/index.html' : safePath;
  let absolutePath = resolve(PROJECT_ROOT, `.${basePath}`);

  if (!absolutePath.startsWith(PROJECT_ROOT)) {
    return null;
  }

  if (existsSync(absolutePath) && statSync(absolutePath).isDirectory()) {
    absolutePath = join(absolutePath, 'index.html');
  }

  return absolutePath;
}

const { host, port } = parseArgs(process.argv.slice(2));

const server = createServer((req, res) => {
  const method = req.method || 'GET';
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method Not Allowed');
    return;
  }

  const requestedPath = resolvePath(req.url || '/');
  if (!requestedPath || !existsSync(requestedPath) || statSync(requestedPath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  const contentType = MIME_TYPES[extname(requestedPath).toLowerCase()] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });

  if (method === 'HEAD') {
    res.end();
    return;
  }

  createReadStream(requestedPath).pipe(res);
});

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`accracoded dev server running at http://${host}:${port}`);
});

