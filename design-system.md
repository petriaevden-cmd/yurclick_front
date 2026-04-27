# ЮрКлик — Design System

Единые правила оформления интерфейса админской панели ЮрКлик. Все компоненты построены строго на **Tailwind CSS** + **Flowbite**, без кастомного CSS и inline-стилей.

---

## 1. Технологическая база

| Слой | Инструмент | Обоснование |
| --- | --- | --- |
| CSS-фреймворк | Tailwind CSS (utility-first) | Единые токены, нулевой runtime CSS, консистентность |
| Компоненты | Flowbite 2.5 | Готовые паттерны (tabs, drawers, toggles) на базе Tailwind |
| Шрифт | `Inter` (Google Fonts, 300/400/500/600/700) | Читаемость на плотных таблицах |
| Иконки | Inline SVG с `stroke="currentColor"` | Автоматический цвет от контекста |
| Графики | Chart.js 4 | Легковесный, без React-зависимостей |
| JS-интеграция | HTMX-совместимые паттерны | Реактивность без фреймворка (popover региона) |

**Запрещено:** `<style>`, `style="..."`, произвольные классы без Tailwind-токенов, CSS-in-JS, SCSS/LESS.

---

## 2. Цветовая палитра

### Базовые цвета интерфейса

| Роль | Tailwind-класс | HEX | Применение |
| --- | --- | --- | --- |
| Фон приложения | `bg-gray-50` | `#F9FAFB` | Основной фон `<body>` |
| Поверхность карточек | `bg-white` | `#FFFFFF` | Карточки, таблицы, модалки |
| Шапка таблицы | `bg-[#f3f4f6]` | `#F3F4F6` | `<thead>` — визуальный контраст с rows |
| Границы | `border-gray-200` | `#E5E7EB` | Карточки, разделители, инпуты |
| Hover-фон строк | `hover:bg-gray-50` | `#F9FAFB` | Интерактивные ряды таблиц |
| Выделенная строка | `bg-gray-100` | `#F3F4F6` | После чекбокса `checked` |

### Текст

| Роль | Класс | Когда использовать |
| --- | --- | --- |
| Заголовки, ключевые данные | `text-gray-900` | H1, суммы, имена |
| Вторичный текст | `text-gray-700` | Обычный контент в таблицах |
| Мета-текст | `text-gray-600` | Подписи, описания |
| Placeholder, wrapper-текст | `text-gray-500` | Подзаголовки, неактивные метки |
| Иконки по умолчанию | `text-gray-400` | Иконки в строках, chevron |

### Акцентный цвет бренда — Indigo

Используется для всех CTA, активных состояний, ссылок.

| Состояние | Класс | HEX |
| --- | --- | --- |
| CTA-кнопка (фон) | `bg-indigo-600` | `#4F46E5` |
| CTA-кнопка (hover) | `hover:bg-indigo-700` | `#4338CA` |
| Ссылка | `text-indigo-600` | `#4F46E5` |
| Ссылка (hover) | `hover:text-indigo-700` | `#4338CA` |
| Активный пункт меню (фон) | `bg-indigo-50` | `#EEF2FF` |
| Активный пункт меню (текст) | `text-indigo-700` | `#4338CA` |
| Focus-кольцо | `focus:ring-2 focus:ring-indigo-200` | `#C7D2FE` |
| Focus-бордер | `focus:border-indigo-400` | `#818CF8` |

### Семантические цвета (статусы)

Каждая семантика использует пару: **точка** (`dot`) + **текст бейджа** (`text`). Фон бейджа в системе не используется — статус читается через цветную точку и совпадающий с ней цвет текста.

