# 03. Оплата

**Файл:** [`billing.html`](../billing.html)
**Заголовок:** `Оплата`
**URL:** `/billing/`, `/billing/?tab=invoices`, `/billing/?tab=entities`

## 1. Назначение

Страница финансового управления компанией-клиентом:

- выбрать тариф и оплатить его (3 пакета);
- видеть историю **счетов** с разными статусами (Ожидает / Оплачен / Просрочен), скачивать PDF;
- управлять **юридическими лицами** (контрагентами) для оформления счетов.

Три логических раздела — **вкладки**: Тарифы / Счета / Юридические лица.

## 2. Роли и доступ

| Роль | Доступ |
| --- | --- |
| Администратор компании | Полный |
| Пользователь с правом «Финансы → Создавать счета» | Вкладки «Счета», «Юридические лица» |
| Пользователь с правом «Финансы → Создать юридические лица» | Вкладка «Юридические лица» |
| Остальные | **Нет доступа** к странице |

## 3. Компоновка

```
┌──────────────────────────────────────────────────────────────┐
│  <h1> Оплата                                                 │
├──────────────────────────────────────────────────────────────┤
│  [Тарифы] [Счета] [Юридические лица]    (nav tabs)          │
│  ─────────────────────────────────────────────────────────── │
│                                                              │
│  (контент активной вкладки)                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Навигация по вкладкам ([Flowbite Tabs](https://flowbite.com/docs/components/tabs/))

```html
<div class="border-b border-gray-200 mb-6">
  <nav class="flex gap-6 text-sm" id="tabs">
    <button data-tab="plans"
            class="tab -mb-px border-b-2 border-indigo-600 text-indigo-700 py-3">Тарифы</button>
    <button data-tab="invoices"
            class="tab -mb-px border-b-2 border-transparent text-gray-600 hover:text-gray-900 py-3">Счета</button>
    <button data-tab="entities"
            class="tab -mb-px border-b-2 border-transparent text-gray-600 hover:text-gray-900 py-3">Юридические лица</button>
  </nav>
</div>
```

**JS:** клик по `.tab` → перенос `border-indigo-600 text-indigo-700` на активную, остальным `border-transparent text-gray-600`, toggle `.hidden` на панелях. Активная вкладка — query `?tab=...`, по умолчанию `plans`.

## 4. Вкладка «Тарифы»

### Сетка

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
  <!-- ПАКЕТ 100 -->
  <!-- ПАКЕТ 500 (самый популярный, выделенная карточка) -->
  <!-- ПАКЕТ 1000 (самый выгодный) -->
</div>
```

### Карточка тарифа

```html
<div class="relative bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
  <!-- бейдж-уголок для выделенного тарифа -->
  <span class="absolute top-3 right-3 inline-flex items-center gap-1.5 text-xs text-indigo-700">
    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
    Самый популярный
  </span>

  <div class="text-xs uppercase tracking-wider text-gray-500">ТАРИФ</div>
  <div class="text-base text-gray-900 mt-1">ПАКЕТ 500</div>

  <div class="mt-5">
    <span class="text-3xl text-gray-900">39 990</span>
    <span class="text-sm text-gray-500 ml-1">₽</span>
    <div class="text-xs text-gray-500 mt-1">за 500 поданных дел</div>
  </div>

  <hr class="my-5 border-gray-200" />

  <ul class="space-y-2.5 text-sm text-gray-700 flex-1">
    <li class="flex items-start gap-2">
      <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" ...></svg>
      До 500 поданных дел
    </li>
    <li class="flex items-start gap-2">
      <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" ...></svg>
      Личный кабинет клиента
    </li>
    <li class="flex items-start gap-2">
      <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" ...></svg>
      Аналитика
    </li>
    <li class="flex items-start gap-2">
      <svg class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" ...></svg>
      Брендирование
    </li>
  </ul>

  <button class="mt-6 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-lg
                 bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          data-select-plan="500">
    Выбрать →
  </button>
</div>
```

**Требования (ТЗ v4.11):**
- Только названия `ПАКЕТ 100`, `ПАКЕТ 500`, `ПАКЕТ 1000` — **без иных заголовков/подзаголовков**.
- Цены: `9 900`, `39 990`, `69 900` ₽ — это стоимость **за количество поданных дел**, не за месяц.
- `ПАКЕТ 500` — помечен бейджем `Самый популярный` (indigo).
- `ПАКЕТ 1000` — помечен бейджем `Самый выгодный` (success).
- Возможности: `До N поданных дел` + `Личный кабинет клиента` + `Аналитика` + `Брендирование`.
- Кнопка `Выбрать →` открывает **drawer создания счёта** (см. 4.1).

### 4.1. Drawer создания счёта (по кнопке «Выбрать»)

Ширина `max-w-md`.

**Поля формы:**
- Выбранный тариф (read-only: `bg-gray-50`), сумма.
- Юридическое лицо — `<select>` со списком юр. лиц компании, + ссылка `+ Добавить юр. лицо` (переходит на вкладку «Юридические лица» → открывает drawer создания).
- Email для отправки счёта (предзаполнен email текущего пользователя).
- Комментарий к счёту (`<textarea rows="3">`).

