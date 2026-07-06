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
  { label: "Тарифы", href: "#tariffs" },
  { label: "Как подключиться", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Поддержка", href: "#support" },
] as const;

export const devices = [
  "iPhone",
  "Android",
  "Windows",
  "macOS",
  "Другое",
] as const;

export const telegramSteps = [
  "Откройте Telegram-бота DPN",
  "Выберите срок и тариф",
  "Оплатите",
  "Получите VPN-подписку автоматически",
  "Подключитесь по инструкции",
] as const;

export const manualSteps = [
  "Оставьте заявку на сайте",
  "Укажите контакт и устройство",
  "Получите данные для оплаты",
  "После оформления мы создадим VPN-подписку",
  "Отправим ссылку подключения на указанный контакт",
] as const;
