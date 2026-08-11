export type BenefitIcon = "spark" | "devices" | "route" | "support";

export type Benefit = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

export const benefits: Benefit[] = [
  {
    title: "Быстрый старт",
    description: "Оформите подписку через Telegram-бота или оставьте заявку на сайте.",
    icon: "spark",
  },
  {
    title: "Все ваши устройства",
    description: "Тарифы рассчитаны на 2, 5 или 15 устройств — выбирайте нужный вариант.",
    icon: "devices",
  },
  {
    title: "iOS, Android, Windows, macOS",
    description: "Подключение доступно для устройств на поддерживаемых платформах.",
    icon: "route",
  },
  {
    title: "Поддержка в Telegram",
    description: "Поддержка подскажет, как добавить подписку и проверить параметры подключения.",
    icon: "support",
  },
];
