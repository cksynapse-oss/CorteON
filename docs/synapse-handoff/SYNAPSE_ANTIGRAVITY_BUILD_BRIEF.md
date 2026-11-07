# SYNAPSE — WEBSITE BUILD BRIEF & COMPLETE WEBSITE CONTENT

**Implementation source of truth for Antigravity**  
**Prepared:** 6 November 2026  
**Business:** Synapse — Centre for Learning & Innovation  
**Location:** Chamba, Himachal Pradesh, India  
**Primary outcome:** Help a visitor understand the actual courses, see the price and enquire through a Google Form.

---

## 0. READ THIS FIRST — IMPLEMENTATION INSTRUCTIONS FOR ANTIGRAVITY

This document is the working source of truth for the Synapse website update. Read the full document before changing the repository.

### What to build

Update the existing Synapse website into a practical course and programme catalogue. The site must explain what is taught, who each offer is for, how long it runs, what it costs and what happens after someone enquires. This is not a concept, manifesto, vision or fundraising website.

### Required behaviour

1. Inspect the existing repository, framework, routes, styling system and current content before editing. Preserve the working framework and established project conventions. Do not rebuild the project from scratch unless the existing implementation is unusable.
2. Implement the site, not just a plan or mock-up.
3. Use the copy in this document as the basis for the live pages. You may shorten repeated copy for responsive layouts, but do not change prices, durations, eligibility, delivery mode or programme promises.
4. Keep all course and bundle prices in one central content/configuration file (for example `src/content/courses.ts` or `src/content/courses.json`). Never scatter prices through components.
5. Every course enquiry CTA must open the relevant Google Form. Do not create a checkout or payment flow. There are no website payments at launch.
6. Use the form URL configuration described in Section 13. Do not leave dead `#` links, `javascript:void(0)`, placeholder buttons or non-functional enquiry controls. If the final Google Form URLs have not yet been supplied, create one clearly named central configuration object and make the missing values obvious in the README; do not invent URLs.
7. Use real stock photography from Unsplash for generic learning/business contexts, and authentic Synapse/Chamba photographs for the local ventures wherever possible. Do not use a generic stock image and caption it as a real Chamba Rumal artisan, Chamba property, Synapse classroom or Chamba farm. Image sourcing instructions are in Section 12.
8. The site must work well on inexpensive Android phones, narrow screens and slow connections. Optimise and locally store images; do not make the site depend on large autoplay videos or heavy animation.
9. Keep the tone warm, direct and useful. Do not add grand claims, futuristic language, inspirational filler, fake testimonials, rankings, success rates, placement statistics or institutional affiliations that are not supplied here.
10. Keep the existing Synapse name and identity: **Synapse — Centre for Learning & Innovation**. Do not rename it or describe it as a “modern gurukul”.
11. No payment gateway, cart, login, student dashboard or live adaptive engine is part of this website launch. The Question Bank is described as a programme offer; its actual digital product integration is outside this content-only website scope.
12. Test every route, CTA, external form link, mobile breakpoint, image and FAQ interaction before declaring the work complete.

### Build checklist

- [ ] Home page with practical course overview and clear enquiry path.
- [ ] Courses page with audience filters or clearly separated audience sections.
- [ ] A full detail page or accessible detail section for each of the seven offers.
- [ ] Chamba Ventures page explaining the four internship project areas and their status accurately.
- [ ] Schools & Colleges page with institutional enquiry CTA.
- [ ] Business Development / Internship page with the six-month structure.
- [ ] FAQ page or section.
- [ ] Contact details and office location.
- [ ] One central pricing/content configuration file.
- [ ] All enquiry buttons connected to the correct Google Form URLs.
- [ ] Local optimised stock image assets and image credits/source list.
- [ ] Page titles, descriptions, social preview metadata, alt text and basic local SEO.
- [ ] No broken links, empty states, fake claims or unapproved pricing bundles.

---

## 1. BRAND, POSITIONING AND OPERATING FACTS

### Brand name

**Synapse — Centre for Learning & Innovation**

### What Synapse offers

Synapse provides structured learning programmes for:

- School students, especially Classes 8–12.
- Students preparing for entrance and competitive examinations.
- College students looking for communication, applied AI and business-development skills.
- Schools and colleges seeking workshops, baseline assessments, information sessions and group enrolment.

### Operating facts to show clearly

- **Teaching format:** Online classes.
- **Local base:** Synapse office behind the Post Office, Chamba, Himachal Pradesh.
- **School-level batches:** Planned after 3:00 PM.
- **College-level batches:** Planned before 3:00 PM.
- **Exact batch times:** Shared after enquiry; do not invent fixed slots.
- **Trial:** One or two trial classes are offered before the student decides and pays.
- **Website payments:** Not available at launch. Every CTA is an enquiry, not a checkout.
- **Progress:** Course-specific tests, practice, review and progress checks are described on the relevant course page; do not promise a dashboard or monthly report to every course unless it is actually being delivered.

### Primary website message

Synapse offers clearly structured courses with transparent fees: competitive-exam foundations, exam-specific practice, Class 11–12 subject classes, English-Hindi communication, applied AI literacy and a six-month business-development programme with an internship on Chamba ventures.

### Avoid

Do not use “revolutionary”, “future-ready generation”, “unlock your potential”, “transformative ecosystem”, “guaranteed selection”, “100% placement”, “AI-powered adaptive platform” or similarly inflated phrases. Explain the actual course and what a learner will do.

---

## 2. PRICING AND PRODUCT MATRIX

Use this table as the initial live price source. All prices are in Indian rupees.

| Offer | What is included | Duration | Price | Billing |
|---|---|---:|---:|---|
| Foundation Pack | General Awareness + Logical Reasoning + Quantitative Aptitude | 12 weeks | ₹599 | Monthly |
| Exam Question Bank & Performance Profile | One selected exam pack; practice and performance review | 6 months access | ₹499 | One-time |
| Class 11–12 Subject Classes | Physics, Chemistry, Biology or Mathematics; choose subjects | Academic session / ongoing by batch | ₹599 per subject | Monthly |
| Communication: English + Hindi | Speaking, listening, reading, writing and confidence | 10 weeks | ₹599 | Monthly |
| Business Development + Internship | 3 months learning + 3 months venture internship | 6 months | ₹899 | Monthly, for all 6 months |
| Applied AI Literacy | Understand, use, apply and use AI responsibly | 12 weeks | ₹899 | Monthly |
| AI Literacy + Business Development | Both tracks together; AI is a 12-week course and Business Development runs 6 months | See programme durations | ₹1,499 | Monthly while enrolled in the combined programme |

### Price-display rules

