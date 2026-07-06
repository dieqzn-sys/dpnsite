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
- отправляет заявку в Telegram через серверный `fetch`;
- записывает заявку в Google Sheets через Apps Script webhook;
- возвращает `{ "success": true }` после принятия данных.

Если Telegram API или Google Sheets webhook временно недоступны, ошибка записывается в серверную консоль, но пользователь всё равно получает успешное подтверждение формы.

## Telegram-уведомления

Отправка уведомлений реализована непосредственно в `app/api/lead/route.ts` через метод Telegram Bot API `sendMessage`. Сообщение отправляется как обычный текст без `parse_mode`.

Чтобы подключить уведомления:

1. Создайте технического бота через BotFather и получите токен.
2. Откройте диалог с ботом и отправьте ему `/start` либо добавьте бота в нужную группу или канал.
3. Определите ID чата, в который должны приходить заявки.
4. Добавьте токен и ID чата в переменные окружения.

Для локального запуска создайте `.env.local`:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
GOOGLE_SHEETS_WEBHOOK_URL=
```

- `TELEGRAM_BOT_TOKEN` — токен технического бота, полученный у BotFather.
- `TELEGRAM_CHAT_ID` — ID пользователя, группы или канала, куда бот должен отправлять заявки.
- `GOOGLE_SHEETS_WEBHOOK_URL` — URL опубликованного Apps Script Web App.

Файл `.env.local` содержит секреты, игнорируется Git и не должен попадать в коммиты. В репозитории хранится только безопасный шаблон `.env.example` без реальных значений.

Если переменные не заданы, форма продолжает работать локально, а сервер выводит предупреждение и пропускает отправку уведомления.

### Настройка в Vercel

Добавьте `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` и `GOOGLE_SHEETS_WEBHOOK_URL` в настройках проекта Vercel: **Settings → Environment Variables**. Для рабочего сайта переменная `GOOGLE_SHEETS_WEBHOOK_URL` должна быть включена для окружения **Production**. После добавления или изменения переменных выполните новый production deploy/redeploy.

После настройки отправьте тестовую заявку через форму и проверьте, что технический бот прислал сообщение в указанный чат.

### Inline-кнопки статусов

К уведомлению о новой заявке прикрепляются четыре кнопки:

- 🟡 В работу → `В работе`
- 💳 Оплата получена → `Оплата получена`
- ✅ Доступ выдан → `Доступ выдан`
- ❌ Отклонить → `Отклонена`

Нажатие кнопки отправляет `callback_query` в `POST /api/telegram/webhook`. Route отвечает через `answerCallbackQuery`, меняет строку `Статус:` методом `editMessageText`, сохраняет inline-кнопки и синхронизирует новый статус с Google Sheets.

После публикации сайта установите webhook технического бота:

```text
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://YOUR_DOMAIN/api/telegram/webhook
```

Подставьте токен только локально при выполнении запроса. Не сохраняйте готовый URL с токеном в репозитории или публичных логах.

## Google Sheets webhook

Заявки записываются в таблицу **DPN Leads**, лист **Заявки**, через опубликованный Apps Script Web App.

1. Создайте Google-таблицу `DPN Leads` с листом `Заявки` и колонками A–N из описания проекта.
2. Создайте привязанный Apps Script.
3. Скопируйте код из `docs/google-apps-script.js` в редактор Apps Script.
4. Опубликуйте Apps Script как Web App с доступом для входящих запросов.
5. Скопируйте URL deployment и добавьте его в `GOOGLE_SHEETS_WEBHOOK_URL` локально и в Vercel.
6. После изменения кода Apps Script создайте новую версию deployment.
7. После изменения переменных в Vercel выполните новый deploy/redeploy.

Apps Script поддерживает два действия:

- `createLead` или отсутствие `action` — добавляет новую строку;
- `updateStatus` — находит заявку по колонке A, меняет статус в колонке C, `message_id` в колонке M и дату обновления в колонке N.

API отправляет в webhook следующие поля:

```json
{
  "action": "createLead",
  "leadId": "DPN-YYYYMMDD-HHMMSS-XXXX",
  "status": "Новая",
  "tariff": "Pro",
  "period": "1 месяц",
  "price": 299,
  "devices": 5,
  "name": "Иван",
  "contact": "@username",
  "device": "iPhone",
  "comment": "Комментарий",
  "source": "сайт",
  "telegramMessageId": "123"
}
```

При изменении статуса API отправляет:

```json
{
  "action": "updateStatus",
  "leadId": "DPN-YYYYMMDD-HHMMSS-XXXX",
  "status": "В работе",
  "telegramMessageId": "123"
}
```

Если `leadId` не найден, Apps Script возвращает `{ "success": false, "error": "Lead not found" }`.

Если URL webhook не задан, форма продолжает работать, а сервер выводит предупреждение `Google Sheets webhook URL is not configured`.

## Структура

```text
app/
  api/lead/route.ts
  api/telegram/webhook/route.ts
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
docs/
  google-apps-script.js
lib/
  lead-status.ts
```
