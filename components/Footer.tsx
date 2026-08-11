import { BrandLogo } from "@/components/BrandLogo";
import { navigation, siteLinks } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030308] py-10 sm:py-12">
      <div className="container-shell">
        <div className="grid gap-10 border-b border-white/[0.06] pb-10 md:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <BrandLogo placement="footer" />
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
              VPN-подписка для iPhone, Android, Windows и macOS.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Навигация</p>
            <nav className="mt-4 grid gap-3" aria-label="Навигация в подвале">
              {navigation.slice(0, 4).map((item) => (
                <a key={item.href} href={item.href} className="text-sm text-slate-500 transition hover:text-violet-200">{item.label}</a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-300">Контакты</p>
            <div className="mt-4 grid gap-3">
              <a href={siteLinks.telegramBot} target="_blank" rel="noreferrer" className="text-sm text-slate-500 transition hover:text-cyan-200">Telegram-бот</a>
              <a href={siteLinks.telegramSupport} target="_blank" rel="noreferrer" className="text-sm text-slate-500 transition hover:text-cyan-200">Поддержка</a>
              <a href={siteLinks.email} className="text-sm text-slate-500 transition hover:text-cyan-200">Email</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[11px] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DEPKOV VPN</p>
          <p>Условия и стоимость указаны на странице тарифов.</p>
        </div>
      </div>
    </footer>
  );
}