- The Foundation Pack is one combined offer at ₹599/month. It includes all three foundation subjects; do not price the three components separately on the website unless the owner explicitly changes this decision.
- The Question Bank is ₹499 once for six months of access. Do not show it as ₹499/month.
- Subject Classes are ₹599 per subject per month. Make “per subject” impossible to miss.
- Business Development is ₹899/month for all six months. The full six-month fee at the stated monthly rate is ₹5,394. Do not imply that the three-month learning phase is the full programme.
- AI Literacy is ₹899/month for a 12-week programme.
- The combined AI + Business Development option is ₹1,499/month. It saves ₹299/month against the two separate monthly fees (₹899 + ₹899 = ₹1,798) while both are being taken together. Do not claim that the AI course itself lasts six months; its structured curriculum is 12 weeks.
- A Foundation + Communication bundle at ₹999/month appeared as a proposal in the reference catalogue. It is **not approved for launch**. Do not publish it or build a discounted price card unless Synapse confirms it.
- Group pricing for institutions is not finalised. Use “Ask about group enrolment” rather than displaying a discount.

---

## 3. SITE MAP AND NAVIGATION

Recommended top navigation:

1. Home
2. Courses
3. Chamba Ventures
4. For Schools & Colleges
5. About / Contact
6. **Enquire** (primary CTA)

Recommended routes:

- `/` — Home
- `/courses` — All courses and programme cards
- `/courses/foundation-pack`
- `/courses/question-bank`
- `/courses/subject-classes`
- `/courses/communication`
- `/courses/business-development`
- `/courses/ai-literacy`
- `/courses/ai-business-combo`
- `/ventures` — Chamba ventures
- `/schools-colleges` — Institutional enquiries
- `/faq`
- `/contact`

If the existing website has a different route structure, preserve it where practical. Equivalent sections/anchors are acceptable, provided every page is reachable and easy to navigate.

---

## 4. HOME PAGE — FINAL WEBSITE COPY

### Hero

**Eyebrow:** SYNAPSE · CHAMBA, HIMACHAL PRADESH

# Prepare for exams. Build skills. Do real work.

Online courses for school students, competitive-exam aspirants and college students. Choose structured exam modules, Class 11–12 subject classes, English-Hindi communication, applied AI or a business-development programme with a real internship.

**Primary CTA:** Explore courses  
**Secondary CTA:** Enquire now

Small supporting line: **Courses from ₹599 · Online classes · One or two trial classes before enrolment**

### A course for what you need next

#### For school students
Build communication skills and strengthen subject knowledge. Class 11–12 students can choose Physics, Chemistry, Biology or Mathematics for board and entrance preparation. The Foundation Pack is also available for students building competitive-exam fundamentals.

**CTA:** Explore school courses

#### For entrance-exam aspirants
Build your foundation in General Awareness, Reasoning and Quantitative Aptitude. Add an exam-specific Question Bank to practise by topic, track accuracy and speed, and identify what to work on next.

**CTA:** Explore exam preparation

#### For college students
Work on communication, practical AI use and business development. The six-month Business Development programme combines structured learning with an internship on a Chamba-based venture.

**CTA:** Explore college programmes

### Courses at a glance

Show the seven product cards from Section 5, with prices and durations visible. Each card must have an Enquire button linked to its prefilled Course Enquiry form URL.

### How enrolment works

**1. Enquire**  
Choose a course and submit the short enquiry form. A Synapse team member will contact you.

**2. Attend a trial class**  
Join one or two trial classes so you can understand the teaching format and decide whether the course is right for you.

**3. Confirm your batch**  
We will share the available batch timing, course details and fee information before you enrol.

**4. Start learning**  
Join your online batch and follow the course plan. Tests, practice and progress reviews depend on the programme you choose.

### Learning format

All classes are online. College-level batches are generally planned before 3:00 PM, while school-level batches are planned after 3:00 PM. Exact timings are shared during the enquiry process. The Synapse office is behind the Post Office in Chamba.

### Institutional section

## Bring a Synapse session to your school or college

We work with schools and colleges on introductory sessions, communication workshops, AI awareness, entrance-baseline assessments and information sessions for the Business Development programme. Institutions can also enquire about group enrolment.

**CTA:** Enquire for your institution

### Closing CTA

## Not sure which course is right for you?

Tell us your class or college year, the exam you are preparing for, or the skill you want to work on. We will help you identify the relevant course and the next available batch.

**CTA:** Ask Synapse

---

## 5. COURSE CARDS — COPY-READY WEBSITE CONTENT

Use concise cards on `/courses`. Each card should show: course title, one-sentence value proposition, audience, duration, price/billing, 3–4 deliverables and Enquire CTA. The detail page contains the full curriculum.

### Card 1 — Foundation Pack

**General Awareness · Logical Reasoning · Quantitative Aptitude**

Build the core knowledge and problem-solving skills used across many entrance and competitive examinations.

- **For:** Competitive-exam aspirants; suitable foundation for learners from school level onward.
- **Duration:** 12 weeks.
- **Price:** ₹599/month.
- **Includes:** 28 structured units across three subjects, practice sets, weekly tests, current-affairs digest and progress reviews.

**CTA:** Enquire about the Foundation Pack

### Card 2 — Exam Question Bank & Performance Profile

**Practise for your exam. See what needs work.**

Practise topic-wise, chapter-wise, mixed and timed questions. Review accuracy, speed and weak areas so your next practice session has a clear focus.

- **For:** Exam aspirants; choose the exam pack relevant to your preparation.
- **Access:** 6 months.
- **Price:** ₹499 one-time.
- **Includes:** Exam-pattern practice, hints, performance profile, weekly focus list and revision reminders.

**CTA:** Enquire about the Question Bank

*Small note on card/detail page:* Ask us to confirm availability for your exact exam before enrolling.

### Card 3 — Class 11–12 Subject Classes

**Physics · Chemistry · Biology · Mathematics**

Strengthen concepts through NCERT-based teaching, chapter practice, tests and doubt-clearing for board and entrance preparation.

- **For:** Class 11–12 students.
- **Subjects:** Choose one or more subjects.
- **Price:** ₹599 per subject/month.
- **Includes:** Live online classes, chapter tests, weekly tests, doubt sessions and an error log.
- **Exam tracks:** CUET, NEET and JEE, with the appropriate subject and depth for each.

**CTA:** Enquire about Subject Classes

### Card 4 — Communication: English + Hindi

**Speak with confidence. Write clearly. Explain your idea.**

Practise English and Hindi through real speaking, listening, reading and writing activities—not grammar exercises alone.

- **For:** School students (Classes 8–12) and college students.
- **Duration:** 10 weeks.
- **Price:** ₹599/month.
- **Includes:** Fluency practice, vocabulary, writing, public speaking, group discussion, interview basics and a final presentation.
- **Tracks:** Separate school and college groups; placement by a short speaking/writing check.

**CTA:** Enquire about Communication

### Card 5 — Business Development + Internship

**Three months learning. Three months working on a real Chamba venture.**

Learn how to research a market, develop a product, position it, reach customers and run day-to-day business operations. Then apply the work during a three-month internship on one of Synapse’s Chamba venture projects.

