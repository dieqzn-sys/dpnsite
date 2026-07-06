"use client";

import { FormEvent, useRef, useState } from "react";
import { devices } from "@/data/site";
import {
  formatDeviceCount,
  getTariffById,
  getTariffPeriodById,
  getTariffPrice,
  tariffPeriods,
  tariffs,
} from "@/data/tariffs";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [tariffId, setTariffId] = useState("");
  const [periodId, setPeriodId] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const selectedTariff = getTariffById(tariffId);
  const selectedPeriod = getTariffPeriodById(periodId);
  const totalPrice = getTariffPrice(tariffId, periodId);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      tariffId: formData.get("tariffId"),
      periodId: formData.get("periodId"),
      device: formData.get("device"),
      comment: formData.get("comment"),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Не удалось отправить заявку.");
      }

      formRef.current?.reset();
      setTariffId("");
      setPeriodId("");
      setStatus("success");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось отправить заявку.",
      );
      setStatus("error");
    }
  }

  return (
    <section id="lead-form" className="section-space relative overflow-hidden">
      <div className="absolute -left-40 top-1/4 -z-10 size-[500px] rounded-full bg-cyan-600/[0.07] blur-[150px]" />
      <div className="container-shell">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080c13]/90 shadow-2xl shadow-black/25">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative overflow-hidden border-b border-white/[0.07] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div className="hero-grid absolute inset-0 opacity-25" />
              <div className="relative">
                <p className="eyebrow">Без Telegram</p>
                <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Оставить заявку без Telegram
                </h2>
                <p className="mt-4 max-w-md text-base leading-7 text-slate-400">
                  Выберите тариф и срок подписки. Мы рассчитаем стоимость и свяжемся с вами по указанному контакту.
                </p>

                <div className="mt-9 space-y-4">
                  {[
                    ["01", "Заполните короткую форму"],
                    ["02", "Получите данные для оплаты"],
                    ["03", "Подключитесь по нашей инструкции"],
                  ].map(([number, label]) => (
                    <div key={number} className="flex items-center gap-3.5">
                      <span className="grid size-8 place-items-center rounded-full border border-cyan-300/15 bg-cyan-400/[0.06] text-[10px] font-bold text-cyan-200">
                        {number}
                      </span>
                      <span className="text-sm text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-white/[0.08] bg-black/20 p-4">
                  <p className="flex items-start gap-2 text-xs font-semibold leading-5 text-white">
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                    Ручная выдача без Telegram — обычно в течение 5–15 минут в рабочее время.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-10">
              {status === "success" ? (
                <div
                  className="flex min-h-[560px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <div className="grid size-16 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-400/10 text-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.08)]">
                    <svg className="size-8" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="m5 12.5 4 4L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">
                    Заявка отправлена.
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                    Мы свяжемся с вами по указанному контакту и передадим данные для оплаты и подключения.
                  </p>
                  <button
                    type="button"
                    className="button-secondary mt-7 px-5 py-3 text-sm"
                    onClick={() => setStatus("idle")}
                  >
                    Отправить ещё одну заявку
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="name">
                      Имя <span aria-hidden="true">*</span>
                    </label>
                    <input className="field" id="name" name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contact">
                      Контакт для связи <span aria-hidden="true">*</span>
                    </label>
                    <input className="field" id="contact" name="contact" type="text" autoComplete="email" placeholder="Email, телефон или мессенджер" required />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="tariffId">
                      Тариф <span aria-hidden="true">*</span>
                    </label>
                    <select
                      className="field"
                      id="tariffId"
                      name="tariffId"
                      value={tariffId}
                      onChange={(event) => setTariffId(event.target.value)}
                      required
                    >
                      <option value="" disabled>Выберите тариф</option>
                      {tariffs.map((tariff) => (
                        <option key={tariff.id} value={tariff.id}>
                          {tariff.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="field-label" htmlFor="periodId">
                      Срок <span aria-hidden="true">*</span>
                    </label>
                    <select
                      className="field"
                      id="periodId"
                      name="periodId"
                      value={periodId}
                      onChange={(event) => setPeriodId(event.target.value)}
                      required
                    >
                      <option value="" disabled>Выберите срок</option>
                      {tariffPeriods.map((period) => (
                        <option key={period.id} value={period.id}>
                          {period.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedTariff && selectedPeriod && totalPrice !== undefined && (
                    <div
                      className="sm:col-span-2 rounded-2xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/[0.08] to-blue-500/[0.05] p-5 shadow-[0_0_32px_rgba(34,211,238,0.05)]"
                      aria-live="polite"
                    >
                      <p className="text-sm font-medium text-slate-300">
                        Итого к оплате:{" "}
                        <span className="ml-1 text-xl font-semibold tracking-[-0.03em] text-white">
                          {totalPrice} ₽
                        </span>
                      </p>
                      <p className="mt-2 text-xs font-medium text-cyan-200/75">
                        {selectedTariff.name} · {selectedPeriod.label} · {formatDeviceCount(selectedTariff.deviceCount)}
                      </p>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="device">
                      Устройство <span aria-hidden="true">*</span>
                    </label>
                    <select className="field" id="device" name="device" defaultValue="" required>
                      <option value="" disabled>Выберите устройство</option>
                      {devices.map((device) => (
                        <option key={device} value={device}>{device}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="comment">Комментарий</label>
                    <textarea className="field min-h-28 resize-y" id="comment" name="comment" placeholder="Например: нужно подключить телефон и ноутбук" />
                  </div>

                  {status === "error" && (
                    <p className="sm:col-span-2 rounded-xl border border-red-400/15 bg-red-400/[0.06] px-4 py-3 text-sm text-red-200" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <button type="submit" className="button-primary w-full py-4" disabled={status === "submitting"}>
                      {status === "submitting" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Отправляем заявку…
                        </>
                      ) : (
                        <>
                          Отправить заявку <span aria-hidden="true">→</span>
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-center text-[11px] leading-5 text-slate-600">
                      Отправляя форму, вы соглашаетесь на обработку данных для связи по заявке.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
