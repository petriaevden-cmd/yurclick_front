# 01. Дашборд

**Файл:** [`dashboard.html`](../dashboard.html)
**Заголовок:** `Обзор показателей платформы` (слово «Дашборд» в `<h1>` **не пишем**).
**URL:** `/dashboard/`

## 1. Назначение

Главная посадочная страница личного кабинета **компании-клиента**. Показывает быстрые показатели по платформе — тариф, количество поданных/активных/срочных/завершённых дел, авторизованных клиентов — в виде 6 KPI-карточек, и график подачи дел в суд с блоком статусов.

Цель — дать администратору компании возможность за 5 секунд оценить состояние бизнеса и глубже уйти в нужный раздел (через ссылки-действия в каждой карточке).

## 2. Роли и доступ

| Роль | Доступ |
| --- | --- |
| Администратор компании-клиента | Полный |
| Старший юрист | Полный |
| Юрист / помощник юриста | Читать, если право «Отчёты и аналитика → Просматривать дашборд» включено (см. [02-users.md](02-users.md)) |
| Клиент компании-клиента | **Нет** |

## 3. Компоновка

```
┌──────────────────────────────────────────────────────────────┐
│  <h1> Обзор показателей платформы                           │
├──────────────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐                                  │
│  │ KPI1 │ │ KPI2 │ │ KPI3 │   ← 3 в строке на lg:           │
│  └──────┘ └──────┘ └──────┘                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐                                  │
│  │ KPI4 │ │ KPI5 │ │ KPI6 │                                  │
│  └──────┘ └──────┘ └──────┘                                  │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐  ┌───────────────────────┐    │
│  │  График (2/3)            │  │ Статусы дел (1/3)     │    │
│  │  Chart.js line chart     │  │ + «Контроль сроков»   │    │
│  └──────────────────────────┘  └───────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Сетки

| Зона | Grid |
| --- | --- |
| KPI-карточки (6 шт.) | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` |
| График + статусы | `grid grid-cols-1 lg:grid-cols-3 gap-5` → график `lg:col-span-2`, статусы `lg:col-span-1` |

Контейнер страницы — `px-4 sm:px-6 lg:px-10 py-6 lg:py-8`.

## 4. Блоки

### 4.1. KPI-карточка (универсальный шаблон)

```html
<div class="bg-white rounded-xl border border-gray-200 p-5">
  <!-- 1. Мета-метка сверху -->
  <div class="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
    <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
    <span>ДЕЛ ПОДАНО</span>
  </div>
  <!-- 2. Крупная цифра -->
  <div class="text-4xl text-gray-900 mt-4">128</div>
  <!-- 3. Описание -->
  <div class="text-sm text-gray-600 mt-1">Дел подано в текущем месяце</div>
  <!-- 4. Разделитель -->
  <hr class="my-4 border-gray-200" />
  <!-- 5. Footer: бейдж слева + ссылка справа -->
  <div class="flex flex-wrap items-center justify-between gap-2">
    <span class="inline-flex items-center gap-1.5 text-xs text-emerald-700 whitespace-nowrap">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
      +12% к прошлому месяцу
    </span>
    <a class="text-xs text-indigo-600 hover:text-indigo-700 whitespace-nowrap" href="/cases/">
      Все дела →
    </a>
  </div>
</div>
```

**Правило для footer'а:** `flex-wrap` + `gap-2` + `whitespace-nowrap` на обеих частях — предотвращает наложение при узких контейнерах.

### 4.2. Состав 6 KPI-карточек

