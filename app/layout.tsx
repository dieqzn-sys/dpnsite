import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEPKOV VPN — тарифы для ваших устройств",
  description:
    "DEPKOV VPN для iPhone, Android, Windows и macOS. Тарифы Start, Pro и Max на 2, 5 или 15 устройств.",
  applicationName: "DEPKOV VPN",
  keywords: ["DEPKOV VPN", "VPN", "VPN для устройств"],
};

export const viewport: Viewport = {
  themeColor: "#05050d",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
