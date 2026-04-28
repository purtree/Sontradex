// ═══════════════════════════════════════════════════════════════
//  SONTRADEX — Google Apps Script  (Newsletter → Google Sheets)
//
//  SETUP (krok za krokem):
//    1. Otevři Google Sheets: sheets.google.com  → nový list
//    2. Extensions → Apps Script
//    3. Nahraď celý editor tímto kódem → Save (💾)
//    4. Deploy → New deployment
//         Type:            Web app
//         Execute as:      Me
//         Who has access:  Anyone
//    5. Deploy → zkopíruj Web App URL
//    6. V index.html nahraď  YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
//       za zkopírovanou URL
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('subscribers') || ss.insertSheet('subscribers');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Language', 'Source']);
      sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    let data = {};
    try { data = JSON.parse(e.postData.contents); } catch (_) {}

    const email = (data.email || '').trim().toLowerCase();
    if (!email) return ok();

    // Dedup: skip if already subscribed
    const rows = sheet.getLastRow() - 1;
    if (rows > 0) {
      const existing = sheet.getRange(2, 2, rows, 1).getValues().flat();
      if (existing.includes(email)) return ok();
    }

    sheet.appendRow([
      new Date().toISOString(),
      email,
      data.lang   || 'cs',
      data.source || 'sontradex.com'
    ]);

    return ok();
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', msg: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Sontradex Subscribers' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