| № | Метка | Цифра / значение | Подпись | Метка в footer | Ссылка |
| --- | --- | --- | --- | --- | --- |
| 1 | `ТАРИФНЫЙ ПЛАН` | Название пакета, напр. «ПАКЕТ 500» (средний `text-3xl`) | `Лимит 500 дел / осталось 200 дел` (прогресс-бара **нет**, без жирного) | `Оплачен до 14.05.2026` (info) | `Тариф →` → `/billing/?tab=plans` |
| 2 | `ДЕЛ ПОДАНО` | Большая цифра `text-4xl` | `Дел подано в текущем месяце` | `+12% к прошлому месяцу` (success) или `−8%` (danger) | `Все дела →` → `/cases/` |
| 3 | `ДЕЛ В РАБОТЕ` | Большая цифра | `Среди {N} юристов команды` | `+3 к прошлому месяцу` | `Пользователи →` → `/users/` |
| 4 | `ТРЕБУЮТ ВНИМАНИЯ` | Большая цифра | `Ожидают действий юриста` | `Срочно` (danger) | `Срочные дела →` → `/cases/?priority=urgent` |
| 5 | `АВТОРИЗОВАННЫХ КЛИЕНТОВ` | Большая цифра `60` + маленькая `/ 500` (меньшим размером, `text-2xl text-gray-500`) | `Хотя бы 1 раз вошли в кабинет` | `12% активны` (info) | `Клиенты →` → `/clients/` |
| 6 | `ДЕЛ ЗАВЕРШЕНО` | Большая цифра | `Завершённых дел с {дата запуска}` | `+{N} за 7 дней` (success) | `Завершённые дела →` → `/cases/?status=done` |

**Правила:**
- Никогда **не использовать** `font-bold` для крупных чисел — они заметны размером.
- Все метки имеют точку слева (`w-1.5 h-1.5 rounded-full`).
- Размер цифр: `text-4xl` для счётчиков (KPI 2–6), `text-3xl` для названия тарифа (KPI 1, чтобы текст поместился).

### 4.3. График подачи дел

**Размещение:** `lg:col-span-2` в гриде 3-колонок.

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <div class="flex items-center justify-between">
    <h2 class="text-base text-gray-900">Подача дел в суд</h2>
    <span class="text-xs text-gray-500">Последние 14 дней</span>
  </div>
  <div class="mt-4">
    <canvas id="chart-cases" height="220"></canvas>
  </div>
</div>
```

**Chart.js конфиг:**
- Тип: `line`.
- Ось X: 14 последних дат (формат `DD.MM`).
- Ось Y: количество дел.
- Цвет линии: `#4F46E5` (indigo-600), заливка под линией `rgba(79,70,229,0.08)`.
- Точки: `pointRadius: 3`, `pointHoverRadius: 5`.
- Сетка: только горизонтальная, `color: '#E5E7EB'`.
- Легенды нет.

**Подключение Chart.js:**
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
```

### 4.4. Блок «Статусы дел»

**Размещение:** `lg:col-span-1`. Две секции, разделённые `<hr>`.

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <div class="flex items-center justify-between">
    <h2 class="text-base text-gray-900">Статусы дел</h2>
    <span class="text-xs text-gray-500">Апрель 2026</span>
  </div>

  <dl class="mt-4 space-y-3 text-sm">
    <div class="flex items-center justify-between">
      <dt class="inline-flex items-center gap-2 text-gray-700">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
        Всего в работе
      </dt>
      <dd class="text-gray-900">342</dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="inline-flex items-center gap-2 text-gray-700">
        <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
        Новых дел
      </dt>
      <dd class="text-gray-900">28</dd>
    </div>
    <div class="flex items-center justify-between">
      <dt class="inline-flex items-center gap-2 text-gray-700">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        Требуют срочного внимания
      </dt>
      <dd class="text-gray-900">6</dd>
    </div>
  </dl>

  <hr class="my-5 border-gray-200" />

  <h3 class="text-sm text-gray-900">Контроль сроков</h3>
  <dl class="mt-3 space-y-2 text-sm text-gray-700">
    <div class="flex items-center justify-between">
      <dt>Среднее время подачи</dt>
      <dd class="text-gray-900">9 дней</dd>
    </div>
    <div class="flex items-center justify-between">
      <dt>Успешность закрытия</dt>
      <dd class="text-emerald-700">94%</dd>
    </div>
  </dl>

  <a href="/cases/"
     class="mt-5 inline-flex items-center justify-center w-full h-10 rounded-lg
            bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
    Перейти к делам
  </a>
</div>
```

## 5. Данные и источники

### API endpoints (Django-Ninja)

