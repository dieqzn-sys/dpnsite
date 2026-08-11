export const siteLinks = {
  telegramBot: "https://t.me/dpnrobot",
  telegramChannel: "https://t.me/dpn_news",
  telegramSupport: "https://t.me/depkov",
  telegramSupportLabel: "@depkov",
  email: "mailto:depkov@icloud.com",
  emailLabel: "depkov@icloud.com",
} as const;

export const navigation = [
  { label: "Преимущества", href: "#benefits" },
  { label: "Как это работает", href: "#how-it-works" },
  { label: "Тарифы", href: "#tariffs" },
  { label: "О сервисе", href: "#security" },
  { label: "FAQ", href: "#faq" },
] as const;

export const devices = ["iPhone", "Android", "Windows", "macOS", "Другое"] as const;

export const connectionSteps = [
  {
    title: "Выберите тариф",
    description: "Ориентируйтесь на количество устройств и срок подписки.",
  },
  {
    title: "Оформите доступ",
    description: "Используйте Telegram-бота или оставьте заявку на сайте.",
  },
  {
    title: "Подключите устройства",
    description: "Получите данные доступа и следуйте инструкции для своей платформы.",
  },
] as const;