| Семантика | Назначение | Точка | Текст |
| --- | --- | --- | --- |
| Success | Активно, оплачено, завершено | `bg-emerald-500` | `text-emerald-700` |
| Warning | Приглашён, ожидает, приостановлено | `bg-amber-500` | `text-amber-700` |
| Danger | Срочно, просрочено | `bg-rose-500` | `text-rose-700` |
| Info (primary) | В работе, основная метрика | `bg-indigo-500` | `text-indigo-700` |
| Process | В обработке | `bg-sky-500` | `text-sky-700` |
| Analysis | Анализ документов | `bg-violet-500` | `text-violet-700` |
| Filing | Подача в суд | `bg-blue-500` | `text-blue-700` |
| Neutral | Заблокирован, остановлено | `bg-gray-400` | `text-gray-600` |

**Критичные правила:**
- Не использовать голый красный/зелёный — только `rose-*` и `emerald-*`.
- **Бейджи всегда без фона.** Не добавлять `bg-*-50`, `bg-*-100`, `rounded-full`, `px-2 py-0.5` на контейнер статуса. Только `inline-flex items-center gap-1.5 text-xs` + цветной текст + точка.

---

## 3. Типографика

Все размеры — Tailwind utility-классы, без произвольных значений.

| Роль | Класс | Размер | Вес | Пример |
| --- | --- | --- | --- | --- |
| H1 страницы | `text-xl sm:text-2xl tracking-tight` | 20→24 | 400 | «Обзор показателей платформы» |
| H2 секции / карточки | `text-base` | 16 | 400 | «Статусы дел», «Тарифы» |
| H3 подсекции | `text-sm` | 14 | 400 | Категории прав, подразделы |
| Крупная KPI-цифра | `text-4xl` | 36 | 400 | «342», «1 284» |
| Средняя KPI-цифра | `text-3xl` | 30 | 400 | Цена тарифа |
| Текст по умолчанию | `text-sm` | 14 | 400 | Таблицы, описания, label |
| Вторичный, метки | `text-xs` | 12 | 400 | Бейджи, подписи, тех. информация |
| Метка над значением | `text-xs uppercase tracking-wider text-gray-500` | 12 | 400 | «ТАРИФНЫЙ ПЛАН», «ДЕЛ ПОДАНО» |

**Правила:**
- Использовать `tracking-tight` только для крупных заголовков (H1)
- Для малых UPPERCASE-меток — `tracking-wider` для читаемости
- Никогда не применять `font-bold` к крупным числам — они и так заметны размером
- `text-base` для H2 даёт более сбалансированную иерархию чем `text-lg`

---

## 4. Отступы и сетка

### Шкала отступов (используем только эти значения)

| Token | Класс | px | Применение |
| --- | --- | --- | --- |
| 2xs | `gap-1`, `p-1` | 4 | Внутри иконки+текст |
| xs | `gap-1.5`, `p-1.5` | 6 | Dot + label в бейдже |
| sm | `gap-2`, `p-2` | 8 | Группы кнопок, токены |
| md | `gap-3`, `p-3` | 12 | Внутри карточек и секций |
| lg | `gap-4`, `p-4` | 16 | Плотные табличные ячейки |
| xl | `gap-5`, `p-5` | 20 | Между карточками грида |
| 2xl | `gap-6`, `p-6` | 24 | Padding крупных карточек |

### Сетки

```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5   — KPI дашборда (6 блоков 3×2)
grid-cols-1 lg:grid-cols-3 gap-5                   — График (2/3) + блок статусов (1/3)
grid-cols-1 lg:grid-cols-2 gap-5                   — Брендинг (2×2)
grid-cols-1 md:grid-cols-3 gap-5                   — Тарифы
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3    — Мини-карточки в expand-строке клиента
```

### Контейнеры страниц

- Внешний padding: `px-4 sm:px-6 lg:px-10 py-6 lg:py-8`
- Вертикальный ритм: заголовок → `mb-6` → первая секция → `mt-5` → вторая секция
- Максимальная ширина контента не ограничивается — используем всю доступную ширину для плотных таблиц

---

## 5. Радиусы и тени

