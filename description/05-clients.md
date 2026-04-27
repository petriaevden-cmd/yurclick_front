# 05. Клиенты

**Файл:** [`clients.html`](../clients.html)
**Заголовок:** `Клиенты`
**URL:** `/clients/`

## 1. Назначение

Центральная рабочая страница для юриста и администратора: **список клиентов компании и их дел о банкротстве**. Здесь:

- видно, сколько документов загружено, какая сейчас стадия дела, в каком регионе клиент;
- по клику на ФИО раскрывается блок **детализации должника** (5 вкладок: Долги, Кредиторы, Имущество, Сделки, Налоги и сборы) с таблицами;
- по клику на `N / M` документов раскрывается **список документов** дела с drag & drop для загрузки новых;
- регион меняется через **поповер** с поиском;
- toolbar с поиском и фильтрами — **sticky** при скролле.

В примере — 10 строк, 7 стадий дел.

## 2. Роли и доступ

| Роль | Доступ |
| --- | --- |
| Администратор | Полный |
| Старший юрист | Полный |
| Юрист с правом «Клиенты → Просматривать клиентов» | Только чтение |
| Юрист с правом «Клиенты → Редактировать клиентов» | Можно менять регион, загружать документы |
| Клиент компании-клиента | **Нет** — у клиента отдельный кабинет |

## 3. Компоновка

```
┌──────────────────────────────────────────────────────────────┐
│  <h1> Клиенты                                                │
│                                                              │
│  ┌── Sticky toolbar (при скролле прилипает сверху) ─────┐   │
│  │ [Поиск] [Все статусы ▾] [Фильтры]  [+ Добавить клиента] │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌── Таблица клиентов ──────────────────────────────────┐   │
│  │ ☐ ФИО ↕ · № дела · Статус · Документы · Регион · ⚡ │   │
│  │   > Семёнов Артём  А40-12345  64% обработано  6/20 │   │
│  │     [раскрытие ФИО → вкладки]                      │   │
│  │     [раскрытие Документы → список + dropzone]      │   │
│  │   > ...                                             │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

## 4. Блоки

### 4.1. Sticky toolbar (фиксированная строка сверху при скролле)

```html
<div class="sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10
            py-3 bg-gray-50/95 backdrop-blur
            border-b border-gray-200 mb-4">
  <div class="flex flex-wrap items-center gap-3">
    <div class="relative flex-1 min-w-[240px] max-w-md">
      <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ...></svg>
      <input placeholder="Поиск по ФИО, № дела, региону..."
             class="h-10 w-full pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-sm
                    focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400" />
    </div>

    <select class="h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700">
      <option value="all">Все статусы</option>
      <option value="processing">В обработке</option>
      <option value="analysis">Анализ документов</option>
      <option value="collecting">Сбор документов</option>
      <option value="generating">Генерация документов</option>
      <option value="filing">Подача в суд</option>
      <option value="paused">Остановлено</option>
      <option value="done">Завершено</option>
    </select>

    <button class="inline-flex items-center gap-2 h-10 px-3 rounded-lg
                   border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50">
      <svg class="w-4 h-4" ...></svg> Фильтры
    </button>

    <div class="ml-auto">
      <button class="inline-flex items-center gap-2 h-10 px-4 rounded-lg
                     bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
        <svg class="w-4 h-4" ...></svg> Добавить клиента
      </button>
    </div>
  </div>