| Endpoint | Метод | Возвращает |
| --- | --- | --- |
| `/api/v1/dashboard/summary/` | GET | 6 KPI (см. ниже) |
| `/api/v1/dashboard/chart/cases-per-day/?days=14` | GET | `[{date, count}]` — 14 точек |
| `/api/v1/dashboard/status-counts/?period=month` | GET | Счётчики по статусам + контроль сроков |

### Структура ответа `summary`

```json
{
  "plan": { "name": "ПАКЕТ 500", "limit": 500, "remaining": 200, "paid_until": "2026-05-14" },
  "cases_submitted_month": { "count": 128, "delta_pct": 12 },
  "cases_in_progress": { "count": 342, "lawyers": 12, "delta": 3 },
  "cases_need_attention": { "count": 8 },
  "clients_authorized": { "active": 60, "total": 500, "active_pct": 12 },
  "cases_completed_total": { "count": 1284, "last_7_days": 47, "since": "2024-09-01" }
}
```

### Связи с моделями Django

| KPI | Источник |
| --- | --- |
| Тариф | `Subscription.service` (apps/subscriptions) → `Service.name`, `Subscription.paid_until`, `Subscription.limit`, `Subscription.used` |
| Подано в месяце | `Case.objects.filter(submitted_at__month=...)` |
| В работе | `Case.objects.filter(status__in=['processing','analysis','collecting','generating','filing'])` |
| Требуют внимания | `Case.objects.filter(needs_action=True)` |
| Клиенты | `User.objects.filter(role='client', last_login__isnull=False)` |
| Завершено | `Case.objects.filter(status='done')` |

## 6. Состояния

| Состояние | Отображение |
| --- | --- |
| Загрузка | Каждая карточка — скелет: `bg-gray-100 h-6 rounded w-24` вместо цифры, `animate-pulse` |
| Ошибка загрузки | Текст `—` вместо цифры, бейдж `danger` `Ошибка` в footer |
| Пустой результат | Ноль везде, без спец-состояния |
| Без подписки | KPI 1 → кнопка `bg-indigo-600` `Выбрать тариф`, остальные KPI серые с неактивными ссылками |

## 7. Адаптивность

| Ширина | Поведение |
| --- | --- |
| `< 768px` | KPI-карточки в одну колонку, график и статусы — стек под |
| `768px – 1024px` | KPI-карточки 2 в ряд, график и статусы — в одну колонку |
| `≥ 1024px` | KPI 3 в ряд, график 2/3 + статусы 1/3 |

Chart.js — `responsive: true`, высота `maintainAspectRatio: false`, `canvas height="220"`.

## 8. Интерактив

- Ссылки в footer каждой KPI — обычный `<a href="">`.
- Никаких модалок, поповеров, drawer'ов.
- На hover KPI-карточки — без визуальных эффектов (это не кликабельный контейнер, клик только по ссылке).

## 9. Acceptance criteria

- [ ] `<h1>` = «Обзор показателей платформы», без слова «Дашборд».
- [ ] 6 KPI-карточек, каждая с: метка + точка, крупная цифра (без bold), подпись, `<hr>`, бейдж + ссылка.
- [ ] KPI 1 не имеет прогресс-бара.
- [ ] KPI 5 показывает `60 / 500` (два разных размера цифр).
- [ ] Все метки и бейджи с точкой слева.
- [ ] Chart.js отрисован, Indigo, без легенды, с русскими датами в подписях осей.
- [ ] Блок «Статусы дел» содержит 3 метрики и секцию «Контроль сроков».
- [ ] Кнопка `Перейти к делам` — CTA (`bg-indigo-600 hover:bg-indigo-700`).
- [ ] На мобильном: 1 колонка KPI, график и статусы стеком.
- [ ] Сайдбар: блок уведомлений сверху, навигация, админ снизу. Нет верхней панели. Нет футера.

## 10. Ссылки на компоненты

- [design-system.md §7.6 — Карточка и KPI-карточка](../design-system.md)
- [design-system.md §3 — Типографика](../design-system.md)
- [Tailwind — Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns)
- [Flowbite — Card](https://flowbite.com/docs/components/card/)
- [Chart.js — Line Chart](https://www.chartjs.org/docs/latest/charts/line.html)
