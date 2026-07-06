import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DPN — приватная сеть для стабильного доступа",
  description:
    "DEPKOV PRIVATE NETWORK — VPN-подписка для телефона, ПК и ноутбука с подключением через Telegram или по заявке.",
  applicationName: "DPN",
  keywords: ["DPN", "DEPKOV VPN", "VPN", "приватная сеть"],
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
