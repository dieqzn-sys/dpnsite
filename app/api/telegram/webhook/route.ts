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
  chat?: {
    id?: unknown;
  };
};

type TelegramCallbackQuery = {
  id?: unknown;
  data?: unknown;
  message?: TelegramMessage;
};

type TelegramUpdate = {
  callback_query?: TelegramCallbackQuery;
};

type ApiResult = {
  ok?: boolean;
};

type GoogleSheetsResult = {
  success?: boolean;
  error?: string;
};

function safeResponseBody(value: string) {
  return (
    value
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim()
      .slice(0, 1000) || "(empty response)"
  );
}

function updateStatusLine(messageText: string, statusLabel: string) {
  const lines = messageText.replace(/\r\n?/g, "\n").split("\n");
  const statusLineIndex = lines.findIndex((line) =>
    line.startsWith("Статус:"),
  );
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
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();

  if (!botToken) {
    console.warn(`Telegram ${method} skipped: bot token is not configured`);
    return false;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/${method}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );
    const responseBody = await response.text();
    let result: ApiResult | null = null;

    try {
      result = JSON.parse(responseBody) as ApiResult;
    } catch {
      result = null;
    }

    if (!response.ok || !result?.ok) {
      console.error(`Telegram ${method} failed:`, {
        status: response.status,
        responseBody: safeResponseBody(responseBody),
      });
      return false;
    }

    return true;
  } catch {
    console.error(`Telegram ${method} failed: network request failed`);
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
    console.warn("Google Sheets webhook URL is not configured");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateStatus",
        leadId,
        status,
        telegramMessageId,
      }),
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(8_000),
    });
    const responseBody = await response.text();
    const safeBody = safeResponseBody(responseBody);

    console.log(
      `Google Sheets status update response status: ${response.status}`,
    );
    console.log(
      `Google Sheets status update response body: ${safeBody}`,
    );

    let result: GoogleSheetsResult | null = null;
    try {
      result = JSON.parse(responseBody) as GoogleSheetsResult;
    } catch {
      result = null;
    }

    if (!response.ok || !result?.success) {
      console.error("Google Sheets status update failed:", {
        status: response.status,
        responseBody: safeBody,
      });
    }
  } catch {
    console.error(
      "Google Sheets status update failed: network request failed",
    );
  }
}

export async function POST(request: Request) {
  let update: TelegramUpdate;

  try {
    const parsedUpdate: unknown = await request.json();
    update =
      parsedUpdate && typeof parsedUpdate === "object"
        ? (parsedUpdate as TelegramUpdate)
        : {};
  } catch {
    console.error("Telegram webhook received invalid JSON");
    return NextResponse.json({ success: true });
  }

  const callbackQuery = update.callback_query;
  if (!callbackQuery) {
    return NextResponse.json({ success: true });
  }

  console.log("Telegram callback received", {
    hasData: typeof callbackQuery.data === "string",
  });

  const callbackQueryId =
    typeof callbackQuery.id === "string" ? callbackQuery.id : "";
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

  console.log("Lead status update requested", {
    leadId: statusUpdate.leadId,
    status: statusUpdate.status,
    statusLabel: statusUpdate.statusLabel,
  });

  if (callbackQueryId) {
    await callTelegramApi("answerCallbackQuery", {
      callback_query_id: callbackQueryId,
      text: `Статус: ${statusUpdate.statusLabel}`,
    });
  }

  const message = callbackQuery.message;
  const messageId =
    typeof message?.message_id === "number" ? message.message_id : undefined;
  const chatId =
    typeof message?.chat?.id === "number" ||
    typeof message?.chat?.id === "string"
      ? message.chat.id
      : undefined;
  const messageText = typeof message?.text === "string" ? message.text : "";
  const telegramMessageId = messageId ? String(messageId) : "";

  if (messageId !== undefined && chatId !== undefined && messageText) {
    await callTelegramApi("editMessageText", {
      chat_id: chatId,
      message_id: messageId,
      text: updateStatusLine(messageText, statusUpdate.statusLabel),
      reply_markup: buildLeadStatusKeyboard(statusUpdate.leadId),
    });
  } else {
    console.error("Telegram callback message data is incomplete");
  }

  await updateGoogleSheetsStatus({
    leadId: statusUpdate.leadId,
    status: statusUpdate.statusLabel,
    telegramMessageId,
  });

  return NextResponse.json({ success: true });
}
