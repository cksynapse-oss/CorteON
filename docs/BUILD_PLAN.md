# BUILD_PLAN.md — Synapse website

## 1. Decisions
| Area | Choice | Why |
|---|---|---|
| Framework | Astro (static output) + TypeScript | Content-heavy site, HTML works without JS, tiny JS for the few interactive parts |
| Styling | Tailwind compiled at build (NOT the CDN script) + CSS variables for tokens | Stitch exports load Tailwind from a CDN with config copied into every page. Not shippable |
| Content | Astro content collections (JSON/MDX) validated with Zod | One source of truth, lintable, Hindi later |
| Interactive bits | Vanilla TS or Preact islands, only where needed | Floor switcher, door selector, tutor demo, Lane board filter, Question Board demo |
| Fonts | Self-hosted EB Garamond, Geist, Geist Mono (@fontsource) | No Google Fonts request, faster, private |
| Icons | Inline SVG sprite | Stitch used the Material Symbols font; if it fails, raw words like `arrow_forward` show up in the page |
| Hosting | Cloudflare Pages (free) with Pages Functions | Static + one serverless endpoint. Domain corteon.in |
| Enquiry storage | Google Apps Script web app writing to a Google Sheet + email to the owner | The owner phones every enquiry himself; a Sheet is the simplest CRM. Move to a DB only when needed |
| Spam | Honeypot field + Cloudflare Turnstile + rate limit | |
| Analytics | Umami or Plausible (cookieless) | Children's site; no ad trackers |
| Boundary | Corteon tutor app = separate repo/subdomain (app.corteon.in) later | It will hold accounts and minors' data; keep it out of the marketing site |

## 2. Architecture
```
Browser
  |  static HTML/CSS/JS (Astro build)           Cloudflare Pages
  v
/enquire form --POST--> /api/enquire (Pages Function)
                           |- verify Turnstile + honeypot + rate limit
                           |- validate with Zod
                           v
                        Google Apps Script webhook --> Google Sheet "Enquiries"
                                                   \-> email to owner
Fallback CTA everywhere: WhatsApp click-to-chat (prefilled by door/track) and tel: link
```

## 3. Routes and phases
| Route | Content | Status shown | Phase |
|---|---|---|---|
| `/` | Home | mixed | 1 |
| `/programmes` | Learning Commons: tracks, schedule, how a class runs, entrance baseline, FAQ, tutor demo. No fees | LIVE NOW | 1 |
| `/enquire` | Five-door adaptive form | LIVE NOW | 1 |
| `/fellowship` | Teach while you prepare; apply (one class a day) | LIVE NOW | 1 |
| `/idea` | The problem, the loop, principles, what Synapse is not, what we haven't solved | n/a | 1 |
| `/building` | Three-floor walkthrough with status per floor | G live, 1 next, 2 direction | 1 |
| `/library` | Knowledge Commons + Question Board demo + interest form | OPENING NEXT | 2 |
| `/venture` | Venture Hub + local problem board + interest form | DIRECTION | 2 |
| `/passport` | Passport + Lane board (illustrative) | DIRECTION | 2 |
| `/centres` | Circle/Library/Campus, one district one specialisation, "start a Circle" form | DIRECTION | 2 |
| `/hi/...` | Hindi for Home, Programmes, Enquire | | 3 |
| `/privacy`, `/404` | | | 1 |

Phase 2 pages exist at launch only as honest "planned" pages with an interest form. They test demand, which matches the growth gates: build only what people use.

Nav (all pages identical): The Idea · The Building · Programmes · Fellowship · Centres. Right: `Teach with us` (ghost), `Enquire` (primary). Footer: same links + Passport, Library, Venture, Privacy, contact block.

## 4. Tokens (final)
| Token | Hex | Use | Contrast |
|---|---|---|---|
| paper | #F3EEE4 | main background | |
| ink | #15130F | text, dark sections | 16.0 on paper |
| muted | #5C574B | secondary text on paper (darker than the old #6F6A5E for small text) | 6.2 on paper |
| muted-on-ink | #A29D91 | secondary text on ink | 6.9 on ink |
| hair | #D8D0BF / hair-ink #3A362E | 1px rules | decorative |
| spark | #D9481F | rules, dots, thread, icons, display text >= 24px | 3.7 on paper (large only) |
| spark-ink | #B22C01 | small red text and hover fills on paper | 5.6 on paper |
| spark-glow | #FF6338 | small red text on ink | 6.3 on ink |

