import { SectionHeading } from "@/components/SectionHeading";
import {
  formatDeviceCount,
  getMinimumTariffPrice,
  tariffPeriods,
  tariffs,
} from "@/data/tariffs";

export function Tariffs() {
  return (
    <section id="tariffs" className="section-space relative overflow-hidden">
      <div className="absolute left-1/2 top-1/3 -z-10 h-80 w-[720px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[140px]" />
      <div className="container-shell">
        <SectionHeading
          eyebrow="Тарифы"
          title="Выберите удобный формат доступа"
          description="Подберите тариф по количеству устройств, а затем выберите удобный срок подписки при оформлении."
          align="center"
        />

        <div className="mt-13 grid items-stretch gap-5 lg:grid-cols-3">
          {tariffs.map((tariff) => {
            const isFeatured = Boolean(tariff.badge);
            const minimumPrice = getMinimumTariffPrice(tariff);
            return (
              <article
                key={tariff.name}
                className={`relative flex flex-col rounded-[1.75rem] border p-6 sm:p-7 ${
                  isFeatured
                    ? "border-cyan-300/25 bg-gradient-to-b from-cyan-400/[0.09] to-[#0a0e16] shadow-[0_0_55px_rgba(14,165,233,0.09)] lg:-translate-y-3"
                    : "border-white/[0.08] bg-[#090d14]/85"
                }`}
              >
                {tariff.badge && (
                  <span className="absolute right-6 top-6 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-200">
                    {tariff.badge}
                  </span>
                )}

                <div>
                  <p className="text-sm font-semibold text-cyan-300">{tariff.name}</p>
                  <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white">от {minimumPrice} ₽</h3>
                  <p className="mt-1 text-xs text-slate-500">за {tariffPeriods[0].label}</p>
                  <p className="mt-5 min-h-12 text-sm leading-6 text-slate-400">{tariff.description}</p>
                </div>

                <div className="my-6 h-px bg-white/[0.07]" />

                <ul className="flex-1 space-y-3.5">
                  <li className="flex items-start gap-3 text-sm leading-5 text-slate-300">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-cyan-300">
                      <svg className="size-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="m3.5 8.2 2.7 2.6 6.3-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {formatDeviceCount(tariff.deviceCount)}
                  </li>
                  {tariff.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm leading-5 text-slate-300">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-cyan-300">
                        <svg className="size-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="m3.5 8.2 2.7 2.6 6.3-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-2.5">
                  <a
                    href={tariff.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className={isFeatured ? "button-primary w-full py-3.5 text-sm" : "button-secondary w-full py-3.5 text-sm"}
                  >
                    {tariff.ctaLabel}
                  </a>
                  <a href={tariff.secondaryCtaHref} className="flex w-full items-center justify-center py-2 text-xs font-semibold text-slate-500 transition hover:text-cyan-200">
                    {tariff.secondaryCtaLabel} <span className="ml-1.5">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-6 text-slate-500">
          Во всех тарифах доступны VPN-локации, инструкция по подключению и помощь поддержки.
        </p>
      </div>
    </section>
  );
}