**Кнопки:**
- `Отмена` (secondary)
- `Создать счёт` (primary) → POST `/api/v1/billing/invoices/`, drawer закрывается, тост «Счёт создан. Откройте вкладку Счета.»

## 5. Вкладка «Счета»

### Toolbar

```html
<div class="flex flex-wrap items-center gap-3 mb-5">
  <div class="relative">
    <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ...></svg>
    <input placeholder="Поиск по № счёта или юр. лицу"
           class="h-10 w-80 pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-sm" />
  </div>

  <select class="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700">
    <option value="all">Все статусы</option>
    <option value="pending">Ожидает оплаты</option>
    <option value="paid">Оплачен</option>
    <option value="overdue">Просрочен</option>
  </select>

  <div class="ml-auto">
    <button class="inline-flex items-center gap-2 h-10 px-4 rounded-lg
                   bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
      <svg class="w-4 h-4" ...></svg> Создать счёт
    </button>
  </div>
</div>
```

**Требование ТЗ:** `Никаких "Период оплаты" в счетах, счета только по тарифам.`

### Таблица счетов

| # | Колонка | Отображение |
| --- | --- | --- |
| 1 | № счёта | `text-gray-900`, ссылка на PDF-просмотр |
| 2 | Юридическое лицо | `text-gray-700` |
| 3 | Сумма | `text-gray-900`, формат `39 990 ₽` |
| 4 | Дата создания | `dd.mm.yyyy` |
| 5 | Срок оплаты | `dd.mm.yyyy`, если `< today` и статус `pending` → `text-rose-700` |
| 6 | Статус | Бейдж: Ожидает (warning), Оплачен (success), Просрочен (danger) |
| 7 | Действия | Icon-buttons: скачать PDF (стрелка вниз), отменить (для `pending`) |

```html
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-[#f3f4f6] text-gray-600">
        <tr>
          <th class="px-4 py-3 text-left">№ счёта</th>
          <th class="px-4 py-3 text-left">Юр. лицо</th>
          <th class="px-4 py-3 text-right">Сумма</th>
          <th class="px-4 py-3 text-left">Создан</th>
          <th class="px-4 py-3 text-left">Срок оплаты</th>
          <th class="px-4 py-3 text-left">Статус</th>
          <th class="px-4 py-3 text-right">Действия</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3">
            <a class="text-indigo-600 hover:text-indigo-700" href="/billing/invoices/INV-0001.pdf">INV-0001</a>
          </td>
          <td class="px-4 py-3 text-gray-700">ООО «Право и Порядок»</td>
          <td class="px-4 py-3 text-right text-gray-900">39 990 ₽</td>
          <td class="px-4 py-3 text-gray-700">21.04.2026</td>
          <td class="px-4 py-3 text-gray-700">28.04.2026</td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center gap-1.5 text-xs text-emerald-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Оплачен
            </span>
          </td>
          <td class="px-4 py-3">
            <div class="inline-flex items-center gap-1 justify-end w-full">
              <a class="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-600
                        inline-flex items-center justify-center"
                 href="/billing/invoices/INV-0001.pdf" download title="Скачать">
                <svg class="w-4 h-4" ...></svg>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Фильтрация / поиск

- Фильтр статусов — применяется сразу при выборе опции.
- Поиск — debounce 300ms, фильтр по `invoice.number.includes(q)` или `invoice.entity.name.includes(q)`.

## 6. Вкладка «Юридические лица»

### Toolbar

```
[Поиск по названию или ИНН]         [+ Добавить юр. лицо]  (CTA)
```

### Таблица юр. лиц

| # | Колонка | Источник |
| --- | --- | --- |
| 1 | Название | `LegalEntity.name` |
| 2 | ИНН | `LegalEntity.inn` (10 или 12 цифр) |
| 3 | Телефон | `LegalEntity.phone` (формат `+7 (XXX) XXX-XX-XX`) |
| 4 | Email | `LegalEntity.email` |
| 5 | Действия | Редактировать (карандаш) / Удалить (корзина) |

### Drawer «Добавить / Редактировать юр. лицо»

Ширина `max-w-md`. Поля:

- Название (обязательно, 2–255 символов)
- ИНН (обязательно, 10 или 12 цифр, валидация по контрольной сумме на бэкенде)
- КПП (опционально, 9 цифр)
- Юридический адрес (обязательно, `<textarea rows="2">`)
- Банковские реквизиты (БИК, Р/счёт, Банк)
- Контактный телефон
- Контактный email

**Удаление:** drawer подтверждения (`max-w-sm`), текст:
```
Удалить юридическое лицо?
{название}

