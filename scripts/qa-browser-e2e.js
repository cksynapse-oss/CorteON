import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { FORM_URLS } from '../src/config/forms.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const screenshotsDir = path.join(rootDir, '.screenshots', 'qa');
const formsScreenshotsDir = path.join(rootDir, '.screenshots', 'forms');

fs.mkdirSync(screenshotsDir, { recursive: true });
fs.mkdirSync(formsScreenshotsDir, { recursive: true });

// Simple static server for dist/
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function createServer() {
  return http.createServer((req, res) => {
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
}

const PAGES_TO_TEST = [
  { path: '/', name: 'home', titleSnippet: 'Synapse' },
  { path: '/courses', name: 'courses', titleSnippet: 'Courses' },
  {
    path: '/courses/foundation-pack',
    name: 'course-foundation',
    titleSnippet: 'Foundation Pack',
  },
  {
    path: '/courses/question-bank',
    name: 'course-question-bank',
    titleSnippet: 'Question Bank',
  },
  {
    path: '/courses/subject-classes',
    name: 'course-subject-classes',
    titleSnippet: 'Subject Classes',
  },
  {
    path: '/courses/communication',
    name: 'course-communication',
    titleSnippet: 'Communication',
  },
  {
    path: '/courses/business-development',
    name: 'course-bd',
    titleSnippet: 'Business Development',
  },
  {
    path: '/courses/ai-literacy',
    name: 'course-ai',
    titleSnippet: 'AI Literacy',
  },
  {
    path: '/courses/ai-business-combo',
    name: 'course-combo',
    titleSnippet: 'Combo',
  },
  { path: '/ventures', name: 'ventures', titleSnippet: 'Ventures' },
  {
    path: '/schools-colleges',
    name: 'schools-colleges',
    titleSnippet: 'Schools',
  },
  { path: '/about', name: 'about', titleSnippet: 'About' },
  { path: '/faq', name: 'faq', titleSnippet: 'Frequently Asked Questions' },
  { path: '/contact', name: 'contact', titleSnippet: 'Contact' },
  { path: '/enquire', name: 'enquire', titleSnippet: 'Admissions' },
  { path: '/corteon', name: 'corteon-preserved', titleSnippet: 'Corteon' },
  { path: '/tutor', name: 'tutor-app', titleSnippet: 'Tutor' },
];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const PREFILLED_TESTS = [
  {
    key: 'foundationPack',
    name: 'Foundation Pack',
    expectedSelectedSubstring: 'Foundation Pack',
  },
  {
    key: 'questionBank',
    name: 'Question Bank',
    expectedSelectedSubstring: 'Question Bank',
  },
  {
    key: 'subjectClasses',
    name: 'Subject Classes',
    expectedSelectedSubstring: 'Class 11–12 Subject Classes',
  },
  {
    key: 'communication',
    name: 'Communication',
    expectedSelectedSubstring: 'Communication',
  },
  {
    key: 'businessDevelopment',
    name: 'Business Development',
    expectedSelectedSubstring: 'Business Development',
  },
  {
    key: 'aiLiteracy',
    name: 'AI Literacy',
    expectedSelectedSubstring: 'Applied AI Literacy',
  },
  {
    key: 'aiBusinessCombo',
    name: 'AI + Business Combo',
    expectedSelectedSubstring: 'AI Literacy + Business Development',
  },
];

async function main() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`[QA] Local static server listening on ${baseUrl}`);

  const browser = await chromium.launch({
    executablePath:
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const auditReport = {
    pagesChecked: [],
    formsChecked: [],
    buttonAudits: [],
    errors: [],
  };

  console.log(`\n============================================================`);
  console.log(`1. TESTING LOCAL PAGES & RESPONSIVENESS (390px, 768px, 1440px)`);
  console.log(`============================================================`);

  for (const pageDef of PAGES_TO_TEST) {
    const pageUrl = `${baseUrl}${pageDef.path}`;
    console.log(`\nInspecting page: ${pageDef.path}`);

    let pageResult = {
      path: pageDef.path,
      h1Count: 0,
      title: '',
      viewports: {},
      brokenImages: 0,
      passed: true,
    };

    // Test across viewports
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const response = await page.goto(pageUrl, { waitUntil: 'networkidle' });

      if (!response || response.status() !== 200) {
        console.error(
          `  ❌ HTTP ${response ? response.status() : 'NO_RESP'} on ${pageDef.path}`
        );
        pageResult.passed = false;
        auditReport.errors.push(
          `HTTP ${response?.status()} on ${pageDef.path}`
        );
        continue;
      }

      const title = await page.title();
      pageResult.title = title;

      // Check horizontal overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasHorizontalScroll) {
        console.warn(
          `  ⚠️ Overflow detected at ${vp.width}px on ${pageDef.path}`
        );
        pageResult.viewports[vp.name] = 'overflow';
      } else {
        pageResult.viewports[vp.name] = 'OK';
      }

      // Check h1 count once per page
      if (vp.name === 'desktop') {
        const h1Elements = await page.$$('h1');
        pageResult.h1Count = h1Elements.length;
        if (h1Elements.length !== 1 && pageDef.path !== '/corteon') {
          console.warn(
            `  ⚠️ H1 count is ${h1Elements.length} on ${pageDef.path}`
          );
        }

        // Scroll down to trigger lazy loading of images, then scroll back up
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 500;
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
        await page.waitForTimeout(300);

        // Check images
        const brokenImages = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs
            .filter((img) => !img.complete || img.naturalWidth === 0)
            .map((img) => img.src);
        });
        pageResult.brokenImages = brokenImages.length;
        if (brokenImages.length > 0) {
          console.error(
            `  ❌ Broken images found on ${pageDef.path}:`,
            brokenImages
          );
          pageResult.passed = false;
        }
      }

      // Screenshot
      const screenshotPath = path.join(
        screenshotsDir,
        `${pageDef.name}-${vp.name}.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: false });
    }

    console.log(`  ✓ Title: "${pageResult.title}"`);
    console.log(`  ✓ H1 count: ${pageResult.h1Count}`);
    console.log(
      `  ✓ Viewports: 390px=${pageResult.viewports.mobile}, 768px=${pageResult.viewports.tablet}, 1440px=${pageResult.viewports.desktop}`
    );
    console.log(`  ✓ Broken images: ${pageResult.brokenImages}`);
    auditReport.pagesChecked.push(pageResult);
  }

  console.log(`\n============================================================`);
  console.log(`2. TESTING ENQUIRY BUTTON TARGETS ON WEBSITE`);
  console.log(`============================================================`);

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const homeCourseButtons = await page.$$eval(
    'a[href*="docs.google.com"]',
    (els) => els.map((e) => ({ text: e.innerText.trim(), href: e.href }))
  );
  console.log(
    `Found ${homeCourseButtons.length} Google Form buttons on Home page course cards.`
  );

  await page.goto(`${baseUrl}/courses`, { waitUntil: 'networkidle' });
  const coursesButtons = await page.$$eval(
    'article a[href*="docs.google.com"]',
    (els) => els.map((e) => ({ text: e.innerText.trim(), href: e.href }))
  );
  console.log(
    `Found ${coursesButtons.length} Google Form buttons on /courses catalogue.`
  );

  await page.goto(`${baseUrl}/ventures`, { waitUntil: 'networkidle' });
  const ventureButtons = await page.$$eval(
    'a[href*="docs.google.com"]',
    (els) => els.map((e) => ({ text: e.innerText.trim(), href: e.href }))
  );
  console.log(
    `Found ${ventureButtons.length} Google Form buttons on /ventures.`
  );

  await page.goto(`${baseUrl}/schools-colleges`, { waitUntil: 'networkidle' });
  const schoolButtons = await page.$$eval('a[href*="docs.google.com"]', (els) =>
    els.map((e) => ({ text: e.innerText.trim(), href: e.href }))
  );
  console.log(
    `Found ${schoolButtons.length} Google Form buttons on /schools-colleges.`
  );

  console.log(`\n============================================================`);
  console.log(`3. TESTING REAL GOOGLE FORMS IN INCOGNITO BROWSER SESSION`);
  console.log(`============================================================`);

  // Test the 3 base forms
  const baseForms = [
    {
      key: 'courseGeneral',
      name: 'Form 1: Course Enquiry (Student / Parent)',
      url: FORM_URLS.courseGeneral,
    },
    {
      key: 'internshipApplication',
      name: 'Form 2: Business Development & Internship Application',
      url: FORM_URLS.internshipApplication,
    },
    {
      key: 'institutionEnquiry',
      name: 'Form 3: School & College Partnership Enquiry',
      url: FORM_URLS.institutionEnquiry,
    },
  ];

  for (const bf of baseForms) {
    console.log(`\nOpening Base Form: ${bf.name}`);
    console.log(`URL: ${bf.url}`);

    await page.goto(bf.url, { waitUntil: 'networkidle', timeout: 30000 });

    const currentUrl = page.url();
    const title = await page.title();
    console.log(`  Rendered Title: "${title}"`);
    console.log(`  Current URL: ${currentUrl}`);

    const requiresLogin = currentUrl.includes('accounts.google.com');
    const isClosed = (await page.content()).includes(
      'no longer accepting responses'
    );

    console.log(
      `  Publicly accessible without login: ${!requiresLogin ? 'YES' : 'NO'}`
    );
    console.log(`  Accepting responses: ${!isClosed ? 'YES' : 'NO'}`);

    const shotPath = path.join(formsScreenshotsDir, `${bf.key}.png`);
    await page.screenshot({ path: shotPath });

    auditReport.formsChecked.push({
      key: bf.key,
      name: bf.name,
      url: bf.url,
      title,
      publicWithoutLogin: !requiresLogin,
      acceptingResponses: !isClosed,
      screenshot: shotPath,
    });
  }

  console.log(`\n============================================================`);
  console.log(`4. VERIFYING ACTUAL PREFILLED OPTIONS INSIDE GOOGLE FORM 1`);
  console.log(`============================================================`);

  for (const pt of PREFILLED_TESTS) {
    const url = FORM_URLS[pt.key];
    console.log(`\nTesting Prefill for: [${pt.name}]`);
    console.log(`URL: ${url}`);

    const p = await browser.newPage();
    await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for form to render
    await p.waitForSelector('form', { timeout: 15000 });
    await p.waitForTimeout(600);

    // Google Form 1 splits questions across sections.
    // The "Which course are you interested in?" question lives on Section 3.
    // Navigate past Section 1 by entering minimal inputs to reach Section 3 without submitting:
    await p.fill('input[type="text"]', 'Synapse QA Reviewer');
    await p.click('div[role="radio"][data-value="Student"]');

    // Select Class 11 from floating dropdown popup
    await p.click('div[role="listbox"]');
    await p.waitForTimeout(600);
    const floatingOption = p
      .locator(
        '.exportSelectPopup div[role="option"], div[role="listbox"] ~ * div[role="option"]'
      )
      .filter({ hasText: 'Class 11' });
    if ((await floatingOption.count()) > 0) {
      await floatingOption.first().click();
    } else {
      await p
        .locator('div[role="option"]:visible')
        .filter({ hasText: 'Class 11' })
        .first()
        .click();
    }
    await p.waitForTimeout(400);

    // Under 18: No (branches directly to Section 3 Course & Contact Details)
    await p.click('div[role="radio"][data-value="No"]');
    await p.waitForTimeout(400);

    // Click "Next" to navigate to Section 3
    const nextBtn = await p.$('div[role="button"]:has-text("Next")');
    if (nextBtn) {
      await nextBtn.click();
      await p.waitForTimeout(2500);
    }

    // Now on Section 3, inspect which checkbox/radio has aria-checked="true"
    const checkedLabels = await p.evaluate(() => {
      const checkedEls = Array.from(
        document.querySelectorAll('[aria-checked="true"]')
      );
      return checkedEls.map((el) => {
        const ariaLabel = el.getAttribute('aria-label');
        if (ariaLabel) return ariaLabel.trim();
        const container =
          el.closest('.Qr7Oae, [role="listitem"]') || el.parentElement;
        return container ? container.innerText.split('\n')[0].trim() : '';
      });
    });

    console.log(`  Checked labels found on Section 3:`, checkedLabels);

    const matchesExpected = checkedLabels.some((lbl) =>
      lbl.toLowerCase().includes(pt.expectedSelectedSubstring.toLowerCase())
    );

    if (matchesExpected) {
      console.log(
        `  ✓ VERIFIED IN BROWSER: Option "${pt.expectedSelectedSubstring}" is visibly PRESELECTED!`
      );
    } else {
      console.warn(
        `  ⚠️ Selected option mismatch! Expected "${pt.expectedSelectedSubstring}", got:`,
        checkedLabels
      );
    }

    const shotPath = path.join(formsScreenshotsDir, `prefill-${pt.key}.png`);
    await p.screenshot({ path: shotPath });

    auditReport.formsChecked.push({
      key: pt.key,
      name: pt.name,
      url,
      checkedLabels,
      matchesExpected,
      screenshot: shotPath,
    });

    await p.close();
  }

  await browser.close();
  server.close();

  console.log(`\n============================================================`);
  console.log(`E2E AUDIT COMPLETE!`);
  console.log(`============================================================`);
  return auditReport;
}

main().catch((err) => {
  console.error('[QA] Fatal error:', err);
  process.exit(1);
});
