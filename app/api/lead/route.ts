import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { devices } from "@/data/site";
import {
  getTariffById,
  getTariffPeriodById,
  getTariffPrice,
} from "@/data/tariffs";
import {
  buildLeadStatusKeyboard,
  leadStatusLabels,
} from "@/lib/lead-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: unknown;
  contact?: unknown;
  tariffId?: unknown;
  periodId?: unknown;
  device?: unknown;
  comment?: unknown;
};

type AcceptedLead = {
  leadId: string;
  name: string;
  contact: string;
  tariffId: string;
  tariffName: string;
  periodId: string;
  periodLabel: string;
  deviceCount: number;
  price: number;
  device: string;
  comment: string;
  createdAt: string;
};

type TelegramApiResponse = {
  ok?: boolean;
  result?: { message_id?: number };
};

type GoogleSheetsResponse = {
  success?: boolean;
  error?: string;
};

type DeliveryResult = {
  ok: boolean;
  messageId?: string;
};

const retryableStatuses = new Set([408, 425, 429, 500, 502, 503, 504]);

function isFilledString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function generateLeadId() {
  const now = new Date();
  const date = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");
  const time = [
    String(now.getUTCHours()).padStart(2, "0"),
    String(now.getUTCMinutes()).padStart(2, "0"),
    String(now.getUTCSeconds()).padStart(2, "0"),
  ].join("");
  const randomCode = randomBytes(2).toString("hex").toUpperCase();

  // Keep the established technical prefix: Telegram callback parsing relies on it.
  return `DPN-${date}-${time}-${randomCode}`;
}

function sanitizeInlineText(value: string, maxLength: number) {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultilineText(value: string, maxLength: number) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function safeResponseBody(value: string) {
  return sanitizeMultilineText(value, 1000) || "(empty response)";
}

function wait(delayMs: number) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

async function fetchWithRetry(
  url: string,
  init: Omit<RequestInit, "signal">,
  { attempts, timeoutMs }: { attempts: number; timeoutMs: number },
) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        ...init,
        cache: "no-store",
        signal: AbortSignal.timeout(timeoutMs),
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

    await wait(250 * attempt);
  }

  throw lastError instanceof Error ? lastError : new Error("Request failed");
}

function buildTelegramMessage(lead: AcceptedLead) {
  const comment = sanitizeMultilineText(lead.comment, 1500) || "—";

  return [
    "Новая заявка DEPKOV VPN",
    `Статус: ${leadStatusLabels.new}`,
    `ID: ${lead.leadId}`,
    "",
    `Тариф: ${sanitizeInlineText(lead.tariffName, 80)}`,
    `Срок: ${sanitizeInlineText(lead.periodLabel, 80)}`,
    `Сумма: ${lead.price} ₽`,
    `Устройств: ${lead.deviceCount}`,
    "",
    `Имя: ${sanitizeInlineText(lead.name, 160)}`,
    `Контакт: ${sanitizeInlineText(lead.contact, 240)}`,
    `Устройство: ${sanitizeInlineText(lead.device, 80)}`,
    `Комментарий: ${comment}`,
    "",
    "Источник: сайт",
  ].join("\n");
}

async function sendTelegramNotification(lead: AcceptedLead): Promise<DeliveryResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    console.warn("Telegram send skipped: credentials are not configured");
    return { ok: false };
  }

  try {
    // sendMessage is not idempotent, so an ambiguous timeout must not create duplicates.
    const response = await fetchWithRetry(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildTelegramMessage(lead),
          reply_markup: buildLeadStatusKeyboard(lead.leadId),
        }),
      },
      { attempts: 1, timeoutMs: 8_000 },
    );
    const responseBody = await response.text();
    let result: TelegramApiResponse | null = null;

    try {
      result = JSON.parse(responseBody) as TelegramApiResponse;
    } catch {
      result = null;
    }

    const messageId = result?.result?.message_id;
    if (!response.ok || !result?.ok || typeof messageId !== "number") {
      console.error("Telegram send failed", {
        status: response.status,
        responseBody: safeResponseBody(responseBody),
      });
      return { ok: false };
    }

    return { ok: true, messageId: String(messageId) };
  } catch (error) {
    console.error("Telegram send failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return { ok: false };
  }
}

