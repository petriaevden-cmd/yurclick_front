# 02. Пользователи

**Файл:** [`users.html`](../users.html)
**Заголовок:** `Пользователи`
**URL:** `/users/`

## 1. Назначение

Страница управления **внутренними пользователями компании-клиента** — юристами, помощниками юристов, старшими юристами. Здесь администратор:

- приглашает новых пользователей по email;
- создаёт и редактирует **роли** (помощник юриста … старший юрист) с кастомными наборами прав;
- редактирует права конкретного пользователя через выезжающую справа панель;
- удаляет пользователей (с подтверждением через drawer).

**Важно:** аватаров **нет**. Только ФИО, email, должность, роль, статус.

## 2. Роли и доступ

| Роль | Доступ |
| --- | --- |
| Администратор компании-клиента | Полный (приглашения, роли, права, удаление) |
| Старший юрист | Чтение + при наличии прав — приглашение |
| Юрист / помощник юриста | Чтение таблицы, без прав управления |
| Клиент компании-клиента | **Нет** |

## 3. Компоновка

```
┌──────────────────────────────────────────────────────────────┐
│  <h1> Пользователи                                           │
├──────────────────────────────────────────────────────────────┤
│  Toolbar:                                                    │
│    [Поиск по имени/email] [Все роли ▾] [Управление ролями]  │
│                          [+ Пригласить пользователя]  (CTA)  │
├──────────────────────────────────────────────────────────────┤
│  Таблица юристов:                                            │
│   ☐ ФИО · Email · Роль · Последний вход · Статус · Действия │
│   ...                                                        │
└──────────────────────────────────────────────────────────────┘

При клике на «⚙ Права» в строке:
┌──────────────────────────────────────┐  ┌───── Drawer ─────┐
│   (основной контент, затенён)       │  │ Права: Иван И.   │
│                                     │  │ ─────────────── │
│                                     │  │ Управление делами│
│                                     │  │  [◐] Создавать  │
│                                     │  │  [◐] Редактир.  │
│                                     │  │  [○] Закрывать  │
│                                     │  │  [○] Удалять    │
│                                     │  │ Документы       │
│                                     │  │  [◐] Загружать  │
│                                     │  │  ...             │
│                                     │  │ [Отмена][Сохр.] │
└──────────────────────────────────────┘  └──────────────────┘
```

## 4. Блоки

### 4.1. Toolbar (1-я строка)

```html
<div class="flex flex-wrap items-center gap-3 mb-5">
  <div class="relative">
    <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ...></svg>
    <input placeholder="Поиск по ФИО или email"
           class="h-10 w-72 pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
  </div>

  <select class="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700">
    <option>Все роли</option>
    <option>Администратор</option>
    <option>Старший юрист</option>
    <option>Юрист</option>
    <option>Помощник юриста</option>
  </select>

  <button class="inline-flex items-center gap-2 h-10 px-3 rounded-lg
                 border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50">
    <svg class="w-4 h-4" ...></svg> Управление ролями
  </button>

  <div class="ml-auto">
    <button id="btn-invite"
            class="inline-flex items-center gap-2 h-10 px-4 rounded-lg
                   bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
      <svg class="w-4 h-4" ...></svg> Пригласить пользователя
    </button>
  </div>
</div>
```

Адаптивно: на `< sm` кнопка CTA переходит на новую строку (`flex-wrap`).

### 4.2. Таблица пользователей (2-я строка)

**Колонки:**

| # | Колонка | Источник | Отображение |
| --- | --- | --- | --- |
| 1 | ☐ Чекбокс | `User.id` (select) | `toggle-slider` вариант чекбокса, `w-10` |
| 2 | ФИО | `User.last_name + first_name + middle_name` | `text-gray-900` |
| 3 | Email | `User.email` | `text-gray-700` |
| 4 | Роль | `User.role` | Бейдж: `Администратор` → info, `Старший юрист` → indigo, `Юрист` → neutral, `Помощник юриста` → warning |
| 5 | Последний вход | `User.last_login` | `dd.mm.yyyy` или `Никогда` (`text-gray-400`) |
| 6 | Статус | `User.is_active + invite_accepted` | `Активен` / `Приглашён` (amber) / `Заблокирован` (neutral) |
| 7 | Действия | — | Icon-buttons: права (шестерёнка), удалить (корзина) |

