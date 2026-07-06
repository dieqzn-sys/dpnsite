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
- передаёт заявку в модуль Telegram-уведомлений;
- возвращает `{ "success": true }` после принятия данных.

Если Telegram API временно недоступен или отклоняет запрос, ошибка записывается в серверную консоль, но пользователь всё равно получает успешное подтверждение формы.

## Telegram-уведомления

Отправка уведомлений реализована в `lib/telegram.ts` через метод Telegram Bot API `sendMessage`. Сообщение отправляется как обычный текст без `parse_mode`.

Чтобы подключить уведомления:

1. Создайте технического бота через BotFather и получите токен.
2. Откройте диалог с ботом и отправьте ему `/start` либо добавьте бота в нужную группу или канал.
3. Определите ID чата, в который должны приходить заявки.
4. Добавьте токен и ID чата в переменные окружения.

Для локального запуска создайте `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

- `TELEGRAM_BOT_TOKEN` — токен технического бота, полученный у BotFather.
- `TELEGRAM_CHAT_ID` — ID пользователя, группы или канала, куда бот должен отправлять заявки.

Файл `.env.local` содержит секреты, игнорируется Git и не должен попадать в коммиты. В репозитории хранится только безопасный шаблон `.env.example` без реальных значений.

Если переменные не заданы, форма продолжает работать локально, а сервер выводит предупреждение и пропускает отправку уведомления.

### Настройка в Vercel

Добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в настройках проекта Vercel: **Settings → Environment Variables**. Выберите нужные окружения и выполните новый deploy/redeploy, чтобы приложение получило добавленные значения.

После настройки отправьте тестовую заявку через форму и проверьте, что технический бот прислал сообщение в указанный чат.

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
lib/
  telegram.ts
```
