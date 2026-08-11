import { SectionHeading } from "@/components/SectionHeading";
import { connectionSteps } from "@/data/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-space relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -z-10 h-40 w-[70%] -translate-x-1/2 rounded-full bg-violet-700/[0.08] blur-[120px]" />
      <div className="container-shell">
        <SectionHeading
          eyebrow="Как это работает"
          title="Четыре шага до подключения"
          description="Выберите удобный способ оформления, тариф и подключите устройство по инструкции."
          align="center"
        />

        <ol className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-violet-500/20 via-cyan-300/70 to-blue-500/20 lg:block" aria-hidden="true" />
          {connectionSteps.map((step, index) => (
            <li key={step.title} className="relative text-center">
              <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border border-violet-300/35 bg-[#0a0817] text-base font-bold text-violet-100 shadow-[0_0_32px_rgba(124,58,237,0.22)]">
                {index + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
