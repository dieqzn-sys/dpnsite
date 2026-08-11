const trustSignals = [
  {
    title: "Понятные тарифы",
    description: "Стоимость, срок и количество устройств указаны до оформления.",
    icon: "tariffs",
  },
  {
    title: "Подключение через Telegram",
    description: "Основной сценарий оформления доступен в Telegram-боте.",
    icon: "telegram",
  },
  {
    title: "Поддержка пользователей",
    description: "Можно обратиться за помощью по настройке и подключению.",
    icon: "support",
  },
  {
    title: "Знакомые устройства",
    description: "iPhone, Android, Windows и macOS.",
    icon: "devices",
  },
] as const;

function TrustIcon({ icon }: { icon: (typeof trustSignals)[number]["icon"] }) {
  if (icon === "tariffs") {
    return <><path d="M6 5h12M6 10h12M6 15h7" /><path d="M17 14v6M14 17h6" /></>;
  }
  if (icon === "telegram") {
    return <path d="m20.5 4.2-3 15.1c-.2 1-1 1.2-1.8.7l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L5.7 13.2 1.1 11.8c-1-.3-1-1 .2-1.5l17.9-6.9c.8-.3 1.6.2 1.3.8Z" fill="currentColor" stroke="none" />;
  }
  if (icon === "support") {
    return <><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 12H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h2v-5H4ZM20 12h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2v-5h1Z" /><path d="M19 17c0 2-2 3-4 3" /></>;
  }
  return <><rect x="3" y="4" width="13" height="10" rx="1.5" /><path d="M7 19h5M9.5 14v5M18.5 8.5h2v11h-6v-3" /></>;
}

export function TrustSignals() {
  return (
    <section className="relative py-16 sm:py-20" aria-labelledby="trust-title">
      <div className="container-shell">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Почему мы</p>
            <h2 id="trust-title" className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
              Почему выбирают нас
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-500">
            Коротко о том, что важно до оформления подписки.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {trustSignals.map((item) => (
            <article key={item.title} className="surface relative overflow-hidden p-4 sm:p-6">
              <span className="grid size-10 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/[0.07] text-violet-200">
                <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <TrustIcon icon={item.icon} />
                </svg>
              </span>
              <h3 className="mt-5 text-[13px] font-semibold leading-5 text-white sm:text-sm">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