async function sendGoogleSheetsWebhook(
  lead: AcceptedLead,
  telegramMessageId: string,
): Promise<DeliveryResult> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    console.warn("Google Sheets webhook is not configured");
    return { ok: false };
  }

  try {
    // Apps Script deduplicates createLead by leadId, making a retry safe.
    const response = await fetchWithRetry(
      webhookUrl,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createLead",
          leadId: lead.leadId,
          status: leadStatusLabels.new,
          tariff: lead.tariffName,
          period: lead.periodLabel,
          price: lead.price,
          devices: lead.deviceCount,
          name: lead.name,
          contact: lead.contact,
          device: lead.device,
          comment: lead.comment,
          source: "сайт",
          telegramMessageId,
          createdAt: lead.createdAt,
        }),
        redirect: "follow",
      },
      { attempts: 2, timeoutMs: 8_000 },
    );
    const responseBody = await response.text();
    let result: GoogleSheetsResponse | null = null;

    try {
      result = JSON.parse(responseBody) as GoogleSheetsResponse;
    } catch {
      result = null;
    }

    if (!response.ok || !result?.success) {
      console.error("Google Sheets createLead failed", {
        status: response.status,
        responseBody: safeResponseBody(responseBody),
      });
      return { ok: false };
    }

    return { ok: true };
  } catch (error) {
    console.error("Google Sheets createLead failed", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return { ok: false };
  }
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    const parsedBody: unknown = await request.json();
    if (!parsedBody || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      throw new Error("Invalid body");
    }
    body = parsedBody as LeadPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Некорректный формат данных." },
      { status: 400 },
    );
  }

  if (!isFilledString(body.name)) {
    return NextResponse.json({ success: false, error: "Укажите имя." }, { status: 400 });
  }
  if (!isFilledString(body.contact)) {
    return NextResponse.json(
      { success: false, error: "Укажите контакт для связи." },
      { status: 400 },
    );
  }

  const tariff = getTariffById(body.tariffId);
  if (!tariff) {
    return NextResponse.json(
      { success: false, error: "Выберите корректный тариф." },
      { status: 400 },
    );
  }

  const period = getTariffPeriodById(body.periodId);
  if (!period) {
    return NextResponse.json(
      { success: false, error: "Выберите корректный срок." },
      { status: 400 },
    );
  }

  if (!isFilledString(body.device) || !devices.includes(body.device as (typeof devices)[number])) {
    return NextResponse.json(
      { success: false, error: "Выберите корректное устройство." },
      { status: 400 },
    );
  }

  const price = getTariffPrice(tariff.id, period.id);
  if (price === undefined) {
    return NextResponse.json(
      { success: false, error: "Не удалось определить стоимость." },
      { status: 400 },
    );
  }

  const lead: AcceptedLead = {
    leadId: generateLeadId(),
    name: sanitizeInlineText(body.name, 160),
    contact: sanitizeInlineText(body.contact, 240),
    tariffId: tariff.id,
    tariffName: tariff.name,
    periodId: period.id,
    periodLabel: period.label,
    deviceCount: tariff.deviceCount,
    price,
    device: sanitizeInlineText(body.device, 80),
    comment: typeof body.comment === "string" ? sanitizeMultilineText(body.comment, 1500) : "",
    createdAt: new Date().toISOString(),
  };

  const telegram = await sendTelegramNotification(lead);
  const sheets = await sendGoogleSheetsWebhook(lead, telegram.messageId ?? "");

  if (!telegram.ok && !sheets.ok) {
    console.error("Lead delivery failed in every configured destination", {
      leadId: lead.leadId,
    });
    return NextResponse.json(
      {
        success: false,
        error: "Не удалось сохранить заявку. Попробуйте ещё раз или свяжитесь с поддержкой.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true });
}
