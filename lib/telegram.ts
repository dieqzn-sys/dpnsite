export type LeadNotification = {
  tariffName: string;
  periodLabel: string;
  deviceCount: number;
  price: number;
  name: string;
  contact: string;
  device: string;
  comment: string;
};

type TelegramApiResponse = {
  ok?: boolean;
  description?: string;
};

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

function buildLeadMessage(lead: LeadNotification) {
  const comment = sanitizeMultilineText(lead.comment, 1500) || "—";

  return [
    "Новая заявка DPN",
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

export async function sendTelegramLeadNotification(
  lead: LeadNotification,
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    console.warn(
      "[DPN lead] Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.",
    );
    return;
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: buildLeadMessage(lead),
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(8_000),
      },
    );

    const result = (await response.json().catch(() => null)) as
      | TelegramApiResponse
      | null;

    if (!response.ok || !result?.ok) {
      console.error("[DPN lead] Telegram API rejected the notification.", {
        status: response.status,
        description: result?.description ?? "Unknown Telegram API error",
      });
    }
  } catch {
    console.error("[DPN lead] Telegram notification request failed.");
  }
}
