import { SectionHeading } from "@/components/SectionHeading";
import { siteLinks } from "@/data/site";

export function Support() {
  return (
    <section id="support" className="section-space">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-gradient-to-br from-[#0b1520] via-[#080d15] to-[#070a10] p-7 sm:p-10 lg:p-12">
          <div className="absolute right-[-10%] top-[-70%] size-[480px] rounded-full border border-cyan-300/10 bg-cyan-400/[0.035] shadow-[0_0_100px_rgba(34,211,238,0.08)]" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <SectionHeading
                eyebrow="Поддержка"
                title="Поможем с подключением"
                description="Если возникли сложности, напишите нам и укажите устройство, тариф и описание проблемы. Так мы быстрее найдём решение."
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[430px]">
              <a href={siteLinks.telegramSupport} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/[0.09] bg-white/[0.035] p-5 transition hover:border-cyan-300/25 hover:bg-cyan-400/[0.055]">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-cyan-400/10 text-cyan-200">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m20.5 4.2-3 15.1c-.2 1-1 1.2-1.8.7l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L5.7 13.2 1.1 11.8c-1-.3-1-1 .2-1.5l17.9-6.9c.8-.3 1.6.2 1.3.8Z" fill="currentColor" /></svg>
                  </span>
                  <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200">→</span>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">Telegram support</p>
                <p className="mt-1 text-xs text-slate-500">{siteLinks.telegramSupportLabel}</p>
              </a>

              <a href={siteLinks.email} className="group rounded-2xl border border-white/[0.09] bg-white/[0.035] p-5 transition hover:border-blue-300/25 hover:bg-blue-400/[0.055]">
                <div className="flex items-center justify-between gap-4">
                  <span className="grid size-10 place-items-center rounded-xl bg-blue-400/10 text-blue-200">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-200">→</span>
                </div>
                <p className="mt-4 text-sm font-semibold text-white">Email</p>
                <p className="mt-1 text-xs text-slate-500">{siteLinks.emailLabel}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
