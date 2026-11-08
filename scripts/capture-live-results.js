import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, '.screenshots', 'live-results');
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  console.log('Navigating to live homepage: https://corteon.in/ ...');
  await page.goto('https://corteon.in/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, 'live-home-hero.png') });
  console.log('✓ Captured live-home-hero.png');

  console.log('Navigating to live About page: https://corteon.in/about/ ...');
  await page.goto('https://corteon.in/about/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, 'live-about-hero.png') });
  console.log('✓ Captured live-about-hero.png');

  // Scroll down to the building section
  const buildingSection = page.locator('section#building');
  if ((await buildingSection.count()) > 0) {
    await buildingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, 'live-about-building-section.png'),
    });
    console.log('✓ Captured live-about-building-section.png');
  }

  // Also full page about
  await page.screenshot({
    path: path.join(outDir, 'live-about-fullpage.png'),
    fullPage: true,
  });
  console.log('✓ Captured live-about-fullpage.png');

  // Test mobile 390
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://corteon.in/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(outDir, 'live-home-mobile.png') });
  console.log('✓ Captured live-home-mobile.png');

  await page.goto('https://corteon.in/about/', { waitUntil: 'networkidle' });
  if ((await buildingSection.count()) > 0) {
    await buildingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(outDir, 'live-about-building-mobile.png'),
    });
    console.log('✓ Captured live-about-building-mobile.png');
  }

  await browser.close();
  console.log('All live captures complete!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
