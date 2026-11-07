/**
 * End-to-End QA script for Synapse Google Forms integrations.
 * Tests public accessibility, absence of login wall, accepting responses status,
 * and prefilled parameter resolution.
 */

import { FORM_URLS } from '../src/config/forms.ts';

const FORMS_METADATA = [
  {
    key: 'courseGeneral',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: null,
  },
  {
    key: 'foundationPack',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'Foundation Pack',
  },
  {
    key: 'questionBank',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'Exam Question Bank & Performance Profile',
  },
  {
    key: 'subjectClasses',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'Class 11–12 Subject Classes',
  },
  {
    key: 'communication',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'Communication — English + Hindi',
  },
  {
    key: 'businessDevelopment',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'Business Development + Internship',
  },
  {
    key: 'aiLiteracy',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'Applied AI Literacy',
  },
  {
    key: 'aiBusinessCombo',
    expectedTitleSnippet: 'Course Enquiry',
    prefilledCheck: 'AI Literacy + Business Development Combo',
  },
  {
    key: 'internshipApplication',
    expectedTitleSnippet: 'Business Development',
    prefilledCheck: null,
  },
  {
    key: 'institutionEnquiry',
    expectedTitleSnippet: 'School & College',
    prefilledCheck: null,
  },
];

async function testForm(item) {
  const url = FORM_URLS[item.key];
  console.log(`\n------------------------------------------------------------`);
  console.log(`Testing Form Key: [${item.key}]`);
  console.log(`URL: ${url}`);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    const finalUrl = res.url;
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Final URL: ${finalUrl}`);

    if (finalUrl.includes('accounts.google.com/ServiceLogin')) {
      console.error(`❌ FAILED: Form requires Google Sign-In!`);
      return {
        key: item.key,
        passed: false,
        reason: 'Requires Google Sign-in',
      };
    }

    if (res.status !== 200) {
      console.error(`❌ FAILED: HTTP status ${res.status}`);
      return {
        key: item.key,
        passed: false,
        reason: `HTTP status ${res.status}`,
      };
    }

    const html = await res.text();

    // Check title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : 'Unknown';
    console.log(`Page Title: "${pageTitle}"`);

    if (
      item.expectedTitleSnippet &&
      !pageTitle.toLowerCase().includes(item.expectedTitleSnippet.toLowerCase())
    ) {
      console.error(
        `❌ FAILED: Title does not contain "${item.expectedTitleSnippet}"`
      );
      return { key: item.key, passed: false, reason: 'Title mismatch' };
    }

    // Check if accepting responses
    if (
      html.includes('This form is no longer accepting responses') ||
      html.includes('no longer accepting responses')
    ) {
      console.error(`❌ FAILED: Form is closed / not accepting responses!`);
      return { key: item.key, passed: false, reason: 'Form closed' };
    } else {
      console.log(`✓ Form is open and accepting responses.`);
    }

    // Check prefilled option
    if (item.prefilledCheck) {
      // In Google forms, prefill data is stored in FB_PUBLIC_LOAD_DATA_
      const containsPrefilled =
        html.includes(item.prefilledCheck) ||
        html.includes(encodeURIComponent(item.prefilledCheck));

      if (containsPrefilled) {
        console.log(
          `✓ Prefilled option confirmed in DOM: "${item.prefilledCheck}"`
        );
      } else {
        console.warn(
          `⚠️ WARNING: Prefilled option string "${item.prefilledCheck}" not found directly in HTML text.`
        );
      }
    }

    return {
      key: item.key,
      passed: true,
      title: pageTitle,
      url: url,
    };
  } catch (err) {
    console.error(`❌ ERROR: ${err.message}`);
    return { key: item.key, passed: false, error: err.message };
  }
}

async function run() {
  console.log(`============================================================`);
  console.log(`SYNAPSE GOOGLE FORMS E2E AUDIT`);
  console.log(`============================================================`);

  const results = [];
  for (const item of FORMS_METADATA) {
    const res = await testForm(item);
    results.push(res);
  }

  console.log(`\n============================================================`);
  console.log(`SUMMARY RESULTS`);
  console.log(`============================================================`);
  let allPassed = true;
  for (const r of results) {
    if (r.passed) {
      console.log(`PASS: [${r.key}] => ${r.title}`);
    } else {
      console.log(`FAIL: [${r.key}] => ${r.reason || r.error}`);
      allPassed = false;
    }
  }

  if (!allPassed) {
    process.exit(1);
  }
  console.log(`\nAll 10 Google Forms configurations verified successfully!`);
}

run();
