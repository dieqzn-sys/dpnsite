import { SectionHeading } from "@/components/SectionHeading";

const servicePoints = [
  {
    title: "Понятные тарифы",
    description: "Start, Pro и Max отличаются количеством устройств. Цена зависит от выбранного срока.",
    icon: "list",
  },
  {
    title: "Telegram или сайт",
    description: "Оформите доступ через Telegram-бота или оставьте заявку на сайте.",
    icon: "route",
  },
  {
    title: "Инструкции для устройств",
    description: "После оформления вы получите данные доступа и инструкцию для выбранной платформы.",
    icon: "guide",
  },
  {
    title: "Поддержка",
    description: "Если появится вопрос по подключению, напишите в Telegram или на электронную почту.",
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
  const connectionFlow = ["Telegram", "Выбор тарифа", "Подключение", "Инструкция"];

  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[10%] rounded-full bg-violet-600/14 blur-[90px]" />
      <div className="absolute inset-x-[6%] top-3 h-40 rounded-full bg-cyan-400/[0.06] blur-[65px]" />

      <div className="absolute right-0 top-3 w-[92%] rotate-1 overflow-hidden rounded-[2.1rem] border border-violet-300/20 bg-[#0b0b18]/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.48)] sm:p-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_90%_8%,rgba(34,211,238,0.1),transparent_30%),linear-gradient(135deg,rgba(124,58,237,0.06),transparent_50%)]" />
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200">Путь подключения</span>
            <span className="mt-1 block text-sm font-semibold text-white">От Telegram до инструкции</span>
          </div>
          <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-cyan-200">
            <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />Активно
          </span>
        </div>

        <div className="mt-5 grid gap-2">
          {connectionFlow.map((step, index) => (
            <div key={step} className="relative flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-violet-300/15 bg-violet-400/[0.07] text-[9px] font-bold text-violet-200">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-slate-200">{step}</span>
              {index < connectionFlow.length - 1 ? (
                <span className="ml-auto text-sm text-cyan-300/70">→</span>
              ) : (
                <span className="ml-auto size-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[72%] rounded-[1.75rem] border border-cyan-300/15 bg-[#080c13]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-slate-500">
          <span>Устройства</span>
          <span className="inline-flex items-center gap-1.5 text-cyan-200"><span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />инструкция готова</span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[9px] font-semibold text-slate-300 sm:text-[10px]">
          {['iPhone', 'Android', 'Windows', 'macOS'].map((device) => (
            <span key={device} className="rounded-xl border border-white/[0.07] bg-white/[0.025] py-2">{device}</span>
          ))}
        </div>
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
            title="Всё необходимое для подключения"
            description="Выберите тариф, оформите доступ через Telegram или сайт и получите инструкцию для своего устройства. Если понадобится помощь — рядом поддержка."
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