```html
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-[#f3f4f6] text-gray-600">
        <tr>
          <th class="w-10 px-4 py-3"></th>
          <th class="px-4 py-3 text-left cursor-pointer" data-sort="name">ФИО</th>
          <th class="px-4 py-3 text-left">Email</th>
          <th class="px-4 py-3 text-left">Роль</th>
          <th class="px-4 py-3 text-left">Последний вход</th>
          <th class="px-4 py-3 text-left">Статус</th>
          <th class="px-4 py-3 text-right">Действия</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3"><!-- чекбокс toggle-slider variant --></td>
          <td class="px-4 py-3 text-gray-900">Смирнов Игорь Алексеевич</td>
          <td class="px-4 py-3 text-gray-700">ismirnov@law.ru</td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center gap-1.5 text-xs text-indigo-700">
              <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
              Старший юрист
            </span>
          </td>
          <td class="px-4 py-3 text-gray-700">21.04.2026</td>
          <td class="px-4 py-3">
            <span class="inline-flex items-center gap-1.5 text-xs text-emerald-700">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Активен
            </span>
          </td>
          <td class="px-4 py-3">
            <div class="inline-flex items-center gap-1 justify-end w-full">
              <button class="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-indigo-600"
                      data-edit-rights="USER_ID" title="Права">
                <svg class="w-4 h-4 mx-auto" ...></svg>
              </button>
              <button class="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-rose-600"
                      data-delete="USER_ID" title="Удалить">
                <svg class="w-4 h-4 mx-auto" ...></svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### 4.3. Drawer редактирования прав

Открывается по клику на иконку «⚙» в строке. Ширина `max-w-md` (448px). [Flowbite Drawer](https://flowbite.com/docs/components/drawer/).

**Header drawer'а:**
```html
<div class="p-5 border-b border-gray-200">
  <div class="flex items-start justify-between">
    <div>
      <div class="text-xs text-gray-500">Редактирование прав</div>
      <div class="text-base text-gray-900 mt-0.5">Смирнов Игорь Алексеевич</div>
      <div class="text-xs text-gray-500 mt-0.5">Старший юрист</div>
    </div>
    <button class="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100" data-close>
      <svg class="w-4 h-4 mx-auto" ...></svg>
    </button>
  </div>
</div>
```

**Body drawer'а — 6 категорий прав.** Каждое право — переключатель `toggle-slider`:

| Категория | Права |
| --- | --- |
| Управление делами | Создавать дела, Редактировать дела, Закрывать дела, Удалять дела |
| Документы | Загружать документы, Скачивать документы, Подписывать документы |
| Клиенты | Просматривать клиентов, Редактировать клиентов, Общаться с клиентами |
| Отчёты и аналитика | Просматривать дашборд, Экспортировать данные |
| Финансы | Создавать счета, Создавать юридические лица |
| Брендинг | Изменять брендинг |

**Шаблон категории:**
```html
<section class="mb-5">
  <h3 class="text-sm text-gray-900 mb-3">Управление делами</h3>
  <ul class="space-y-2.5">
    <li class="flex items-center justify-between">
      <span class="text-sm text-gray-700">Создавать дела</span>
      <label class="toggle-slider relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="peer sr-only" checked />
        <span class="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></span>
        <span class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow
                     transition-transform peer-checked:translate-x-5"></span>
      </label>
    </li>
    ...
  </ul>
</section>
```

**Footer drawer'а:**
```html
<div class="p-5 border-t border-gray-200 flex items-center justify-end gap-2">
  <button class="h-10 px-3 rounded-lg border border-gray-200 text-sm" data-close>Отмена</button>
  <button class="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Сохранить</button>
</div>
```

### 4.4. Drawer приглашения пользователя

Открывается по CTA `+ Пригласить пользователя`. Ширина `max-w-md`.

**Поля:**
- Email (обязательно, валидация формата)
- ФИО — фамилия, имя, отчество (3 отдельных инпута)
- Роль — `<select>` с опциями (`Администратор`, `Старший юрист`, `Юрист`, `Помощник юриста`)
- Кастомный набор прав — чекбокс `toggle-slider` «Использовать кастомные права». При включении показывается тот же набор категорий, что и в drawer'е редактирования.

**Отправка:** POST `/api/v1/users/invite/`. На успех — тост «Приглашение отправлено», строка добавляется в таблицу со статусом `Приглашён` (warning).

### 4.5. Drawer подтверждения удаления

Ширина `max-w-sm` (384px).

```
Удалить пользователя?
Смирнов Игорь Алексеевич
ismirnov@law.ru

Все его активные дела будут переданы администратору.
Операция необратима.