| Элемент | Класс | Значение |
| --- | --- | --- |
| Бейджи, точки статусов | `rounded-full` | 9999px |
| Инпуты, кнопки, чекбоксы | `rounded-lg` | 8px |
| Карточки, модальные панели | `rounded-xl` | 12px |
| Поповеры | `rounded-xl shadow-lg` | 12px + shadow |

**Запрещено:** `rounded-md`, `rounded-2xl`, `shadow-sm`/`shadow-md` на карточках. Карточки получают глубину только за счёт `border-gray-200`, а не тени — это характерный признак «плоского» B2B-дизайна.

**Исключение:** только плавающие элементы (поповеры, меню) получают `shadow-lg`.

---

## 6. Геометрия элементов

### Фиксированные высоты

Все интерактивные элементы одной строки имеют **одинаковую высоту** для идеального выравнивания в toolbar:

| Элемент | Высота | Класс |
| --- | --- | --- |
| Кнопка (primary/secondary) | 40px | `h-10` |
| Input / select | 40px | `h-10` |
| Компактная кнопка в ячейке | 32px | `h-8` |
| Icon-button (квадрат) | 32/36px | `w-8 h-8` / `w-9 h-9` |
| Row в таблице (min) | авто | `py-3` |

### Фиксированные ширины иконок

- В меню и кнопках: `w-5 h-5` (20px) + `shrink-0`
- В ячейках таблицы: `w-4 h-4` (16px) + `shrink-0`
- В drop-зонах: `w-8 h-8` или `w-10 h-10`
- На всех SVG — `stroke-width="1.8"` (нормальные) или `"2"` (галочки/чекбоксы)

---

## 7. Компоненты

### 7.1. Кнопки

**Primary CTA:**
```html
<button class="inline-flex items-center gap-2 h-10 px-4 rounded-lg
               bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
  <svg class="w-4 h-4" ...></svg>
  Пригласить пользователя
</button>
```

**Secondary (контур):**
```html
<button class="inline-flex items-center gap-2 h-10 px-3 rounded-lg
               border border-gray-200 bg-white text-sm text-gray-700
               hover:bg-gray-50">...</button>
```

**Destructive (в модалке удаления):**
```html
<button class="h-10 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-sm">
  Удалить
</button>
```

**Icon-button в таблице:**
```html
<button class="w-8 h-8 rounded-lg text-gray-500
               hover:bg-gray-100 hover:text-indigo-600" title="Редактировать">
  <svg class="w-4 h-4 mx-auto" ...></svg>
</button>
```
Destructive icon-button — `hover:text-rose-600`.

### 7.2. Поля ввода

```html
<input class="h-10 w-full px-3 rounded-lg border border-gray-200 bg-white text-sm
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
```

**С иконкой поиска:**
```html
<div class="relative">
  <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ...></svg>
  <input class="h-10 w-72 pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-sm" />
</div>
```

**Read-only:** добавить `bg-gray-50 text-gray-700` вместо `bg-white`.

### 7.3. Чекбокс (кастомный через peer)

Нативный `<input>` скрывается через `sr-only`, рендерится квадрат 16×16 с Tailwind. Заливается `bg-indigo-600` при `:checked`.

```html
<label class="toggle-slider inline-flex items-center">
  <input type="checkbox" class="peer sr-only" />
  <span class="w-4 h-4 rounded border border-gray-300 bg-white
               peer-checked:bg-indigo-600 peer-checked:border-indigo-600
               inline-flex items-center justify-center">
    <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
         viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12l5 5 9-11"/>
    </svg>
  </span>
</label>
```

### 7.4. Toggle-slider (переключатель прав)

Принципиально отличается от чекбокса — для бинарных настроек и ролевых разрешений:

```html
<label class="toggle-slider relative inline-flex items-center cursor-pointer">
  <input type="checkbox" class="peer sr-only" />
  <span class="w-10 h-5 bg-gray-200 rounded-full
               peer-checked:bg-indigo-600 transition-colors"></span>
  <span class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow
               transition-transform peer-checked:translate-x-5"></span>
</label>
```

