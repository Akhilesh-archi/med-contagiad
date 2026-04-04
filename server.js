const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const mime = {
  html:  'text/html; charset=utf-8',
  css:   'text/css; charset=utf-8',
  js:    'text/javascript; charset=utf-8',
  png:   'image/png',
  jpg:   'image/jpeg',
  jpeg:  'image/jpeg',
  webp:  'image/webp',
  gif:   'image/gif',
  svg:   'image/svg+xml',
  ico:   'image/x-icon',
  json:  'application/json; charset=utf-8',
  woff:  'font/woff',
  woff2: 'font/woff2',
  ttf:   'font/ttf',
};

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

const CACHE_HEADERS = {
  html: 'no-cache',
  default: 'public, max-age=31536000, immutable',
};

http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0].split('#')[0];
  const safePath = urlPath === '/' ? 'index.html' : urlPath;

  // Path traversal protection
  const filePath = path.normalize(path.join(ROOT, safePath));
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    const ext = path.extname(filePath).slice(1).toLowerCase();
    const contentType = mime[ext] || 'application/octet-stream';
    const cacheControl = ext === 'html' ? CACHE_HEADERS.html : CACHE_HEADERS.default;

    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain', ...SECURITY_HEADERS });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        ...SECURITY_HEADERS,
      });
      res.end(data);
    }
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
