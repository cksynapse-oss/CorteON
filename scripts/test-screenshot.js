#!/usr/bin/env node

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const screenshotDir = path.join(rootDir, '.screenshots');

if (!fs.existsSync(distDir)) {
  console.error(
    'Error: dist/ directory not found. Please run "npm run build" first.'
  );
  process.exit(1);
}

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
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
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const address = server.address();
  const port = address.port;
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`[test-screenshot] Serving dist/ on ${baseUrl}...`);

  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: 'chrome' });
    } catch {
      browser = await chromium.launch();
    }

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      javaScriptEnabled: true,
    });
    const page = await context.newPage();

    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 0));

    const screenshotPath = path.join(screenshotDir, 'home-hero-1440x900.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`[test-screenshot] Screenshot captured at ${screenshotPath}`);

    const result = await page.evaluate(() => {
      const hero = document.querySelector('#hero');
      const h1 = document.querySelector('#hero h1');
      const cta = document.querySelector('#hero a[href*="enquire"]');
      const svg = document.querySelector('#hero .building svg');

      const heroBg = hero ? window.getComputedStyle(hero).backgroundColor : '';
      const h1Style = h1 ? window.getComputedStyle(h1) : null;
      const ctaStyle = cta ? window.getComputedStyle(cta) : null;
      const svgStyle = svg ? window.getComputedStyle(svg) : null;

      const h1Box = h1 ? h1.getBoundingClientRect() : null;
      const ctaBox = cta ? cta.getBoundingClientRect() : null;
      const svgBox = svg ? svg.getBoundingClientRect() : null;

      return {
        h1: {
          exists: !!h1,
          text: h1 ? h1.textContent.trim() : '',
          visible:
            h1Style &&
            h1Style.visibility === 'visible' &&
            h1Style.display !== 'none' &&
            parseFloat(h1Style.opacity) > 0 &&
            h1Box.width > 0 &&
            h1Box.height > 0,
          color: h1Style ? h1Style.color : '',
          heroBg,
          isContrasting: h1Style ? h1Style.color !== heroBg : false,
        },
        cta: {
          exists: !!cta,
          backgroundColor: ctaStyle ? ctaStyle.backgroundColor : '',
          hasVisibleBackground:
            ctaStyle &&
            ctaStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' &&
            ctaStyle.backgroundColor !== 'transparent' &&
            ctaStyle.backgroundColor !== heroBg,
          box: ctaBox,
        },
        svg: {
          exists: !!svg,
          opacity: svgStyle ? parseFloat(svgStyle.opacity) : 0,
          visible:
            svgStyle &&
            svgStyle.visibility === 'visible' &&
            svgStyle.display !== 'none' &&
            svgBox.width > 0 &&
            svgBox.height > 0,
        },
      };
    });

    console.log(
      '[test-screenshot] Verification results:',
      JSON.stringify(result, null, 2)
    );

    const errors = [];
    if (!result.h1.exists) {
      errors.push('Hero h1 element not found');
    } else {
      if (!result.h1.visible) errors.push('Hero h1 is not visible');
      if (result.h1.text.length === 0) errors.push('Hero h1 has empty text');
      if (!result.h1.isContrasting)
        errors.push('Hero h1 text color matches hero background color');
    }

    if (!result.cta.exists) {
      errors.push('CTA button not found');
    } else if (!result.cta.hasVisibleBackground) {
      errors.push(
        `CTA button has no visible background (found ${result.cta.backgroundColor})`
      );
    }

    if (!result.svg.exists) {
      errors.push('Building SVG not found');
    } else {
      if (!(result.svg.opacity > 0))
        errors.push(
          `Building SVG opacity is not > 0 (found ${result.svg.opacity})`
        );
      if (!result.svg.visible)
        errors.push('Building SVG is not visible in layout');
    }

    if (errors.length > 0) {
      console.error('[test-screenshot] FAILED:');
      for (const err of errors) console.error(`  - ${err}`);
      process.exitCode = 1;
    } else {
      console.log(
        '[test-screenshot] PASSED: All hero visual assertions satisfied.'
      );
      process.exitCode = 0;
    }

    await browser.close();
  } catch (err) {
    console.error('[test-screenshot] Unexpected error:', err);
    process.exitCode = 1;
    if (browser) await browser.close();
  } finally {
    server.close();
  }
});
