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
    title: "Выберите способ подключения",
    description: "Откройте Telegram-бота или оставьте заявку на сайте и получите помощь.",
  },
  {
    title: "Выберите тариф",
    description: "Ориентируйтесь на количество устройств и подходящий срок подписки.",
  },
  {
    title: "Получите данные",
    description: "После оформления вам передадут данные для подключения.",
  },
  {
    title: "Подключите устройство",
    description: "Следуйте инструкции для iPhone, Android, Windows или macOS.",
  },
] as const;
