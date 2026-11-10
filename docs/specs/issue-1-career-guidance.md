# Feature: Free In-Person Career Guidance & Counselling Spotlight on Homepage

## 1. Problem & Context
Students in Chamba (school students choosing streams, college students navigating degrees, and passed-out graduates looking for employment or exam preparation) face a major information deficit regarding competitive pathways, emerging digital careers (such as applied AI and modern business development), and structured next steps. 

Synapse is offering 100% Free 1-on-1 Career Guidance and Counselling Sessions at the Chamba offline centre for all school students, college students, and passed-out graduates. 

Currently, the homepage only features fee-based academic and practical courses. There is no visible entry point for students or parents to visit the centre simply for free guidance, mentorship, or career clarification.

## 2. Objective & Proposed Solution
Add a high-visibility, conversion-optimised Spotlight Banner/Card directly below the Hero section on the homepage (`src/pages/index.astro`):
1. **Clear Positioning**: Clearly communicate that 1-on-1 in-person career guidance and counselling sessions at the Chamba centre are 100% Free for all students (School, College, and Graduates).
2. **Key Guidance Areas**:
   - Stream & Subject Selection (Class 9–12)
   - Competitive Exam Roadmaps (JEE, NEET, CUET PG, NET)
   - Degree, Career, and Job Pathways (Higher education, applied AI literacy, practical business skills)
3. **Frictionless 1-Tap CTAs**:
   - Primary: "Book Free Session on WhatsApp" with pre-filled message:
     `https://wa.me/91<site.phone>?text=Hi%20Synapse%2C%20I%20would%20like%20to%20book%20a%20free%20career%20guidance%20and%20counselling%20session%20in%20Chamba.`
   - Secondary: "Call Centre" (`tel:+91<site.phone>`)
4. **Offline Centre Details**:
   - Behind the Post Office, Chamba · Mon–Sat, 3:30 PM – 6:30 PM · No fees, no obligations.

## 3. Explicitly Out of Scope
- Automated calendar/booking web apps (e.g. Calendly) — booking is handled directly via WhatsApp/call with the centre guide.
- Dedicated standalone `/counselling` page for now (keep surface lean; can be expanded in a future release if needed).
- Online or video-call counselling promises (offline in-person centre sessions in Chamba).
- Any hidden fees, paid tiers, or upsell language.

## 4. Technical Implementation & Files Touched
- `src/pages/index.astro`:
  - Insert the Career Guidance Spotlight component/section between Hero (Section 1) and Connected Model (Section 2).
  - Use semantic HTML (`<section>`, `<h2>`, `<p>`, `<a>`) with accessible ARIA labels.
  - Implement full responsive design (stacked single column on mobile `<640px`, horizontal split or high-impact banner on desktop `≥1024px`).
  - Follow strict token discipline (`bg-paper`, `text-ink`, `border-hair`, `bg-spark/10`, `text-spark-ink`, `rounded-pill`).
- `public/_redirects`:
  - Add optional convenience alias `/counselling /#career-guidance 302` and `/guidance /#career-guidance 302` for marketing outreach.

## 5. Acceptance Criteria
- [ ] Spotlight banner renders cleanly between Hero and Connected Model on `https://corteon.in/`.
- [ ] Explicitly highlights "100% Free for School, College & Graduate Students".
- [ ] WhatsApp CTA button opens WhatsApp with the exact pre-filled text.
- [ ] Call button initiates phone call to centre phone.
- [ ] Zero WCAG AA contrast violations (tested via `npm run test:contrast`).
- [ ] Typography complies with `AGENTS.md` (body text ≥16px, UI labels ≥12px).
- [ ] Clean build and passes all gates: `npm run check` (0 errors in `astro check`, `eslint`, `prettier`, `content-lint`, `build`, `link-check`).
