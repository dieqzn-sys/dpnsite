/* global ContentService, SpreadsheetApp */
/* eslint-disable @typescript-eslint/no-unused-vars */

const SHEET_NAME = "Заявки";

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function createLead(sheet, payload) {
  const now = new Date();

  sheet.appendRow([
    payload.leadId || "",
    now,
    payload.status || "Новая",
    payload.tariff || "",
    payload.period || "",
    payload.price || "",
    payload.devices || "",
    payload.name || "",
    payload.contact || "",
    payload.device || "",
    payload.comment || "",
    payload.source || "сайт",
    payload.telegramMessageId || "",
    now,
  ]);

  return jsonResponse({ success: true });
}

function updateLeadStatus(sheet, payload) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return jsonResponse({ success: false, error: "Lead not found" });
  }

  const leadIds = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  const leadIndex = leadIds.findIndex(
    (row) => String(row[0]) === String(payload.leadId),
  );

  if (leadIndex < 0) {
    return jsonResponse({ success: false, error: "Lead not found" });
  }

  const rowNumber = leadIndex + 2;
  sheet.getRange(rowNumber, 3).setValue(payload.status || "");
  sheet.getRange(rowNumber, 14).setValue(new Date());

  if (payload.telegramMessageId) {
    sheet.getRange(rowNumber, 13).setValue(payload.telegramMessageId);
  }

  return jsonResponse({ success: true });
}

function doPost(event) {
  try {
    const contents =
      event && event.postData && event.postData.contents
        ? event.postData.contents
        : "{}";
    const payload = JSON.parse(contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
      SHEET_NAME,
    );

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
  }
}