</div>
```

**Ключевое:** `sticky top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-10 px-4 ...` — отрицательный margin растягивает toolbar на всю ширину viewport поверх padding страницы, `backdrop-blur` создаёт эффект стекла при скролле под ним.

### 4.2. Таблица клиентов

#### Колонки (7 штук)

| # | Колонка | Заголовок | Содержимое |
| --- | --- | --- | --- |
| 0 | — | ☐ | Чекбокс `toggle-slider`, `w-10` |
| 1 | ФИО ↕ | `ФИО` + иконка сортировки | Chevron (раскрытие вкладок) + ФИО клиента |
| 2 | № дела | `№ дела` | Ссылка на [kad.arbitr.ru](https://kad.arbitr.ru), `text-indigo-600` |
| 3 | Статус дела | `Статус дела` | Бейдж семантики (см. §5) + прогресс-текст |
| 4 | Документы | `Документы` | Chevron (раскрытие списка) + `N / M` |
| 5 | Регион | `Регион` | Кнопка-чип, открывает поповер поиска региона |
| 6 | Быстрая загрузка | `Быстрая загрузка` | Кнопка `Загрузить` (label + скрытый `input type=file`) |

Сортировка — клик по `<th data-sort>` — asc/desc по `name`, `caseNo`, `progress`. Фильтровать можно по всем полям одновременно.

#### Шапка

```html
<table class="min-w-full text-sm">
  <thead class="bg-[#f3f4f6] text-gray-600">
    <tr>
      <th class="w-10 px-2 md:px-3 lg:px-4 py-2.5 text-left"><!-- чекбокс выбрать все --></th>
      <th class="px-2 md:px-3 lg:px-4 py-2.5 text-left cursor-pointer" data-sort="name">
        ФИО <span class="text-gray-400">↕</span>
      </th>
      <th class="px-2 md:px-3 lg:px-4 py-2.5 text-left cursor-pointer" data-sort="caseNo">№ дела</th>
      <th class="px-2 md:px-3 lg:px-4 py-2.5 text-left">Статус дела</th>
      <th class="px-2 md:px-3 lg:px-4 py-2.5 text-left">Документы</th>
      <th class="px-2 md:px-3 lg:px-4 py-2.5 text-left">Регион</th>
      <th class="px-2 md:px-3 lg:px-4 py-2.5 text-left">Быстрая загрузка</th>
    </tr>
  </thead>
  ...
</table>
```

**Адаптивные отступы** (см. живую реализацию):
- `< md`: `px-2 py-2` — минимальные
- `md`: `px-3 py-2`
- `≥ lg`: `px-4 py-2.5` — стандарт

### 4.3. Строка клиента

```html
<tr class="hover:bg-gray-50">
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <!-- чекбокс toggle-slider -->
  </td>
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <button class="expand-name inline-flex items-center gap-2 text-left">
      <svg class="chevron w-4 h-4 text-gray-400 shrink-0 transition-transform" ...></svg>
      <span class="text-gray-900">Семёнов Артём Викторович</span>
    </button>
  </td>
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <a href="https://kad.arbitr.ru/Card?number=А40-12345/2026"
       target="_blank" rel="noopener"
       class="text-indigo-600 hover:text-indigo-700">А40-12345/2026</a>
  </td>
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <span class="inline-flex items-center gap-1.5 text-xs text-sky-700">
      <span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
      64% обработано
    </span>
  </td>
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <button class="expand-docs inline-flex items-center gap-1.5">
      <svg class="chevron w-4 h-4 text-gray-400 transition-transform" ...></svg>
      <span class="text-gray-900">6</span>
      <span class="text-gray-400">/ 20</span>
    </button>
  </td>
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <button class="region-chip inline-flex items-center gap-1.5 text-sm text-gray-700
                   hover:text-indigo-700">
      <svg class="w-4 h-4 text-gray-400" ...></svg>
      Москва
    </button>
  </td>
  <td class="px-2 md:px-3 lg:px-4 py-2.5">
    <label class="inline-flex items-center gap-2 h-8 px-2.5 rounded-lg
                  border border-dashed border-gray-300 text-xs text-gray-700
                  hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer">
      <svg class="w-4 h-4" ...></svg> Загрузить
      <input type="file" class="sr-only" multiple />
    </label>
  </td>
</tr>
```

### 4.4. Expand-row: детализация по ФИО (вкладки)

Скрыта по умолчанию (`hidden`). Открывается по клику на ФИО. Содержит 5 вкладок:

```html
<tr class="expand-row expand-name-row hidden bg-gray-50/70">
  <td></td>
  <td colspan="6" class="px-2 md:px-3 lg:px-4 py-3">
    <div class="client-tabs bg-white border border-gray-200 rounded-xl">
      <!-- Nav -->
      <div class="border-b border-gray-200 px-2 md:px-3">
        <nav class="flex flex-wrap items-center gap-x-3 md:gap-x-5 lg:gap-x-6 gap-y-1 text-sm">
          <button data-ct="debts"     class="ct-tab -mb-px border-b-2 border-indigo-600 text-indigo-700 py-3 whitespace-nowrap">Долги <span class="text-gray-400">· 5</span></button>
          <button data-ct="creditors" class="ct-tab -mb-px border-b-2 border-transparent text-gray-600 hover:text-gray-900 py-3 whitespace-nowrap">Кредиторы <span class="text-gray-400">· 7</span></button>
          <button data-ct="property"  class="ct-tab -mb-px border-b-2 border-transparent text-gray-600 hover:text-gray-900 py-3 whitespace-nowrap">Имущество <span class="text-gray-400">· 2</span></button>
          <button data-ct="deals"     class="ct-tab -mb-px border-b-2 border-transparent text-gray-600 hover:text-gray-900 py-3 whitespace-nowrap">Сделки <span class="text-gray-400">· 2</span></button>
          <button data-ct="taxes"     class="ct-tab -mb-px border-b-2 border-transparent text-gray-600 hover:text-gray-900 py-3 whitespace-nowrap">Налоги и сборы <span class="text-gray-400">· 5</span></button>
        </nav>
      </div>

      <!-- Panels -->
      <div class="ct-panel"      data-ct-panel="debts">...</div>
      <div class="ct-panel hidden" data-ct-panel="creditors">...</div>
      <div class="ct-panel hidden" data-ct-panel="property">...</div>
      <div class="ct-panel hidden" data-ct-panel="deals">...</div>
      <div class="ct-panel hidden" data-ct-panel="taxes">...</div>
    </div>
  </td>
