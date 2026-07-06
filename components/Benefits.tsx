import { SectionHeading } from "@/components/SectionHeading";
import { benefits, type BenefitIcon } from "@/data/benefits";

function BenefitIconView({ icon }: { icon: BenefitIcon }) {
  const paths: Record<BenefitIcon, React.ReactNode> = {
    globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.8 9h16.4M3.8 15h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5C9.8 18.2 8.7 15.4 8.7 12S9.8 5.8 12 3.5Z" /></>,
    zap: <path d="m13.2 2.8-8 11h6.5l-.9 7.4 8-11h-6.5l.9-7.4Z" />,
    devices: <><rect x="3" y="4" width="13" height="10" rx="1.5" /><path d="M7 19h5M9.5 14v5M18.5 8.5h2v11h-6v-3" /></>,
    support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 12H2.8c-.4 0-.8.4-.8.8v3.4c0 .4.4.8.8.8H5v-5H4ZM20 12h1.2c.4 0 .8.4.8.8v3.4c0 .4-.4.8-.8.8H19v-5h1ZM19 17c0 2-1.8 3-4 3" /></>,
    shield: <><path d="M12 3 5.5 5.6v5.8c0 4.1 2.7 7.8 6.5 9.1 3.8-1.3 6.5-5 6.5-9.1V5.6L12 3Z" /><path d="m9 12 2 2 4-4.5" /></>,
    nodes: <><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="18" r="2" /><path d="m6.8 7 4.1 9M17.2 7l-4.1 9M7 6h10" /></>,
  };

  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="section-space relative border-y border-white/[0.05] bg-white/[0.015]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Возможности сети"
          title="Всё необходимое для уверенного подключения"
          description="Без лишней сложности: выбираете тариф, получаете подписку и подключаете нужные устройства по инструкции."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="surface group relative overflow-hidden p-6 sm:p-7">
              <span className="absolute right-5 top-4 text-xs font-semibold tabular-nums text-white/[0.06]">0{index + 1}</span>
              <div className="grid size-11 place-items-center rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.07] text-cyan-200 transition duration-300 group-hover:border-cyan-300/30 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_28px_rgba(34,211,238,0.1)]">
                <BenefitIconView icon={benefit.icon} />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-white">{benefit.title}</h3>
              <p className="mt-2.5 text-sm leading-6 text-slate-400">{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-400/10 bg-blue-400/[0.035] px-5 py-4 text-sm leading-6 text-slate-400">
          <svg className="mt-0.5 size-5 shrink-0 text-blue-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 8h.01M11 11h1v5h1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <p>
            Обычные VPN-локации доступны в рамках тарифов. Специальные узлы для сложных случаев — отдельная опция: для них могут действовать собственные лимиты и условия.
          </p>
        </div>
      </div>
    </section>
  );
}

