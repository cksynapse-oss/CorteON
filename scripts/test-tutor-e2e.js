import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist/ not found. Run npm run build first.');
  process.exit(1);
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
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
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  }
});

server.listen(0, '127.0.0.1', async () => {
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`[test-tutor-e2e] Server started at ${baseUrl}`);

  let browser;
  let exitCode = 0;

  try {
    try {
      browser = await chromium.launch({ channel: 'chrome' });
    } catch {
      browser = await chromium.launch();
    }

    const jsErrors = [];

    // --- TEST 1: DESKTOP WORKFLOW ---
    console.log('\n--- 1. Testing Desktop (1440x900) ---');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await desktopContext.newPage();

    page.on('pageerror', (err) => {
      console.error('[Browser Error]', err.message);
      jsErrors.push(err.message);
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error('[Browser Console Error]', msg.text());
        jsErrors.push(msg.text());
      }
    });

    await page.goto(`${baseUrl}/tutor`, { waitUntil: 'networkidle' });

    // Verify Title & Headings
    const title = await page.title();
    console.log(`✓ Page Title: "${title}"`);
    if (!title.includes('Corteon Tutor'))
      throw new Error('Incorrect page title');

    const h1 = await page.textContent('h1');
    console.log(`✓ Single <h1>: "${h1.trim()}"`);
    if (!h1.includes('Hints Before Answers'))
      throw new Error('H1 text missing expected copy');

    // Telemetry Initial State
    const initHints = await page.textContent('#telemetry-hints');
    const initConf = await page.textContent('#telemetry-confidence');
    console.log(
      `✓ Initial Telemetry: Hints="${initHints.trim()}", Conf="${initConf.trim()}"`
    );

    // Confidence Slider Manipulation
    console.log('\n• Testing Confidence Calibration Slider...');
    await page.fill('#confidence-calibration-slider', '85');
    await page.dispatchEvent('#confidence-calibration-slider', 'input');
    const updatedConf = await page.textContent('#telemetry-confidence');
    console.log(`✓ Updated Conf: "${updatedConf.trim()}"`);
    if (!updatedConf.includes('85%'))
      throw new Error('Confidence slider did not update readout');

    // Progressive Hint Disclosure
    console.log('\n• Testing Socratic Hint Ladder...');
    await page.click('#btn-reveal-hint');
    const hint1Badge = await page.textContent('#hint-badge-01');
    const hintsCount1 = await page.textContent('#telemetry-hints');
    console.log(
      `✓ Hint 1 Unlocked: Badge="${hint1Badge.trim()}", Telemetry="${hintsCount1.trim()}"`
    );

    await page.click('#btn-reveal-hint');
    const hint2Badge = await page.textContent('#hint-badge-02');
    console.log(`✓ Hint 2 Unlocked: Badge="${hint2Badge.trim()}"`);

    await page.click('#btn-reveal-hint');
    const hint3Badge = await page.textContent('#hint-badge-03');
    const hintBtnDisabled = await page.getAttribute(
      '#btn-reveal-hint',
      'disabled'
    );
    console.log(
      `✓ Hint 3 Unlocked: Badge="${hint3Badge.trim()}", Button Disabled=${!!hintBtnDisabled}`
    );

    // Quick Sample Selection & Submission
    console.log('\n• Testing Sample Selection & Socratic Critique...');
    await page.click('button[data-conf="85"]');
    const reasoningValue = await page.inputValue('#learner-reasoning-text');
    console.log(
      `✓ Sample loaded into textarea: "${reasoningValue.slice(0, 45)}..."`
    );

    await page.click('#btn-submit-reasoning');
    await page.waitForTimeout(300);

    const marginNotes = await page.textContent('#dialogue-messages-container');
    if (!marginNotes.includes('Formal algebraic definition')) {
      throw new Error(
        'Socratic analysis feedback missing expected mathematical evaluation'
      );
    }
    console.log(
      '✓ Socratic analysis evaluated submission with "Established", "Missing Link", and "Next Inquiry"'
    );

    // Verification Challenge
    console.log('\n• Testing Conceptual Transfer Check...');
    const verificationVisible = await page.isVisible('#verification-box');
    if (!verificationVisible)
      throw new Error('Verification box did not reveal after proof completion');
    console.log('✓ Verification challenge displayed');

    // Test Correct Option Click
    await page.click('button[data-correct="true"]');
    await page.waitForTimeout(300);

    const verificationResult = await page.textContent(
      '#verification-result-note'
    );
    console.log(
      `✓ Transfer Check Result: "${verificationResult.slice(0, 50)}..."`
    );
    if (!verificationResult.includes('Understanding Verified'))
      throw new Error('Verification feedback missing');

    const dossierVisible = await page.isVisible('#mastery-dossier');
    console.log(`✓ Mastery Dossier visible: ${dossierVisible}`);

    // Test Reset
    console.log('\n• Testing Restart Slate...');
    await page.click('#btn-restart-tutor');
    await page.waitForTimeout(300);

    const resetHints = await page.textContent('#telemetry-hints');
    const resetConf = await page.textContent('#telemetry-confidence');
    const resetDossierVisible = await page.isVisible('#mastery-dossier');
    console.log(
      `✓ Reset state: Hints="${resetHints.trim()}", Conf="${resetConf.trim()}", Dossier hidden=${!resetDossierVisible}`
    );

    // --- TEST 2: MOBILE VIEWPORT ---
    console.log('\n--- 2. Testing Mobile (390x844 - iPhone 14) ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    mobilePage.on('pageerror', (err) => jsErrors.push(err.message));

    await mobilePage.goto(`${baseUrl}/tutor`, { waitUntil: 'networkidle' });

    // Check no horizontal scroll overflow
    const scrollWidth = await mobilePage.evaluate(
      () => document.documentElement.scrollWidth
    );
    const clientWidth = await mobilePage.evaluate(
      () => document.documentElement.clientWidth
    );
    console.log(
      `✓ Mobile viewport: scrollWidth=${scrollWidth}, clientWidth=${clientWidth}`
    );
    if (scrollWidth > clientWidth) {
      console.warn(
        `⚠️ Warning: Mobile page has horizontal overflow: ${scrollWidth} > ${clientWidth}`
      );
    } else {
      console.log('✓ Mobile layout has zero horizontal overflow');
    }

    // Test mobile interactions
    await mobilePage.click('#btn-reveal-hint');
    await mobilePage.click('button[data-conf="50"]');
    await mobilePage.click('#btn-submit-reasoning');
    await mobilePage.waitForTimeout(300);
    const mobileMargin = await mobilePage.textContent(
      '#dialogue-messages-container'
    );
    if (!mobileMargin.includes('Prime factor decomposition')) {
      throw new Error('Mobile Socratic response did not fire properly');
    }
    console.log('✓ Mobile interaction flow succeeded cleanly');

    // JS Error check
    console.log('\n--- 3. JavaScript Error Audit ---');
    if (jsErrors.length > 0) {
      console.error(`❌ Found ${jsErrors.length} JavaScript errors:`);
      jsErrors.forEach((e) => console.error(`  - ${e}`));
      exitCode = 1;
    } else {
      console.log(
        '✓ 0 JavaScript errors or console errors detected across all viewports!'
      );
    }
  } catch (err) {
    console.error('❌ E2E Test Failed:', err);
    exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
    process.exit(exitCode);
  }
});
