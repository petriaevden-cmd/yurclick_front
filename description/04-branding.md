# 04. Брендинг

**Файл:** [`branding.html`](../branding.html)
**Заголовок:** `Брендинг`
**URL:** `/branding/`

## 1. Назначение

Настройка внешнего оформления личного кабинета компании-клиента:

- подключение собственного домена (`kabinet.company.ru`);
- выбор брендовых цветов (основной / дополнительный / цвет кнопок);
- дополнительные настройки платформы (брендированный PDF, White-label режим);
- загрузка логотипа (drag & drop).

Итог: и юристы, и клиенты компании-клиента видят платформу в брендовых цветах компании, с их логотипом и на их домене.

## 2. Роли и доступ

| Роль | Доступ |
| --- | --- |
| Администратор компании | Полный |
| Пользователи с правом «Брендинг → Изменять брендинг» | Полный |
| Остальные | **Нет** |

## 3. Компоновка

```
┌──────────────────────────────────────────────────────────────┐
│  <h1> Брендинг                                               │
├──────────────────────────────────────────────────────────────┤
│  ┌─────── Блок 1: Домен ─────┐  ┌─── Блок 2: Цвета ──────┐  │
│  │ [input домена][Подключить]│  │  Основной цвет  ■ #    │  │
│  │  Техн. инф. о подключении │  │  Дополнительн.  ■ #    │  │
│  │                           │  │  Кнопки          ■ #    │  │
│  └───────────────────────────┘  └────────────────────────┘  │
│  ┌─── Блок 3: Настройки ─────┐  ┌─── Блок 4: Логотип ────┐  │
│  │ ◐ Брендированный PDF      │  │     [drop zone]         │  │
│  │ ○ Скрыть бренд ЮрКлик     │  │     + input названия    │  │
│  └───────────────────────────┘  └────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

Сетка: `grid grid-cols-1 lg:grid-cols-2 gap-5`. 4 блока, 2 × 2 на `lg`.

## 4. Блоки

### 4.1. Блок «Собственный домен»

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <h2 class="text-base text-gray-900">Собственный домен</h2>
  <p class="text-sm text-gray-500 mt-1">Настройте кабинет на вашем поддомене, например <code class="text-xs">kabinet.company.ru</code></p>

  <div class="mt-5 flex flex-wrap items-center gap-2">
    <div class="relative flex-1 min-w-[220px]">
      <input value="kabinet.company.ru"
             placeholder="domain.ru"
             class="h-10 w-full px-3 rounded-lg border border-gray-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
    </div>
    <button class="inline-flex items-center gap-2 h-10 px-4 rounded-lg
                   bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Подключить</button>
  </div>

  <div class="mt-4 rounded-lg bg-gray-50 border border-gray-200 p-3 text-xs text-gray-700">
    <div class="inline-flex items-center gap-2 mb-2">
      <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
      <span class="uppercase tracking-wider text-gray-500">Техническая информация</span>
    </div>
    Добавьте у регистратора DNS-запись:
    <div class="mt-2 font-mono text-xs text-gray-900">
      CNAME  kabinet  →  proxy.yurclick.ru
    </div>
    <div class="mt-1 text-gray-500">SSL выпускается автоматически через Let's Encrypt.</div>
  </div>

  <div class="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-700">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
    Домен подтверждён
  </div>
</div>
```

**Статусы домена:**
- `Ожидает подтверждения DNS` (warning) — сразу после ввода.
- `Домен подтверждён` (success) — DNS найден и корректен.
- `SSL активен` (info) — после выпуска сертификата.
- `Ошибка подключения` (danger) — с текстом причины под инпутом.

### 4.2. Блок «Цвета бренда»

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <h2 class="text-base text-gray-900">Цвета бренда</h2>
  <p class="text-sm text-gray-500 mt-1">Задайте палитру, которую увидят юристы и клиенты.</p>

  <div class="mt-5 space-y-4">
    <!-- Основной -->
    <div>
      <label class="text-sm text-gray-700">Основной цвет</label>
      <div class="mt-1.5 flex items-center gap-2">
        <input type="color" value="#4F46E5"
               class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
        <input value="#4F46E5"
               class="h-10 w-36 px-3 rounded-lg border border-gray-200 bg-white text-sm font-mono
                      focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
      </div>
    </div>

    <!-- Дополнительный -->
    <div>
      <label class="text-sm text-gray-700">Дополнительный цвет</label>
      <div class="mt-1.5 flex items-center gap-2">
        <input type="color" value="#A78BFA"
               class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
        <input value="#A78BFA"
               class="h-10 w-36 px-3 rounded-lg border border-gray-200 bg-white text-sm font-mono" />
      </div>
    </div>

    <!-- Кнопки -->
    <div>
      <label class="text-sm text-gray-700">Цвет кнопок</label>
      <div class="mt-1.5 flex items-center gap-2">
        <input type="color" value="#4338CA"
               class="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
        <input value="#4338CA"
               class="h-10 w-36 px-3 rounded-lg border border-gray-200 bg-white text-sm font-mono" />
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-2">
    <button class="h-10 px-3 rounded-lg border border-gray-200 text-sm" data-reset-colors>Сбросить</button>
    <button class="h-10 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Сохранить цвета</button>
  </div>
