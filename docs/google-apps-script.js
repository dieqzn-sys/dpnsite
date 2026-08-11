/* global ContentService, LockService, SpreadsheetApp */
/* eslint-disable @typescript-eslint/no-unused-vars */

const SHEET_NAME = "Заявки";
const STATUS_VALUES = [
  "Новая",
  "В работе",
  "Оплата получена",
  "Доступ выдан",
  "Отклонена",
];

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function sanitizeSheetValue(value) {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "number" || typeof value === "boolean" || value instanceof Date) {
    return value;
  }

  const text = String(value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .slice(0, 5000);

  // Sheets treats these prefixes as formulas, even when they come from a form.
  return /^\s*[=+\-@]/.test(text) ? `'${text}` : text;
}

function findLeadRow(sheet, leadId) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  const target = String(leadId || "");
  const leadIds = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  const leadIndex = leadIds.findIndex((row) => String(row[0]) === target);
  return leadIndex < 0 ? 0 : leadIndex + 2;
}

function createLead(sheet, payload) {
  const leadId = String(payload.leadId || "");
  if (!leadId) {
    return jsonResponse({ success: false, error: "Lead ID is required" });
  }

  const existingRow = findLeadRow(sheet, leadId);
  if (existingRow) {
    return jsonResponse({ success: true, created: false, leadId });
  }

  const now = new Date();
  sheet.appendRow([
    sanitizeSheetValue(leadId),
    now,
    sanitizeSheetValue(payload.status || "Новая"),
    sanitizeSheetValue(payload.tariff),
    sanitizeSheetValue(payload.period),
    sanitizeSheetValue(payload.price),
    sanitizeSheetValue(payload.devices),
    sanitizeSheetValue(payload.name),
    sanitizeSheetValue(payload.contact),
    sanitizeSheetValue(payload.device),
    sanitizeSheetValue(payload.comment),
    sanitizeSheetValue(payload.source || "сайт"),
    sanitizeSheetValue(payload.telegramMessageId),
    now,
  ]);
  SpreadsheetApp.flush();

  if (!findLeadRow(sheet, leadId)) {
    return jsonResponse({ success: false, error: "Lead write was not confirmed" });
  }

  return jsonResponse({ success: true, created: true, leadId });
}

function updateLeadStatus(sheet, payload) {
  const leadId = String(payload.leadId || "");
  const status = String(payload.status || "");
  if (!leadId || !STATUS_VALUES.includes(status)) {
    return jsonResponse({ success: false, error: "Invalid status update" });
  }

  const rowNumber = findLeadRow(sheet, leadId);
  if (!rowNumber) {
    return jsonResponse({ success: false, error: "Lead not found" });
  }

  sheet.getRange(rowNumber, 3).setValue(status);
  sheet.getRange(rowNumber, 14).setValue(new Date());
  if (payload.telegramMessageId) {
    sheet.getRange(rowNumber, 13).setValue(
      sanitizeSheetValue(payload.telegramMessageId),
    );
  }
  SpreadsheetApp.flush();

  const persistedStatus = sheet.getRange(rowNumber, 3).getDisplayValue();
  if (persistedStatus !== status) {
    return jsonResponse({ success: false, error: "Status write was not confirmed" });
  }

  return jsonResponse({ success: true, status: persistedStatus });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    if (!lock.tryLock(5000)) {
      return jsonResponse({ success: false, error: "Spreadsheet is busy" });
    }

    const contents =
      event && event.postData && event.postData.contents
        ? event.postData.contents
        : "{}";
    const payload = JSON.parse(contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return jsonResponse({ success: false, error: "Sheet not found" });
    }
    if (!payload.action || payload.action === "createLead") {
      return createLead(sheet, payload);
    }
    if (payload.action === "updateStatus") {
      return updateLeadStatus(sheet, payload);
    }

    return jsonResponse({ success: false, error: "Unknown action" });
  } catch (error) {
    return jsonResponse({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}