- **For:** Students enrolled in a bachelor’s programme; any stream.
- **Duration:** 6 months: 3 months learning + 3 months internship.
- **Price:** ₹899/month for all 6 months.
- **Includes:** 10 learning modules, a mentored venture internship, a six-month Synapse Learning & Internship Certificate on completion, weekly reviews and a portfolio of work.
- **Possible continuation:** Selected participants may be considered for further work or roles. This is not guaranteed.

**CTA:** Enquire about Business Development

### Card 6 — Applied AI Literacy

**Understand AI. Use it well. Apply it to real work.**

Learn what current AI tools can and cannot do, how to use them effectively, and how to apply them to research, learning and practical work. No coding experience is required.

- **For:** Designed primarily for college students; school students are welcome.
- **Duration:** 12 weeks.
- **Price:** ₹899/month.
- **Includes:** AI foundations, prompting, research and verification, data/spreadsheets, multimodal tools, workflows, responsible use and a practical capstone.

**CTA:** Enquire about AI Literacy

### Card 7 — AI Literacy + Business Development

**Learn to use AI and build a business.**

Take both programmes together: Applied AI Literacy and the six-month Business Development + Internship programme.

- **For:** College students.
- **Price:** ₹1,499/month while enrolled in the combined programme.
- **Separate monthly fees:** ₹899 + ₹899 = ₹1,798.
- **Saving:** ₹299/month against the separate monthly prices.
- **Duration:** AI Literacy curriculum is 12 weeks; Business Development runs for 6 months.

**CTA:** Enquire about the combined programme

---

## 6. FULL COURSE DETAILS AND STRUCTURED CURRICULA

### 6.1 Foundation Pack — 12 weeks

**Price:** ₹599/month  
**Includes:** General Awareness, Logical Reasoning and Quantitative Aptitude  
**Delivery:** Online  
**Suggested learning rhythm:** Concept lesson → guided examples → practice set → weekly test → review of mistakes. Current affairs are revised weekly. The 28 units below are distributed across the 12-week programme; the teacher may combine or revisit units according to batch pace.

#### A. General Awareness — 10 units

1. **Indian History:** Ancient, medieval and modern India; the freedom movement; major people, events and institutions.
2. **Polity and Constitution:** Constitutional framework, Preamble, Fundamental Rights and Duties, Parliament, executive, judiciary, local government and major constitutional provisions.
3. **Geography:** Physical geography, India and world geography, rivers, climate, soils, agriculture, resources and map-based knowledge.
4. **Indian Economy:** Basic economic terms, national income, inflation, banking, RBI, budget concepts, taxation basics and major public programmes.
5. **General Science:** Everyday applications and essential school-level concepts from Physics, Chemistry and Biology.
6. **Environment and Ecology:** Ecosystems, biodiversity, conservation, climate, pollution and environmental institutions.
7. **Static General Knowledge:** Awards, books and authors, important days, organisations, sports, defence and major institutions.
8. **Art, Culture and Regional Knowledge:** Indian culture, heritage, festivals, architecture, Himachal Pradesh and Chamba-focused general knowledge.
9. **Current Affairs:** Weekly national and international updates, government initiatives, awards, sports, science and technology, and Himachal-related news.
10. **Revision and Mixed Tests:** Topic revision, fact recall, mixed question sets and test strategy.

#### B. Logical and Analytical Reasoning — 8 units

1. **Series:** Number, letter and mixed series; identifying patterns and missing terms.
2. **Coding-Decoding, Analogy and Classification:** Word and number coding, relationship-based analogy and odd-one-out questions.
3. **Relations, Direction and Ranking:** Blood relations, direction sense, distance, order and ranking.
4. **Syllogism and Venn Diagrams:** Categorical statements, conclusions, set relationships and diagram-based reasoning.
5. **Arrangements and Puzzles:** Linear and circular seating, ordering, scheduling, floor and grouping puzzles.
6. **Clocks, Calendars, Cubes and Dice:** Time-based reasoning, dates, cube visualisation and dice problems.
7. **Non-verbal Reasoning:** Patterns, mirror and water images, paper folding/cutting and embedded figures.
8. **Critical Reasoning and Data Sufficiency:** Statement-assumption, statement-conclusion, cause-effect, argument evaluation and deciding whether information is sufficient.

#### C. Quantitative Aptitude — 10 units

1. **Number System and Simplification:** Integers, fractions, decimals, divisibility, HCF/LCM, approximation and simplification.
2. **Percentages:** Percentage change, successive change and applications.
3. **Ratio, Proportion and Partnership:** Direct/inverse proportion, sharing and partnership problems.
4. **Profit, Loss and Discount:** Cost price, selling price, marked price, discount and successive discounts.
5. **Simple and Compound Interest:** Interest calculations, growth and comparison problems.
6. **Averages, Mixtures and Alligation:** Weighted averages, replacement and mixture-based questions.
7. **Time and Work:** Work rates, combined work, efficiency and pipes/cisterns.
8. **Time, Speed and Distance:** Relative speed, trains, boats and streams, and journey-based questions.
9. **Algebra, Geometry and Mensuration Basics:** Equations, identities, lines, angles, triangles, circles, area, surface area and volume.
10. **Data Interpretation:** Tables, bar graphs, line graphs, pie charts and short caselets.

**Assessment and practice:** Short topic tests, weekly mixed tests and an end-of-course review. Keep question difficulty appropriate to the target exam and the learner’s starting level.

**Exam relevance:** CUET General Test, NDA, NIFT GAT, CLAT, IPMAT, NCHMCT and selected government/entrance exams where these foundation areas are tested. The exact syllabus differs by exam; do not claim that this one pack covers the entire syllabus of every examination.

### 6.2 Exam Question Bank & Performance Profile — 6 months access

**Price:** ₹499 one-time  
**Purpose:** Add structured exam practice to the learner’s preparation. The offer is exam-specific, so confirm that the required pack is available before collecting payment.

**Practice modes**

- Topic-wise practice.
- Chapter-wise practice where applicable.
- Mixed practice sets.
- Timed tests using the relevant exam’s marking approach where available.
- Hints before full solutions so learners can attempt a question before seeing the answer.

**Learner profile**

- Accuracy by topic.
- Average time spent per question / speed indicators.
- Topics where errors are recurring.
- Weak-topic list.
- Weekly “push list” identifying areas to practise next.
- Confidence tag on answers, where supported, to compare confidence with actual accuracy.
- Revision reminders for topics due for another attempt.
- Trend over time across practice sessions.

**Teacher review**

A periodic teacher-led review should compare digital practice results with a supervised paper-based test. If the two disagree, the teacher’s review is the reference point. Do not call this a fully automated adaptive engine unless the live product actually supports that behaviour.

**Exam availability copy:** “Question Bank packs are organised by exam. Enquire with your target exam and we will confirm the pack currently available.”

The reference catalogue mentions JEE, NEET, CUET, NET and government examinations. The exact NET category and government-exam list have not been finalised for public display. Do not publish UGC NET, SSC, banking or Himachal state exam availability as a guarantee until Synapse confirms that the content is ready for each one.