[Отмена]  [Удалить (danger)]
```

Danger-кнопка: `bg-rose-600 hover:bg-rose-700 text-white`.

### 4.6. Drawer «Управление ролями»

По кнопке `Управление ролями` в toolbar. Ширина `max-w-md`.

Содержит:
- Список существующих ролей с количеством пользователей и иконками «редактировать»/«удалить».
- Кнопка `+ Создать роль` → inline-форма: название роли + те же 6 категорий прав, что в разделе 4.3.

## 5. Данные и модели

### API endpoints

| Endpoint | Метод | Назначение |
| --- | --- | --- |
| `/api/v1/users/` | GET | Список пользователей организации (пагинация, фильтр по роли, поиск) |
| `/api/v1/users/invite/` | POST | Отправить приглашение |
| `/api/v1/users/{id}/` | PATCH | Обновить пользователя (роль, права) |
| `/api/v1/users/{id}/` | DELETE | Удалить |
| `/api/v1/roles/` | GET / POST | Роли организации |
| `/api/v1/roles/{id}/` | PATCH / DELETE | Изменить / удалить роль |

### Модели Django

- `User` (`apps/users`) — `last_name`, `first_name`, `middle_name`, `email`, `role` (FK → Role), `is_active`, `invite_accepted`, `last_login`, `organization` (FK).
- `Role` (`apps/users`) — `name`, `organization` (FK), `permissions` (JSON: карта `category → [permission]`).
- `Permission` — enum/constant (`cases.create`, `cases.edit`, `docs.upload`, и т.д.).

Права хранятся в `User.custom_permissions` (если заданы индивидуально) или наследуются от `User.role.permissions`.

## 6. Состояния

| Состояние | Отображение |
| --- | --- |
| Пустой список | Текст `Ещё никто не приглашён` + иллюстрация + CTA `Пригласить` |
| Загрузка | Скелетон — 5 серых строк `h-12 bg-gray-100 rounded animate-pulse` |
| Ошибка | Карточка с текстом ошибки, кнопка `Повторить` |
| Невалидный email в drawer | Красная рамка инпута + `text-xs text-rose-700` «Неверный формат email» |
| Удаление успешно | Тост `Пользователь удалён` (Flowbite toast) |

## 7. Интерактив

- **Клик на чекбокс строки** → `row.classList.toggle("bg-gray-100", checked)`.
- **Клик по заголовку колонки с `data-sort`** → сортировка asc/desc, индикатор `↑ / ↓`.
- **Клик на «⚙»** → `open(drawer, user)`, JS убирает `translate-x-full`.
- **Клик на «🗑»** → drawer подтверждения с именем пользователя.
- **Esc / клик по overlay** → закрыть drawer (`panel.classList.add('translate-x-full')` + `setTimeout` на `hidden` overlay).
- **Toggle-slider** внутри drawer'а — без API-сохранения до нажатия `Сохранить`. Изменения в памяти.

## 8. Адаптивность

| Ширина | Поведение |
| --- | --- |
| `< 640px` | Таблица скроллится горизонтально. Toolbar: все элементы стеком, CTA на новой строке. |
| `640 – 1024px` | Поиск `w-full sm:w-72`, остальное по ширине. Drawer `w-full`. |
| `≥ 1024px` | Drawer `max-w-md` (448px), таблица во всю ширину. |

## 9. Acceptance criteria

- [ ] Нет аватарок, только ФИО.
- [ ] Все чекбоксы — через `class="toggle-slider"`.
- [ ] Toolbar с 4 элементами: поиск, фильтр ролей, управление ролями, CTA `+ Пригласить пользователя`.
- [ ] Таблица с 7 колонками, `divide-y divide-gray-100`, `<thead>` `bg-[#f3f4f6]`.
- [ ] Клик на `⚙` открывает drawer справа с 6 категориями прав и `toggle-slider`.
- [ ] Клик на `🗑` открывает drawer подтверждения (`max-w-sm`) с danger-кнопкой.
- [ ] CTA приглашения открывает drawer с формой, валидация email.
- [ ] Бейджи статусов без фона (точка + текст).
- [ ] Роли отображаются бейджем с соответствующим цветом.
- [ ] Мобильная версия: таблица скроллится, drawer на полную ширину.
- [ ] Esc / клик по overlay закрывает любой drawer.

## 10. Ссылки на компоненты

- [design-system.md §7.7 — Таблица](../design-system.md)
- [design-system.md §7.8 — Drawer](../design-system.md)
- [design-system.md §7.4 — Toggle-slider](../design-system.md)
- [Flowbite — Drawer](https://flowbite.com/docs/components/drawer/)
- [Flowbite — Toggle](https://flowbite.com/docs/forms/toggle/)
- [Flowbite — Dropdown (фильтр ролей)](https://flowbite.com/docs/components/dropdowns/)
- [Tailwind — Flexbox: flex-wrap](https://tailwindcss.com/docs/flex-wrap)
