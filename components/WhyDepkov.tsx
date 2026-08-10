import { SectionHeading } from "@/components/SectionHeading";

const servicePoints = [
  {
    title: "Прозрачные условия",
    description: "На странице указаны конкретные сроки, цены и количество устройств для каждого тарифа.",
    icon: "list",
  },
  {
    title: "Выбор способа оформления",
    description: "Telegram-бот для автоматизированного сценария или форма с ответом по указанному контакту.",
    icon: "route",
  },
  {
    title: "Инструкция для устройства",
    description: "После оформления вы получаете данные доступа и шаги для выбранной платформы.",
    icon: "guide",
  },
  {
    title: "Контакты поддержки",
    description: "Для вопросов по настройке доступны Telegram и электронная почта.",
    icon: "support",
  },
] as const;

function PointIcon({ icon }: { icon: (typeof servicePoints)[number]["icon"] }) {
  if (icon === "list") return <path d="M9 6h10M9 12h10M9 18h10M5 6h.01M5 12h.01M5 18h.01" />;
  if (icon === "route") return <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h5a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3h-2a3 3 0 0 0-3 3v0a3 3 0 0 0 3 3h3" /></>;
  if (icon === "guide") return <><path d="M5 4.5h10a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2V4.5Z" /><path d="M7 17h10M9 8h4M9 11h5" /></>;
  return <><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 12H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2v-5H4ZM20 12h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2v-5h1Z" /><path d="M19 17c0 2-2 3-4 3" /></>;
}

function ProductPanel() {
  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-violet-600/15 blur-[85px]" />
      <div className="absolute right-0 top-7 h-[360px] w-[78%] rotate-3 rounded-[2.1rem] border border-violet-300/20 bg-[#0b0b18]/95 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.48)]">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <span className="text-xs font-bold tracking-[0.1em] text-white">DEPKOV <span className="brand-gradient">VPN</span></span>
          <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
        </div>
        <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">Тариф</p>
          <div className="mt-2 flex items-center justify-between"><span className="text-sm text-white">Pro</span><span className="text-xs text-violet-200">5 устройств</span></div>
        </div>
        <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-600">Платформы</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300"><span>iPhone</span><span>Android</span><span>Windows</span><span>macOS</span></div>
        </div>
        <div className="mt-5 h-14 rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-violet-600/20 to-cyan-400/10 p-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" /></div>
        </div>
      </div>
      <div className="power-mark absolute bottom-1 left-0 scale-75 sm:scale-90">
        <div className="power-mark__track" />
        <div className="power-mark__inner" />
        <div className="power-mark__orb"><span className="power-mark__cutout" /></div>
      </div>
    </div>
  );
}

export function WhyDepkov() {
  return (
    <section id="security" className="section-space relative overflow-hidden">
      <div className="absolute right-[-10%] top-1/4 -z-10 size-[520px] rounded-full bg-blue-600/[0.08] blur-[150px]" />
      <div className="container-shell grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="О сервисе"
            title="Понятный формат без громких обещаний"
            description="DEPKOV VPN показывает то, что можно проверить до оформления: цены, сроки, устройства и способы связи."
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {servicePoints.map((point) => (
              <article key={point.title} className="flex gap-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/[0.07] text-violet-200">
                  <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><PointIcon icon={point.icon} /></svg>
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{point.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">{point.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <ProductPanel />
      </div>
    </section>
  );
}