Rule: spark = one hue in three tones for contrast. Plain #D9481F fails AA for small text on paper (3.7:1), so never use it for body-size text or for button labels. Primary button: ink fill, paper text; hover: spark-ink fill, paper text.
Type: EB Garamond display (88/52, 64/40, 44, 32 px), Geist body 17-18px/1.6, labels Geist or Geist Mono 12px uppercase tracking .12em. Min text size 12px. Radius 4px; buttons and tags full pill. Grid: 12 col, 1280 max, gutters 40 desktop / 24 tablet / 16 mobile.

## 5. Components
Layout: `Section`, `SectionHeader(number,label,title)`, `Rule`, `Grid`.
UI: `Button`, `TextLink`, `Chip`, `StatusChip(live|next|direction)`, `Card`, `Field`, `Select`, `Checkbox`, `DoorCard`, `Accordion`.
Brand: `NavBar`, `Footer`, `FloorGauge` (scroll-spy), `Thread` (SVG line with nodes, scroll-drawn, static without JS), `Elevation` (building drawing with active-floor prop), `LoopDiagram`, `ThreeWorlds`.
Demos (all labelled ILLUSTRATIVE): `TutorDemo` (hint ladder + confidence slider), `QuestionBoardDemo`, `LaneBoardDemo`, `PassportCard`.
Extract the SVG drawings from `reference/stitch/*/code.html` into `src/assets/illustrations/`, replace hard-coded colours with `currentColor` or tokens.

## 6. Content model (`src/content/`)
`site.json` (name, tagline, contact, address, hours), `programmes.json` (tracks, fee, schedule), `floors.json` (id, name, status, summary, live/planned lists), `principles.json`, `open-problems.json`, `doors.json` (5 doors, form fields each), `fellowship.json`, `faq.json`, `illustrative/*.json` (question board, lane board, passport, tutor problem). Every record has `status` and `source` ("owner-confirmed" or "illustrative"). `content-lint` fails the build when: a value is `TBD` in production, a banned word appears, a number appears that is not in a content file, or an illustrative item lacks its label.

## 7. Enquiry flow
Doors: Parent or student · Graduate who wants to teach · Reader · Founder or builder · District partner.
Common fields: name, phone/WhatsApp, door, message (optional), consent checkbox. Parent/student: class or stage, area of interest (exam track / school subjects / communication and business / projects). Graduate: subject, exam preparing for. Founder: what you build. Partner: district, space available.
- Minimal data, no marketing use. Consent text in plain words ("we use this only to contact you about Synapse"). For under-18 learners the form is addressed to the parent/guardian. India's DPDP Act asks for verifiable parental consent for children's data and limits tracking of children: have this checked against current rules before launch; this is not legal advice.
- Success state: "Thank you. We will call you within {callbackWindow}." (value from `site.json`; production build fails while it is TBD). Also show the WhatsApp fallback.
- Every page also shows tel: and WhatsApp (`https://wa.me/918287248119?text=` prefilled with door/track).
- Test: submit from mobile, confirm the Sheet row and the email, confirm the failure state falls back to WhatsApp.

## 8. Home page structure (7 sections, replaces Stitch's 12)
1 Hero (ink): headline, plain sub-line, "open now" strip (hours, place), CTAs Enquire / See the idea; right column: `building-iso-dark.svg` (inline variant) with the thread drawing on scroll.
2 What is open now: the Chamba classroom: tracks, 5 days/week, schedule, how a class runs, "Fees are shared when you enquire". Enquire CTA. (Stitch's homepage had NO programmes, fees or form: the site's main job was missing.)
3 The idea in one screen: three worlds that don't meet, and the loop Learn, Teach, Build, Show.
4 The building: three floors with status chips and one line each.
5 Fellowship + Tutor side by side; Passport as a one-line "direction" teaser.
6 Principles (8 one-liners) + link to "what we haven't solved".
7 Choose your door + footer.
Moved off the homepage: weekly rhythm (Library page), expansion map (Centres), full Passport card (Passport), long principles text (Idea).

## 9. Motion
Progressive enhancement only: floor gauge scroll-spy, Thread draws on scroll, elevation highlights active floor, hover states. All behind `prefers-reduced-motion: no-preference`. Nothing essential depends on motion.

## 10. SEO and local
Per-page title/description/OG image; JSON-LD `EducationalOrganization` + `LocalBusiness` (address, phone, hours); sitemap; robots; canonical `https://corteon.in/`. Create a Google Business Profile with the same name/address/phone. Chamba parents will mostly find the centre through local search and WhatsApp.

