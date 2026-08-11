import { BrandLogo } from "@/components/BrandLogo";
import { navigation, siteLinks } from "@/data/site";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#05050d]/75 backdrop-blur-2xl">
      <div className="container-shell flex h-18 items-center justify-between gap-4 sm:h-20">
        <a
          href="#top"
          className="shrink-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          <BrandLogo placement="header" priority />
        </a>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-slate-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block">
            <a
              href={siteLinks.telegramBot}
              target="_blank"
              rel="noreferrer"
              className="button-primary min-h-10 px-4 py-2.5 text-sm"
            >
              Подключиться
            </a>
          </div>

          <details className="group relative xl:hidden">
            <summary className="grid size-10 list-none place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-violet-300/30 hover:text-white">
              <span className="sr-only">Открыть меню</span>
              <svg className="size-5 group-open:hidden" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              <svg className="hidden size-5 group-open:block" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              className="fixed left-2.5 right-2.5 top-19 z-50 w-auto rounded-2xl border border-white/10 bg-[#0a0915]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:left-auto sm:right-4 sm:w-72"
              aria-label="Мобильная навигация"
            >
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05] hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={siteLinks.telegramBot}
                target="_blank"
                rel="noreferrer"
                className="button-primary mt-2 w-full py-3 text-sm"
              >
                Подключиться
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
