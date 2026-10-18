/**
 * Synapse Enquiry Webhook — Google Apps Script
 *
 * Receives enquiry submissions from corteon.in (/api/enquire),
 * records them into a Google Sheet ("Enquiries"), and sends an immediate
 * notification email to the owner at cksynapse@mail.com.
 *
 * -----------------------------------------------------------------------------
 * SETUP INSTRUCTIONS (Takes ~2 minutes):
 * -----------------------------------------------------------------------------
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet:
 *    "Synapse Admissions & Enquiries"
 * 2. In the menu, go to: Extensions > Apps Script
 * 3. Delete any default code in Code.gs and paste this entire file.
 * 4. Click the "Save" icon (or Ctrl+S / Cmd+S).
 * 5. Click "Deploy" > "New deployment" (top right blue button).
 * 6. Click the gear icon next to "Select type" and select "Web app".
 * 7. Fill in the deployment configuration:
 *    - Description: "Synapse Enquiry Webhook v1"
 *    - Execute as: "Me (your Google account)"
 *    - Who has access: "Anyone"
 * 8. Click "Deploy".
 * 9. Review and grant permissions (Google will ask to authorize accessing
 *    Spreadsheets and sending emails via your account).
 * 10. Copy the Web app URL (format: https://script.google.com/macros/s/.../exec).
 * 11. In Cloudflare Pages project settings, add the environment variable:
 *     APPS_SCRIPT_URL = <copied_url>
 * -----------------------------------------------------------------------------
 */

const OWNER_EMAIL = 'cksynapse@mail.com';
const SHEET_NAME = 'Enquiries';

/**
 * Handle incoming HTTP POST requests from /api/enquire
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        ok: false,
        error: 'Missing request body',
      });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        ok: false,
        error: 'Invalid JSON payload: ' + parseErr.message,
      });
    }

    // Required fields verification
    if (!data.name || !data.phone) {
      return createJsonResponse({
        ok: false,
        error: 'Name and phone are required fields.',
      });
    }

    const timestamp = new Date();
    const sheet = getOrCreateSheet();

    // Append new row
    sheet.appendRow([
      timestamp,
      data.door || 'parent',
      data.doorTitle || 'A parent or student',
      data.name || '',
      "'" + String(data.phone || ''), // Leading apostrophe preserves phone string formatting in Sheets
      data.email || '',
      data.stageOrSubject || '',
      data.interestOrExam || '',
      data.message || '',
      'New',
    ]);

    // Send email notification to owner
    sendEmailNotification(data, timestamp);

    return createJsonResponse({
      ok: true,
      timestamp: timestamp.toISOString(),
      message: 'Enquiry recorded successfully.',
    });
  } catch (err) {
    return createJsonResponse({
      ok: false,
      error: err.toString(),
    });
  }
}

/**
 * Handle HTTP GET request (health check / verification)
 */
function doGet(e) {
  return createJsonResponse({
    ok: true,
    service: 'Synapse Enquiry Webhook',
    status: 'ACTIVE',
    timestamp: new Date().toISOString(),
  });
}

/**
 * Get or create the "Enquiries" worksheet with formatted column headers
 */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [
      'Timestamp',
      'Door ID',
      'Door Title',
      'Name',
      'Phone/WhatsApp',
      'Email',
      'Stage / Subject / District',
      'Interest / Track / Space',
      'Message',
      'Status',
    ];
    sheet.appendRow(headers);

    // Header formatting: bold text, light background, frozen header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#F3EEE4');
    headerRange.setFontColor('#15130F');
    sheet.setFrozenRows(1);

    // Auto-fit initial column widths
    for (let col = 1; col <= headers.length; col++) {
      sheet.autoResizeColumn(col);
    }
  }

  return sheet;
}

/**
 * Send email notification to owner
 */
function sendEmailNotification(data, timestamp) {
  const doorTitle = data.doorTitle || data.door || 'General Enquiry';
  const subject = `[Synapse Enquiry] ${doorTitle} - ${data.name}`;

  const body =
    `New enquiry received for Synapse:\n\n` +
    `Door: ${doorTitle} (${data.door || 'parent'})\n` +
    `Name: ${data.name}\n` +
    `Phone / WhatsApp: ${data.phone}\n` +
    (data.email ? `Email: ${data.email}\n` : '') +
    (data.stageOrSubject
      ? `Stage / Subject / District: ${data.stageOrSubject}\n`
      : '') +
    (data.interestOrExam
      ? `Interest / Track / Space: ${data.interestOrExam}\n`
      : '') +
    (data.message ? `Message / Questions:\n${data.message}\n` : '') +
    `\nSubmitted At: ${timestamp.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST\n` +
    `Callback window promised: within 24 hours\n`;

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    body: body,
  });
}

/**
 * Helper to construct JSON response
 */
function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
