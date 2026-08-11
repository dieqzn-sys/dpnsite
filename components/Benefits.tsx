import { SectionHeading } from "@/components/SectionHeading";
import { benefits, type BenefitIcon } from "@/data/benefits";

function BenefitIconView({ icon }: { icon: BenefitIcon }) {
  const paths: Record<BenefitIcon, React.ReactNode> = {
    spark: <path d="m13.2 2.8-8 11h6.5l-.9 7.4 8-11h-6.5l.9-7.4Z" />,
    devices: <><rect x="3" y="4" width="13" height="10" rx="1.5" /><path d="M7 19h5M9.5 14v5M18.5 8.5h2v11h-6v-3" /></>,
    route: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h5a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-2a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h5" /></>,
    support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 12H2.8c-.4 0-.8.4-.8.8v3.4c0 .4.4.8.8.8H5v-5H4ZM20 12h1.2c.4 0 .8.4.8.8v3.4c0 .4-.4.8-.8.8H19v-5h1ZM19 17c0 2-1.8 3-4 3" /></>,
  };

  return (
    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

export function Benefits() {
  return (
    <section id="benefits" className="section-space relative border-y border-white/[0.055] bg-white/[0.012]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Преимущества"
          title="Главное — без лишнего"
          description="Понятный выбор тарифа, два способа оформления и поддержка для знакомых платформ."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit, index) => (
            <article key={benefit.title} className="surface group relative min-h-64 overflow-hidden p-6 sm:p-7">
              <span className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.18em] text-white/[0.08]">0{index + 1}</span>
              <div className="icon-tile">
                <BenefitIconView icon={benefit.icon} />
              </div>
              <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em] text-white">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
