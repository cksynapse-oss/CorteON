import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const screenshotDir = path.join(rootDir, '.screenshots');
const artifactDir =
  '/Users/hahaha/.gemini/antigravity/brain/4a830e41-ee5a-4faa-b35b-44152bad7760';

if (!fs.existsSync(screenshotDir))
  fs.mkdirSync(screenshotDir, { recursive: true });
if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });

async function capture() {
  let browser;
  try {
    try {
      browser = await chromium.launch({ channel: 'chrome' });
    } catch {
      browser = await chromium.launch();
    }

    const previewUrl = 'http://localhost:4321/tutor';
    console.log(`[capture] Opening ${previewUrl}...`);

    // 1. DESKTOP (1440x900)
    console.log('[capture] Capturing Desktop 1440x900...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(previewUrl, { waitUntil: 'networkidle' });

    // Initial desktop screenshot
    const dTopPath = path.join(screenshotDir, 'tutor-desktop-initial.png');
    await desktopPage.screenshot({ path: dTopPath, fullPage: false });

    // Scroll to workspace and capture workspace element cleanly without sticky nav overlay
    const workspaceElement = await desktopPage.$(
      '[data-component="interactive-tutor"]'
    );
    if (workspaceElement) {
      await desktopPage.evaluate(() => {
        const header = document.querySelector('header.sticky');
        if (header) header.style.position = 'static';
      });
      await workspaceElement.scrollIntoViewIfNeeded();
      const dWorkspacePath = path.join(
        screenshotDir,
        'tutor-desktop-workspace.png'
      );
      await workspaceElement.screenshot({ path: dWorkspacePath });
    }

    // Now interact: reveal hint 1, click formal proof archetype, submit, answer verification
    await desktopPage.click('#btn-reveal-hint');
    await desktopPage.click('button[data-conf="85"]');
    await desktopPage.click('#btn-submit-reasoning');
    await desktopPage.waitForTimeout(300);
    await desktopPage.click('button[data-correct="true"]');
    await desktopPage.waitForTimeout(300);

    const dActiveWorkspacePath = path.join(
      screenshotDir,
      'tutor-desktop-active-verified.png'
    );
    if (workspaceElement) {
      await workspaceElement.screenshot({ path: dActiveWorkspacePath });
    }

    const dFullPagePath = path.join(screenshotDir, 'tutor-desktop-full.png');
    await desktopPage.screenshot({ path: dFullPagePath, fullPage: true });

    // 2. MOBILE (390x844)
    console.log('[capture] Capturing Mobile 390x844...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(previewUrl, { waitUntil: 'networkidle' });

    const mTopPath = path.join(screenshotDir, 'tutor-mobile-initial.png');
    await mobilePage.screenshot({ path: mTopPath, fullPage: false });

    const mWorkspaceElement = await mobilePage.$(
      '[data-component="interactive-tutor"]'
    );
    if (mWorkspaceElement) {
      await mobilePage.evaluate(() => {
        const header = document.querySelector('header.sticky');
        if (header) header.style.position = 'static';
      });
      await mWorkspaceElement.scrollIntoViewIfNeeded();
      const mWorkspacePath = path.join(
        screenshotDir,
        'tutor-mobile-workspace.png'
      );
      await mWorkspaceElement.screenshot({ path: mWorkspacePath });

      // Interact on mobile
      await mobilePage.click('#btn-reveal-hint');
      await mobilePage.click('button[data-conf="85"]');
      await mobilePage.click('#btn-submit-reasoning');
      await mobilePage.waitForTimeout(300);
      await mobilePage.click('button[data-correct="true"]');
      await mobilePage.waitForTimeout(300);

      const mActiveWorkspacePath = path.join(
        screenshotDir,
        'tutor-mobile-active-verified.png'
      );
      await mWorkspaceElement.screenshot({ path: mActiveWorkspacePath });
    }

    const mFullPagePath = path.join(screenshotDir, 'tutor-mobile-full.png');
    await mobilePage.screenshot({ path: mFullPagePath, fullPage: true });

    // Copy all screenshots to artifact directory
    const files = [
      'tutor-desktop-initial.png',
      'tutor-desktop-workspace.png',
      'tutor-desktop-active-verified.png',
      'tutor-desktop-full.png',
      'tutor-mobile-initial.png',
      'tutor-mobile-workspace.png',
      'tutor-mobile-active-verified.png',
      'tutor-mobile-full.png',
    ];

    for (const f of files) {
      const src = path.join(screenshotDir, f);
      const dest = path.join(artifactDir, f);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`[capture] Copied ${f} to artifact directory.`);
      }
    }

    console.log('[capture] Done! All screenshots captured and copied.');
  } finally {
    if (browser) await browser.close();
  }
}

capture().catch((err) => {
  console.error('[capture] Error:', err);
  process.exit(1);
});
