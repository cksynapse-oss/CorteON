/**
 * Synapse admissions sheet receiver.
 * Set SHEET_ID to the ID between /d/ and /edit in your spreadsheet URL.
 * Deploy as Web app; execute as you; access: Anyone.
 */
const SHEET_ID = '1GFDoG5nRKzT4OSMPRhvBc5CVSCgdD6PbNJJMlZJh3m8';
const SHEET_NAME = 'Enquiries';
const HEADERS = [
  'Timestamp','Student name','Class or status','Track of interest',
  'Parent or guardian name','WhatsApp number','Village or town',
  'Best time for a call','Parent or guardian consent','Status'
];
const VALID_STATUSES = ['Class 11','Class 12','12th pass or dropper','Graduate'];
const VALID_TRACKS = [
  'Engineering and Research (PCM)',
  'Medical and Allied Health (PCB)',
  'CUET UG General Test and English',
  'CUET UG Arts and Commerce, and UPSC NDA Army wing',
  'Communication and Business learning courses',
  'Not sure yet'
];
const VALID_TIMES = ['Morning','Afternoon','Evening'];
function output(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
function clean(v, max) {
  return String(v ?? '').trim().slice(0, max).replace(/^([=+@\-\t\r])/,'\'$1');
}
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (data.website) return output({ok:false,error:'Invalid submission'});
    const expected = ['student','status','track','parent','phone','location','call'];
    if (expected.some(key => !data[key] || !String(data[key]).trim()))
      return output({ok:false,error:'Missing required details'});
    if (!/^[6-9]\d{9}$/.test(String(data.phone).trim()))
      return output({ok:false,error:'Invalid mobile number'});
    if (!VALID_STATUSES.includes(data.status) || !VALID_TRACKS.includes(data.track) || !VALID_TIMES.includes(data.call))
      return output({ok:false,error:'Invalid choice'});
    if (data.consent !== true) return output({ok:false,error:'Consent required'});
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);
    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
      sheet.appendRow([
        new Date(),clean(data.student,100),clean(data.status,50),clean(data.track,150),
        clean(data.parent,100),"'" + String(data.phone).trim(),clean(data.location,120),
        clean(data.call,30),'Yes','New'
      ]);
    } finally {lock.releaseLock();}
    return output({ok:true});
  } catch (error) {
    console.error(error);
    return output({ok:false,error:'Server error'});
  }
}
