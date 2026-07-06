export const leadStatusLabels = {
  new: "Новая",
  in_progress: "В работе",
  paid: "Оплата получена",
  delivered: "Доступ выдан",
  rejected: "Отклонена",
} as const;

export type LeadStatusId = keyof typeof leadStatusLabels;

const statusButtons: Array<{ text: string; status: LeadStatusId }> = [
  { text: "🟡 В работу", status: "in_progress" },
  { text: "💳 Оплата получена", status: "paid" },
  { text: "✅ Доступ выдан", status: "delivered" },
  { text: "❌ Отклонить", status: "rejected" },
];

const leadIdPattern = /^DPN-\d{8}-\d{6}-[A-F0-9]{4}$/;

export function buildLeadStatusKeyboard(leadId: string) {
  return {
    inline_keyboard: [
      statusButtons.slice(0, 2).map((button) => ({
        text: button.text,
        callback_data: `lead_status:${leadId}:${button.status}`,
      })),
      statusButtons.slice(2).map((button) => ({
        text: button.text,
        callback_data: `lead_status:${leadId}:${button.status}`,
      })),
    ],
  };
}

export function parseLeadStatusCallback(data: unknown) {
  if (typeof data !== "string") {
    return undefined;
  }

  const [prefix, leadId, status] = data.split(":");
  if (
    prefix !== "lead_status" ||
    !leadIdPattern.test(leadId) ||
    !(status in leadStatusLabels)
  ) {
    return undefined;
  }

  return {
    leadId,
    status: status as LeadStatusId,
    statusLabel: leadStatusLabels[status as LeadStatusId],
  };
}
