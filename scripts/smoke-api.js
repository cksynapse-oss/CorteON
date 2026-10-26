#!/usr/bin/env node

/**
 * Smoke test for Cloudflare Worker / Pages API routing.
 * Ensures:
 * 1. GET / returns 200 (static asset served)
 * 2. GET /api/health returns 200 { ok: true }
 * 3. POST /api/enquire with empty JSON returns 400 (validation error, never 404/405)
 * 4. POST /api/enquire with empty form body returns 303 (redirect validation error, never 404/405)
 * 5. GET /api/enquire returns 405 (method not allowed)
 */

import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = 8799;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('[smoke-api] Inspecting wrangler.toml...');
  const wranglerToml = readFileSync(resolve('wrangler.toml'), 'utf-8');
  const isPages = wranglerToml.includes('pages_build_output_dir');

  const cmd = 'npx';
  const args = isPages
    ? ['wrangler', 'pages', 'dev', 'dist', '--port', String(PORT)]
    : ['wrangler', 'dev', '--port', String(PORT)];

  console.log(`[smoke-api] Launching: ${cmd} ${args.join(' ')}`);
  const server = spawn(cmd, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    detached: false,
  });

  let serverOutput = '';
  server.stdout?.on('data', (d) => {
    serverOutput += d.toString();
  });
  server.stderr?.on('data', (d) => {
    serverOutput += d.toString();
  });

  const cleanup = () => {
    try {
      server.kill('SIGTERM');
      setTimeout(() => {
        try {
          server.kill('SIGKILL');
        } catch {}
      }, 2000);
    } catch {}
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);

  console.log('[smoke-api] Waiting for dev server to start...');
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/health`, {
        signal: AbortSignal.timeout(1000),
      });
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch {
      // not ready yet
    }
    await sleep(500);
  }

  if (!ready) {
    console.error('[smoke-api] Server failed to start within 30 seconds.');
    console.error('[smoke-api] Output:\n' + serverOutput);
    cleanup();
    process.exit(1);
  }

  console.log('[smoke-api] Server is ready. Running checks...');

  try {
    // 1. GET /
    console.log('[smoke-api] Checking GET / ...');
    const getRoot = await fetch(`${BASE_URL}/`);
    if (getRoot.status !== 200) {
      throw new Error(`GET / returned status ${getRoot.status}, expected 200`);
    }
    console.log('✓ GET / returned 200 OK');

    // 2. GET /api/health
    console.log('[smoke-api] Checking GET /api/health ...');
    const getHealth = await fetch(`${BASE_URL}/api/health`);
    if (getHealth.status !== 200) {
      throw new Error(
        `GET /api/health returned status ${getHealth.status}, expected 200`
      );
    }
    const healthJson = await getHealth.json();
    if (!healthJson.ok) {
      throw new Error(
        `GET /api/health did not return { ok: true }: ${JSON.stringify(
          healthJson
        )}`
      );
    }
    console.log('✓ GET /api/health returned 200 OK with { ok: true }');

    // 3. POST /api/enquire (empty JSON body)
    console.log('[smoke-api] Checking POST /api/enquire (empty JSON)...');
    const postJson = await fetch(`${BASE_URL}/api/enquire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (postJson.status === 404 || postJson.status === 405) {
      throw new Error(
        `POST /api/enquire returned routing error ${postJson.status}`
      );
    }
    if (postJson.status !== 400) {
      throw new Error(
        `POST /api/enquire returned status ${postJson.status}, expected 400 validation error`
      );
    }
    const postJsonBody = await postJson.json();
    if (postJsonBody.ok !== false) {
      throw new Error(
        `POST /api/enquire expected ok: false, received: ${JSON.stringify(
          postJsonBody
        )}`
      );
    }
    console.log(
      '✓ POST /api/enquire returned 400 Bad Request (validation handled)'
    );

    // 4. POST /api/enquire (empty Form body)
    console.log(
      '[smoke-api] Checking POST /api/enquire (empty Form redirect)...'
    );
    const postForm = await fetch(`${BASE_URL}/api/enquire`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: '',
      redirect: 'manual',
    });
    if (postForm.status === 404 || postForm.status === 405) {
      throw new Error(
        `POST /api/enquire form returned routing error ${postForm.status}`
      );
    }
    if (postForm.status !== 303) {
      throw new Error(
        `POST /api/enquire form returned status ${postForm.status}, expected 303 redirect`
      );
    }
    console.log('✓ POST /api/enquire form returned 303 See Other redirect');

    // 5. GET /api/enquire (Method not allowed)
    console.log(
      '[smoke-api] Checking GET /api/enquire (405 Method Not Allowed)...'
    );
    const getEnquire = await fetch(`${BASE_URL}/api/enquire`);
    if (getEnquire.status !== 405) {
      throw new Error(
        `GET /api/enquire returned status ${getEnquire.status}, expected 405`
      );
    }
    console.log('✓ GET /api/enquire returned 405 Method Not Allowed');

    console.log(
      '\n[smoke-api] All API routing smoke tests PASSED successfully!\n'
    );
    cleanup();
    process.exit(0);
  } catch (err) {
    console.error('\n[smoke-api] Smoke test FAILED:\n', err);
    cleanup();
    process.exit(1);
  }
}

main();