## 11. Quality gates (`npm run check`)
astro check · eslint · prettier · content-lint · build · link-check (linkinator) · axe on every route · Lighthouse CI (Performance, Accessibility, SEO >= 95; mobile). Total JS per page under 60 KB gzip excluding demos. Images AVIF/WebP, lazy-loaded.

## 12. Tasks for Antigravity (one per session; small on purpose)
Each task ends with `npm run check` green and screenshots at 390/768/1440.
- **T0 Repo**: Astro + TS + Tailwind + eslint/prettier, folder layout, the five npm scripts, Cloudflare Pages config. Add `docs/` and `reference/stitch/` from this pack. AC: `npm run build` works, blank home renders.
- **T1 Tokens + fonts + base layout**: tokens from section 4 as CSS variables and Tailwind theme, self-hosted fonts, focus ring, reduced-motion, skip link. AC: contrast table passes, no CDN requests.
- **T2 Primitives**: Button, TextLink, Chip, StatusChip, Card, Field/Select/Checkbox, Section/SectionHeader, Rule. AC: a `/_kit` dev page shows all states.
- **T3 NavBar + Footer + FloorGauge**: identical nav on every page, mobile menu, gauge hidden on mobile or docked thin. AC: keyboard operable, no dead links (unfinished routes link to a "coming soon" stub).
- **T4 Content schemas + content-lint** with the rules in section 6, and `site.json`, `programmes.json`, `floors.json` filled from CONTENT.md. AC: lint fails on a planted `TBD`, a banned word, an invented number.
- **T5 Illustrations**: build `<Building active="g|1|2">` from `assets/illustrations/building-iso-inline.svg` following `docs/ILLUSTRATIONS.md` (active-floor CSS, thread draw-on-scroll, reduced motion). Extract and clean the Loop and Three-worlds SVGs from the Stitch exports. AC: renders correctly in light and dark sections in a real browser, no hard-coded hex, no text added to the drawing.
- **T6 Home** (section 8). AC: fully readable with JS off; one h1; one primary CTA above the fold.
- **T7 Programmes**: tracks, schedule table, "Fees are shared when you enquire", how a class runs (flip-slot, daily practice test, doubt clinic, in plain words), FAQ, TutorDemo. AC: matches CONTENT.md only.
- **T8 Enquire**: door selector + adaptive form + `/api/enquire` + Apps Script + Turnstile. AC: row in the Sheet, email arrives, WhatsApp fallback works, no JS = a plain POST still works.
- **T9 Building**: floor switcher island; no-JS fallback stacks all three floors. AC: status chip per floor; no area/capacity/equipment numbers.
- **T10 Idea**: problem, loop, principles, not-list, open problems (keep these, they are the strongest trust signal). AC: wording from the founder's talk, not Stitch.
- **T11 Fellowship**: deal, ladder, selection, apply form. AC: only terms in CONTENT.md; unresolved terms say "to be agreed".
- **T12 Direction pages** (Library, Venture, Passport, Centres): shared template with a "PLANNED" banner, an illustrative demo, and an interest form. AC: nothing described as existing.
- **T13 SEO**, **T14 Analytics** (events: enquire_start, enquire_submit, whatsapp_click, call_click, door_select), **T15 A11y + performance pass**, **T16 Privacy page + 404**.
- **T17 Hindi** (Home, Programmes, Enquire) with Astro i18n routing and a toggle.
- **T18 Launch**: DNS for corteon.in, redirects, form test on a real phone, Google Business Profile, Search Console.

## 13. Working with Gemini 3.8 Flash in Antigravity
- Put specs in files (this pack), not in chat. Start every session with: "Read AGENTS.md, docs/CONTENT.md, docs/DESIGN.md. Then do task T<n> only. Show a plan first."
- Keep tasks to one page or one component family. Ask it to run `npm run check` and report the output, not "looks good".
- Use the agent's browser/screenshot tooling, if enabled, to verify 390/768/1440 widths.
- Escalate to a stronger model or a human review for: the form backend and Turnstile, i18n routing, the a11y pass, the content-lint rules. Paste diffs or screenshots back to Claude for review any time.
- If it starts inventing content again, point to AGENTS.md rule 1 and re-run `content-lint`.

## 14. Out of scope now
Payments, user accounts, the Corteon app, a real Passport backend, a real Lane board, a CMS. Revisit when enquiries show demand.
