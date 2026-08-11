import Image from "next/image";
import { siteLinks } from "@/data/site";

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <svg className="hero-waves" viewBox="0 0 760 480" fill="none">
        <defs>
          <linearGradient id="wave-a" x1="0" y1="240" x2="760" y2="240">
            <stop stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="0.42" stopColor="#8b5cf6" stopOpacity=".75" />
            <stop offset=".74" stopColor="#22d3ee" stopOpacity=".65" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
          <filter id="wave-blur"><feGaussianBlur stdDeviation="7" /></filter>
        </defs>
        <path d="M0 300c168-104 230 32 382-38 147-68 191-21 378-98" stroke="url(#wave-a)" strokeWidth="2" />
        <path d="M0 338c164-88 253 28 397-44 132-66 215-37 363-116" stroke="url(#wave-a)" strokeOpacity=".5" />
        <path d="M0 277c187-91 250 31 399-29 121-49 207-19 361-95" stroke="url(#wave-a)" strokeOpacity=".28" />
        <path d="M55 322c163-91 254 12 376-44 122-55 204-28 308-80" stroke="url(#wave-a)" strokeWidth="12" strokeOpacity=".18" filter="url(#wave-blur)" />
      </svg>

      <div className="power-mark-glow" />
      <div className="hero-static-logo">
        <Image
          src="/depkov-vpn-switch.png"
          alt=""
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 640px) 110vw, (max-width: 1023px) 488px, 520px"
          className="hero-static-logo__image"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />
      </div>

      <div className="status-chip status-chip--top">
        <span className="status-dot" />
        <span><strong>DEPKOV VPN</strong><small>подписка выбрана</small></span>
      </div>
      <div className="status-chip status-chip--bottom">
        <span className="status-icon">15</span>
        <span><strong>до 15 устройств</strong><small>в тарифе Max</small></span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-20 pt-30 sm:pb-28 sm:pt-38 lg:min-h-[790px] lg:pt-42">
      <div className="hero-atmosphere absolute inset-0 -z-20" />
      <div className="absolute left-[8%] top-28 -z-10 size-[420px] rounded-full bg-violet-700/12 blur-[140px]" />
      <div className="absolute right-[4%] top-36 -z-10 size-[480px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="container-shell grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-4">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">VPN для ваших устройств</p>
          <h1 className="mt-6 text-balance text-[clamp(3.1rem,8vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-white">
            Ваш доступ.
            <span className="brand-gradient block">Ваши правила.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            DEPKOV VPN — подписка для iPhone, Android, Windows и macOS. Выберите тариф по количеству устройств и оформите доступ удобным способом.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={siteLinks.telegramBot} className="button-primary px-6 py-3.5" target="_blank" rel="noreferrer">
              Подключиться <span aria-hidden="true">↗</span>
            </a>
            <a href="#lead-form" className="button-secondary px-6 py-3.5">
              Оставить заявку <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
            {[
              ["2–15", "устройств"],
              ["5", "сроков"],
              ["2", "способа оформить"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-xl font-semibold text-white sm:text-2xl">{value}</dt>
                <dd className="mt-1 text-[10px] leading-4 text-slate-500 sm:text-xs">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