</tr>
```

#### Таблицы внутри вкладок

| Вкладка | Колонки |
| --- | --- |
| **Долги** | Тип обязательства (с точкой семантики), Кредитор, Основной долг, Проценты, Пени, Итого. `<tfoot>` — итого по всем долгам. |
| **Кредиторы** | Банк, № договора, Дата, Сумма требования, Просрочка (`text-rose-700` при >180 дней, `text-amber-700` при >60), В реестре (success / neutral). |
| **Имущество** | Объект, Дата регистрации, Оценочная стоимость, Статус (Единственное жильё → success, В залоге → warning, Подлежит реализации → info). |
| **Сделки** | Тип сделки, Контрагент, Дата, Сумма, Риск оспаривания (Высокий → danger, Средний → warning, Низкий → success). |
| **Налоги и сборы** | Вид, Орган, Период, Основная сумма, Пени, Итого, Статус (К оплате → danger, В реестре → info, Частично оплачен → warning). `<tfoot>` — итого. |

**Правила отображения таблиц:**
- `thead` — `bg-[#f3f4f6]`
- `tbody` — `divide-y divide-gray-100`
- Суммы — `.toLocaleString('ru-RU') + ' ₽'`
- Цифры — `text-right`, текст — `text-left`
- **Никакого** `overflow-x-auto` на обёртке таблицы — внешняя таблица клиентов уже умеет скроллиться

**Важное требование ТЗ:**
> Ни в коем случае не дублировать информацию из самой строки клиента.

Поэтому в вкладках — детализация (записи, суммы, статусы), а не агрегат `2 450 000 ₽` и `7 кредиторов`.

### 4.5. Expand-row: документы дела

По клику на шеврон рядом с `6 / 20`:

```html
<tr class="expand-row expand-docs-row hidden bg-gray-50/70">
  <td></td>
  <td colspan="6" class="px-2 md:px-3 lg:px-4 py-4">
    <div class="bg-white rounded-xl border border-gray-200 p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm text-gray-900">Документы дела</h3>
        <span class="text-xs text-gray-500">Загружено 6 из 20</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <!-- карточка документа -->
      </div>
    </div>
  </td>
</tr>
```

#### Карточка документа

```html
<label class="group relative block rounded-lg border border-gray-200 bg-white p-3 cursor-pointer">
  <div class="flex items-start gap-2">
    <svg class="w-4 h-4 text-gray-400 shrink-0 mt-0.5" ...></svg>
    <div class="flex-1 min-w-0">
      <div class="text-sm text-gray-900 truncate">Паспорт (скан)</div>
      <div class="text-xs text-gray-500 mt-0.5">
        <span class="inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Готов
        </span>
      </div>
    </div>
  </div>

  <!-- Drag&Drop overlay, появляется при hover -->
  <div class="absolute inset-0 rounded-lg border-2 border-dashed border-indigo-400
              bg-indigo-50/80 opacity-0 group-hover:opacity-100 transition-opacity
              flex flex-col items-center justify-center text-center p-2 pointer-events-none">
    <svg class="w-5 h-5 text-indigo-600 mb-1" ...></svg>
    <span class="text-xs text-indigo-700">Перетащите файл сюда</span>
  </div>

  <input type="file" class="sr-only" multiple />
</label>
```

**Статусы документа (10 стадий):**

*Штатный жизненный цикл:*
- `pending` — **Ожидает** (gray) — документ в списке, файл не загружен. Кнопка: «Загрузить»
- `uploaded` — **Загружен** (sky) — файл принят системой, ожидает обработки. Кнопка: «Заменить»
- `processing` — **Обработка** (indigo, спиннер + pulse) — извлекаем данные. Кнопка: «Ожидайте» (disabled-логика)
- `verifying` — **На проверке** (violet) — юрист валидирует извлечённые данные. Кнопка: «Открыть»
- `ready` — **Готов** (emerald) — данные приняты, документ полностью готов. Кнопка: «Просмотр»

*Проблемные состояния (рамка карточки подсвечена):*
- `unreadable` — **Нечитаемый файл** (rose, border-rose-200) — часть страниц не разобрана. Кнопка: «Исправить»
- `corrupted` — **Файл повреждён** (rose, border-rose-200) — PDF/DOCX битый, нужна повторная загрузка. Кнопка: «Перезагрузить»
- `mismatch` — **Данные не совпадают** (amber, border-amber-200) — ФИО/ИНН расходятся с делом. Кнопка: «Сверить»
- `expired` — **Истёк срок** (amber, border-amber-200) — справке более 30 дней, нужна новая. Кнопка: «Обновить»
- `wrong_type` — **Неверный тип** (rose, border-rose-200) — загружен не тот документ. Кнопка: «Заменить»

**Анатомия карточки:**
- верхняя строка: иконка файла + название + лейбл статуса (точка + текст без фона)
- нижняя строка: пояснение + кнопка действия (розовый для проблем, indigo для pending, gray для штатных)
- при hover — оверлей drag&drop «Перетащите или выберите» / «Заменить файл»
- спиннер (`animate-spin`) вместо иконки файла + пульсирующая точка (`animate-pulse`) в статусе `processing`

**Drag & drop** работает прямо на карточке:
```js
card.addEventListener('dragover', e => { e.preventDefault(); card.classList.add('ring-2','ring-indigo-400'); });
card.addEventListener('dragleave', () => card.classList.remove('ring-2','ring-indigo-400'));
card.addEventListener('drop', e => { e.preventDefault(); uploadFiles(e.dataTransfer.files, docTypeId); });
```

**Примечание:** `Быстрая загрузка` в виде отдельной колонки / блока **удалена** по обновлённому требованию — загрузка происходит через hover на карточку документа или через быструю кнопку в ячейке таблицы.

### 4.6. Поповер региона

По клику на чип региона в ячейке — открывается плавающий поповер.

```html
<div id="region-popover"
     class="hidden fixed z-40 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-3">
  <div class="relative">
    <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ...></svg>
    <input placeholder="Поиск региона"
           class="h-9 w-full pl-9 pr-3 rounded-lg border border-gray-200 bg-white text-sm" />
  </div>
  <ul class="mt-2 max-h-60 overflow-y-auto divide-y divide-gray-100">
    <!-- 15 регионов:
         Москва, Санкт-Петербург, Московская область, Ленинградская область,
         Свердловская область, Новосибирская область, Республика Татарстан,
         Краснодарский край, Нижегородская область, Челябинская область,
         Самарская область, Омская область, Пермский край,
         Воронежская область, Ростовская область -->
    <li>
      <button class="w-full flex items-center justify-between gap-2 py-2 px-1 hover:bg-gray-50 rounded">
        <span class="text-sm text-gray-900">Москва</span>
        <svg class="w-4 h-4 text-indigo-600" ...></svg> <!-- галочка, если выбран -->
      </button>
    </li>
    ...
  </ul>
</div>
```

**Позиционирование:** JS считает `getBoundingClientRect()` кнопки-чипа, ставит `left = Math.min(rect.left, window.innerWidth - 280)`, `top = rect.bottom + 4`. Закрытие — по клику вне поповера или Esc.

## 5. Статусы дел (7 стадий) — описание процесса

Описанию процесса в ТЗ v4.11 соответствует перечень статусов, которые **последовательно меняются** по ходу обработки дела:

| # | Статус | Отображение | Семантика / точка + цвет текста |
| --- | --- | --- | --- |
| 1 | `{N}% обработано` | процент обработанных документов | Process (`bg-sky-500` + `text-sky-700`) |
| 2 | `Анализ документов` | после обработки — извлечение полей и распределение по модели дела | Analysis (`bg-violet-500` + `text-violet-700`) |
| 3 | `Сбор документов` | анализ завершён, но не все документы загружены. При добавлении файла возвращает на стадию 1 | Warning (`bg-amber-500` + `text-amber-700`) |
| 4 | `Генерация документов` | сгенерированы заявления и вспомогательные документы | Info (`bg-indigo-500` + `text-indigo-700`) |
| 5 | `Подача в суд` | пакет готов, отправлен в КАД.Арбитр | Filing (`bg-blue-500` + `text-blue-700`) |
| 6 | `Остановлено` | клиент приостановил оплату — дело приостановлено | Neutral (`bg-gray-400` + `text-gray-600`) |
| 7 | `Завершено` | подача успешно завершена | Success (`bg-emerald-500` + `text-emerald-700`) |

Переходы:
- 1 → 2 — автоматически, когда `processed_docs == total_uploaded_docs`.
- 2 → 3 — автоматически, если после анализа `uploaded < required`.
- 3 → 1 — при загрузке нового документа.
- 3 → 4 — когда `uploaded == required`.
- 4 → 5 — когда генерация без ошибок.
- `*` → 6 — ручное действие или отмена подписки.
- 5 → 7 — по подтверждению подачи в суд.

## 6. Данные и модели

### API endpoints

| Endpoint | Метод | Назначение |
| --- | --- | --- |
| `/api/v1/clients/` | GET | Список клиентов с пагинацией, поиск, фильтр статуса |
| `/api/v1/clients/{id}/` | GET | Детали клиента (используется для вкладок детализации) |
| `/api/v1/clients/{id}/region/` | PATCH | Изменить регион |
| `/api/v1/cases/{id}/documents/` | GET | Список документов дела |
| `/api/v1/cases/{id}/documents/` | POST (multipart) | Загрузить документы |
| `/api/v1/documents/{id}/` | DELETE | Удалить документ |
| `/api/v1/regions/` | GET | Справочник регионов (15 записей) |

### Модели Django

- `Case` (`apps/cases`) — `case_number`, `client` (FK → User), `organization`, `status`, `progress_pct`, `region` (FK → Region), `submitted_at`, `completed_at`.
- `User` (`apps/users`, role=`client`) — ФИО, телефон, email.
- `Document` (`apps/documents`) — `case`, `doc_type` (FK → DocType), `status`, `file`, `extracted_data` (JSON), `uploaded_at`.
- `DocType` — `name`, `slug`, `required`, `extractable_fields` (JSON с полями для извлечения).
- `Creditor`, `Debt`, `Property`, `Deal`, `Tax` — вложенные сущности дела (для вкладок).

### Структура `detail` для вкладок

Для превью генерируется детерминированно по `caseNo` (`rng(hashSeed(caseNo))`):

```json
{
  "creditors": [{"bank":"ПАО Сбербанк","contract":"№ 123456","date":"01.03.2023","amount":450000,"overdue":120,"inRegistry":true}],
  "debts":     [{"type":{"t":"Потребительский кредит","c":"text-rose-700","d":"bg-rose-500"},"creditor":"ПАО Сбербанк","principal":300000,"interest":45000,"penalty":12000,"total":357000}],
  "property":  [{"type":"Квартира, 54 м²","registered":"12.04.2015","value":4500000,"status":"Единственное жильё"}],
  "deals":     [{"type":"Купля-продажа автомобиля","counterparty":"Физлицо 231","date":"10.05.2023","amount":850000,"risk":"Высокий"}],
  "taxes":     [{"type":"Транспортный налог","authority":"ФНС России","period":"2024 г.","base":12000,"penalty":1800,"total":13800,"status":"К оплате"}]
}
```

## 7. Состояния

| Состояние | Отображение |
| --- | --- |
| Пустой список | Иллюстрация + текст `У вас ещё нет клиентов` + CTA `+ Добавить клиента` |
| Нет результатов поиска | `По запросу «{q}» ничего не найдено` + ссылка `Сбросить фильтры` |
| Ошибка загрузки | Карточка с ошибкой + `Повторить` |
| Загрузка документа | Прогресс-бар в карточке документа + disable клика |
| Ошибка загрузки документа | Карточка — `ring-1 ring-rose-400`, бейдж `Ошибка` + tooltip с причиной |
| Файл в обработке | Бейдж `В обработке` (process) + спиннер (`animate-spin`) |

## 8. Интерактив

### 8.1. Раскрытия

Две независимые expand-строки под каждой строкой клиента: `expand-name-row` (вкладки) и `expand-docs-row` (документы). Могут быть открыты одновременно.

```js
btn.expand-name.addEventListener('click', () => {
  nextRow.classList.toggle('hidden');
  chevron.classList.toggle('rotate-90');
});
```

### 8.2. Переключение вкладок

При клике по `.ct-tab`:
- Переносятся классы `border-indigo-600 text-indigo-700` ↔ `border-transparent text-gray-600`.
- `.hidden` toggle на соответствующих `.ct-panel[data-ct-panel="key"]`.

### 8.3. Регион-поповер

- Клик по `.region-chip` → позиционирование → `document.addEventListener('click', outsideClose, { once:true })`.
- Поиск внутри поповера — фильтрация списка.
- Клик по региону → PATCH `/api/v1/clients/{id}/region/` → обновление текста в чипе + закрытие.

### 8.4. Drag & drop

- На карточке документа (4.5): overlay видно на hover, работает drop.
- На ячейке «Быстрая загрузка» (4.3): клик = выбор файлов, drop = загрузка.
- После успешной загрузки — счётчик `N / M` в строке обновляется, список документов перерисовывается.

### 8.5. Sticky toolbar

При скролле таблицы toolbar «прилипает» к верху. Чтобы тени не накапливались — `bg-gray-50/95 backdrop-blur` + `border-b border-gray-200`.

## 9. Адаптивность

| Ширина | Поведение |
| --- | --- |
| `< md` | Таблица горизонтальный скролл, toolbar стеком. Карточки документов — 1 колонка. Отступы ячеек `px-2 py-2`. |
| `md – lg` | 2 колонки карточек документов, отступы `px-3 py-2`. |
| `≥ lg` | 3 колонки карточек, на `xl` — 4 колонки. Отступы `px-4 py-2.5`. |

**Sticky toolbar** на мобильном остаётся sticky, `flex-wrap` переносит кнопки.

## 10. Acceptance criteria

- [ ] Sticky toolbar с поиском, фильтром статусов, кнопкой `Фильтры`, CTA `+ Добавить клиента`.
- [ ] Таблица из 10 примерных клиентов, все 7 стадий представлены минимум 1 раз.
- [ ] Чекбокс-колонка `w-10`, выделение строки `bg-gray-100` при `checked`.
- [ ] Клик по ФИО (шеврон поворачивается) раскрывает вкладки (Долги / Кредиторы / Имущество / Сделки / Налоги и сборы).
- [ ] Каждая вкладка содержит таблицу с соответствующими колонками (см. §4.4).
- [ ] Никакого дублирования агрегатов из самой строки клиента (без карточек `Общая сумма долгов`, `Общее количество кредиторов` и т.п. в expand — вместо них детальные таблицы).
- [ ] Клик по `6 / 20` раскрывает список документов на всю ширину строки в адаптивной сетке.
- [ ] При наведении на карточку документа появляется drag & drop overlay.
- [ ] Клик по региону открывает поповер с поиском и 15 регионами.
- [ ] № дела — ссылка на kad.arbitr.ru, открывается в новой вкладке.
- [ ] Статусы без фона: точка + текст семантического цвета.
- [ ] Отступы таблицы адаптивны: `px-2 md:px-3 lg:px-4`.
- [ ] Нет горизонтального скролла внутри блока вкладок (таблицы панелей не обёрнуты в `overflow-x-auto`).
- [ ] Все чекбоксы — `class="toggle-slider"`.

## 11. Ссылки на компоненты

- [design-system.md §7.7 — Таблица](../design-system.md)
- [design-system.md §7.9 — Drag & Drop](../design-system.md)
- [design-system.md §7.10 — Вкладки](../design-system.md)
- [design-system.md §7.11 — Поповер](../design-system.md)
- [design-system.md §9 — Sticky toolbar, раскрытия](../design-system.md)
- [Flowbite — Tables](https://flowbite.com/docs/components/tables/)
- [Flowbite — Popover](https://flowbite.com/docs/components/popover/)
- [Flowbite — Dropdown](https://flowbite.com/docs/components/dropdowns/)
- [Tailwind — Position: sticky](https://tailwindcss.com/docs/position)
- [Tailwind — Backdrop Blur](https://tailwindcss.com/docs/backdrop-blur)
- [КАД.Арбитр (официальный сайт)](https://kad.arbitr.ru)
