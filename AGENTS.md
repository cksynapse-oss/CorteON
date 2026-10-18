# AGENTS.md — Synapse website (corteon.in)

Read this first, every session. Then read `docs/CONTENT.md` (facts), `docs/DESIGN.md` (tokens), `docs/BUILD_PLAN.md` (tasks).

## What this site is
Marketing + admissions site for Synapse: a modern gurukul (learn, teach, build, show) whose only live part today is one classroom in Chamba, Himachal Pradesh. Main job: a parent/student/graduate understands the offer in under a minute and sends an enquiry. Second job: explain the larger idea honestly. No payments at launch. The Corteon AI tutor app is a SEPARATE product and is not built here.

## Source-of-truth order
1. `docs/CONTENT.md` (facts, copy, status of every feature) wins over everything.
2. `docs/DESIGN.md` (tokens, components).
3. Stitch exports in `reference/stitch/*` are VISUAL REFERENCE ONLY. Never copy their HTML or copy. Never trust their numbers.

## Hard rules (a violation = the task is not done)
1. NEVER invent facts: no numbers, areas, capacities, prices, stipends, dates, names of people or companies, addresses, emails, testimonials, results, percentiles, partner logos, versions ("v2.4"), document names ("Charter v0.4"). If a fact is missing from CONTENT.md, render `TBD` in dev and fail `npm run content-lint` in production builds. Ask the owner; do not guess.
2. Every floor, feature and programme carries a status chip: `LIVE NOW`, `OPENING NEXT`, or `DIRECTION`. Only what CONTENT.md marks LIVE may be described in present tense. Others use "planned", "we intend", "when ... ".
3. Illustrative data (sample Passport, Question Board, Lane board, tutor demo, week rhythm) must be visibly labelled `ILLUSTRATIVE` and use obviously fictional entries.
4. No rank, percentile, selection-rate or outcome promises. No "guaranteed".
5. No crypto/blockchain/"immutable"/hash language. The Passport is a direction, described plainly.
6. The enquiry form states a callback window, and ONLY the value in `site.json` (`callbackWindow`) from CONTENT.md. Never invent or round it. No other time promises anywhere.
6b. Fees: never show, estimate or hint at any amount. Use "Fees are shared when you enquire."
7. All copy lives in `src/content/**` (typed, Zod-validated). No hard-coded copy inside components.
8. Content must be fully readable with JavaScript disabled. JS only enhances (floor switcher, form validation, demos). The previous site failed this; do not repeat it.
9. Design tokens only. Three colours: Paper, Ink, Spark (one hue, three tones for contrast, see DESIGN.md). No other hues, no gradients, no box-shadows, no glassmorphism. Radius 4px; buttons are pills.
9b. Visuals: line art only. No photos, no stock images, no AI-generated images. The building illustration is the provided SVG in `assets/illustrations/` (see `docs/ILLUSTRATIONS.md`); do not redraw or add text or numbers to it. Other diagrams: extract the line SVGs from the Stitch exports and clean them.
10. Accessibility: body text >= 16px, UI labels >= 12px (never 10-11px), WCAG AA contrast, visible focus rings (Spark), keyboard operable, `prefers-reduced-motion` respected, one `<h1>` per page, landmarks, alt text, form labels.
11. No third-party trackers, no ad pixels, no chat widgets. Children's data: minimal collection (see BUILD_PLAN section 7).
12. No new dependency without a one-line justification in the PR/commit message.

## Vocabulary
Use: centre, floor, class, group/pod, guide, fellow, learner, student, library card, desk, Question Board, Passport, Lane board, Circle/Library/Campus, district, enquire, visit.
Never use: sanctuary, covenant, folio, plate no., datum, dispatch, transmission, protocol (except the tutor's design rules), portal, bench/field station (as a centre), cell, codex/codices, axiomatic, epistemic, substrate, immutable, cryptographic, scholar(s) (say learners/students), warden, manifesto, mandate, charter (unless the document exists).
Tone: plain, specific, honest. Short sentences. Explain a term the first time. A parent in Chamba must follow every sentence above the fold.

## Workflow
- One task from `docs/BUILD_PLAN.md` at a time. Plan first (list files you will touch), then implement.
- Small commits. Message format: `T<id>: <what>`.
- Before saying "done" run `npm run check` and paste its result. Check pages at 390, 768 and 1440 px and attach screenshots if you have the browser tool.
- If a requirement conflicts with CONTENT.md or this file, stop and ask instead of improvising.
- Do not refactor unrelated files. Do not delete content files.

## Commands
`npm run dev` · `npm run build` · `npm run check` (astro check, eslint, prettier, content-lint, build, link-check, axe, lighthouse-ci) · `npm run content-lint`
