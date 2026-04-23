// Общий layout: сайдбар, блок уведомлений, блок администратора
// Вставляется на все страницы через <div id="app-shell" data-page="..."></div>

(function () {
  // Иконки: Lucide (https://lucide.dev) — стабильные, не менять без необходимости.
  // Общие атрибуты SVG вынесены в svgAttrs, в icon — только содержимое (paths).
  const svgAttrs = 'class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    // lucide: layout-grid (4 квадрата)
    dashboard: `<svg ${svgAttrs}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    // lucide: user (один человечек)
    user: `<svg ${svgAttrs}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    // lucide: credit-card (банковская карта)
    creditCard: `<svg ${svgAttrs}><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
    // lucide: paintbrush (кисть с щетиной)
    paintbrush: `<svg ${svgAttrs}><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></svg>`,
    // lucide: users (два человечка)
    users: `<svg ${svgAttrs}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  };

  const NAV_ITEMS = [
    { key: "dashboard", href: "dashboard.html", label: "Дашборд",       icon: ICONS.dashboard  },
    { key: "users",     href: "users.html",     label: "Пользователи",  icon: ICONS.user       },
    { key: "billing",   href: "billing.html",   label: "Оплата",        icon: ICONS.creditCard },
    { key: "branding",  href: "branding.html",  label: "Брендинг",      icon: ICONS.paintbrush },
    { divider: true },
    { key: "clients",   href: "clients.html",   label: "Клиенты",       icon: ICONS.users      },
  ];

  const PAGE_TITLES = {
    dashboard: "Обзор показателей платформы",
    users: "Пользователи",
    billing: "Оплата",
    branding: "Брендинг",
    clients: "Клиенты",
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

      <!-- Уведомления -->
      <div class="px-4 pt-4">
        <a href="#" class="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-800 hover:bg-yellow-100 transition-colors">
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 8a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7"/>
            <path d="M10 20a2 2 0 0 0 4 0"/>
          </svg>
          <span class="text-sm">7 уведомлений</span>
        </a>
      </div>

      <!-- Навигация -->
      <nav class="px-4 py-4 flex-1 overflow-y-auto">
        <ul class="space-y-1">
          ${NAV_ITEMS.map((i) => navItemHtml(i, activeKey)).join("")}
        </ul>
      </nav>

      <!-- Блок администратора -->
      <div class="px-4 py-4 border-t border-gray-200 shrink-0">
        <div class="flex items-center justify-between gap-2">
          <div class="min-w-0">
            <p class="text-sm text-gray-900 truncate">Иван Петров</p>
            <p class="text-xs text-gray-500 truncate">Администратор</p>
          </div>
          <button type="button" class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900" title="Выйти">
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

    <!-- Мобильный toggle -->
    <button id="sidebar-toggle" type="button" class="fixed z-50 top-3 left-3 lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-700 shadow-sm">
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

    // Перенос исходного содержимого в #page-content
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
