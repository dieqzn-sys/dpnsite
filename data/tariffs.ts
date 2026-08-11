export const tariffPeriods = [
  { id: "14-days", label: "14 дней", shortLabel: "14 дней" },
  { id: "1-month", label: "1 месяц", shortLabel: "1 мес." },
  { id: "3-months", label: "3 месяца", shortLabel: "3 мес." },
  { id: "6-months", label: "6 месяцев", shortLabel: "6 мес." },
  { id: "12-months", label: "12 месяцев", shortLabel: "12 мес." },
] as const;

export type TariffPeriodId = (typeof tariffPeriods)[number]["id"];
export type TariffId = "start" | "pro" | "max";

export type Tariff = {
  id: TariffId;
  name: "Start" | "Pro" | "Max";
  positioning: string;
  deviceCount: number;
  prices: Record<TariffPeriodId, number>;
};

export const tariffs: Tariff[] = [
  {
    id: "start",
    name: "Start",
    positioning: "Для одного человека",
    deviceCount: 2,
    prices: {
      "14-days": 79,
      "1-month": 149,
      "3-months": 399,
      "6-months": 699,
      "12-months": 1299,
    },
  },
  {
    id: "pro",
    name: "Pro",
    positioning: "Для большинства пользователей",
    deviceCount: 5,
    prices: {
      "14-days": 119,
      "1-month": 299,
      "3-months": 799,
      "6-months": 1399,
      "12-months": 2499,
    },
  },
  {
    id: "max",
    name: "Max",
    positioning: "Для семьи и нескольких устройств",
    deviceCount: 15,
    prices: {
      "14-days": 169,
      "1-month": 599,
      "3-months": 1599,
      "6-months": 2899,
      "12-months": 4999,
    },
  },
];

export function getTariffById(id: unknown) {
  return typeof id === "string" ? tariffs.find((tariff) => tariff.id === id) : undefined;
}

export function getTariffPeriodById(id: unknown) {
  return typeof id === "string" ? tariffPeriods.find((period) => period.id === id) : undefined;
}

export function getTariffPrice(tariffId: unknown, periodId: unknown) {
  const tariff = getTariffById(tariffId);
  const period = getTariffPeriodById(periodId);
  return tariff && period ? tariff.prices[period.id] : undefined;
}

export function formatDeviceCount(count: number) {
  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;
  const noun =
    lastTwoDigits >= 12 && lastTwoDigits <= 14
      ? "устройств"
      : lastDigit >= 2 && lastDigit <= 4
        ? "устройства"
        : "устройств";

  return `${count} ${noun}`;
}
