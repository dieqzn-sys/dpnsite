import { siteLinks } from "@/data/site";

function NetworkVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[8%] rounded-full border border-cyan-300/10 bg-cyan-400/[0.025] shadow-[0_0_120px_rgba(14,165,233,0.14)]" />
      <div className="absolute inset-[16%] animate-[spin_28s_linear_infinite] rounded-full border border-dashed border-cyan-300/15" />
      <div className="absolute inset-[28%] animate-[spin_18s_linear_infinite_reverse] rounded-full border border-dashed border-blue-400/15" />

      <svg className="absolute inset-[12%] size-[76%] overflow-visible" viewBox="0 0 400 400">
        <defs>
          <radialGradient id="globe-glow">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0.1" />
            <stop offset="1" stopColor="#0ea5e9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="line-glow" x1="0" x2="1">
            <stop stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="0.5" stopColor="#67e8f9" stopOpacity="0.85" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#globe-glow)" stroke="#38bdf8" strokeOpacity="0.25" />
        <ellipse cx="200" cy="200" rx="65" ry="150" fill="none" stroke="#38bdf8" strokeOpacity="0.18" />
        <ellipse cx="200" cy="200" rx="118" ry="150" fill="none" stroke="#38bdf8" strokeOpacity="0.1" />
        <ellipse cx="200" cy="200" rx="150" ry="58" fill="none" stroke="#38bdf8" strokeOpacity="0.15" />
        <ellipse cx="200" cy="200" rx="150" ry="112" fill="none" stroke="#38bdf8" strokeOpacity="0.1" />
        <path d="M71 124 168 177l102-66 59 138-126 64L91 257Z" fill="none" stroke="url(#line-glow)" strokeWidth="1.5" />
        {[
          [71, 124], [168, 177], [270, 111], [329, 249], [203, 313], [91, 257], [201, 201],
        ].map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={index === 6 ? 7 : 5} fill="#020617" stroke="#67e8f9" strokeOpacity="0.9" />
            <circle cx={x} cy={y} r={index === 6 ? 2.5 : 2} fill="#a5f3fc" />
          </g>
        ))}
      </svg>

      <div className="absolute left-0 top-[26%] rounded-2xl border border-white/10 bg-[#080d16]/85 p-3.5 shadow-xl shadow-black/30 backdrop-blur-xl sm:p-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          <span>
            <span className="block text-xs font-semibold text-white">Сеть активна</span>
            <span className="mt-0.5 block text-[10px] text-slate-500">стабильное подключение</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-[11%] right-0 w-[58%] rounded-2xl border border-cyan-300/15 bg-[#080d16]/90 p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">DEPKOV VPN</p>
            <p className="mt-1.5 text-sm font-semibold text-white sm:text-base">Private connection</p>
          </div>
          <div className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-200">
            <svg className="size-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 3 5.5 5.6v5.8c0 4.1 2.7 7.8 6.5 9.1 3.8-1.3 6.5-5 6.5-9.1V5.6L12 3Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="m9.5 12 1.6 1.6 3.6-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.5)]" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-slate-500">
          <span>Encrypted</span>
          <span className="text-cyan-300">Connected</span>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-22 pt-32 sm:pb-28 sm:pt-40 lg:min-h-[760px] lg:pt-44">
      <div className="hero-grid absolute inset-0 -z-20 opacity-50" />
      <div className="absolute left-[12%] top-20 -z-10 size-[420px] rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="absolute right-[5%] top-32 -z-10 size-[460px] rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="container-shell grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-400/[0.06] px-3 py-1.5 text-xs font-semibold text-cyan-200">
            <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
            DEPKOV PRIVATE NETWORK
          </div>

          <h1 className="mt-7 max-w-3xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.45rem]">
            DPN — приватная сеть для <span className="text-gradient">стабильного доступа</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-slate-400 sm:text-xl">
            Подключение для телефона, ПК и ноутбука. Можно оформить автоматически через Telegram или оставить заявку без Telegram.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={siteLinks.telegramBot} className="button-primary px-5 py-3.5" target="_blank" rel="noreferrer">
              <svg className="size-4.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m20.5 4.2-3 15.1c-.2 1-1 1.2-1.8.7l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L5.7 13.2 1.1 11.8c-1-.3-1-1 .2-1.5l17.9-6.9c.8-.3 1.6.2 1.3.8Z" fill="currentColor" />
              </svg>
              Подключить через Telegram
            </a>
            <a href="#lead-form" className="button-secondary px-5 py-3.5">
              Оставить заявку без Telegram
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-5 flex max-w-2xl items-start gap-2.5 text-sm leading-6 text-slate-500">
            <svg className="mt-1 size-4 shrink-0 text-cyan-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 8v4l2.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <p>
              Автоматическая выдача доступна через Telegram. Если Telegram неудобен или недоступен — оставьте заявку на сайте.
              <span className="mt-1 block">Ручная выдача без Telegram — обычно в течение 5–15 минут в рабочее время.</span>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[0.07] pt-6 text-xs font-medium text-slate-500">
            {["iPhone", "Android", "Windows", "macOS"].map((device) => (
              <span key={device} className="flex items-center gap-2">
                <svg className="size-3.5 text-emerald-400" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="m4 10 3.5 3.5L16 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {device}
              </span>
            ))}
          </div>
        </div>

        <NetworkVisual />
      </div>
    </section>
  );
}
