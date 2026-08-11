import Image from "next/image";
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
  return (
    <div className="relative mx-auto min-h-[430px] w-full max-w-[520px]" aria-hidden="true">
      <div className="absolute inset-[12%] rounded-full bg-violet-600/15 blur-[85px]" />
      <div className="service-switch-art">
        <Image
          src="/depkov-vpn-switch.png"
          alt=""
          width={1254}
          height={1254}
          sizes="280px"
          className="service-switch-art__image"
          draggable={false}
        />
      </div>

      <div className="absolute right-0 top-6 w-[84%] rotate-2 rounded-[2.1rem] border border-violet-300/20 bg-[#0b0b18]/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.48)] sm:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200">DEPKOV VPN</span>
            <span className="mt-1 block text-sm font-semibold text-white">Оформление доступа</span>
          </div>
          <span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_12px_#22d3ee]" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-violet-300/15 bg-violet-400/[0.055] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-violet-200">Telegram</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">Выберите тариф в боте</p>
          </div>
          <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.045] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-cyan-200">На сайте</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">Оставьте контакт в форме</p>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Инструкция</p>
            <span className="text-[10px] text-cyan-200">после оформления</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <span>iPhone</span><span>Android</span><span>Windows</span><span>macOS</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-gradient-to-r from-violet-600/15 to-cyan-400/[0.07] px-4 py-3">
          <span className="text-xs text-slate-300">Поддержка по подключению</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-200">Telegram</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[68%] rounded-[1.75rem] border border-cyan-300/15 bg-[#080c13]/90 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-slate-500">
          <span>Тарифы</span>
          <span className="inline-flex items-center gap-1.5 text-cyan-200"><span className="size-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#22d3ee]" />2–15 устройств</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-300">
          <span className="rounded-xl border border-white/[0.07] bg-white/[0.025] py-2">Start</span>
          <span className="rounded-xl border border-violet-300/20 bg-violet-400/[0.07] py-2 text-violet-100">Pro</span>
          <span className="rounded-xl border border-white/[0.07] bg-white/[0.025] py-2">Max</span>
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
