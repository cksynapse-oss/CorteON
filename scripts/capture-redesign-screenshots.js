import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const screenshotDir = path.join(rootDir, '.screenshots', 'redesign');

fs.mkdirSync(screenshotDir, { recursive: true });

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
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
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`[Screenshot Server] Serving dist/ on ${baseUrl}...`);

  const browser = await chromium.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
  ];

  const pagesToCapture = [
    { path: '/', name: 'home' },
    { path: '/school', name: 'school' },
    { path: '/college', name: 'college' },
    { path: '/courses', name: 'courses' },
    { path: '/schools-colleges', name: 'institutions' },
    { path: '/ventures', name: 'ventures' },
    { path: '/about', name: 'about' },
  ];

  for (const pageItem of pagesToCapture) {
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });
      await page.goto(`${baseUrl}${pageItem.path}`, {
        waitUntil: 'networkidle',
      });

      // Scroll to trigger any lazy image loading
      await page.evaluate(async () => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          const distance = 400;
          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;
            if (totalHeight >= scrollHeight) {
              clearInterval(timer);
              window.scrollTo(0, 0);
              resolve();
            }
          }, 30);
        });
      });
      await page.waitForTimeout(400);

      const shotPath = path.join(
        screenshotDir,
        `${pageItem.name}-${vp.name}.png`
      );
      await page.screenshot({ path: shotPath, fullPage: false });
      console.log(`✓ Captured: ${shotPath}`);

      // Also capture full page for desktop home
      if (pageItem.name === 'home' && vp.name === 'desktop-1440') {
        const fullPath = path.join(screenshotDir, `home-desktop-fullpage.png`);
        await page.screenshot({ path: fullPath, fullPage: true });
        console.log(`✓ Captured fullpage: ${fullPath}`);
      }

      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log(
    '[Screenshot] Complete! All screenshots saved in .screenshots/redesign'
  );
});
