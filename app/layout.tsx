import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://depkov.ru"),
  title: "DEPKOV VPN — тарифы для ваших устройств",
  description:
    "DEPKOV VPN для iPhone, Android, Windows и macOS. Тарифы Start, Pro и Max на 2, 5 или 15 устройств.",
  applicationName: "DEPKOV VPN",
  keywords: ["DEPKOV VPN", "VPN", "VPN для устройств"],
  icons: {
    icon: [{ url: "/depkov-vpn-switch.png", type: "image/png" }],
    shortcut: "/depkov-vpn-switch.png",
    apple: "/depkov-vpn-switch.png",
  },
  openGraph: {
    title: "DEPKOV VPN",
    description: "VPN-подписка для iPhone, Android, Windows и macOS.",
    images: [{ url: "/depkov-vpn-logo.png", width: 2172, height: 724, alt: "DEPKOV VPN" }],
  },
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
