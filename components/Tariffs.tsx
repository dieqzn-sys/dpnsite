"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  formatDeviceCount,
  tariffPeriods,
  tariffs,
  type TariffPeriodId,
} from "@/data/tariffs";

export function Tariffs() {
  const [periodId, setPeriodId] = useState<TariffPeriodId>("1-month");
  const selectedPeriod = tariffPeriods.find((period) => period.id === periodId) ?? tariffPeriods[1];

  return (
    <section id="tariffs" className="section-space relative overflow-hidden border-y border-white/[0.05] bg-white/[0.012]">
      <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-[760px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[150px]" />
      <div className="container-shell">
        <SectionHeading
          eyebrow="Тарифы"
          title="Выберите количество устройств"
          description="Три тарифа, пять сроков подписки и точная стоимость для каждого варианта."
          align="center"
        />

        <div className="mx-auto mt-9 flex max-w-2xl gap-1 overflow-x-auto rounded-2xl border border-white/[0.08] bg-black/20 p-1.5" role="group" aria-label="Срок подписки">
          {tariffPeriods.map((period) => {
            const selected = period.id === periodId;
            return (
              <button
                key={period.id}
                type="button"
                onClick={() => setPeriodId(period.id)}
                aria-pressed={selected}
                className={`min-w-fit flex-1 rounded-xl px-3 py-2.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 ${selected ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-950/35" : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"}`}
              >
                {period.shortLabel}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {tariffs.map((tariff) => {
            const featured = tariff.id === "pro";
            return (
              <article
                key={tariff.id}
                className={`relative flex flex-col overflow-hidden rounded-[1.75rem] border p-6 sm:p-7 ${featured ? "border-violet-300/45 bg-gradient-to-b from-violet-500/[0.12] via-[#0c0b1c] to-[#080912] shadow-[0_0_55px_rgba(109,40,217,0.15)] lg:-translate-y-2" : "border-white/[0.09] bg-[#090a13]/90"}`}
              >
                {featured && <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_18px_#22d3ee]" />}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-white">{tariff.name}</p>
                    <p className={`mt-1.5 text-sm font-medium ${featured ? "text-violet-200" : "text-slate-400"}`}>
                      {tariff.positioning}
                    </p>
                    <p className="mt-2 text-xs text-slate-600">{formatDeviceCount(tariff.deviceCount)}</p>
                  </div>
                  <span className="grid size-11 place-items-center rounded-2xl border border-violet-300/15 bg-violet-400/[0.07] text-violet-200">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </div>

                <div className="my-7 h-px bg-white/[0.07]" />
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-600">{selectedPeriod.label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-white" aria-live="polite">
                  {tariff.prices[periodId]} <span className="text-lg text-slate-500">₽</span>
                </p>

                <ul className="mt-7 flex-1 space-y-3 text-sm text-slate-300">
                  <li className="flex items-center gap-3"><span className="check-dot">✓</span>{formatDeviceCount(tariff.deviceCount)}</li>
                  <li className="flex items-center gap-3"><span className="check-dot">✓</span>Срок: {selectedPeriod.label}</li>
                </ul>

                <a href="#lead-form" className={`${featured ? "button-primary" : "button-secondary"} mt-8 w-full py-3.5 text-sm`}>
                  Выбрать <span aria-hidden="true">→</span>
                </a>
              </article>
            );
          })}
        </div>

        <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-5 text-slate-600">
          Цена указана за выбранный срок подписки. Количество устройств зависит от тарифа.
        </p>
      </div>
    </section>
  );
}
