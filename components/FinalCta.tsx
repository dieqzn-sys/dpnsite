export function FinalCta() {
  return (
    <section className="pb-20 pt-8 sm:pb-28" aria-labelledby="final-cta-title">
      <div className="container-shell">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-violet-300/20 bg-[#0a0916] px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_40%,rgba(34,211,238,0.13),transparent_28%),radial-gradient(circle_at_60%_20%,rgba(124,58,237,0.18),transparent_32%)]" />
          <svg className="absolute bottom-0 right-0 -z-10 h-full w-3/5 opacity-55" viewBox="0 0 700 280" fill="none" aria-hidden="true">
            <path d="M0 240c167-140 318 25 440-79 90-77 153-42 260-112" stroke="url(#cta-wave)" />
            <path d="M30 270c165-134 303 24 431-76 82-65 151-51 239-108" stroke="url(#cta-wave)" strokeOpacity=".45" />
            <defs><linearGradient id="cta-wave"><stop stopColor="#7c3aed" stopOpacity="0" /><stop offset=".5" stopColor="#8b5cf6" /><stop offset="1" stopColor="#22d3ee" stopOpacity="0" /></linearGradient></defs>
          </svg>

          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase leading-4 tracking-[0.16em] text-cyan-200">
              <span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
              Готовы подключиться?
            </p>
            <h2 id="final-cta-title" className="mt-4 text-balance text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
              Выберите подходящий тариф
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Оформите подписку через Telegram или оставьте заявку на сайте — как вам удобнее.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="button-primary px-6 py-3.5"
                data-open-connection
              >
                Выбрать способ
              </button>
              <a href="#lead-form" className="button-secondary px-6 py-3.5">Подключить через сайт</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
