# ЮрКлик — Техническое задание (постранично)

Папка содержит **развёрнутое постраничное ТЗ** для фронтенда личного кабинета компании-клиента платформы «ЮрКлик». Исходное требование — фронтенд v4.11, полностью реализованный на **Tailwind CSS + Flowbite** без кастомного CSS и inline-стилей.

Каждая страница описана в отдельном файле по единому шаблону:

1. **Назначение** — роль страницы в системе, ключевые пользовательские сценарии.
2. **Роли и доступ** — кто видит страницу и какие права ей соответствуют.
3. **Компоновка** — заголовок, секции, сетка, ответственность зон.
4. **Блоки и компоненты** — со ссылками на раздел [design-system.md](../design-system.md) и на соответствующие компоненты [Flowbite](https://flowbite.com/docs/) и [Tailwind](https://tailwindcss.com/docs).
5. **Данные и модели** — поля, связи с моделями Django (`apps/cases`, `apps/users`, `apps/documents`, `apps/subscriptions`, `apps/organizations`).
6. **Состояния** — пустое, загрузка, ошибка, успех.
7. **Интерактив** — раскрытия, drag & drop, фильтры, сортировки, поповеры, выезжающие панели (drawer).
8. **Адаптивность** — mobile-first, поведение на `sm / md / lg` брейкпоинтах.
9. **Acceptance criteria** — чеклист готовности страницы.

## Оглавление

| № | Файл | Страница | URL-слот (DRF/Ninja) |
| --- | --- | --- | --- |
| 0 | [00-common.md](00-common.md) | Общие требования (лейаут, цвета, правила UI) | — |
| 1 | [01-dashboard.md](01-dashboard.md) | Дашборд — обзор показателей платформы | `/dashboard/` |
| 2 | [02-users.md](02-users.md) | Пользователи — юристы и роли | `/users/` |
| 3 | [03-billing.md](03-billing.md) | Оплата — тарифы, счета, юр. лица | `/billing/` |
| 4 | [04-branding.md](04-branding.md) | Брендинг — домен, цвета, логотип, White-label | `/branding/` |
| 5 | [05-clients.md](05-clients.md) | Клиенты — список дел, документы, стадии | `/clients/` |

## Ссылки на документацию

- [Tailwind CSS — Utility-first classes](https://tailwindcss.com/docs/utility-first)
- [Flowbite — Components](https://flowbite.com/docs/components/)
- [Flowbite — Drawer](https://flowbite.com/docs/components/drawer/)
- [Flowbite — Tabs](https://flowbite.com/docs/components/tabs/)
- [Flowbite — Popover](https://flowbite.com/docs/components/popover/)
- [Flowbite — Forms](https://flowbite.com/docs/components/forms/)
- [Flowbite — Tables](https://flowbite.com/docs/components/tables/)
- [Flowbite — Toggle](https://flowbite.com/docs/forms/toggle/)

## Связанные файлы в репозитории

- [`design-system.md`](../design-system.md) — единые правила оформления (палитра, типографика, компоненты, паттерны)
- [`assets/layout.js`](../assets/layout.js) — общий лейаут (сайдбар, уведомления, админ-блок)
- `dashboard.html`, `users.html`, `billing.html`, `branding.html`, `clients.html` — текущая реализация превью

## Ограничения (действуют для всех страниц)

- Только **Tailwind CSS** + **Flowbite** — запрещены `<style>`, `style=""`, кастомные CSS-классы, SCSS, CSS-in-JS.
- Все классы **статически определимы** (не собираются из строк в рантайме).
- Фон приложения — `bg-gray-50`, CTA — `bg-indigo-600` / `hover:bg-indigo-700`, шрифт — `Inter`.
- Таблицы: `<thead>` с фоном `bg-[#f3f4f6]`, разделители — `divide-y divide-gray-100`.
- Статус-бейджи — **без фона**, только точка + цветной текст (см. [design-system.md §7.5](../design-system.md)).
- Верхней панели и футера нет — максимум полезной площади.
- Сайдбар: уведомления сверху, навигация по центру, админ-блок снизу.
- Все метки — с точкой слева.
- Интерфейс — на русском языке.
