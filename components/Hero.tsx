import Image from "next/image";

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

      <div className="hero-switch-glow" />
      <div className="hero-switch-visual">
        <Image
          src="/depkov-vpn-switch.png"
          alt=""
          width={1254}
          height={1254}
          priority
          sizes="(max-width: 640px) 110vw, (max-width: 1023px) 488px, 520px"
          className="hero-switch-visual__image hero-switch-visual__image--base"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />
        <Image
          src="/depkov-vpn-switch.png"
          alt=""
          width={1254}
          height={1254}
          sizes="(max-width: 640px) 110vw, (max-width: 1023px) 488px, 520px"
          className="hero-switch-visual__image hero-switch-visual__image--knob"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          draggable={false}
        />
      </div>

      <div className="status-chip status-chip--top">
        <span className="status-dot" />
        <span><strong>ONLINE</strong><small>Подключение активно</small></span>
      </div>
      <div className="status-chip status-chip--bottom">
        <span className="status-icon">15</span>
        <span><strong>устройств</strong><small>Max тариф</small></span>
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
          <div className="hero-kicker"><span className="hero-kicker__dot" />VPN для привычных сервисов</div>
          <h1 className="mt-6 text-balance text-[clamp(3.1rem,7vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-white">
            Ваш доступ.
            <span className="brand-gradient block">Ваши правила.</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Получайте доступ к привычным сайтам и приложениям без лишних настроек.
            <span className="mt-2 block">Подключитесь удобным способом: через Telegram или оставьте заявку на сайте.</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="button-primary px-6 py-3.5"
              data-open-connection
            >
              Подключиться <span aria-hidden="true">→</span>
            </button>
            <a href="#lead-form" className="button-secondary px-6 py-3.5">
              Подключить через сайт <span aria-hidden="true">→</span>
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-3 border-t border-white/[0.08] pt-6 sm:grid-cols-3" aria-label="Платформы и способы подключения">
            {[
              ["iPhone · Android", "смартфоны"],
              ["Windows · macOS", "компьютеры"],
              ["Telegram · сайт", "два способа подключения"],
            ].map(([value, label]) => (
              <div key={label} className="last:col-span-2 sm:last:col-span-1">
                <dt className="text-sm font-semibold text-white sm:text-base">{value}</dt>
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