### 6.3 Class 11–12 Subject Classes — ₹599 per subject/month

**Subjects:** Physics, Chemistry, Biology and Mathematics  
**For:** Class 11–12 students preparing for board examinations and relevant entrance tests.  
**Delivery:** Online, with school-level batches planned after 3:00 PM.

**Common teaching structure for each subject**

1. Chapter-by-chapter teaching aligned to the relevant NCERT syllabus.
2. Concept explanation and worked examples.
3. Guided numerical/problem-solving practice where relevant.
4. Chapter test and weekly test.
5. Separate doubt-clearing session.
6. Error log to identify recurring misconceptions and careless mistakes.

**Exam-specific depth**

- CUET students: focus on the relevant Class 12 syllabus and exam pattern.
- NEET students: relevant Class 11–12 Physics, Chemistry and Biology depth.
- JEE students: relevant Class 11–12 Physics, Chemistry and Mathematics depth.
- Board preparation: chapter sequencing and descriptive/conceptual practice as required.

#### Physics — suggested subject map

- Class 11 foundations: physical world and measurement, kinematics, laws of motion, work-energy-power, rotational motion, gravitation, properties of matter, thermodynamics, kinetic theory, oscillations and waves.
- Class 12 foundations: electrostatics, current electricity, magnetism, electromagnetic induction and alternating current, electromagnetic waves, ray and wave optics, dual nature, atoms and nuclei, and semiconductor electronics.
- Practice: units and dimensions, graphs, derivations where required, numerical methods, conceptual MCQs and timed problem sets.

#### Chemistry — suggested subject map

- Physical Chemistry: basic concepts and stoichiometry, atomic structure, chemical thermodynamics, equilibrium, redox, solutions, electrochemistry and chemical kinetics.
- Inorganic Chemistry: periodic classification, chemical bonding, representative elements, transition elements and coordination chemistry as required by the relevant syllabus.
- Organic Chemistry: organic fundamentals, hydrocarbons, functional groups, reaction patterns, alcohols/phenols/ethers, carbonyl compounds, carboxylic acids, amines and biomolecules as required by the relevant syllabus.
- Practice: numerical drills, reaction mapping, NCERT-based questions and exam-pattern MCQs.

#### Biology — suggested subject map

- Diversity and classification of living organisms.
- Plant and animal structural organisation.
- Cell structure, cell cycle and biomolecules.
- Plant physiology.
- Human physiology.
- Reproduction in plants and humans.
- Genetics and evolution.
- Biology in human welfare, health and disease.
- Biotechnology and its applications.
- Ecology, environment and biodiversity.
- Practice: NCERT line-by-line reading, diagrams, concept recall, assertion/reason where relevant and timed MCQs.

#### Mathematics — one common core with exam-specific depth

The Mathematics course is designed as a common Class 11–12 foundation for entrance preparation. Exam-specific practice and depth are added after the common topics.

- **Class 11 core:** sets, relations and functions, trigonometric functions, complex numbers, linear inequalities, permutations and combinations, binomial theorem, sequences and series, straight lines, conic sections, introductory limits/derivatives, statistics and probability.
- **Class 12 core:** relations and functions, inverse trigonometric functions, matrices and determinants, continuity and differentiability, applications of derivatives, integrals, differential equations, vectors, three-dimensional geometry, linear programming and probability.
- **Exam add-ons:** JEE-level problem depth; CUET Mathematics; IAT/NEST-level extensions where scheduled; NDA Mathematics where scheduled.
- **Practice:** concept drills, graded problems, timed mixed sets and error analysis.

*Implementation note:* do not promise every named exam extension on every batch. The teacher should confirm the track and cohort before enrolment.

### 6.4 Communication: English + Hindi — 10 weeks

**Price:** ₹599/month  
**Audience:** School students (Classes 8–12) and college students.  
**Tracks:** Separate School and College groups. Learners are placed using a short speaking and writing check. Both languages are taught side by side.

**Course promise:** Learn to express an idea clearly, listen and respond thoughtfully, write appropriately for different contexts, and speak with greater confidence in both English and Hindi.

#### Ten-week structure

1. **Speak Without Fear:** Self-introduction, voice, posture, eye contact, hesitation and short speaking drills.
2. **Listening and Responding:** Active listening, asking useful questions, turn-taking and responding without losing the point.
3. **English in Use:** Sentence formation, tense control, vocabulary and everyday/academic communication through speaking and writing.
4. **Hindi in Use:** Hindi grammar and usage, spelling, sentence structure, vocabulary and clear written expression.
5. **Reading and Vocabulary:** Comprehension, reading aloud, newspaper/editorial reading at the appropriate level and vocabulary building in both languages.
6. **Practical Writing:** Paragraphs, formal and informal letters, applications, notices, emails and structured messages in English and Hindi.
7. **Storytelling and Idea Expression:** Organising thoughts, telling a clear story, explaining a concept and extempore speaking.
8. **Presenting and Pitching:** Presentation structure, concise explanation, supporting examples and answering audience questions.
9. **Group Discussion and Interview Basics:** Entering a discussion, disagreeing respectfully, summarising, answering interview questions and introducing oneself professionally.
10. **Final Showcase:** A five-minute talk or presentation in front of an audience, with parents invited for school batches where appropriate.

**Practice format:** short weekly speaking tasks, pair/group work, listening activities, written assignments and constructive feedback. Evaluate clarity and progress, not accent imitation.

### 6.5 Business Development + Internship — 6 months

**Price:** ₹899/month for all six months  
**Total at the listed monthly rate:** ₹5,394  
**Audience:** Students enrolled in a bachelor’s programme, from any discipline.  
**Structure:** Months 1–3 learning; Months 4–6 internship on one selected Chamba venture.

**Programme description**

Learn the practical stages of building and operating a small business. The first three months cover customer discovery, market research, product development, pricing, branding, marketing, sales and operations. The next three months involve mentored work on one of the Chamba ventures described in Section 7.

#### Phase 1 — Core business learning (Months 1–3)

1. **Business Basics and the Founder’s Mindset:** What a business does, who it serves, how value is created and the difference between an idea and an operating offer.
2. **Finding a Niche and Talking to Customers:** Customer segments, problem discovery, interviews, observation and validation.
3. **Market Research:** Primary and secondary research, competitor mapping, demand signals and market sizing at a practical level.
4. **Product Development:** Idea selection, first product/service version, sampling, sourcing, quality and iteration.
5. **Costing and Pricing:** Cost structure, margin, pricing logic, unit economics and basic financial tracking.
6. **Branding and Storytelling:** Naming, positioning, product narrative, packaging and consistent communication.
7. **Marketing and Distribution:** Social media, WhatsApp, local listings, tourist channels, partnerships and content basics.
8. **Sales and Customer Handling:** Enquiry management, sales conversations, follow-up, negotiation and customer experience.
9. **Operations and Basic Finance:** Vendors, inventory, fulfilment, simple records and operational routines. GST/FSSAI topics are awareness-level only, not legal or regulatory advice.
10. **Pitching and Project Planning:** Presenting an opportunity, setting milestones, assigning work and selecting the venture project.

