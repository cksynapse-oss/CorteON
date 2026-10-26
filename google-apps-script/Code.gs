/**
 * Corteon Form Submissions — Google Apps Script Web App
 *
 * Persists submissions from corteon.in (/api/submit) to Google Sheets.
 * Handles both "waitlist" and "contributor" forms.
 *
 * Setup:
 * 1. Open Google Sheets (https://sheets.new) and name it "Corteon Submissions".
 * 2. In the menu, go to: Extensions > Apps Script.
 * 3. Replace all code in the editor with this file and Save (Ctrl+S / Cmd+S).
 * 4. Click "Deploy" > "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Set:
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click "Deploy" and authorize permissions.
 * 8. Copy the Web app URL (https://script.google.com/macros/s/.../exec).
 */

const OWNER_EMAIL = 'ckshandil3@gmail.com'; // Notification recipient

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ ok: false, error: 'Missing request body' });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      return createJsonResponse({ ok: false, error: 'Invalid JSON: ' + err.message });
    }

    const type = String(data.type || 'unknown').toLowerCase();
    const timestamp = new Date();
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Record into master "All Submissions" tab
    const masterSheet = getOrCreateSheet(ss, 'All Submissions', [
      'Timestamp (IST)',
      'Type',
      'Name',
      'Email',
      'Area',
      'Interest / Notes',
      'Message'
    ]);
    masterSheet.appendRow([
      formatDate(timestamp),
      type,
      data.name || '',
      data.email || '',
      data.area || '',
      data.interest || '',
      data.message || ''
    ]);

    // 2. Also record into dedicated tab for easy filtering
    if (type === 'waitlist') {
      const waitlistSheet = getOrCreateSheet(ss, 'Waitlist', [
        'Timestamp (IST)',
        'Email',
        'Interest / Notes'
      ]);
      waitlistSheet.appendRow([
        formatDate(timestamp),
        data.email || '',
        data.interest || ''
      ]);
    } else if (type === 'contributor') {
      const contributorSheet = getOrCreateSheet(ss, 'Contributors', [
        'Timestamp (IST)',
        'Name',
        'Email',
        'Area',
        'Message'
      ]);
      contributorSheet.appendRow([
        formatDate(timestamp),
        data.name || '',
        data.email || '',
        data.area || '',
        data.message || ''
      ]);
    }

    // 3. Send email notification to owner (safe fallback)
    try {
      sendNotificationEmail(data, timestamp);
    } catch (mailErr) {
      console.warn('Mail notification skipped:', mailErr);
    }

    return createJsonResponse({ ok: true, timestamp: timestamp.toISOString() });
  } catch (err) {
    return createJsonResponse({ ok: false, error: err.toString() });
  }
}

function doGet(e) {
  return createJsonResponse({
    ok: true,
    service: 'Corteon Form Submission Webhook',
    status: 'ACTIVE',
    timestamp: new Date().toISOString()
  });
}

function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
    const range = sheet.getRange(1, 1, 1, headers.length);
    range.setFontWeight('bold');
    range.setBackground('#1C2554');
    range.setFontColor('#FFFFFF');
    sheet.setFrozenRows(1);
    for (let c = 1; c <= headers.length; c++) {
      sheet.autoResizeColumn(c);
    }
  }
  return sheet;
}

function formatDate(date) {
  return Utilities.formatDate(date, 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');
}

function sendNotificationEmail(data, timestamp) {
  const isContributor = data.type === 'contributor';
  const subject = `[Corteon] New ${isContributor ? 'Contributor Application' : 'Waitlist Signup'}: ${data.email}`;
  let body = `New submission on corteon.in:\n\n` +
    `Type: ${data.type}\n` +
    `Email: ${data.email}\n`;
  if (data.name) body += `Name: ${data.name}\n`;
  if (data.area) body += `Area: ${data.area}\n`;
  if (data.interest) body += `Interest: ${data.interest}\n`;
  if (data.message) body += `Message:\n${data.message}\n`;
  body += `\nTime: ${formatDate(timestamp)} IST\n`;

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    body: body
  });
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
