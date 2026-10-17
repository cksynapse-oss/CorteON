# Synapse — academy website

A lightweight, mobile-first static website for Synapse, Chamba. No frameworks, build tool, cookies, paid services or online payments. Admission enquiries are the primary action.

## Files

- `index.html` — home, fees and admission enquiry form
- `programmes.html` — all five programmes
- `engineering-research.html` — PCM details
- `medical-allied-health.html` — PCB details
- `cuet-general-english.html` — CUET General Test and English
- `cuet-arts-commerce-nda.html` — CUET Arts/Commerce and NDA Army wing
- `communication-business.html` — communication and business courses
- `how-we-teach.html` — approach
- `admissions.html` — admission process and FAQ
- `teacher.html` — teacher placeholder
- `contact.html` — contact and map placeholder
- `privacy.html` — plain-language privacy notice
- `thank-you.html` — post-enquiry page
- `assets/style.css` — shared styling, responsive layout, light/dark themes
- `assets/strings.js` — **all site interface copy in `en`**, empty `hi` dictionary
- `assets/site.js` — shared header, footer, pages, form validation and submission
- `google-apps-script/Code.gs` — Google Sheets receiver
- `sitemap.xml`, `robots.txt` — SEO discovery
- `build_pages.py` — optional HTML metadata shell generator; **not needed to deploy**

## Preview locally

Serve from the project directory instead of opening `file://` URLs:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080. The pages are already generated: `build_pages.py` is not required.

## Connect Google Sheets

1. Create a Google spreadsheet with access limited to staff handling enquiries. Copy its **spreadsheet ID** from the URL.
2. Visit **Extensions → Apps Script** from that spreadsheet. Paste the contents of `google-apps-script/Code.gs`.
3. Set `SHEET_ID = '...'` to your spreadsheet ID, then save. The script creates an `Enquiries` tab and headers if necessary. Each new entry has a timestamp and `Status` of `New`.
4. Choose **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone** so the public admission page can reach it. Authorize the permissions. Copy the URL ending in `/exec` (**not** the `/dev` URL).
5. In `assets/site.js`, set `const FORM_ENDPOINT = 'https://script.google.com/macros/s/.../exec';`. Deploy the site. Submit a test enquiry and confirm that the spreadsheet contains the correct row. Edit an existing deployment / create a new version when updating the script.
6. Test on an Android browser as well as desktop, especially the WhatsApp fallback.

### Important: Apps Script cross-origin limitation

Google Apps Script web app URLs do **not** reliably offer browser CORS-readable POST responses. This implementation sends JSON in a `text/plain` body to keep the request simple and uses `mode: 'no-cors'` **only for a Google Apps Script `/exec` endpoint**. JavaScript therefore cannot inspect the response body, HTTP status or verify the spreadsheet write. The browser's successful `fetch` resolution is treated as *dispatched*, and the visitor goes to `thank-you.html`. A script exception or permissions problem may still prevent storage without the browser knowing. Check the spreadsheet and Apps Script execution logs during launch and regularly afterward. For **verified submission success/failure in production**, put a same-origin serverless proxy (Vercel/Netlify/Cloudflare Function) in front of a controlled backend that returns CORS-accessible JSON, then set `FORM_ENDPOINT` to that proxy instead; `site.js` already checks the HTTP status for non-Google endpoints. A future proxy can also rate-limit and authenticate submissions.

When `FORM_ENDPOINT` is empty or `fetch` rejects/times out, the form opens WhatsApp with all entered details. **The visitor must press Send in WhatsApp.** If a network connection drops after an Apps Script write, submitting over WhatsApp could create a duplicate; review incoming entries when following up. The honeypot is basic bot mitigation, not a substitute for server-side spam protection. The Google sheet stores personal contact information: limit sharing and establish a retention/deletion process. Do not make the Sheet public.

## Deploy

**Vercel:** Import the repository. Select **Other** framework, no build command, and project root as the output directory (or deploy this directory directly). Add `corteon.in` in project domain settings.

**Netlify:** Deploy the folder or connect a repository. Leave build command empty; publish directory is `.`. Connect `corteon.in`.

**Cloudflare Pages:** Use Direct Upload or a Git repository, no framework preset/build command, output directory `.`. Connect `corteon.in`.

Publish the **contents of this directory**, preserving the filenames and `assets/` subfolder. HTTPS is needed for the hosted form. After domain setup, submit `https://corteon.in/sitemap.xml` to search engines. Canonicals currently assume the site lives at the root of `corteon.in`; if you host elsewhere, update `build_pages.py`, rerun it, and edit `sitemap.xml` and `robots.txt`.

## Editing content and adding Hindi

All visible copy on JS-rendered pages is centralized in `assets/strings.js` under `en`. Do not hardcode new public copy in templates. Add fully translated matching keys to `hi`, then add an explicit language toggle that updates `<html lang>` and rerenders/rebinds navigation/forms in `site.js`. Do not offer an incomplete Hindi mode. SEO metadata, JSON-LD, `noscript` fallback and official URL references are in the HTML shells / page generator and require separately localized metadata if Hindi SEO pages are created.

The site uses **Noto Sans / system sans for body text and a system serif (Iowan Old Style, Palatino, Georgia) for headings**, without remote font downloads. This avoids a large Devanagari font payload until Hindi is enabled. Images are not loaded, only labelled placeholders. Colour: each programme track has its own colour (set via `data-t` in `assets/style.css`); the hero ridge and network graphics are inline SVG generated in `site.js`.

## [confirm] / [replace] before launch

- **[confirm]** Fees are paid at the centre. This was specified but not independently confirmed. It appears in the home fees note and in the FAQ; a `[confirm]` comment is included in `assets/strings.js` below. No payment collection exists on the website.
- **[replace]** `FORM_ENDPOINT` in `assets/site.js`, after the Apps Script deployment. Until then the enquiry submits via WhatsApp.
- **[replace]** `SHEET_ID` in `google-apps-script/Code.gs`.
- **[replace]** Teacher introduction and teaching note in `assets/strings.js` (`teacher.bio` and `teacher.method`).
- **[replace]** The labelled teacher/classroom image slots with genuine photographs, optimized for mobile, and meaningful alt text.
- **[replace]** Map placeholder with a verified location embed. Delay loading the iframe (`loading="lazy"`) for performance. Avoid guessing coordinates.
- **[replace]** Populate Hindi translation keys in `assets/strings.js` before adding a language switch.
- **[confirm]** Domain `corteon.in` points to the deployed Synapse website before indexing.

## Assumptions

- Each programme uses the same stated class hours; each student attends five days a week. No timetable by subject or other internal arrangements are published.
- A single form on the home page handles all programmes; links from the other pages return to it.
- A `Graduate` may enquire about any programme without a website-level eligibility promise.
- All official examination portals are external links for current exam-specific rules and details, not guarantees of eligibility or exam dates.
- The privacy wording explains intended use, not a legal certification of DPDP Act compliance; have the data-handling approach reviewed before collecting minors' details at scale.