#### Phase 2 — Venture internship (Months 4–6)

Participants work on one selected venture with guidance from the Synapse team and relevant local practitioners. The internship should include:

- A defined project brief and supervisor.
- Weekly review and feedback.
- Practical outputs that can be included in a learner portfolio.
- A final presentation or demonstration of work.

#### Certificate and continuation

Participants who meet the published completion requirements receive a **Synapse Learning & Internship Certificate** covering the six-month programme. Selected participants may be considered for continued work on their venture or for roles at Synapse centres as they expand in Himachal Pradesh. There is no guaranteed job or placement.

**Important public-copy restriction:** stipend amount, eligibility and payment timing were not confirmed in the source catalogue. Do not promise or advertise a stipend until Synapse has documented the exact amount, eligibility, completion requirement and payment date. Do not imply that the internship is paid unless the policy is approved.

### 6.6 Applied AI Literacy — 12 weeks

**Price:** ₹899/month  
**Audience:** Designed primarily for college students; school students may also enquire.  
**Prerequisite:** No coding experience required.  
**Course progression:** Aware → Practitioner → Builder.

**Course description**

Understand how current AI tools work at a practical level, learn to use them carefully, and apply them to study, research and real tasks. The course focuses on judgement and useful workflows—not just writing prompts.

#### Unit 1 — Understand AI (Weeks 1–3)

- What AI and machine learning mean in practical terms.
- What large language models do and how they generate responses.
- Tokens, context windows, model strengths and limitations.
- The difference between fast responses and more deliberate reasoning-oriented systems at a user level.
- Hallucinations, bias, incomplete information and data quality.
- How to check claims and decide when not to rely on an AI output.

#### Unit 2 — Use AI Well (Weeks 4–6)

- Writing clear instructions and supplying useful context.
- Iterative prompting, examples and structured outputs.
- Research assistance, summarisation and cross-checking sources.
- Drafting, editing, translating between English and Hindi and preparing documents.
- Data and spreadsheet tasks: cleaning, formulas and basic analysis.
- Image, voice and other multimodal tools.
- Using AI as a tutor or practice partner without outsourcing the learner’s own thinking.

#### Unit 3 — Apply AI to Real Work (Weeks 7–9)

- Workflows for small businesses: content, product catalogues, customer replies and booking enquiries.
- No-code automation and connecting routine steps.
- Building a simple assistant with no-code tools where appropriate.
- Testing outputs, checking quality and improving a workflow.
- Role-based practical labs for students, small businesses, teachers and office/admin work.

#### Unit 4 — Use AI Responsibly (Weeks 10–11)

- Personal and business data privacy.
- India’s data-protection requirements, explained at an introductory level; this is not legal advice.
- Copyright, attribution and responsible use of generated content.
- Deepfakes, scams, impersonation and misinformation.
- Academic integrity and workplace transparency.
- How AI changes tasks and skills; evaluating claims about job impact carefully.

#### Week 12 — Capstone

Build and present an AI-assisted workflow for a practical problem. Example briefs may include organising a small homestay’s enquiries, preparing a product catalogue for a local brand or improving a repetitive administrative task.

**Assessment:** Weekly hands-on tasks, a practical capstone and a short no-device concept check. A completion certificate may be issued under Synapse’s published completion criteria; do not make claims of third-party accreditation or external certification.

**External framework wording:** The source catalogue notes that the curriculum was inspired by domains common to UNESCO and EC–OECD AI-literacy frameworks, but the mapping has not been verified. Do not publish “UNESCO-aligned”, “OECD-certified” or “industry-certified” claims. The website can simply describe the course topics and learning activities.

### 6.7 AI Literacy + Business Development — combined enrolment

**Price:** ₹1,499/month while enrolled in the combined programme.  
**Separate monthly fees:** ₹1,798.  
**Saving:** ₹299/month.

The combined option is for college students who want to learn to use AI in practical work while learning how to research, develop, market and operate a business. The AI Literacy course runs for 12 weeks. Business Development runs for six months, including the three-month internship phase.

Use the same programme structures as Sections 6.5 and 6.6. Do not invent a separate “AI business” syllabus or imply that every participant will build a funded startup.

---

## 7. CHAMBA VENTURES PAGE — INTERNSHIP PROJECTS

### Page heading

# Work on real projects in Chamba.

The Business Development programme includes a three-month internship on one of four venture areas connected to Chamba. Participants work on defined business tasks, receive guidance and build a record of practical work.

### Venture 1 — Chamba Rumal & Heritage Apparel

**Status:** Brand and product development in progress.  

Work with local artisans to explore contemporary products that use Chamba Rumal embroidery. The product direction may include embroidered T-shirts and shirts, followed by Chamba chappal, wool coats and other locally rooted apparel/accessories.

**Possible intern work:** customer and product research, product ideas, artisan coordination, costing, sampling, quality documentation, product photography, catalogue preparation, social media, order handling and customer feedback.

**Accuracy rule:** Do not show a mock-up as a product already available for purchase. Use actual product photographs only when the product exists and the relevant artisan/owner has consented to publication.

### Venture 2 — Chamba Travel & Experiences

**Status:** Network and service model in development.  

Develop a local chain of hospitality and visitor experiences around Chamba. The idea includes local guiding, homestay/B&B operations, property presentation, customer acquisition and experiences that help visitors connect with the area.

**Possible intern work:** mapping local experiences, creating itineraries, writing property/experience listings, guest communication templates, photography coordination, online marketing, booking enquiry processes and guide/hospitality training.

**Accuracy rule:** Do not claim that Synapse already operates a large hospitality chain or that properties are currently bookable through Synapse unless this is true and verified.

### Venture 3 — Synapse Education

**Status:** Current education brand with plans to expand centres across Himachal Pradesh.  

Support the education operation and its growth: teaching assistance, organising batches, student onboarding, school/college outreach, event coordination and admissions support.

**Possible intern work:** class schedules, learner communication, course operations, workshop logistics, enquiry follow-up, content coordination and support for future centres.

**Possible continuation:** Strong participants may be considered for roles at Synapse or future centres, depending on business needs. Do not promise a job.

### Venture 4 — Chamba FMCG & Agro-Products

**Status:** Concept and product definition in development.  

Explore a packaged consumer-products business using local produce and food traditions. Areas to research include Chamba apples, Chamba chukh, aam papad, local beans/rajma and Himalayan berries.

**Possible intern work:** product and customer research, producer/supplier mapping, sample testing, costing, packaging concepts, brand positioning and distribution research. Food compliance topics are awareness-level only; actual production/sale requires appropriate professional and regulatory review.

**Accuracy rule:** This is a venture area being explored, not a claim that all listed products are currently packaged, certified or available for sale. Label it “in development”.

