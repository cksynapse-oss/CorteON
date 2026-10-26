# Deployment Guide — Synapse (`corteon.in`)

This document defines the deployment configuration, runtime architecture, environment variables, and verification checks for `corteon.in`.

---

## 1. Architecture: Cloudflare Worker with Static Assets

The production deployment runs as a **Cloudflare Worker with Static Assets** attached to the `corteon` project.

- **Worker Entry Point**: `worker/index.ts`
- **Static Assets Directory**: `./dist` (built via `npm run build`)
- **Asset Binding**: `ASSETS`
- **Worker Routing Rule**: `run_worker_first = ["/api/*"]`
  - Routes `GET /api/health` to the health check probe.
  - Routes `POST /api/enquire` to the shared admissions/enquiry handler (`src/lib/enquiry.ts`).
  - Returns `405 Method Not Allowed` for non-matching methods on `/api/*`.
  - All non-API requests fall through to `env.ASSETS.fetch(request)` to serve pre-rendered Astro pages, styles, scripts, and static media with exact HTTP headers.

---

## 2. Configuration Files

### `wrangler.toml`
```toml
name = "corteon"
main = "worker/index.ts"
compatibility_date = "2026-10-22"

[assets]
directory = "./dist"
binding = "ASSETS"
run_worker_first = ["/api/*"]
```

---

## 3. Environment Variables & Secrets: Where Each Lives

There are 5 environment variables used across the build pipeline and serverless runtime. **Never commit secrets to `wrangler.toml` or git.**

| Variable | Scope | Storage Location in Cloudflare Dashboard | Purpose |
|---|---|---|---|
| `TURNSTILE_SECRET_KEY` | Runtime (Worker) | **Cloudflare Dashboard &rarr; Workers & Pages &rarr; corteon &rarr; Settings &rarr; Variables and Secrets &rarr; Secrets** (Encrypt) | Secret key to verify Turnstile anti-spam challenge with Cloudflare API. |
| `APPS_SCRIPT_TOKEN` | Runtime (Worker) | **Cloudflare Dashboard &rarr; Workers & Pages &rarr; corteon &rarr; Settings &rarr; Variables and Secrets &rarr; Secrets** (Encrypt) | Shared bearer token authenticating the webhook call to Google Apps Script. |
| `APPS_SCRIPT_URL` | Runtime (Worker) | **Cloudflare Dashboard &rarr; Workers & Pages &rarr; corteon &rarr; Settings &rarr; Variables and Secrets &rarr; Variables** (or Secrets) | Webhook URL (`https://script.google.com/macros/s/.../exec`) logging enquiries to Google Sheet. |
| `ENVIRONMENT` | Runtime (Worker) | **Cloudflare Dashboard &rarr; Workers & Pages &rarr; corteon &rarr; Settings &rarr; Variables and Secrets &rarr; Variables** | Set to `production`. Enables strict anti-spam and domain checks. |
| `PUBLIC_TURNSTILE_SITE_KEY` | Build-time (Astro) & Runtime | **CI/CD Build Environment Variable** (and Worker Variables) | Public site key injected into HTML by Astro during `npm run build` for Turnstile challenge widget. |

---

## 4. Build & Deploy Commands

### Production Build
```bash
npm run build
```
This runs:
1. Content validation lint (`node scripts/content-lint.js --prod`).
2. Astro static build (`astro build`) generating the static site in `./dist`.
3. Dev route cleanup (`node scripts/clean-dev-routes.js`).

### Deploy to Cloudflare Workers
```bash
npx wrangler deploy
```
*(Uploads `./dist` static assets and deploys `worker/index.ts` with bindings.)*

---

## 5. Post-Deploy Verification Checks

Always execute these three post-deploy curl checks immediately after deploying:

### Check 1: Health Probe
```bash
curl -i https://corteon.in/api/health
```
- **Expected Status**: `HTTP/2 200`
- **Expected Body**: `{"ok":true}`

### Check 2: API Routing & Validation (Must never return 404 or 405)
```bash
curl -i -X POST https://corteon.in/api/enquire -d 'name=test'
```
- **Expected Status**: `HTTP/2 400` (JSON validation error) or `HTTP/2 303` (redirect validation error).
- **Failure Condition**: Any `404 Not Found` or `405 Method Not Allowed` indicates the Worker routing is misconfigured.

### Check 3: Static Asset Delivery
```bash
curl -i https://corteon.in/
```
- **Expected Status**: `HTTP/2 200`
- **Expected Content-Type**: `text/html; charset=utf-8`

---

## 6. Cloudflare Pages Reference (Alternative / Fallback)

If the project is ever migrated to Cloudflare Pages:
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`
- **Functions directory**: `functions/` (Cloudflare Pages automatically discovers `functions/api/enquire.ts` and `functions/api/health.ts`).
- **Deploy command**: `npx wrangler pages deploy dist --project-name=corteon`
