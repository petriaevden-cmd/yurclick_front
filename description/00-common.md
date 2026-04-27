# 00. Общие требования (лейаут и правила)

> Требования распространяются на **все страницы** личного кабинета. Частные требования описаны в файлах `01-dashboard.md` … `05-clients.md`.

## 1. Технологическая база

| Слой | Инструмент | Обоснование |
| --- | --- | --- |
| CSS-фреймворк | [Tailwind CSS](https://tailwindcss.com/) (utility-first) | Единые токены, нулевой runtime CSS, консистентность |
| Компоненты | [Flowbite 2.5](https://flowbite.com/docs/components/) | Готовые паттерны (tabs, drawers, toggles) на Tailwind |
| Шрифт | [Inter](https://fonts.google.com/specimen/Inter) (300/400/500/600/700) | Читаемость на плотных таблицах |
| Иконки | Inline SVG (Lucide / Heroicons) с `stroke="currentColor"` | Цвет наследуется |
| Графики | [Chart.js 4](https://www.chartjs.org/) | Для страницы «Дашборд» |
| JS-интеграция | HTMX-совместимые паттерны | Поповер региона на странице «Клиенты» |

**Запрещено:**
- `<style>` теги;
- атрибуты `style="..."`;
- произвольные классы без Tailwind-токенов (исключение: `bg-[#f3f4f6]` для `<thead>`);
- CSS-in-JS, SCSS/LESS;
- собирать имена классов из строк в рантайме (Tailwind не найдёт их при tree-shake).

## 2. Подключение ресурсов (header каждой HTML-страницы)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

<script src="https://cdn.tailwindcss.com"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.2/flowbite.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.5.2/flowbite.min.js"></script>
```

В проде — `tailwindcss` CLI-сборка вместо CDN, без изменения разметки.

## 3. Единый лейаут

Каждая страница начинается с:

```html
<body class="min-h-screen bg-gray-50 text-gray-900">
  <div id="app-shell" data-page="dashboard" data-title="Обзор показателей платформы"></div>
  <main class="lg:pl-64 min-h-screen">
    <div class="px-4 sm:px-6 lg:px-10 py-6 lg:py-8">
      <header class="mb-6">
        <h1 class="text-xl sm:text-2xl tracking-tight text-gray-900">...</h1>
      </header>
      <!-- контент страницы -->
    </div>
  </main>
</body>
<script src="assets/layout.js"></script>
```

`assets/layout.js` рендерит **сайдбар** (256px, `w-64`, зафиксирован `fixed inset-y-0 left-0`) со следующей структурой сверху вниз:

1. **Логотип** — `h-16`, `border-b border-gray-200`. Текст или SVG. По клику — на `/dashboard/`.
2. **Блок уведомлений** — `bg-yellow-50 border border-yellow-300 rounded-lg p-3`. Иконка колокольчика + текст `{N} уведомлений`. По клику — переход на `/notifications/`. Цвет `text-amber-700`.
3. **Навигация** — `flex-1 overflow-y-auto`, пункты:
   - Дашборд (иконка: 4 квадратика)
   - Пользователи (иконка: человечек)
   - Оплата (иконка: банковская карта)
   - Брендинг (иконка: кисточка)
   - `<hr class="my-3 border-gray-200" />` — **разделение не игнорировать**
   - Клиенты (иконка: человечки)
4. **Блок администратора** — `border-t border-gray-200 p-4`:
   - Имя Фамилия
   - Должность «Администратор» (`text-xs text-gray-500`)
   - Кнопка выхода (SVG)

**На экранах `< lg` (1024px)** сайдбар уходит в `-translate-x-full`, открывается по бургеру в левом верхнем углу через overlay `bg-gray-900/40`.

### Активный пункт меню

```html
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-indigo-50 text-indigo-700">...</a>
```

Неактивный — `text-gray-700 hover:bg-gray-100`.

## 4. Единый заголовок страницы

- Один `<h1>` в `<header class="mb-6">`.
- Размер: `text-xl sm:text-2xl tracking-tight`.
- Никаких хлебных крошек, никаких верхних панелей.

## 5. Палитра (сокращённо)

Подробно — [design-system.md §2](../design-system.md).

| Роль | Класс |
| --- | --- |
| Фон приложения | `bg-gray-50` (#F9FAFB / #fbf9fa) |
| Фон карточек | `bg-white` |
| Шапка таблицы | `bg-[#f3f4f6]` |
| Границы | `border-gray-200` |
| CTA-кнопка | `bg-indigo-600 hover:bg-indigo-700` |
| Ссылки / активное | `text-indigo-700`, `bg-indigo-50` (меню) |

### Семантические статусы (только точка + текст, без фона)

| Семантика | Точка | Текст |
| --- | --- | --- |
| Success | `bg-emerald-500` | `text-emerald-700` |
| Warning | `bg-amber-500` | `text-amber-700` |
| Danger | `bg-rose-500` | `text-rose-700` |
| Info | `bg-indigo-500` | `text-indigo-700` |
| Process | `bg-sky-500` | `text-sky-700` |
| Analysis | `bg-violet-500` | `text-violet-700` |
| Filing | `bg-blue-500` | `text-blue-700` |
| Neutral | `bg-gray-400` | `text-gray-600` |

## 6. Стандартные компоненты

### Primary-кнопка

```html
<button class="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
  <svg class="w-4 h-4" ...></svg>
  Действие
</button>
```

### Secondary-кнопка

```html
<button class="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50">...</button>
```

### Поле ввода (с поиском)

```html
<div class="relative">
  <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ...></svg>
  <input class="h-10 w-72 pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-sm
                focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
</div>
```

### Таблица

```html
<div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="min-w-full text-sm">
      <thead class="bg-[#f3f4f6] text-gray-600">
        <tr><th class="px-4 py-3 text-left">Колонка</th></tr>
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

### Выезжающая панель (drawer)

[Flowbite Drawer](https://flowbite.com/docs/components/drawer/). Из правого края, максимальная ширина `max-w-md` для форм, `max-w-sm` для подтверждений:

```html
<div id="overlay" class="hidden fixed inset-0 z-40 bg-gray-900/40"></div>
<aside id="panel" class="fixed top-0 right-0 z-50 h-full w-full max-w-md
                         bg-white border-l border-gray-200
                         translate-x-full transition-transform flex flex-col">
  <header class="p-5 border-b border-gray-200">Заголовок</header>
  <section class="flex-1 overflow-y-auto p-5">...</section>
  <footer class="p-5 border-t border-gray-200 flex items-center justify-end gap-2">
    <button class="h-10 px-3 rounded-lg border border-gray-200 text-sm">Отмена</button>
    <button class="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Сохранить</button>
  </footer>
</aside>
```

### Статус-бейдж (пример)

```html
<span class="inline-flex items-center gap-1.5 text-xs text-emerald-700">
  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
  Активен
</span>
```

### Toggle-switch (переключение прав)

Все чекбоксы для настроек — через `class="toggle-slider"`:

```html
<label class="toggle-slider relative inline-flex items-center cursor-pointer">
  <input type="checkbox" class="peer sr-only" />
  <span class="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></span>
  <span class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow
               transition-transform peer-checked:translate-x-5"></span>
</label>
```

## 7. Адаптивность

Брейкпоинты Tailwind:

| Класс | Ширина | Что меняется |
| --- | --- | --- |
| `sm:` | 640px | Адаптация форм, `flex-wrap` снимается |
| `md:` | 768px | 2-колоночные сетки, более широкие таблицы |
| `lg:` | 1024px | Появление сайдбара, 3-колоночные сетки |

### Правила

- **Mobile-first.** Базовые классы — для узкого экрана, `lg:` — десктоп.
- На `< lg` сайдбар прячется, появляется бургер-меню.
- На `< md` таблицы скроллятся горизонтально через `overflow-x-auto`.
- Toolbar-ы: `flex-wrap gap-3`, CTA прыгает на новую строку без ломки.
- Карточки KPI: `flex-wrap` + `whitespace-nowrap` у вложенных блоков.

## 8. Интерактивные паттерны

### Выделение строки таблицы по чекбоксу

```js
checkbox.addEventListener("change", (e) => {
  const row = e.target.closest("tr");
  row.classList.toggle("bg-gray-100", e.target.checked);
});
```

### Раскрытие строки (chevron)

```js
// chevron .rotate-90, expand-row .hidden ↔ visible
btn.addEventListener("click", () => {
  next.classList.toggle("hidden");
  chevron.classList.toggle("rotate-90");
});
```

### Sticky toolbar (страница «Клиенты»)

```html
<div class="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10
            py-3 bg-gray-50/95 backdrop-blur
            border-b border-gray-200 mb-4">
```

## 9. Чеклист готовности страницы

- [ ] Нет `<style>` тегов и `style=""` атрибутов
- [ ] Нет произвольных Tailwind-значений (`w-[123px]`), кроме `bg-[#f3f4f6]`
- [ ] Все цвета — из палитры
- [ ] Высоты интерактивных элементов `h-10` или `h-8`
- [ ] Бейджи статусов без фона, `text-xs` + точка
- [ ] Таблицы — `divide-y divide-gray-100`, `<thead>` `bg-[#f3f4f6]`, ячейки `px-4 py-3`
- [ ] Адаптивность проверена на 375 / 768 / 1280 px
- [ ] Фокус у инпутов видимый (`focus:ring-2 focus:ring-indigo-200`)
- [ ] Все чекбоксы через `toggle-slider`
- [ ] Все метки — с точкой слева
- [ ] Заголовок `<h1 class="text-xl sm:text-2xl tracking-tight">` есть и один
- [ ] Сайдбар рендерится через `<div id="app-shell">` и `layout.js`