К этому юр. лицу привязано {N} счетов. Они сохранятся в истории.
```

## 7. Данные и модели

### API endpoints

| Endpoint | Метод | Назначение |
| --- | --- | --- |
| `/api/v1/billing/plans/` | GET | 3 тарифа (статический список) |
| `/api/v1/billing/invoices/` | GET | Список счетов (поиск, фильтр статуса) |
| `/api/v1/billing/invoices/` | POST | Создать счёт (из тарифа или вручную) |
| `/api/v1/billing/invoices/{id}/pdf/` | GET | Скачать PDF счёта |
| `/api/v1/billing/invoices/{id}/cancel/` | POST | Отменить ожидающий счёт |
| `/api/v1/billing/entities/` | GET / POST | Юр. лица компании |
| `/api/v1/billing/entities/{id}/` | PATCH / DELETE | Изменить / удалить |

### Модели Django (`apps/subscriptions`)

- `Service` — тариф (name, limit, price). 3 записи в `bootstrap_project`.
- `Subscription` — `organization`, `service`, `paid_until`, `used`, `limit`, `status`.
- `Invoice` — `number`, `organization`, `legal_entity` (FK → LegalEntity), `service` (FK → Service), `amount`, `created_at`, `due_at`, `status` (`pending` / `paid` / `overdue`), `pdf_file` (FileField, генерация через Gotenberg).
- `LegalEntity` — `name`, `inn`, `kpp`, `address`, `bank_bik`, `bank_account`, `bank_name`, `phone`, `email`, `organization` (FK).

### Состояния статусов счетов

| Статус (БД) | Бейдж | Условие |
| --- | --- | --- |
| `pending` | `Ожидает оплаты` (warning) | Срок ≥ today |
| `paid` | `Оплачен` (success) | `paid_at IS NOT NULL` |
| `overdue` | `Просрочен` (danger) | Срок `<` today, `paid_at IS NULL` |

Переход `pending → overdue` автоматический (Celery beat: ежедневная задача).

## 8. Состояния вкладок

| Вкладка | Состояние | UI |
| --- | --- | --- |
| Тарифы | Активный тариф | Помечается `ring-2 ring-indigo-400`, кнопка превращается в `Текущий тариф` (disabled, `bg-gray-100 text-gray-500`) |
| Счета | Пусто | Иллюстрация + текст `Ещё не выставлено счетов` + CTA `Создать счёт` |
| Счета | Ошибка загрузки | Карточка с ошибкой + `Повторить` |
| Юр. лица | Пусто | Текст `Добавьте юридическое лицо, чтобы выставлять счета` + CTA |

## 9. Адаптивность

| Ширина | Поведение |
| --- | --- |
| `< md` | Тарифы — 1 колонка, таблицы горизонтальный скролл, toolbar стеком |
| `md – lg` | Тарифы — 2 колонки (или 3 компактных) |
| `≥ lg` | Тарифы — 3 в ряд, таблицы во всю ширину |

**Drawer** всегда `w-full max-w-md` на десктопе, `w-full` на мобильном.

## 10. Интерактив

- Переключение вкладок меняет `?tab=` в URL (History API, без перезагрузки).
- Кнопка `Выбрать →` на тарифе — открывает drawer с предзаполненным тарифом и суммой.
- Кнопка `Скачать` — `<a download>` на PDF endpoint, без drawer'а.
- Клик по строке счёта не ведёт никуда (действия — через иконки, чтобы случайно не провалиться при попытке выделить текст).

## 11. Acceptance criteria

- [ ] 3 вкладки: Тарифы / Счета / Юридические лица.
- [ ] Тарифы: 3 карточки, названия `ПАКЕТ 100/500/1000`, без других заголовков.
- [ ] Цена `9 900 / 39 990 / 69 900 ₽` (без строки «в месяц»).
- [ ] ПАКЕТ 500 — `Самый популярный` (indigo), ПАКЕТ 1000 — `Самый выгодный` (success).
- [ ] Кнопка `Выбрать →` на тарифе открывает drawer создания счёта.
- [ ] Счета: фильтр статусов (`Все`, `Ожидает`, `Оплачен`, `Просрочен`), поиск.
- [ ] Колонки таблицы счетов: №, Юр. лицо, Сумма, Дата создания, Срок оплаты, Статус, Действия.
- [ ] В счетах **нет** колонки «Период оплаты».
- [ ] Действие `Скачать` в таблице счетов работает.
- [ ] Бейджи статусов без фона.
- [ ] Юр. лица: колонки Название, ИНН, Телефон, Email, Действия.
- [ ] Добавление/редактирование юр. лица — через drawer справа.
- [ ] Удаление юр. лица — drawer подтверждения (danger-кнопка).

## 12. Ссылки на компоненты

- [design-system.md §7.10 — Вкладки](../design-system.md)
- [design-system.md §7.7 — Таблица](../design-system.md)
- [design-system.md §7.8 — Drawer](../design-system.md)
- [Flowbite — Tabs](https://flowbite.com/docs/components/tabs/)
- [Flowbite — Pricing Table](https://flowbite.com/docs/components/pricing/)
- [Flowbite — Modal / Drawer](https://flowbite.com/docs/components/drawer/)
- [Tailwind — Grid](https://tailwindcss.com/docs/grid-template-columns)
