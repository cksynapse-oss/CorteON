# CLAUDE TASK — CREATE THE SYNAPSE GOOGLE FORMS

You are operating as an administrative assistant for Synapse — Centre for Learning & Innovation. Your task is to create the required Google Forms using the Google account **ck.synapse@gmail.com**.

## Critical account and execution rules

1. Open Google Forms in the authenticated browser session and verify that the active account shown in the Google profile menu is exactly `ck.synapse@gmail.com` before creating anything.
2. Do not ask for, store, or expose the account password. If the session is not authenticated to the exact account, stop and ask the account owner to switch accounts in the browser. Do not create the forms under another account.
3. Do not claim that a form was created unless it was saved and you can reopen it from the correct account.
4. Use Google Forms' normal UI. If the UI is unavailable, explain the blocker and provide a Google Apps Script or manual fallback; do not fabricate form URLs.
5. Create the forms as responder-accessible forms. Do not restrict responses to a school/company domain. Do not require Google sign-in unless absolutely necessary. Do not set “Limit to 1 response” because many students/parents may not be signed into Google.
6. Keep the response sheets private to authorised Synapse staff. Never publish a response spreadsheet or expose response data in a public link.
7. Use the exact titles, descriptions, fields and settings below. Required questions are marked **(Required)**.
8. At the end, test every form using a test response, confirm the response appears in the correct response sheet, then remove the test response. Confirm the public responder link works in an incognito or signed-out window.
9. Generate prefilled links for the Course Enquiry form—one for each of the seven course/programme choices—and return the exact URLs in a simple mapping table.
10. Do not invent pricing, start dates, group discounts, stipend terms or guarantees in the form descriptions.

---

## FORM 1 — SYNAPSE COURSE ENQUIRY (STUDENT / PARENT)

**Form title:** Synapse — Course Enquiry (Student / Parent)

**Description:**
“Use this form to enquire about a Synapse course. Share your class or college year and the course you are interested in. Our team will contact you to explain the course, next batch timing and trial-class process. Classes are online. For students under 18, please provide a parent/guardian contact number.”

**Create these fields in this order:**

1. Student name — Short answer — **Required**.
2. I am enquiring as — Multiple choice: Student / Parent or guardian — **Required**.
3. Student’s class or college year — Dropdown: Class 8 / Class 9 / Class 10 / Class 11 / Class 12 / Undergraduate Year 1 / Undergraduate Year 2 / Undergraduate Year 3 / Undergraduate Year 4 or above / Graduate / Other — **Required**.
4. Is the student under 18? — Multiple choice: Yes / No — **Required**. Configure Google Forms section branching so “Yes” routes through a Parent / Guardian Details section and “No” skips that section.
5. Parent / guardian name — Short answer — **Required in the under-18 section**.
6. Parent / guardian phone / WhatsApp number — Short answer — **Required in the under-18 section**. This must be mandatory for respondents who answer “Yes” to the under-18 question.
7. School / college / institution name — Short answer — Optional.
8. Town / district — Short answer — **Required**.
9. Student phone / WhatsApp number — Short answer — **Required**. Add validation for a plausible Indian mobile number if the Forms UI supports it without making valid international numbers impossible.
10. Email address — Short answer with email validation — Optional. Do not enable automatic verified-email collection unless the owner approves it.
11. Which course are you interested in? — Checkboxes — **Required**. Options:
    - Foundation Pack — General Awareness + Reasoning + Quantitative Aptitude
    - Exam Question Bank & Performance Profile
    - Class 11–12 Subject Classes
    - Communication — English + Hindi
    - Business Development + Internship
    - Applied AI Literacy
    - AI Literacy + Business Development Combo
    - Not sure — please guide me
12. If you selected Subject Classes, which subjects? — Checkboxes: Physics / Chemistry / Biology / Mathematics / Not applicable / Not sure — Optional.
13. Which exam are you preparing for? — Dropdown: CUET UG / CUET PG / NEET / JEE Main / JEE Advanced / NDA / NIFT / CLAT / IPMAT / NCHMCT / UGC NET / SSC / Banking / Himachal state government exam / Other / Not sure / Not applicable — Optional. **Important:** This is an enquiry field, not a promise that every Question Bank pack is available. The team must confirm availability.
14. Preferred batch timing — Multiple choice: Before 3:00 PM / After 3:00 PM / Flexible / Please discuss with me — Optional.
15. Would you like to attend a trial class? — Multiple choice: Yes / I would like more information first — Optional.
16. Best time to contact you — Multiple choice: Morning / Afternoon / Evening / Anytime — Optional.
17. Anything else we should know? — Paragraph — Optional.
18. Consent to be contacted — Checkbox with one option: “I agree that Synapse may contact me about this enquiry using the phone number or email I provided.” — **Required**.

**Minors:** The form must clearly state that a parent/guardian phone number is required for students under 18. Do not collect date of birth, home address, government ID, health details or unnecessary sensitive data.

**Response destination:** Create/link a response spreadsheet named `Synapse — Course Enquiries`. Keep it restricted to the owner and specifically authorised Synapse staff.

**Settings:**
- Allow anyone with the link to respond.
- Do not restrict to a domain.
- Do not limit to one response.
- Do not require sign-in.
- Do not automatically collect verified Google email addresses unless owner approves.
- Show a confirmation message: “Thank you for enquiring with Synapse. Our team will contact you using the details you provided.”

**Prefilled links required:** Use Google Forms “Get pre-filled link” to create a separate link for each course selection. Prefill the course-choice answer for:
- `foundationPack`
- `questionBank`
- `subjectClasses`
- `communication`
- `businessDevelopment`
- `aiLiteracy`
- `aiBusinessCombo`

