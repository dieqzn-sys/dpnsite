import { SectionHeading } from "@/components/SectionHeading";
import { manualSteps, siteLinks, telegramSteps } from "@/data/site";

function ScenarioCard({
  label,
  title,
  description,
  steps,
  accent = false,
  cta,
}: {
  label: string;
  title: string;
  description: string;
  steps: readonly string[];
  accent?: boolean;
  cta: { label: string; href: string; external?: boolean };
}) {
  return (
    <article className={`relative rounded-[1.75rem] border p-6 sm:p-8 ${accent ? "border-cyan-300/20 bg-cyan-400/[0.045]" : "border-white/[0.08] bg-white/[0.02]"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">{label}</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
        </div>
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200">
          {accent ? (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m20.5 4.2-3 15.1c-.2 1-1 1.2-1.8.7l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L5.7 13.2 1.1 11.8c-1-.3-1-1 .2-1.5l17.9-6.9c.8-.3 1.6.2 1.3.8Z" fill="currentColor" /></svg>
          ) : (
            <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.5 5.5 18.5 9.5M3.5 20.5l4.3-.9L19.4 8a1.4 1.4 0 0 0 0-2l-1.4-1.4a1.4 1.4 0 0 0-2 0L4.4 16.2l-.9 4.3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          )}
        </div>
      </div>

      <ol className="mt-8 space-y-0">
        {steps.map((step, index) => (
          <li key={step} className="relative flex gap-4 pb-5 last:pb-0">
            {index < steps.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-300/30 to-white/[0.05]" />}
            <span className="relative z-10 grid size-8 shrink-0 place-items-center rounded-full border border-cyan-300/20 bg-[#0a111b] text-xs font-bold text-cyan-200">{index + 1}</span>
            <span className="pt-1.5 text-sm leading-5 text-slate-300">{step}</span>
          </li>
        ))}
      </ol>

      <a
        href={cta.href}
        target={cta.external ? "_blank" : undefined}
        rel={cta.external ? "noreferrer" : undefined}
        className={`${accent ? "button-primary" : "button-secondary"} mt-8 w-full py-3.5 text-sm`}
      >
        {cta.label}
      </a>
    </article>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-space border-y border-white/[0.05] bg-white/[0.012]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Как подключиться"
          title="Два простых сценария"
          description="Выберите автоматическое оформление или оставьте заявку — итог один: готовая VPN-подписка и инструкция для вашего устройства."
          align="center"
        />

        <div className="mt-13 grid gap-5 lg:grid-cols-2">
          <ScenarioCard
            label="Сценарий 01"
            title="Через Telegram"
            description="Самый быстрый способ — выдача происходит автоматически."
            steps={telegramSteps}
            accent
            cta={{ label: "Подключить через Telegram", href: siteLinks.telegramBot, external: true }}
          />
          <ScenarioCard
            label="Сценарий 02"
            title="Без Telegram"
            description="Подойдёт, если Telegram недоступен или просто неудобен."
            steps={manualSteps}
            cta={{ label: "Оставить заявку без Telegram", href: "#lead-form" }}
          />
        </div>

        <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-6 text-slate-500">
          Автоматическая выдача доступна через Telegram. Если Telegram неудобен или недоступен — оставьте заявку на сайте.
        </p>
      </div>
    </section>
  );
}
