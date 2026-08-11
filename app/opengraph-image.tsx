/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "DEPKOV VPN — VPN для ваших устройств";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const [fullLogoFile, switchIconFile] = await Promise.all([
    readFile(join(process.cwd(), "public", "depkov-vpn-logo.png")),
    readFile(join(process.cwd(), "public", "depkov-vpn-switch.png")),
  ]);
  const fullLogo = fullLogoFile.buffer.slice(
    fullLogoFile.byteOffset,
    fullLogoFile.byteOffset + fullLogoFile.byteLength,
  ) as ArrayBuffer;
  const switchIcon = switchIconFile.buffer.slice(
    switchIconFile.byteOffset,
    switchIconFile.byteOffset + switchIconFile.byteLength,
  ) as ArrayBuffer;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 78% 42%, rgba(14, 165, 233, 0.18), transparent 28%), radial-gradient(circle at 58% 30%, rgba(124, 58, 237, 0.22), transparent 36%), linear-gradient(135deg, #03040c 0%, #070516 52%, #030812 100%)",
          color: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            display: "flex",
            border: "1px solid rgba(167, 139, 250, 0.22)",
            borderRadius: 34,
            boxShadow: "inset 0 0 80px rgba(91, 33, 182, 0.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: -80,
            top: 344,
            display: "flex",
            width: 830,
            height: 1,
            background: "linear-gradient(90deg, transparent, #8b5cf6, #22d3ee, transparent)",
            boxShadow: "0 0 28px rgba(34, 211, 238, 0.55)",
            transform: "rotate(-7deg)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: 760,
            padding: "72px 0 64px 72px",
          }}
        >
          <img
            src={fullLogo as unknown as string}
            alt="DEPKOV VPN"
            width={580}
            height={193}
            style={{ objectFit: "cover", mixBlendMode: "screen" }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: "-2.4px",
              lineHeight: 1.05,
            }}
          >
            VPN для ваших устройств
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              color: "#94a3b8",
              fontSize: 23,
              lineHeight: 1.35,
            }}
          >
            iPhone · Android · Windows · macOS
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            {["Start · 2", "Pro · 5", "Max · 15"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  border: "1px solid rgba(167, 139, 250, 0.22)",
                  borderRadius: 999,
                  background: "rgba(124, 58, 237, 0.09)",
                  padding: "10px 18px",
                  color: "#ddd6fe",
                  fontSize: 17,
                }}
              >
                {label} устройств
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            right: -76,
            top: 62,
            display: "flex",
            width: 520,
            height: 520,
            borderRadius: 999,
            overflow: "hidden",
            filter: "drop-shadow(0 0 36px rgba(34, 211, 238, 0.28))",
          }}
        >
          <img
            src={switchIcon as unknown as string}
            alt=""
            width={520}
            height={520}
            style={{ width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "screen" }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            right: 62,
            bottom: 56,
            display: "flex",
            border: "1px solid rgba(103, 232, 249, 0.26)",
            borderRadius: 16,
            background: "rgba(4, 8, 18, 0.82)",
            padding: "14px 20px",
            color: "#a5f3fc",
            fontSize: 16,
          }}
        >
          Telegram или заявка на сайте
        </div>
      </div>
    ),
    size,
  );
}
