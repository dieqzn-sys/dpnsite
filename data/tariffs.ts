export const tariffPeriods = [
  { id: "14-days", label: "14 дней" },
  { id: "1-month", label: "1 месяц" },
  { id: "3-months", label: "3 месяца" },
  { id: "6-months", label: "6 месяцев" },
  { id: "12-months", label: "12 месяцев" },
] as const;

export type TariffPeriodId = (typeof tariffPeriods)[number]["id"];
export type TariffId = "start" | "pro" | "max";

export type Tariff = {
  id: TariffId;
  name: "Start" | "Pro" | "Max";
  description: string;
  deviceCount: number;
  prices: Record<TariffPeriodId, number>;
  features: string[];
  badge?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export const tariffs: Tariff[] = [
  {
    id: "start",
    name: "Start",
    description: "Базовый доступ для личных устройств",
    deviceCount: 2,
    prices: {
      "14-days": 79,
      "1-month": 149,
      "3-months": 399,
      "6-months": 699,
      "12-months": 1299,
    },
    features: [
      "Основные VPN-локации",
      "Инструкция по подключению",
      "Поддержка при старте",
    ],
    ctaLabel: "Подключить через Telegram",
    ctaHref: "https://t.me/dpnrobot",
    secondaryCtaLabel: "Оставить заявку без Telegram",
    secondaryCtaHref: "#lead-form",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Оптимальный вариант для повседневного использования",
    deviceCount: 5,
    prices: {
      "14-days": 119,
      "1-month": 299,
      "3-months": 799,
      "6-months": 1399,
      "12-months": 2499,
    },
    features: [
      "Расширенный выбор локаций",
      "Приоритетная помощь",
      "Подходит для регулярного использования",
    ],
    badge: "Популярный",
    ctaLabel: "Подключить через Telegram",
    ctaHref: "https://t.me/dpnrobot",
    secondaryCtaLabel: "Оставить заявку без Telegram",
    secondaryCtaHref: "#lead-form",
  },
  {
    id: "max",
    name: "Max",
    description: "Расширенный доступ для нескольких устройств",
    deviceCount: 15,
    prices: {
      "14-days": 169,
      "1-month": 599,
      "3-months": 1599,
      "6-months": 2899,
      "12-months": 4999,
    },
    features: [
      "Все обычные VPN-локации",
      "Расширенная поддержка",
      "Удобно для личных устройств",
    ],
    ctaLabel: "Подключить через Telegram",
    ctaHref: "https://t.me/dpnrobot",
    secondaryCtaLabel: "Оставить заявку без Telegram",
    secondaryCtaHref: "#lead-form",
  },
];

export function getTariffById(id: unknown) {
  return typeof id === "string"
    ? tariffs.find((tariff) => tariff.id === id)
    : undefined;
}

export function getTariffPeriodById(id: unknown) {
  return typeof id === "string"
    ? tariffPeriods.find((period) => period.id === id)
    : undefined;
}

export function getTariffPrice(tariffId: unknown, periodId: unknown) {
  const tariff = getTariffById(tariffId);
  const period = getTariffPeriodById(periodId);

  return tariff && period ? tariff.prices[period.id] : undefined;
}

export function getMinimumTariffPrice(tariff: Tariff) {
  return Math.min(
    ...tariffPeriods.map((period) => tariff.prices[period.id]),
  );
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
