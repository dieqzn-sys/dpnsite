"use client";

import { useEffect, useRef } from "react";
import { siteLinks } from "@/data/site";

export function ConnectionChooser() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function openChooser(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element) || !target.closest("[data-open-connection]")) {
        return;
      }

      event.preventDefault();

      const dialog = dialogRef.current;
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    }

    document.addEventListener("click", openChooser);
    return () => document.removeEventListener("click", openChooser);
  }, []);

  function closeChooser() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="connection-dialog"
      aria-labelledby="connection-dialog-title"
      aria-describedby="connection-dialog-description"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          closeChooser();
        }
      }}
    >
      <div className="connection-dialog__panel">
        <button
          type="button"
          className="connection-dialog__close"
          onClick={closeChooser}
          aria-label="Закрыть выбор способа подключения"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>

        <p className="eyebrow">Подключение</p>
        <h2 id="connection-dialog-title" className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
          Выберите удобный способ
        </h2>
        <p id="connection-dialog-description" className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
          Подключитесь через Telegram или оставьте заявку на сайте.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <article className="connection-option">
            <span className="connection-option__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m20.5 4.2-3 15.1c-.2 1-1 1.2-1.8.7l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L5.7 13.2 1.1 11.8c-1-.3-1-1 .2-1.5l17.9-6.9c.8-.3 1.6.2 1.3.8Z" fill="currentColor" />
              </svg>
            </span>
            <h3>Telegram</h3>
            <p>Быстрое подключение через бота.</p>
            <a
              href={siteLinks.telegramBot}
              target="_blank"
              rel="noreferrer"
              className="button-secondary mt-auto w-full px-5 py-3 text-sm"
              data-analytics-event="click_telegram"
              data-analytics-context="connection-chooser"
            >
              Открыть Telegram <span aria-hidden="true">↗</span>
            </a>
          </article>

          <article className="connection-option">
            <span className="connection-option__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 9h10M7 13h7M7 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <h3>Сайт</h3>
            <p>Оставьте заявку, если Telegram недоступен или удобнее получить помощь.</p>
            <a href="#lead-form" className="button-secondary mt-auto w-full px-5 py-3 text-sm" onClick={closeChooser}>
              Оставить заявку <span aria-hidden="true">→</span>
            </a>
          </article>
        </div>
      </div>
    </dialog>
  );
}
