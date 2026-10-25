#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

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

function getHtmlPages(dir, relativeBase = '') {
  let pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.join(relativeBase, entry.name);
    if (entry.isDirectory()) {
      pages = pages.concat(getHtmlPages(full, rel));
    } else if (entry.name.endsWith('.html')) {
      pages.push(rel);
    }
  }
  return pages;
}

server.listen(0, '127.0.0.1', async () => {
  const address = server.address();
  const port = address.port;
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`[axe-check] Serving dist/ on ${baseUrl}...`);

  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: 'chrome' });
    } catch {
      browser = await chromium.launch();
    }

    const context = await browser.newContext();
    const page = await context.newPage();

    const htmlPages = getHtmlPages(distDir);
    console.log(
      `[axe-check] Auditing ${htmlPages.length} pages for serious/critical violations...\n`
    );

    let totalViolations = 0;
    const pageViolations = [];

    for (const relPath of htmlPages) {
      const route =
        '/' +
        (relPath === 'index.html'
          ? ''
          : relPath.replace(/\/index\.html$/, '').replace(/\.html$/, ''));

      await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
      const results = await new AxeBuilder({ page }).analyze();

      const seriousOrCritical = results.violations.filter(
        (v) => v.impact === 'serious' || v.impact === 'critical'
      );

      if (seriousOrCritical.length > 0) {
        totalViolations += seriousOrCritical.length;
        pageViolations.push({ route, violations: seriousOrCritical });
        console.log(
          `❌ ${route} (${seriousOrCritical.length} serious/critical violation(s)):`
        );
        for (const v of seriousOrCritical) {
          console.log(
            `   - [${v.impact.toUpperCase()}] ${v.id}: ${v.help} (${v.nodes.length} element(s))`
          );
        }
      } else {
        console.log(`✓ ${route}: 0 serious/critical violations`);
      }
    }

    console.log(
      '\n--------------------------------------------------------------------------------'
    );
    if (totalViolations > 0) {
      console.error(
        `[axe-check] FAILED: Found ${totalViolations} serious/critical violation(s) across ${pageViolations.length} page(s).`
      );
      process.exitCode = 1;
    } else {
      console.log(
        `[axe-check] PASSED: All ${htmlPages.length} pages passed serious/critical accessibility checks.`
      );
    }
  } catch (err) {
    console.error('[axe-check] Error during audit:', err);
    process.exitCode = 1;
  } finally {
    if (browser) {
      await browser.close();
    }
    server.close();
  }
});