### Internship CTA

## Want to work on one of these projects?

The Business Development programme is open to students enrolled in a bachelor’s programme. Enquire to understand the six-month structure, available project areas, current batch and selection process.

**CTA:** Enquire about the internship

---

## 8. FOR SCHOOLS & COLLEGES PAGE

### Hero

# Bring a Synapse learning session to your institution.

We work with schools and colleges to introduce students to communication skills, applied AI, entrance preparation and practical business development. Institutions can enquire about a demonstration session, a student baseline day, an information session or group enrolment.

### What we can offer

#### 1. Introductory session or demonstration
A short session on one of the following:

- Communication and expressing ideas clearly.
- AI awareness and practical use of AI tools.
- Career and entrance-exam planning.
- Introduction to business development and the internship programme.

#### 2. Entrance baseline day
A structured baseline activity covering selected areas such as reasoning, reading/communication and arithmetic. The format and student count can be agreed with the institution.

#### 3. Business Development information session
An information session for college students explaining the six-month programme, the first three months of learning, the three-month Chamba venture internship and the application/enquiry process.

#### 4. Group enrolment
Institutions can enquire about group participation in Synapse courses. Group pricing is not fixed yet and will be shared after the institution’s requirements are understood.

### How an institutional engagement begins

1. The institution submits the enquiry form.
2. Synapse contacts the nominated person.
3. Both sides agree on student group, topic, date, delivery format and practical arrangements.
4. Synapse confirms the session or enrolment plan.

### Institutional enquiry form fields

- Institution name and type (school/college/other).
- Town/location.
- Contact person and role.
- Phone/WhatsApp and email.
- Approximate number of students.
- Class or year group.
- Areas of interest (multi-select).
- Preferred date or date range.
- Preferred format (online / in-person discussion / to be discussed).
- Additional requirements or message.

**CTA:** Enquire for a school or college

*Do not promise a free session, a particular group discount or a fixed workshop price on the public website unless management confirms the policy. The source catalogue mentions a free demo as an offer to consider; this needs final operational approval before being stated as universally free.*

---

## 9. FAQ — PUBLIC-FACING ANSWERS

### Who can join Synapse courses?
School students, competitive-exam aspirants and college students can join different programmes. Course eligibility is listed on each course page. Business Development is designed for students enrolled in a bachelor’s programme.

### Where are the classes held?
Classes are online. The Synapse office is behind the Post Office in Chamba, Himachal Pradesh.

### When do the next batches begin?
Batch dates are shared during the enquiry process. Contact Synapse for the next available batch and trial-class timing.

### Can I attend a class before enrolling?
Yes. One or two trial classes are arranged before you decide whether to continue. The course fee is collected after the trial if you choose to enrol.

### What are the class timings?
College-level batches are generally planned before 3:00 PM. School-level batches are generally planned after 3:00 PM. Exact timings depend on the course and batch and are confirmed after enquiry.

### Are the courses online or offline?
All classes are online. The Chamba office is the local base for enquiries and coordination; do not imply that regular classroom teaching is currently offered there.

### Is the Foundation Pack one subject or three?
It includes all three foundation subjects: General Awareness, Logical Reasoning and Quantitative Aptitude. The price is ₹599 per month.

### Is the Question Bank included in the Foundation Pack?
No. The Question Bank is a separate add-on at ₹499 one-time for six months of access. Ask Synapse to confirm that your target exam pack is available.

### Can I take more than one subject class?
Yes. You can enquire about one or more of Physics, Chemistry, Biology and Mathematics. Each subject is ₹599 per month.

### Is the Communication course only for English?
No. It covers both English and Hindi. Learners practise speaking, listening, reading and writing in both languages.

### Do I need coding experience for AI Literacy?
No. The course is designed for learners who want to understand and apply AI tools. Coding is not a prerequisite.

### What happens during the Business Development internship?
After three months of structured learning, participants work for three months on one selected Chamba venture, with guidance and regular reviews. The work depends on the project brief and the venture’s current stage.

### Will the Business Development programme guarantee a job?
No. Participants who meet the published requirements receive a Synapse Learning & Internship Certificate. Selected participants may be considered for further work or roles, but a job is not guaranteed.

### Is the internship paid? Is there a stipend?
Stipend terms are being finalised. Synapse will share any approved stipend policy, including the amount and eligibility conditions, before enrolment. Do not advertise a guaranteed stipend until those terms are formally approved.

### What certificate will I receive?
The Business Development programme includes a Synapse Learning & Internship Certificate for participants who complete the stated programme requirements. AI Literacy may include a course completion certificate under its published requirements. These are Synapse-issued certificates, not university degrees or third-party accreditation.

### Does Synapse guarantee exam selection or a particular score?
No. Synapse provides instruction, practice, tests and progress feedback. Exam outcomes depend on many factors and no rank, score or selection is guaranteed.

### Can parents enquire or observe a class?
Yes. Parents can submit an enquiry on behalf of a student. A parent/guardian may request to observe a suitable class by coordinating with Synapse.

### How do I pay?
There is no payment checkout on the website. After the trial class, Synapse will explain the fee and available payment method before enrolment.

---

## 10. CONTACT PAGE AND GLOBAL FOOTER

### Contact copy

# Talk to Synapse

Tell us what you are studying, which exam you are preparing for or which skill you want to build. We will help you find the relevant course and share the next batch details.

**Office:** Behind the Post Office, Chamba, Himachal Pradesh, India  
**Phone / WhatsApp:** 8287248119  
**Public email from the supplied course catalogue:** cksynapse@mail.com  
**Google Forms owner account:** ck.synapse@gmail.com (administration account; do not substitute it for the public contact email unless Synapse chooses to do so).

**CTA:** Enquire about a course

### Footer links

- Courses
- Chamba Ventures
- For Schools & Colleges
- FAQ
- Contact

Footer microcopy: “Synapse — Centre for Learning & Innovation · Chamba, Himachal Pradesh.”

---

## 11. GOOGLE FORM INTEGRATION REQUIREMENTS

Create the forms under the exact Google account `ck.synapse@gmail.com`. Form creation instructions and full question specifications are in the separate file `CLAUDE_GOOGLE_FORMS_BUILD_PROMPT.md` included in this package.

### Website form routing

Use three forms:

1. **Course Enquiry (Student / Parent):** main enquiry form for the seven offers. Every course card CTA points to a prefilled version of this form with the relevant programme selected.
2. **Business Development + Internship Application:** more detailed application form for the six-month college programme.
3. **School & College Partnership Enquiry:** institutional enquiry form.

The general course form should also be available from the global header/footer CTA. A user must not have to select their course again if they clicked Enquire on a specific course card; use a Google Forms prefilled URL for that card.

### URL configuration

Create a central configuration such as:

