// Layout кабинета клиента ЮрКлик: сайдбар, блок уведомлений, блок клиента.
// Подключается на каждой клиентской странице через <div id="app-shell" data-page="..." data-title="..."></div>.
// Полностью повторяет паттерн assets/layout.js, но с клиентским набором пунктов и подписей.

(function () {
  // Иконки Lucide (https://lucide.dev) — стабильные, не менять без необходимости.
  // Общие атрибуты SVG вынесены в svgAttrs, в icon — только paths.
  const svgAttrs =
    'class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';

  const ICONS = {
    // lucide: layout-grid (4 квадрата) — Мой статус
    dashboard: `<svg ${svgAttrs}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    // lucide: file-text — Мои документы
    fileText: `<svg ${svgAttrs}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`,
    // lucide: message-square — Чат с юристом
    chat: `<svg ${svgAttrs}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    // lucide: bell — Уведомления
    bell: `<svg ${svgAttrs}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    // lucide: credit-card — Оплата
    creditCard: `<svg ${svgAttrs}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
    // lucide: settings — Профиль и настройки
    settings: `<svg ${svgAttrs}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
  };

  // Клиентская навигация согласно § 3.3 ТЗ
  const NAV_ITEMS = [
    { key: "dashboard",     href: "dashboard.html",     label: "Мой статус",        icon: ICONS.dashboard },
    { key: "documents",     href: "documents.html",     label: "Мои документы",     icon: ICONS.fileText  },
    { key: "chat",          href: "chat.html",          label: "Чат с юристом",     icon: ICONS.chat      },
    { key: "notifications", href: "notifications.html", label: "Уведомления",       icon: ICONS.bell      },
    { key: "billing",       href: "billing.html",       label: "Оплата",            icon: ICONS.creditCard},
    { divider: true },
    { key: "profile",       href: "profile.html",       label: "Профиль и настройки", icon: ICONS.settings },
  ];

  const PAGE_TITLES = {
    dashboard: "Мой статус",
    documents: "Мои документы",
    chat: "Чат с юристом",
    notifications: "Уведомления",
    billing: "Оплата",
    profile: "Профиль и настройки",
  };

  // Параметры блока «Уведомления» в сайдбаре. Если null — блок не отображается.
  const SIDEBAR_NOTIFICATIONS = { count: 3 };

  // Данные клиента в нижнем блоке сайдбара
  const CLIENT_INFO = {
    fullName: "Иванов Иван Иванович",
    caseNo: "№ А40-12345/2026",
  };

  function navItemHtml(item, activeKey) {
    if (item.divider) {
      return `<li class="my-2"><hr class="border-gray-200"/></li>`;
    }
    const isActive = item.key === activeKey;
    const base =
      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors";
    const state = isActive
      ? "bg-indigo-50 text-indigo-700"
      : "text-gray-700 hover:bg-gray-100";
    return `<li>
      <a href="${item.href}" class="${base} ${state}">
        ${item.icon}
        <span class="truncate">${item.label}</span>
      </a>
    </li>`;
  }

  function notificationsBannerHtml() {
    if (!SIDEBAR_NOTIFICATIONS || !SIDEBAR_NOTIFICATIONS.count) return "";
    const n = SIDEBAR_NOTIFICATIONS.count;
    // Корректное склонение «уведомление / уведомления / уведомлений»
    const mod10 = n % 10;
    const mod100 = n % 100;
    let word = "уведомлений";
    if (mod10 === 1 && mod100 !== 11) word = "уведомление";
    else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) word = "уведомления";
    return `
      <div class="px-4 pt-4">
        <a href="notifications.html"
           class="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-800 hover:bg-yellow-100 transition-colors">
          ${ICONS.bell}
          <span class="text-sm">${n} ${word}</span>
        </a>
      </div>`;
  }

  function sidebarHtml(activeKey) {
    return `
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col -translate-x-full lg:translate-x-0 transition-transform">
      <!-- Логотип -->
      <div class="h-16 flex items-center px-5 border-b border-gray-200 shrink-0">
        <a href="dashboard.html" class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm">Ю</span>
          <span class="text-gray-900 text-base tracking-tight">ЮрКлик</span>
        </a>
      </div>

      <!-- Блок уведомлений -->
      ${notificationsBannerHtml()}

      <!-- Навигация -->
      <nav class="px-4 py-4 flex-1 overflow-y-auto" aria-label="Меню кабинета клиента">
        <ul class="space-y-1">
          ${NAV_ITEMS.map((i) => navItemHtml(i, activeKey)).join("")}
        </ul>
      </nav>

      <!-- Блок клиента (низ сайдбара) -->
      <div class="px-4 py-4 border-t border-gray-200 shrink-0">
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-sm text-gray-900 truncate">${CLIENT_INFO.fullName}</p>
            <p class="text-xs text-gray-500 truncate">${CLIENT_INFO.caseNo}</p>
          </div>
          <button type="button" title="Выйти" aria-label="Выйти из кабинета"
                  class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/>
              <path d="M10 17l-5-5 5-5"/>
              <path d="M15 12H5"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay для мобилки -->
    <div id="sidebar-overlay" class="fixed inset-0 z-30 bg-gray-900/40 hidden lg:hidden"></div>

    <!-- Мобильный toggle (бургер) -->
    <button id="sidebar-toggle" type="button" aria-label="Открыть меню"
            class="fixed z-50 top-3 left-3 lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 shadow-sm">
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>
      </svg>
    </button>
    `;
  }

  function render() {
    const root = document.getElementById("app-shell");
    if (!root) return;
    const pageKey = root.dataset.page || "dashboard";
    const title = root.dataset.title || PAGE_TITLES[pageKey] || "";

    root.innerHTML = `
      ${sidebarHtml(pageKey)}
      <main class="lg:pl-64 min-h-screen">
        <div class="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 pt-16 lg:pt-8">
          <header class="mb-6">
            <h1 class="text-xl sm:text-2xl text-gray-900 tracking-tight">${title}</h1>
          </header>
          <div id="page-content"></div>
        </div>
      </main>
    `;

    // Перенос исходного содержимого страницы в #page-content
    const pageSource = document.getElementById("page-source");
    if (pageSource) {
      document.getElementById("page-content").innerHTML = pageSource.innerHTML;
      pageSource.remove();
    }

    // Мобильное поведение сайдбара
    const toggle = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const open = () => {
      sidebar.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
    };
    const close = () => {
      sidebar.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    };
    toggle?.addEventListener("click", () =>
      sidebar.classList.contains("-translate-x-full") ? open() : close()
    );
    overlay?.addEventListener("click", close);

    // Сигнал странице
    document.dispatchEvent(new CustomEvent("layout:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
