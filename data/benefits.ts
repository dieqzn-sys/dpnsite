export type BenefitIcon = "spark" | "devices" | "route" | "support";

export type Benefit = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

export const benefits: Benefit[] = [
  {
    title: "Понятное оформление",
    description: "Оформите подписку через Telegram-бота или оставьте заявку на сайте.",
    icon: "spark",
  },
  {
    title: "До 15 устройств",
    description: "Тарифы рассчитаны на 2, 5 или 15 устройств — выбирайте нужный вариант.",
    icon: "devices",
  },
  {
    title: "Знакомые платформы",
    description: "Подключение доступно для iPhone, Android, Windows и macOS.",
    icon: "route",
  },
  {
    title: "Помощь с настройкой",
    description: "Поддержка подскажет, как добавить подписку и проверить параметры подключения.",
    icon: "support",
  },
];
