export type BenefitIcon =
  | "globe"
  | "zap"
  | "devices"
  | "support"
  | "shield"
  | "nodes";

export type Benefit = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

export const benefits: Benefit[] = [
  {
    title: "Множество локаций",
    description:
      "Выбирайте подходящую обычную VPN-локацию для стабильного подключения.",
    icon: "globe",
  },
  {
    title: "Быстрый старт",
    description:
      "Автоматическая выдача через Telegram сразу после оформления доступа.",
    icon: "zap",
  },
  {
    title: "Для всех устройств",
    description:
      "Подключение на iPhone, Android, Windows и macOS по понятной инструкции.",
    icon: "devices",
  },
  {
    title: "Поддержка рядом",
    description:
      "Поможем установить приложение, добавить подписку и проверить соединение.",
    icon: "support",
  },
  {
    title: "Основной или резервный",
    description:
      "Используйте DEPKOV VPN каждый день или держите готовым на случай необходимости.",
    icon: "shield",
  },
  {
    title: "Специальные узлы",
    description:
      "Для сложных случаев доступны отдельные узлы со своими лимитами и условиями.",
    icon: "nodes",
  },
];

