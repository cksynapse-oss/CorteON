#!/usr/bin/env node
/**
 * Automated Test Suite for Synapse Enquiry System
 * Tests:
 * 1. Phone number sanitation and validation
 * 2. Payload validation (required fields, consent, door bounds)
 * 3. Honeypot anti-spam detection
 * 4. WhatsApp click-to-chat URL generation
 * 5. Cloudflare Pages Function endpoint (JSON requests + native URL-encoded plain POSTs)
 */

import assert from 'node:assert';
import {
  cleanPhoneNumber,
  validateEnquiry,
  buildWhatsAppUrl,
  onRequestPost,
} from '../functions/api/enquire.ts';

let passed = 0;
let total = 0;

function runTest(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
  }
}

async function runAsyncTest(name, fn) {
  total++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
  }
}

console.log(
  '================================================================================'
);
console.log('SYNAPSE ENQUIRY SYSTEM TEST SUITE');
console.log(
  '================================================================================'
);

console.log('\n1. Phone number sanitisation:');
runTest('cleans standard 10-digit number', () => {
  assert.strictEqual(cleanPhoneNumber('8287248119'), '8287248119');
});
runTest('cleans formatted phone with spaces and +91', () => {
  assert.strictEqual(cleanPhoneNumber('+91 82872 48119'), '8287248119');
});
runTest('cleans phone with leading zero', () => {
  assert.strictEqual(cleanPhoneNumber('08287248119'), '8287248119');
});
runTest('cleans phone with dashes', () => {
  assert.strictEqual(cleanPhoneNumber('82872-48119'), '8287248119');
});

console.log('\n2. Validation:');
runTest('accepts valid parent enquiry', () => {
  const res = validateEnquiry({
    door: 'parent',
    name: 'Aarav Sharma',
    phone: '8287248119',
    consent: true,
  });
  assert.strictEqual(res.valid, true);
  assert.strictEqual(res.cleaned?.door, 'parent');
  assert.strictEqual(res.cleaned?.doorTitle, 'A parent or student');
  assert.strictEqual(res.cleaned?.name, 'Aarav Sharma');
  assert.strictEqual(res.cleaned?.phone, '8287248119');
});

runTest('rejects missing name', () => {
  const res = validateEnquiry({
    door: 'parent',
    name: ' ',
    phone: '8287248119',
    consent: true,
  });
  assert.strictEqual(res.valid, false);
  assert.match(res.error || '', /name/i);
});

runTest('rejects invalid phone (too short)', () => {
  const res = validateEnquiry({
    door: 'parent',
    name: 'Aarav Sharma',
    phone: '12345',
    consent: true,
  });
  assert.strictEqual(res.valid, false);
  assert.match(res.error || '', /10-digit/i);
});

runTest('rejects missing consent', () => {
  const res = validateEnquiry({
    door: 'parent',
    name: 'Aarav Sharma',
    phone: '8287248119',
    consent: false,
  });
  assert.strictEqual(res.valid, false);
  assert.match(res.error || '', /agree/i);
});

runTest('rejects invalid door', () => {
  const res = validateEnquiry({
    door: 'invalid_door',
    name: 'Aarav Sharma',
    phone: '8287248119',
    consent: true,
  });
  assert.strictEqual(res.valid, false);
  assert.match(res.error || '', /door/i);
});

console.log('\n3. WhatsApp Fallback URL:');
runTest('constructs correct prefilled WhatsApp link', () => {
  const url = buildWhatsAppUrl('parent', 'Aarav Sharma', 'PCM');
  assert.match(url, /^https:\/\/wa\.me\/918287248119\?text=/);
  assert.ok(url.includes('Aarav%20Sharma') || url.includes('Aarav+Sharma'));
  assert.ok(url.includes('PCM'));
});

console.log('\n4. Endpoint (functions/api/enquire.ts):');
await runAsyncTest('handles AJAX JSON submission successfully', async () => {
  const req = new Request('https://corteon.in/api/enquire', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      door: 'parent',
      name: 'Sunita Devi',
      phone: '8287248119',
      parent_stage: 'Class 11',
      parent_interest: 'PCM',
      consent: 'on',
    }),
  });

  const response = await onRequestPost({ request: req, env: {} });
  assert.strictEqual(response.status, 200);
  const data = await response.json();
  assert.strictEqual(data.ok, true);
  assert.strictEqual(data.callbackWindow, 'within 24 hours');
  assert.strictEqual(data.door, 'parent');
});

await runAsyncTest('silently blocks honeypot in JSON submission', async () => {
  const req = new Request('https://corteon.in/api/enquire', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      door: 'parent',
      name: 'Bot Spammer',
      phone: '8287248119',
      consent: true,
      _hp_company: 'Spam Corp Inc',
    }),
  });

  const response = await onRequestPost({ request: req, env: {} });
  assert.strictEqual(response.status, 200);
  const data = await response.json();
  assert.strictEqual(data.ok, true);
});

await runAsyncTest(
  'handles native HTML form POST without JS (redirect 303)',
  async () => {
    const formData = new URLSearchParams();
    formData.append('door', 'fellow');
    formData.append('name', 'Vikram Singh');
    formData.append('phone', '8287248119');
    formData.append('fellow_subject', 'Physics');
    formData.append('fellow_exam', 'GATE');
    formData.append('consent', 'on');

    const req = new Request('https://corteon.in/api/enquire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/html',
      },
      body: formData.toString(),
    });

    const response = await onRequestPost({ request: req, env: {} });
    assert.strictEqual(response.status, 303);
    const location = response.headers.get('Location');
    assert.ok(location);
    assert.ok(location.includes('/enquire?submitted=success'));
    assert.ok(location.includes('door=fellow'));
  }
);

await runAsyncTest(
  'redirects with error when native form POST is invalid',
  async () => {
    const formData = new URLSearchParams();
    formData.append('door', 'parent');
    formData.append('name', 'Incomplete Form');
    formData.append('phone', 'invalid'); // Bad phone

    const req = new Request('https://corteon.in/api/enquire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/html',
      },
      body: formData.toString(),
    });

    const response = await onRequestPost({ request: req, env: {} });
    assert.strictEqual(response.status, 303);
    const location = response.headers.get('Location');
    assert.ok(location);
    assert.ok(location.includes('/enquire?door=parent&error='));
  }
);

console.log(
  '--------------------------------------------------------------------------------'
);
if (passed === total) {
  console.log(`PASSED: All ${passed}/${total} test cases succeeded.`);
  process.exit(0);
} else {
  console.error(`FAILED: ${total - passed}/${total} test cases failed.`);
  process.exit(1);
}
