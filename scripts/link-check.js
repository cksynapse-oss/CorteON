#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LinkChecker } from 'linkinator';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error(
    'Error: dist/ directory not found. Please run "npm run build" first.'
  );
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let urlPath = decodeURIComponent(url.pathname);
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const address = server.address();
  const port = address.port;
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`[link-check] Serving dist/ on ${baseUrl}...`);

  try {
    const checker = new LinkChecker();
    const result = await checker.check({
      path: baseUrl,
      recurse: true,
      urlRewriteExpressions: [
        {
          pattern: /^https?:\/\/corteon\.in/,
          replacement: baseUrl,
        },
      ],
      linksToSkip: async (link) => {
        // Internal links only: keep local server URLs and corteon.in URLs (rewritten above)
        return (
          !link.startsWith(baseUrl) &&
          !link.startsWith('https://corteon.in') &&
          !link.startsWith('/')
        );
      },
    });

    const broken = result.links.filter((l) => l.state === 'BROKEN');
    const ok = result.links.filter((l) => l.state === 'OK');

    console.log(
      `[link-check] Scanned ${result.links.length} total links: ${ok.length} internal OK, ${broken.length} broken.`
    );

    if (broken.length > 0) {
      console.error(
        `[link-check] FAILED: Found ${broken.length} broken internal link(s):`
      );
      for (const item of broken) {
        console.error(
          `  - ${item.url} (status: ${item.status || 'unreachable'})`
        );
        if (item.parent) {
          console.error(`    linked from: ${item.parent}`);
        }
      }
      process.exitCode = 1;
    } else {
      console.log('[link-check] PASSED: No broken internal links found.');
    }
  } catch (err) {
    console.error('[link-check] Error during crawl:', err);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});
