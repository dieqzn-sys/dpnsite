# DPN — DEPKOV PRIVATE NETWORK

Одностраничный сайт VPN-сервиса DPN на Next.js, TypeScript, Tailwind CSS и App Router.

## Требования

- Node.js 20.9 или новее
- npm

## Установка и локальный запуск

```bash
npm install
npm run dev
```

После запуска откройте [http://localhost:3000](http://localhost:3000).

## Сборка и production-запуск

```bash
npm run build
npm run start
```

Проверка кода:

```bash
npm run lint
```

## Где редактировать данные

- Тарифы, идентификаторы, цены, сроки и количество устройств: `data/tariffs.ts`
- Контакты поддержки, Telegram-ссылки, email и навигация: `data/site.ts`
- Преимущества: `data/benefits.ts`
- FAQ: `data/faq.ts`

## Форма заявки и расчёт цены

Форма «Оставить заявку без Telegram» находится в `components/LeadForm.tsx`.

После выбора тарифа и срока форма получает цену из `data/tariffs.ts` и показывает итоговую стоимость. Клиент отправляет на сервер только `tariffId` и `periodId`, а не рассчитанную цену.

## API

Форма отправляет JSON-запрос на:

```text
POST /api/lead
```

Маршрут находится в `app/api/lead/route.ts`. Он:

- проверяет обязательные поля;
- находит тариф и срок по идентификаторам;
- самостоятельно определяет цену из `data/tariffs.ts`;
- формирует нормализованную заявку;
- возвращает `{ "success": true }` после принятия данных.

Сейчас заявка не передаётся во внешние системы. При локальной разработке нормализованные данные выводятся в консоль сервера. Будущие интеграции можно добавить в функцию `acceptLead`, не меняя валидацию и расчёт цены.

## Структура

```text
app/
  api/lead/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  Header.tsx
  Hero.tsx
  Benefits.tsx
  Tariffs.tsx
  HowItWorks.tsx
  LeadForm.tsx
  FAQ.tsx
  Support.tsx
  Footer.tsx
data/
  tariffs.ts
  faq.ts
  benefits.ts
  site.ts
```