</div>
```

**Поведение:**
- `<input type="color">` и текстовый HEX-поле синхронизированы (JS event listeners на обоих).
- HEX-поле принимает `#RRGGBB`, валидация регулярным `^#[0-9A-Fa-f]{6}$`.
- При сохранении — POST `/api/v1/branding/colors/`, живое превью не требуется в рамках превью (можно добавить в продакшене).
- `Сбросить` возвращает дефолтные цвета платформы Indigo.

### 4.3. Блок «Настройки платформы»

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <h2 class="text-base text-gray-900">Настройки платформы</h2>
  <p class="text-sm text-gray-500 mt-1">Управление брендированными артефактами и White-label режимом.</p>

  <ul class="mt-5 space-y-4">
    <li class="flex items-start justify-between gap-4">
      <div>
        <div class="text-sm text-gray-900">Брендированный PDF</div>
        <div class="text-xs text-gray-500 mt-0.5">Логотип компании в документах, создаваемых платформой</div>
      </div>
      <label class="toggle-slider relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="peer sr-only" checked />
        <span class="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-indigo-600 transition-colors"></span>
        <span class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow
                     transition-transform peer-checked:translate-x-5"></span>
      </label>
    </li>

    <li class="flex items-start justify-between gap-4">
      <div>
        <div class="text-sm text-gray-900">Скрыть бренд ЮрКлик</div>
        <div class="text-xs text-gray-500 mt-0.5">White-label режим для клиентов: без упоминаний ЮрКлик в их кабинете</div>
      </div>
      <label class="toggle-slider relative inline-flex items-center cursor-pointer">
        <input type="checkbox" class="peer sr-only" />
        <!-- ... -->
      </label>
    </li>
  </ul>
</div>
```

**Дополнительно (расширения по запросу ТЗ «придумай»):**
- Отправлять уведомления клиентам от имени компании (переключатель).
- Дефолтный язык кабинета клиента (`ru` / `en`).
- Включить чат между юристом и клиентом.
- Подпись в письмах (textarea).

### 4.4. Блок «Логотип компании»

```html
<div class="bg-white rounded-xl border border-gray-200 p-6">
  <h2 class="text-base text-gray-900">Логотип компании</h2>
  <p class="text-sm text-gray-500 mt-1">Отображается в сайдбаре и в брендированных PDF.</p>

  <label class="mt-5 block rounded-xl border-2 border-dashed border-gray-300
                hover:border-indigo-400 hover:bg-indigo-50/30
                transition-colors p-8 text-center cursor-pointer">
    <svg class="w-10 h-10 mx-auto text-gray-400" ...></svg>
    <p class="mt-3 text-sm text-gray-700">Перетащите файл сюда или нажмите для выбора</p>
    <p class="mt-1 text-xs text-gray-500">PNG, SVG, JPG — до 2 МБ</p>
    <input type="file" class="sr-only" accept=".png,.svg,.jpg,.jpeg" />
  </label>

  <!-- После загрузки: превью -->
  <div class="mt-4 hidden" id="logo-preview">
    <div class="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
      <img class="w-12 h-12 object-contain rounded bg-gray-50 border border-gray-200" alt="Логотип" />
      <div class="flex-1 min-w-0">
        <div class="text-sm text-gray-900 truncate">logo.svg</div>
        <div class="text-xs text-gray-500">14 КБ</div>
      </div>
      <button class="w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-rose-600" title="Удалить">
        <svg class="w-4 h-4 mx-auto" ...></svg>
      </button>
    </div>
  </div>

  <hr class="my-5 border-gray-200" />

  <div>
    <label class="text-sm text-gray-700">Название компании (если нет логотипа)</label>
    <input value="ЮрКлик"
           class="mt-1.5 h-10 w-full px-3 rounded-lg border border-gray-200 bg-white text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
  </div>
