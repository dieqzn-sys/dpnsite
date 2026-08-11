import { NextResponse } from "next/server";
import {
  buildLeadStatusKeyboard,
  parseLeadStatusCallback,
} from "@/lib/lead-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TelegramMessage = {
  message_id?: unknown;
  text?: unknown;
  chat?: { id?: unknown };
};

type TelegramUpdate = {
  callback_query?: {
    id?: unknown;
    data?: unknown;
    message?: TelegramMessage;
  };
};

type ApiResult = { ok?: boolean };
type GoogleSheetsResult = { success?: boolean; error?: string };

const retryableStatuses = new Set([408, 425, 429, 500, 502, 503, 504]);

function safeResponseBody(value: string) {
  return (
    value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim()
      .slice(0, 1000) || "(empty response)"
  );
}

function wait(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function fetchWithRetry(
  url: string,
  init: Omit<RequestInit, "signal">,
  attempts = 2,
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        cache: "no-store",
        signal: AbortSignal.timeout(4_000),
      });
      if (!retryableStatuses.has(response.status) || attempt === attempts) {
        return response;
      }
      await response.body?.cancel();
    } catch (error) {
      lastError = error;
      if (attempt === attempts) {
        throw error;
      }
    }

    await wait(200 * attempt);
  }

  throw lastError instanceof Error ? lastError : new Error("Request failed");
}

function updateStatusLine(messageText: string, statusLabel: string) {
  const lines = messageText.replace(/\r\n?/g, "\n").split("\n");
  const statusLineIndex = lines.findIndex((line) => line.startsWith("Статус:"));
  const nextStatusLine = `Статус: ${statusLabel}`;

  if (statusLineIndex >= 0) {
    lines[statusLineIndex] = nextStatusLine;
  } else {
    lines.splice(1, 0, nextStatusLine);
  }

  return lines.join("\n");
}

async function callTelegramApi(
  method: "answerCallbackQuery" | "editMessageText",
  payload: Record<string, unknown>,
  attempts = 1,
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!botToken) {
    console.warn(`Telegram ${method} skipped: bot token is not configured`);
    return false;
  }

  try {
    const response = await fetchWithRetry(
      `https://api.telegram.org/bot${botToken}/${method}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      attempts,
    );
    const responseBody = await response.text();
    let result: ApiResult | null = null;

    try {
      result = JSON.parse(responseBody) as ApiResult;
    } catch {
      result = null;
    }

    if (!response.ok || !result?.ok) {
      console.error(`Telegram ${method} failed`, {
        status: response.status,
        responseBody: safeResponseBody(responseBody),
      });
      return false;
    }
    return true;
  } catch (error) {
    console.error(`Telegram ${method} failed`, {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return false;
  }
}

async function updateGoogleSheetsStatus({
  leadId,
  status,
  telegramMessageId,
}: {
  leadId: string;
  status: string;
  telegramMessageId: string;
}) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    console.warn("Google Sheets webhook is not configured");
    return false;
  }

  try {
    const response = await fetchWithRetry(
      webhookUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateStatus",
          leadId,
          status,
          telegramMessageId,
        }),
        redirect: "follow",
      },
      2,
    );
    const responseBody = await response.text();
    let result: GoogleSheetsResult | null = null;

    try {
      result = JSON.parse(responseBody) as GoogleSheetsResult;
    } catch {
      result = null;
    }

    if (!response.ok || !result?.success) {
      console.error("Google Sheets status update failed", {
        status: response.status,
        responseBody: safeResponseBody(responseBody),
      });
      return false;
    }
    return true;
  } catch (error) {
    console.error("Google Sheets status update failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return false;
  }
}

export async function POST(request: Request) {
  let update: TelegramUpdate;

  try {
    const parsedUpdate: unknown = await request.json();
    update = parsedUpdate && typeof parsedUpdate === "object" ? (parsedUpdate as TelegramUpdate) : {};
  } catch {
    console.error("Telegram webhook received invalid JSON");
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const callbackQuery = update.callback_query;
  if (!callbackQuery) {
    return NextResponse.json({ success: true });
  }

  const callbackQueryId = typeof callbackQuery.id === "string" ? callbackQuery.id : "";
  const statusUpdate = parseLeadStatusCallback(callbackQuery.data);

  if (!statusUpdate) {
    if (callbackQueryId) {
      await callTelegramApi("answerCallbackQuery", {
        callback_query_id: callbackQueryId,
        text: "Неизвестное действие",
        show_alert: true,
      });
    }
    return NextResponse.json({ success: true });
  }

  const message = callbackQuery.message;
  const messageId = typeof message?.message_id === "number" ? message.message_id : undefined;
  const chatId =
    typeof message?.chat?.id === "number" || typeof message?.chat?.id === "string"
      ? message.chat.id
      : undefined;
  const messageText = typeof message?.text === "string" ? message.text : "";
  const telegramMessageId = messageId === undefined ? "" : String(messageId);

  if (messageId === undefined || chatId === undefined || !messageText) {
    console.error("Telegram callback message data is incomplete");
    return NextResponse.json({ success: false }, { status: 400 });
  }

  // Google Sheets is the status source of truth. Telegram is updated only after
  // Apps Script confirms the persisted value.
  const sheetUpdated = await updateGoogleSheetsStatus({
    leadId: statusUpdate.leadId,
    status: statusUpdate.statusLabel,
    telegramMessageId,
  });

  if (!sheetUpdated) {
    if (callbackQueryId) {
      await callTelegramApi("answerCallbackQuery", {
        callback_query_id: callbackQueryId,
        text: "Статус не сохранён. Попробуйте ещё раз.",
        show_alert: true,
      });
    }
    return NextResponse.json({ success: false }, { status: 502 });
  }

  const telegramUpdated = await callTelegramApi(
    "editMessageText",
    {
      chat_id: chatId,
      message_id: messageId,
      text: updateStatusLine(messageText, statusUpdate.statusLabel),
      reply_markup: buildLeadStatusKeyboard(statusUpdate.leadId),
    },
    2,
  );

  if (!telegramUpdated) {
    // A non-2xx response asks Telegram to retry; the Sheets update is idempotent.
    return NextResponse.json({ success: false }, { status: 502 });
  }

  if (callbackQueryId) {
    await callTelegramApi("answerCallbackQuery", {
      callback_query_id: callbackQueryId,
      text: `Статус: ${statusUpdate.statusLabel}`,
    });
  }

  return NextResponse.json({ success: true });
}