```ts
export const FORM_URLS = {
  courseGeneral: "PASTE_GOOGLE_FORM_COURSE_GENERAL_URL",
  foundationPack: "PASTE_PREFILLED_FOUNDATION_FORM_URL",
  questionBank: "PASTE_PREFILLED_QUESTION_BANK_FORM_URL",
  subjectClasses: "PASTE_PREFILLED_SUBJECT_CLASSES_FORM_URL",
  communication: "PASTE_PREFILLED_COMMUNICATION_FORM_URL",
  businessDevelopment: "PASTE_PREFILLED_BUSINESS_DEVELOPMENT_FORM_URL",
  aiLiteracy: "PASTE_PREFILLED_AI_LITERACY_FORM_URL",
  aiBusinessCombo: "PASTE_PREFILLED_AI_BUSINESS_COMBO_FORM_URL",
  internshipApplication: "PASTE_INTERNSHIP_APPLICATION_FORM_URL",
  institutionEnquiry: "PASTE_INSTITUTION_FORM_URL"
};
```

These are explicit placeholders, not usable URLs. Replace them with the final URLs generated by Claude/Google Forms. Keep the course-to-form mapping in one file. If the form creator does not generate separate prefilled links, use the general course form URL for all course cards and retain the course selection as a required field.

### CTA behaviour

- Course card “Enquire” → relevant prefilled Course Enquiry form.
- Business Development detail page “Apply / Enquire” → Business Development Application form. A secondary “Ask a question” CTA may open the course enquiry prefilled for Business Development.
- Chamba Ventures internship CTA → Business Development Application form.
- School & College CTA → Institution Enquiry form.
- Header/footer “Enquire” → general Course Enquiry form.

Open external forms in a new tab, preserve accessibility labels and display a small notice: “You’ll be taken to a Google Form to submit your enquiry.”

---

## 12. STOCK PHOTOGRAPHY AND IMAGE ASSET PLAN

Use restrained, documentary-style photographs. The site should feel local, credible and educational—not like a generic technology startup template.

### Required image placements and asset names

| Asset filename | Page / placement | Subject and sourcing direction | Type |
|---|---|---|---|
| `home-learning.webp` | Home hero | Indian school/college learners studying together in a real classroom or small group; natural light, not staged corporate stock | Unsplash stock |
| `foundation-study.webp` | Foundation Pack card/detail | Learner working through notes, books and quantitative problems | Unsplash stock |
| `question-bank-practice.webp` | Question Bank | Student doing timed practice or reviewing questions on paper/laptop | Unsplash stock |
| `subject-class-science.webp` | Subject Classes | Realistic science/math learning context, notebooks, lab/classroom details | Unsplash stock |
| `communication-speaking.webp` | Communication | Student speaking to a small group or presenting; inclusive, natural environment | Unsplash stock |
| `ai-literacy-workshop.webp` | AI Literacy | Learner using a laptop for practical work; avoid humanoid robots/AI brain clichés | Unsplash stock |
| `business-teamwork.webp` | Business Development | Small team reviewing a product, notebook, sample or market plan | Unsplash stock |
| `chamba-rumal-artisan.webp` | Ventures — Rumal | Actual artisan and actual embroidery/product, only with permission; do not substitute generic embroidery as a Chamba Rumal photo | Synapse-owned / consented photo preferred |
| `chamba-hospitality.webp` | Ventures — Travel | Actual local property, host or Chamba experience, only when real and approved | Synapse-owned / consented photo preferred |
| `chamba-agro-products.webp` | Ventures — FMCG | Actual Chamba apples/chukh/aam papad/beans/berries or prototype products; label prototypes accurately | Synapse-owned / consented photo preferred |
| `synapse-chamba-centre.webp` | Contact / institutional page | Actual Synapse exterior/office/team when available | Synapse-owned photo |

### Safe stock image sourcing

Use Unsplash search pages to choose individual photographs, then download the selected original image locally and record the photo page and creator in `public/images/image-credits.md`:

- Classroom / learners: https://unsplash.com/s/photos/indian-students-classroom
- Students studying: https://unsplash.com/s/photos/students-studying-together
- Public speaking: https://unsplash.com/s/photos/student-public-speaking
- Laptop learning: https://unsplash.com/s/photos/student-laptop-learning
- Team / business workshop: https://unsplash.com/s/photos/small-business-team-meeting
- Science classroom: https://unsplash.com/s/photos/science-student-classroom
- AI / computer work: https://unsplash.com/s/photos/student-technology-laptop
- Textile / embroidery inspiration only: https://unsplash.com/s/photos/hand-embroidery-textile
- Mountain homestay inspiration only: https://unsplash.com/s/photos/himalayan-homestay
- Apples / agriculture inspiration only: https://unsplash.com/s/photos/apple-orchard

### Specific candidate photo pages

The following individual Unsplash pages were checked as candidate free-download sources during preparation. Before using any image, reopen its page and confirm that it still offers **Download free** (not Unsplash+), review its terms and record the creator and source URL in `public/images/image-credits.md`. These are candidate sources, not downloaded image binaries.

| Asset | Candidate image | Creator | Individual source page |
|---|---|---|---|
| `home-learning.webp` | Students listening to a lecture in a classroom | Vitaly Gariev | https://unsplash.com/photos/students-listen-to-a-lecture-in-a-classroom-8c0ndhIXDzQ |
| `foundation-study.webp` / `question-bank-practice.webp` | A person studying at a desk with books | Yanhao Fang | https://unsplash.com/photos/a-person-studying-at-a-desk-with-books-QR-XQbUVC1s |
| `subject-class-science.webp` | Professor teaching a young student science in a lab | Vitaly Gariev | https://unsplash.com/photos/professor-teaching-a-young-student-science-in-a-lab-2tudsaEBXgw |
| `communication-speaking.webp` | Young woman speaking into a microphone at an event | Clinton Mwebaze | https://unsplash.com/photos/young-woman-speaks-into-microphone-at-event-_SygXIozO8Q |
| `ai-literacy-workshop.webp` | Diverse group of students gathered around a laptop | Vitaly Gariev | https://unsplash.com/photos/diverse-group-of-students-gathered-around-a-laptop-EA0-iajPYFE |
| `business-teamwork.webp` | Three people working together on a laptop | Vitaly Gariev | https://unsplash.com/photos/three-people-working-together-on-a-laptop-CN54mBf1f8I |
| Craft-detail illustration only | Woman embroidering fabric in a workshop | Armand Mckenzie | https://unsplash.com/photos/woman-embroidering-fabric-in-workshop-r0chG6W-8Ks |

The craft image is **not Chamba Rumal**. Use it only as a generic craft-process illustration; never imply it depicts a Synapse artisan, a local Chamba craftsperson or a Chamba Rumal product. Prefer authentic, permission-cleared photos from the Chamba project.

Unsplash’s published licence permits free commercial and non-commercial use of its photos, subject to its terms. Review the individual image and any model/property/third-party rights before use. Keep the image credit/source record even though attribution is generally not required. Useful licensing references: https://unsplash.com/license and https://help.unsplash.com/en/articles/2612315-can-i-use-unsplash-images-for-personal-or-commercial-projects.