**Когда что применять:**
- Чекбокс — множественный выбор строк (таблицы)
- Toggle — включение/выключение отдельной настройки или права

### 7.5. Бейдж статуса

Универсальный паттерн: **точка + цветной текст**, без фона и внутренних отступов.

```html
<span class="inline-flex items-center gap-1.5 text-xs text-emerald-700">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
  Активен
</span>
```

Размер точки — **всегда** `w-1.5 h-1.5` для бейджей. В KPI-метках над крупной цифрой точка та же.

**Запрещено:** `bg-*-50`, `bg-*-100`, `rounded-full` на бейдже, `px-*`/`py-*` внутри бейджа — это сломает вертикальный ритм строки таблицы и дублирует сигнал через цветную подложку.

### 7.6. Карточка

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <h2 class="text-base text-gray-900">Заголовок</h2>
  <p class="text-sm text-gray-500 mt-1">Подзаголовок</p>
  <!-- content -->
</div>
```

**KPI-карточка** использует `p-5` (меньше) и включает:
1. Мета-метку сверху (`text-xs uppercase tracking-wider text-gray-500` + точка)
2. Крупную цифру `text-4xl text-gray-900 mt-4`
3. Описание `text-sm text-gray-600 mt-1`
4. `<hr class="my-4 border-gray-200">`
5. Footer с бейджем слева и ссылкой-действием справа (`flex flex-wrap items-center justify-between gap-2`)

**Важно:** футер KPI — `flex-wrap` с `gap-2` и `whitespace-nowrap` на обеих частях. Это предотвращает наложение текста при узких контейнерах.

### 7.7. Таблица

```html
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-[#f3f4f6] text-gray-600">
        <tr>
          <th class="px-4 py-3 text-left">Колонка</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr class="hover:bg-gray-50">
          <td class="px-4 py-3 text-gray-900">Значение</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**Правила ячеек:**
- Отступы — **всегда** `px-4 py-3`
- Первичные данные (ФИО, № счёта) — `text-gray-900`
- Вторичные (роль, email) — `text-gray-700`
- Действия справа — колонка с `text-right`, внутри `inline-flex items-center gap-1`
- Границы между строк — **только** `divide-y divide-gray-100` на `<tbody>`, никаких бордеров на `<tr>`
- Чекбокс-колонка — `w-10 px-4`

### 7.8. Правая выезжающая панель (drawer)

Единый паттерн для редактирования прав, подтверждения удаления, создания счёта:

```html
<div id="overlay" class="hidden fixed inset-0 z-40 bg-gray-900/40"></div>
<aside id="panel" class="fixed top-0 right-0 z-50 h-full w-full max-w-md
                          bg-white border-l border-gray-200
                          translate-x-full transition-transform flex flex-col">
  <!-- header: p-5 border-b -->
  <!-- body: flex-1 overflow-y-auto p-5 -->
  <!-- footer: p-5 border-t + кнопки (Отмена | Primary) -->
</aside>
```

**Открытие/закрытие через JS:**
```js
const open = () => {
  overlay.classList.remove("hidden");
  requestAnimationFrame(() => panel.classList.remove("translate-x-full"));
};
const close = () => {
  panel.classList.add("translate-x-full");
  setTimeout(() => overlay.classList.add("hidden"), 300);
};
```

Ширины: `max-w-sm` (384px) для подтверждений, `max-w-md` (448px) для форм.

### 7.9. Drag & Drop зона

```html
<label class="block rounded-xl border-2 border-dashed border-gray-300
              hover:border-indigo-400 hover:bg-indigo-50/30
              transition-colors p-8 text-center cursor-pointer">
  <svg class="w-10 h-10 mx-auto text-gray-400" ...></svg>
  <p class="mt-3 text-sm text-gray-700">Перетащите файл сюда или нажмите для выбора</p>
  <p class="mt-1 text-xs text-gray-500">PNG, SVG, JPG — до 2 МБ</p>
  <input type="file" class="sr-only" />
</label>
```

**Компактная версия** (в ячейке таблицы): `border-dashed` + `h-8 px-2.5` + `text-xs`.

### 7.10. Вкладки

```html
<div class="border-b border-gray-200 mb-6">
  <nav class="flex gap-6 text-sm">
    <button data-tab="plans"
            class="tab -mb-px border-b-2 border-indigo-600 text-indigo-700 py-3">
      Тарифы
    </button>
    <button data-tab="invoices"
            class="tab -mb-px border-b-2 border-transparent
                   text-gray-600 hover:text-gray-900 py-3">
      Счета
    </button>
  </nav>
</div>
```

Активная вкладка — `border-indigo-600 text-indigo-700`. Неактивная — `border-transparent text-gray-600`. Подчёркивание даёт `-mb-px` (смещение на 1px вниз для перекрытия `border-b` контейнера).

### 7.11. Поповер

```html
<div class="hidden fixed z-40 w-64 bg-white border border-gray-200
            rounded-xl shadow-lg p-3">
  <!-- поиск + список -->
</div>
```

Позиционирование — через JS (`getBoundingClientRect`), с ограничением `Math.min(rect.left, window.innerWidth - 280)` чтобы не выходил за край viewport.

---

## 8. Лейаут приложения

### Сайдбар (левое меню)

Всегда в состоянии `w-64` (256px), зафиксирован (`fixed inset-y-0 left-0`).

**Структура сверху вниз:**
1. Логотип (высота `h-16`, `border-b border-gray-200`)
2. Блок уведомлений (`bg-yellow-50 border border-yellow-300`)
3. Навигация (`flex-1 overflow-y-auto`) — пункты + `hr` как разделитель
4. Блок администратора (`border-t border-gray-200`)

**Мобильное поведение:** при `< lg` (1024px) сайдбар уходит в `-translate-x-full`, открывается по бургеру в левом верхнем углу через overlay `bg-gray-900/40`.

**Активный пункт меню:**
```html
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
          bg-indigo-50 text-indigo-700">...</a>
```

**Неактивный:** `text-gray-700 hover:bg-gray-100`.

### Основной контент

- `lg:pl-64` — отступ на ширину сайдбара
- `min-h-screen` — заполнение экрана
- Заголовок страницы в `<header class="mb-6">` с `text-xl sm:text-2xl tracking-tight`

**На странице нет верхней панели и нижнего футера** — это принципиальное решение ТЗ для максимизации полезной площади.

---

## 9. Интерактивные паттерны

### Выделение строки по чекбоксу

```js
checkbox.addEventListener("change", (e) => {
  const row = e.target.closest("tr");
  row.classList.toggle("bg-gray-100", e.target.checked);
});
```

### Раскрытие строки по шеврону

Поворот chevron — `rotate-90` вместе с `transition-transform`. Expand-строка — дополнительный `<tr class="hidden bg-gray-50/70">` с `<td colspan="N">`.

### Sticky toolbar на странице «Клиенты»

```html
<div class="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-10
            px-4 sm:px-6 lg:px-10 py-3
            bg-gray-50/95 backdrop-blur
            border-b border-gray-200 mb-4">
```

Отрицательный margin «прорывает» padding контейнера страницы, `backdrop-blur` создаёт эффект стекла при прокрутке под ним.

---

## 10. Анимации и переходы

Только три transition'а, никаких кастомных:

| Паттерн | Класс |
| --- | --- |
| Смена цвета/фона | `transition-colors` |
| Движение (chevron, toggle) | `transition-transform` |
| Выезд панели | `transition-transform` + `translate-x-full` ↔ `translate-x-0` |

**Запрещено:** `transition-all`, пользовательские `duration`, keyframe-анимации.

---

## 11. Иконография

- Только inline SVG, никаких icon-шрифтов
- Все иконки — `stroke="currentColor"` (цвет наследуется)
- Унифицированный набор: `stroke-width="1.8"`, `stroke-linecap="round"`, `stroke-linejoin="round"`
- Исключение: галочки внутри чекбоксов — `stroke-width="2"` или `"3"` для читаемости при малом размере
- `viewBox="0 0 24 24"` как стандарт

**Источники:** Lucide / Heroicons — но без подключения библиотеки, копируем нужные пути вручную, так дешевле по весу.

---

## 12. Адаптивность

### Брейкпоинты (Tailwind по умолчанию)

| Класс | Ширина | Применение |
| --- | --- | --- |
| `sm:` | 640px | Начальная адаптация форм |
| `md:` | 768px | Переход на 2-колоночные гриды |
| `lg:` | 1024px | Появление сайдбара, 3-колоночные гриды, полная плотность |

### Принципы

- **Mobile-first:** базовые классы — мобильный вид, `lg:` — десктоп
- На `< lg` сайдбар прячется, появляется бургер
- На `< md` таблицы скроллятся горизонтально через `overflow-x-auto`
- Toolbar'ы — `flex-wrap gap-3`, CTA-кнопка прыгает на новую строку без поломок
- Бейджи и CTA в footer-карточках — `flex-wrap` + `whitespace-nowrap` на содержимом

---

## 13. Чек-лист нового компонента

Перед мёрджем новый компонент проверяется на:

- [ ] Нет `<style>` тегов и `style="..."` атрибутов
- [ ] Нет произвольных значений Tailwind (`w-[123px]`) кроме `bg-[#f3f4f6]`
- [ ] Использованы только цвета из палитры (§ 2)
- [ ] Высоты интерактивных элементов из шкалы (§ 6)
- [ ] Radii из шкалы (`rounded-lg`/`rounded-xl`/`rounded-full`)
- [ ] Иконки `stroke-width="1.8"`, `currentColor`
- [ ] Focus-состояние видимое (`focus:ring-2 focus:ring-indigo-200`)
- [ ] Мобильная версия не ломается (есть `flex-wrap` где нужно)
- [ ] SVG иконки с `shrink-0` в flex-контейнерах
- [ ] Границы только `border-gray-200`, внутри таблицы — `divide-y divide-gray-100`
- [ ] Тень только у плавающих поповеров (`shadow-lg`)
- [ ] Названия классов упорядочены: layout → spacing → sizing → typography → color → state

---

## 14. Файловая структура

```
yurclick_front/
├── index.html              — редирект на dashboard
├── dashboard.html          — KPI + график + статусы
├── users.html              — таблица юристов + drawer прав
├── billing.html            — 3 вкладки (тарифы, счета, юр. лица)
├── branding.html           — домен, цвета, настройки, логотип
├── clients.html            — таблица с expand, статусы, документы
├── design-system.md        — этот документ
└── assets/
    └── layout.js           — общий сайдбар, bootstrap страниц
```

Все страницы подключают одинаковый набор ресурсов в `<head>`:
```html
<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.2/flowbite.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.2/flowbite.min.js"></script>
```

Layout рендерится через `<div id="app-shell" data-page="..." data-title="..."></div>` — сайдбар и заголовок страницы подставляются `assets/layout.js`.

---

## 15. Принципы (TL;DR)

1. **Плоский, границами, не тенью.** B2B, а не SaaS-landing.
2. **Indigo — единственный акцент.** Никакого «вторичного» бренд-цвета.
3. **Одинаковые высоты в одной строке.** 40px для всего интерактивного.
4. **Семантика через триаду.** Dot + bg + text, без произвольных цветов.
5. **Таблицы — через `divide-y`, не `border-b`.** Чище и проще.
6. **Drawer справа, модалки редко.** Не перекрывать контекст.
7. **Мобильный приоритет.** `flex-wrap` по умолчанию, `lg:` — десктоп.
8. **Tailwind-only.** Если что-то нельзя сделать классами — пересмотри подход.