</div>
```

**Drag & drop:**
```js
const zone = document.querySelector('label[data-dropzone]');
['dragenter','dragover'].forEach(e => zone.addEventListener(e, ev => {
  ev.preventDefault();
  zone.classList.add('border-indigo-400','bg-indigo-50/30');
}));
['dragleave','drop'].forEach(e => zone.addEventListener(e, ev => {
  ev.preventDefault();
  zone.classList.remove('border-indigo-400','bg-indigo-50/30');
}));
zone.addEventListener('drop', ev => handleFiles(ev.dataTransfer.files));
```

**Валидация:** расширения PNG/SVG/JPG, размер ≤ 2 МБ, иначе — красная рамка dropzone + `text-xs text-rose-700` с причиной.

## 5. Данные и модели

### API endpoints

| Endpoint | Метод | Назначение |
| --- | --- | --- |
| `/api/v1/branding/` | GET | Получить все настройки |
| `/api/v1/branding/domain/` | POST | Подключить / изменить домен |
| `/api/v1/branding/domain/status/` | GET | Статус DNS / SSL |
| `/api/v1/branding/colors/` | PUT | Сохранить 3 цвета |
| `/api/v1/branding/settings/` | PATCH | Обновить переключатели |
| `/api/v1/branding/logo/` | POST | Загрузить логотип (multipart) |
| `/api/v1/branding/logo/` | DELETE | Удалить логотип |
| `/api/v1/branding/name/` | PATCH | Название компании |

### Модели Django (`apps/organizations`)

Поля на модели `Organization`:
- `name` — CharField(255)
- `domain` — CharField(255), unique, nullable
- `domain_status` — Choice (`pending`, `verified`, `ssl_active`, `error`)
- `color_primary` — CharField(7), default `#4F46E5`
- `color_secondary` — CharField(7), default `#A78BFA`
- `color_button` — CharField(7), default `#4338CA`
- `branded_pdf` — BooleanField, default `True`
- `white_label` — BooleanField, default `False`
- `logo` — FileField(upload_to='branding/logos/')

## 6. Состояния

| Состояние | Отображение |
| --- | --- |
| Загрузка настроек | Скелетоны вместо значений в каждом блоке |
| Успешное сохранение | Тост (Flowbite) `Настройки сохранены` (success) |
| Ошибка валидации HEX | Красная рамка + `text-xs text-rose-700` «Неверный формат цвета» |
| Ошибка DNS | Бейдж `Ошибка подключения` (danger) + текст причины |
| Загрузка логотипа | Прогресс в виде `<progress>` или текст `Загрузка...` |

## 7. Адаптивность

| Ширина | Поведение |
| --- | --- |
| `< lg` | 1 колонка — блоки стеком |
| `≥ lg` | 2 × 2 сетка |

**Dropzone:** на мобильных высота меньше (`p-6`), текст `Нажмите для выбора` (drag на мобильных не работает).

**Поля HEX и `color-picker`:** на `< sm` перенос на новую строку (`flex-wrap`).

## 8. Интерактив

- Домен: после ввода и клика `Подключить` → POST, бейдж `Ожидает DNS` → автополлинг статуса каждые 30 сек. до `verified`.
- Цвета: `input[type=color]` → `input[oninput]` → обновляет HEX-поле и наоборот.
- Переключатели: изменение триггерит автосохранение (debounce 500ms) или требует кнопку `Сохранить` (решение принимается при реализации, по умолчанию — автосохранение).
- Логотип: drag & drop + клик по зоне, превью после успешной загрузки.

## 9. Acceptance criteria

- [ ] 4 блока, сетка 2×2 на `lg`, стек на `< lg`.
- [ ] Блок «Собственный домен»: инпут + CTA + техническая информация + статус.
- [ ] Блок «Цвета бренда»: 3 пары (color-picker + HEX) — Основной, Дополнительный, Кнопки.
- [ ] Блок «Настройки платформы»: 2 обязательных переключателя (Брендированный PDF, Скрыть бренд ЮрКлик) + минимум 2 дополнительных.
- [ ] Блок «Логотип компании»: drag & drop зона с подсказкой форматов и лимита 2 МБ, + поле названия компании.
- [ ] Все переключатели — `class="toggle-slider"`.
- [ ] Превью загруженного логотипа с кнопкой удаления.
- [ ] Все метки с точкой слева.
- [ ] Валидация HEX и размера файла.

## 10. Ссылки на компоненты

- [design-system.md §7.9 — Drag & Drop](../design-system.md)
- [design-system.md §7.4 — Toggle-slider](../design-system.md)
- [design-system.md §7.2 — Поля ввода](../design-system.md)
- [Flowbite — File Input](https://flowbite.com/docs/forms/file-input/)
- [Flowbite — Toggle](https://flowbite.com/docs/forms/toggle/)
- [Tailwind — Grid Template Columns](https://tailwindcss.com/docs/grid-template-columns)
- [MDN — `<input type="color">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color)
