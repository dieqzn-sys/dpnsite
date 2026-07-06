import { SectionHeading } from "@/components/SectionHeading";
import { faqItems } from "@/data/faq";

export function FAQ() {
  return (
    <section id="faq" className="section-space border-y border-white/[0.05] bg-white/[0.012]">
      <div className="container-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="FAQ"
            title="Частые вопросы"
            description="Коротко о выдаче доступа, устройствах и помощи с подключением."
          />
          <p className="mt-7 text-sm text-slate-500">Не нашли ответ? Напишите в поддержку — разберём ваш случай.</p>
          <a href="#support" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
            Перейти к поддержке <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <details key={item.question} className="group rounded-2xl border border-white/[0.08] bg-[#090d14]/70 open:border-cyan-300/15 open:bg-cyan-400/[0.025]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left sm:px-6">
                <span className="flex items-center gap-4">
                  <span className="text-[10px] font-semibold tabular-nums text-slate-600">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-semibold text-slate-200 sm:text-base">{item.question}</span>
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition group-open:rotate-45 group-open:border-cyan-300/20 group-open:text-cyan-200">
                  <svg className="size-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                </span>
              </summary>
              <p className="px-5 pb-5 pl-[4.75rem] text-sm leading-6 text-slate-400 sm:px-6 sm:pb-6 sm:pl-[5.25rem]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

