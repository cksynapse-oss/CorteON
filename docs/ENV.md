# Environment Variables & Secrets Reference — Synapse

This document outlines all environment variables and secrets required by the Synapse site (`corteon.in`), where they must be configured, and how they are used.

---

## 1. Secrets & Environment Variables

| Variable | Scope | Type | Description | Where to Set |
|---|---|---|---|---|
| `APPS_SCRIPT_URL` | Serverless (`/api/enquire`) | Secret | Web app endpoint for Google Apps Script sheet logger (`https://script.google.com/macros/s/.../exec`) | Cloudflare Pages → Settings → Environment variables |
| `APPS_SCRIPT_TOKEN` | Serverless (`/api/enquire`) & Apps Script | Secret | Shared authentication token verifying requests come directly from the authorized Cloudflare Pages Function | Cloudflare Pages → Settings → Environment variables (Secret) **AND** Google Apps Script → Project Settings → Script Properties |
| `TURNSTILE_SECRET_KEY` | Serverless (`/api/enquire`) | Secret | Cloudflare Turnstile private secret key for token verification | Cloudflare Pages → Settings → Environment variables (Secret) |
| `PUBLIC_TURNSTILE_SITE_KEY` | Frontend & Serverless | Public Var | Cloudflare Turnstile public site key | Cloudflare Pages → Settings → Environment variables |
| `ENVIRONMENT` | Serverless (`/api/enquire`) | Public Var | Deployment environment identifier (`production` or `preview`) | Cloudflare Pages → Settings → Environment variables |

---

## 2. Cloudflare Turnstile Setup

### Production Keys
1. In Cloudflare Dashboard, go to **Turnstile** → **Add Site**.
2. **Site name**: `Synapse corteon.in`
3. **Domain**: `corteon.in` (and `*.corteon.in` / `*.pages.dev`)
4. **Widget Mode**: Managed (or Non-interactive)
5. Copy the generated **Site Key** (`PUBLIC_TURNSTILE_SITE_KEY`) and **Secret Key** (`TURNSTILE_SECRET_KEY`).
6. In Cloudflare Pages project settings, add both variables under **Settings** → **Environment variables**.

### Development & Preview Test Keys
For local development and preview deployments without active domain keys, Cloudflare provides official testing keys:
- **Always Passes Site Key**: `1x00000000000000000000AA`
- **Always Passes Secret Key**: `1x0000000000000000000000000000000AA`
- **Always Fails Site Key**: `2x00000000000000000000AB`
- **Always Fails Secret Key**: `2x0000000000000000000000000000000AA`

In `functions/api/enquire.ts`, if running in dev/preview mode and no secret key is provided, the testing secret key is used as fallback. In production, submissions without valid keys and tokens are rejected and directed to the WhatsApp fallback.

---

## 3. Google Apps Script Webhook Setup

1. Open your Google Sheet ("Synapse Admissions & Enquiries").
2. Navigate to **Extensions** → **Apps Script**.
3. Replace the script contents with `scripts/apps-script/Code.gs`.
4. Configure the shared secret token:
   - Click the gear icon (**Project Settings**).
   - Under **Script Properties**, click **Add script property**.
   - Property: `APPS_SCRIPT_TOKEN`
   - Value: *(A secure random string, e.g. generated via `openssl rand -hex 24`)*
   - Click **Save script properties**.
5. Click **Deploy** → **New deployment**:
   - Select type: **Web app**
   - Description: `Synapse Webhook v2 (Token Verified)`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and grant required Google permissions.
6. Copy the Web app URL and set `APPS_SCRIPT_URL` in Cloudflare Pages.
7. Set the same secret value as `APPS_SCRIPT_TOKEN` in Cloudflare Pages environment variables.

---

## 4. Test Identification Flag (`source: "t18-test"`)

During launch verification or automated health checks:
- Submissions may include `source: "t18-test"`.
- This records `"t18-test"` in the Google Sheet `Source` column and prefixes the notification email subject with `[TEST - T18]`.
- Normal production enquiries default to `source: "web"`.