The form title and course option text must match exactly. Return the exact responder URL and each prefilled URL.

---

## FORM 2 — SYNAPSE BUSINESS DEVELOPMENT + INTERNSHIP APPLICATION

**Form title:** Synapse — Business Development & Internship Application

**Description:**
“This form is for students interested in Synapse’s six-month Business Development programme: three months of structured learning followed by a three-month internship on one selected Chamba venture. The programme is ₹899 per month for all six months. The programme includes a Synapse Learning & Internship Certificate on successful completion of the published requirements. Further work or roles may be considered for selected participants but are not guaranteed. Any stipend policy will be communicated separately only after it is formally approved.”

**Fields:**

1. Full name — Short answer — **Required**.
2. Phone / WhatsApp number — Short answer — **Required**.
3. Email — Short answer with email validation — **Required**.
4. Current town / district — Short answer — **Required**.
5. College / university — Short answer — **Required**.
6. Degree / programme — Short answer — **Required**.
7. Current year of study — Multiple choice: Year 1 / Year 2 / Year 3 / Year 4 or above / Other — **Required**.
8. Why are you interested in Business Development? — Paragraph — **Required**.
9. Which venture area interests you most? — Multiple choice: Chamba Rumal & Heritage Apparel / Chamba Travel & Experiences / Synapse Education / Chamba FMCG & Agro-Products (in development) / Open to any project — **Required**.
10. What kind of work would you like to try? — Checkboxes: Market research / Customer interviews / Product development / Branding and content / Marketing / Sales and customer handling / Operations / Teaching and education operations / Hospitality and travel experiences / Food/agro-product research / Not sure yet — Optional.
11. Describe one local problem or business opportunity you would like to explore. — Paragraph — **Required**.
12. Can you participate in the full six-month programme, including the three-month internship phase? — Multiple choice: Yes / I need to discuss the schedule — **Required**.
13. Approximate weekly availability — Multiple choice: Under 5 hours / 5–10 hours / 10–15 hours / 15+ hours / To be discussed — **Required**. Do not present any one option as a contractual commitment; final schedule is discussed during selection.
14. Portfolio / LinkedIn / work sample link — Short answer — Optional.
15. Anything else you want Synapse to know? — Paragraph — Optional.
16. Consent to be contacted about this application — Required checkbox.

**Response destination:** `Synapse — Business Development Applications`.

**Settings:** Allow anyone with the link to respond; do not restrict to a domain or require sign-in; keep response sheet private. Confirmation message: “Thank you. The Synapse team will review your enquiry and contact you about the next step.”

---

## FORM 3 — SYNAPSE SCHOOL & COLLEGE PARTNERSHIP ENQUIRY

**Form title:** Synapse — School & College Partnership Enquiry

**Description:**
“Use this form if your school or college would like to discuss a student session, communication or AI-awareness workshop, entrance baseline day, Business Development information session or group enrolment. Submitting the form is an enquiry and does not confirm a booking.”

**Fields:**

1. Institution name — Short answer — **Required**.
2. Institution type — Multiple choice: School / College / Coaching or training centre / Other — **Required**.
3. Town / district — Short answer — **Required**.
4. Contact person name — Short answer — **Required**.
5. Contact person role/designation — Short answer — **Required**.
6. Phone / WhatsApp number — Short answer — **Required**.
7. Email — Short answer with email validation — **Required**.
8. Approximate number of students — Multiple choice: Under 30 / 30–60 / 61–100 / 101–250 / 251–500 / More than 500 / Not sure — Optional.
9. Class or year group — Checkboxes: Classes 8–10 / Classes 11–12 / Undergraduate students / Mixed group / Other — **Required**.
10. What would you like to discuss? — Checkboxes: Communication workshop / AI awareness or AI literacy session / Career and entrance-exam planning / Entrance baseline day (reasoning, reading, arithmetic) / Business Development + Internship information session / Group enrolment in Synapse courses / Other — **Required**.
11. Preferred date or date range — Short answer — Optional.
12. Preferred mode — Multiple choice: Online / In-person discussion / To be discussed — Optional.
13. Additional details or requirements — Paragraph — Optional.
14. Consent to be contacted — Required checkbox: “I agree that Synapse may contact me about this institutional enquiry.”

**Response destination:** `Synapse — Institutional Enquiries`.

**Settings:** Allow anyone with the link to respond; no domain restriction; no sign-in requirement; keep responses private. Confirmation message: “Thank you. The Synapse team will contact the institution’s nominated person to discuss the request.”

---

## WEBSITE LINK HANDOFF — REQUIRED OUTPUT

After creating and testing all three forms, provide:

1. The exact Google account used, confirmed as `ck.synapse@gmail.com`.
2. Each form’s editor URL (for internal Synapse use only).
3. Each form’s responder URL.
4. All seven prefilled Course Enquiry URLs.
5. The response spreadsheet name and confirmation that access is restricted.
6. Confirmation that the three test responses were removed.
7. A ready-to-copy mapping in this exact shape:

```ts
export const FORM_URLS = {
  courseGeneral: "...",
  foundationPack: "...",
  questionBank: "...",
  subjectClasses: "...",
  communication: "...",
  businessDevelopment: "...",
  aiLiteracy: "...",
  aiBusinessCombo: "...",
  internshipApplication: "...",
  institutionEnquiry: "..."
};
```

Do not place editor links in the public website. Only responder links belong in the website configuration.

If you cannot complete any of the steps, clearly identify which form/setting is incomplete and what the account owner must do next. Do not invent URLs or claim success without verification.