### Image implementation rules

- Download and serve local optimised files (WebP/AVIF where supported; keep an appropriate fallback).
- Use descriptive alt text that describes the visible photograph, not marketing claims.
- Lazy-load below-the-fold images; prioritise the hero image.
- Crop consistently but do not crop out faces, hands doing a task or key context.
- Do not hotlink a search-results page as an image source.
- Do not use Getty/iStock/paid photos unless Synapse has an appropriate licence.
- For photos of identifiable learners, artisans, hosts or employees, obtain permission appropriate for public website use. Be extra careful with minors: use properly licensed/consented images and avoid exposing identifying student data.
- Prefer real Synapse and Chamba venture photographs once available. Stock should illustrate general learning, not falsely document a local venture.

---

## 13. DESIGN AND UX DIRECTION

### Visual direction

- Calm, editorial, clear and trustworthy.
- White or very light neutral background; near-black/charcoal typography; one restrained warm accent (for example muted rust or deep teal) used consistently.
- Readable sans-serif typography with good Devanagari support if Hindi copy is added.
- Strong hierarchy: clear headlines, short paragraphs, meaningful section spacing and concise course cards.
- Use real photographs in deliberate placements, not a wall of stock thumbnails.
- Avoid gradients, oversized glowing effects, decorative AI imagery, emoji, excessive iconography and generic SaaS dashboard aesthetics.
- Course cards can use thin borders or subtle tonal separation; avoid heavy shadows and rounded “app tile” visuals.

### Mobile and performance

- Design from a narrow mobile viewport first.
- Make price and CTA visible without excessive scrolling inside each card.
- At least 44px touch targets for important controls.
- Compress images, lazy-load below-the-fold content and avoid large animation libraries.
- Ensure buttons and form links work in mobile browsers and when opened in a new tab.
- Keep navigation simple and avoid deep nested menus.

### Accessibility and SEO

- Semantic heading hierarchy and landmarks.
- Keyboard-accessible navigation, filters and accordions.
- Visible focus states and sufficient contrast.
- Alt text for meaningful photos; empty alt for purely decorative images.
- Page-specific title and meta description.
- Open Graph title/description/image for sharing.
- Use local SEO wording naturally: “Synapse Chamba”, “online classes”, “competitive exam preparation”, “communication course”, “AI literacy course” and “Business Development internship in Chamba”.
- Add LocalBusiness/EducationalOrganization structured data only with accurate known facts; do not invent a full postal address or opening hours.

---

## 14. CONTENT AND CLAIMS CONTROL

### Safe to publish from the supplied catalogue

- Synapse name and Chamba location.
- The seven course/programme offers and listed prices.
- Online class format.
- General school/college audience distinctions.
- The 12-week Foundation Pack, 10-week Communication course, 12-week AI Literacy course and six-month Business Development programme.
- The three-month learning + three-month internship structure.
- Four Chamba venture areas, with status labels as specified.
- Trial classes before enrolment and fees collected after a learner decides to continue.

### Do not publish until confirmed

- Any guaranteed stipend, amount or stipend payment date.
- A guaranteed job, paid placement or job rate.
- Any guaranteed exam result, rank, score or selection.
- Fixed start dates or exact batch timetables.
- Fixed group discounts or the proposed ₹999 Foundation + Communication bundle.
- A claim that every Question Bank exam pack is available and ready.
- UGC NET / SSC / Banking / Himachal state exam pack coverage until the exact list/content is confirmed.
- External accreditation, university credit, government recognition or “UNESCO/OECD aligned” claims.
- A free institutional workshop unless its terms are confirmed.
- A live adaptive question-bank engine, automated diagnostic algorithm or student dashboard unless those features exist and are operational.

### Minors and data minimisation

For students under 18, the course enquiry form must require a parent/guardian contact number. Do not collect date of birth, home address, identity numbers, health details or other unnecessary sensitive information. Restrict response-sheet access to authorised Synapse staff. Add a concise consent/privacy notice to every form.

---

## 15. OPEN ITEMS — INTERNAL ONLY, NOT WEBSITE COPY

These items should not block a useful first website. Use the safe wording above and keep the details editable in configuration.

1. **Business Development stipend:** amount, timing, eligibility and completion conditions. Do not promise until approved.
2. **Batch calendar:** exact opening date and maximum batch size.
3. **Timetable:** exact course-wise slots; the general before/after 3:00 PM distinction is enough for launch.
4. **Exam bank inventory:** confirm the launch-ready packs, particularly the meaning of “NET” and which government exams are included.
5. **Institution group pricing:** decide whether there are discounts or minimum group sizes.
6. **Foundation + Communication bundle:** ₹999/month was suggested in the Claude reference, but is not approved by the owner’s prompt. Keep hidden.
7. **Trial class policy:** source catalogue says one or two trial classes before payment. Confirm whether they are free and any limits before making “free trial” claims.
8. **Payment methods and refund policy:** shared during enrolment; add public policy once finalised.
9. **AI Literacy certificate:** confirm exact completion criteria and certificate wording.
10. **Institutional demo policy:** confirm whether demos are free, where they can be delivered and any travel costs.
11. **Public contact email:** the catalogue lists `cksynapse@mail.com`. The forms must be created by `ck.synapse@gmail.com`. Confirm which email should be publicly displayed if the catalogue address is no longer active.
12. **Actual venture photos and permissions:** collect authentic photographs from artisans, hosts, farms and Synapse with permission.

---

## 16. FINAL ANTIGRAVITY QA — ACCEPTANCE CRITERIA

The website update is complete only when all of the following are true:

- [ ] The home page immediately tells visitors what Synapse offers and where it is based.
- [ ] Every course card has a clear price and billing unit.
- [ ] Foundation Pack clearly includes all three subjects for ₹599/month.
- [ ] Question Bank is clearly a separate ₹499 one-time add-on for six months.
- [ ] Subject Classes clearly say ₹599 per subject/month.
- [ ] Business Development clearly says six months, three months learning + three months internship, ₹899/month.
- [ ] AI Literacy clearly says 12 weeks and ₹899/month.
- [ ] Combo clearly says ₹1,499/month and identifies the two different course durations.
- [ ] All seven course CTAs open the intended course enquiry Google Form or its prefilled variant.
- [ ] Business Development application and institutional enquiry go to their separate forms.
- [ ] No checkout/payment gateway exists.
- [ ] No unapproved stipend, job, accreditation, exam result or external-framework claim appears.
- [ ] Chamba travel and FMCG venture statuses are described honestly as in development.
- [ ] Stock photos are locally stored, optimised, credited/source-recorded and not mislabelled as local business photographs.
- [ ] The site is readable and functional on mobile and slow connections.
- [ ] No broken route, CTA, image or external link remains.
- [ ] The implementation summary lists changed files, form URLs still awaiting replacement (if any), tests run and any open content dependency.

**End of implementation brief.**
