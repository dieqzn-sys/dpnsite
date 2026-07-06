import { NextResponse } from "next/server";
import { devices } from "@/data/site";
import {
  getTariffById,
  getTariffPeriodById,
  getTariffPrice,
} from "@/data/tariffs";

type LeadPayload = {
  name?: unknown;
  contact?: unknown;
  tariffId?: unknown;
  periodId?: unknown;
  device?: unknown;
  comment?: unknown;
};

type AcceptedLead = {
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

function isFilledString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

async function acceptLead(lead: AcceptedLead) {
  if (process.env.NODE_ENV !== "production") {
    console.info("[DPN lead accepted]", lead);
  }

  // Future delivery or persistence adapters can be called from this function.
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    const parsedBody: unknown = await request.json();

    if (
      !parsedBody ||
      typeof parsedBody !== "object" ||
      Array.isArray(parsedBody)
    ) {
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
    return NextResponse.json(
      { success: false, error: "Укажите имя." },
      { status: 400 },
    );
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

  if (
    !isFilledString(body.device) ||
    !devices.includes(body.device as (typeof devices)[number])
  ) {
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
    name: body.name.trim(),
    contact: body.contact.trim(),
    tariffId: tariff.id,
    tariffName: tariff.name,
    periodId: period.id,
    periodLabel: period.label,
    deviceCount: tariff.deviceCount,
    price,
    device: body.device.trim(),
    comment: typeof body.comment === "string" ? body.comment.trim() : "",
    createdAt: new Date().toISOString(),
  };

  await acceptLead(lead);

  return NextResponse.json({ success: true });
}
