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
    // lucide: bell (колокольчик уведомлений)
    bell: `<svg ${svgAttrs}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
    // lucide: settings (шестерёнка)
    settings: `<svg ${svgAttrs}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    // lucide: message-square (пузырёк чата)
    chat: `<svg ${svgAttrs}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  };

  const NAV_ITEMS = [
    { key: "dashboard", href: "dashboard.html", label: "Дашборд",       icon: ICONS.dashboard  },
    { key: "users",     href: "users.html",     label: "Пользователи",  icon: ICONS.user       },
    { key: "billing",   href: "billing.html",   label: "Оплата",        icon: ICONS.creditCard },
    { divider: true },
    { key: "clients",   href: "clients.html",   label: "Клиенты",       icon: ICONS.users      },
    { key: "chats",     href: "chats.html",     label: "Чаты с клиентами", icon: ICONS.chat   },
    { divider: true },
    { key: "settings",  href: "settings.html",  label: "Настройки",     icon: ICONS.settings   },
  ];

  const PAGE_TITLES = {
    dashboard: "Обзор показателей платформы",
    users: "Пользователи",
    billing: "Оплата",
    settings: "Настройки",
    clients: "Клиенты",
    chats: "Чаты с клиентами",
    notifications: "Уведомления",
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
        <span class="sidebar-label truncate">${item.label}</span>
      </a>
    </li>`;
  }

  function sidebarHtml(activeKey) {
    return `
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col -translate-x-full lg:translate-x-0 transition-all duration-200">
      <!-- Логотип -->
      <div class="h-16 flex items-center px-5 border-b border-gray-200 shrink-0 overflow-hidden">
        <a href="dashboard.html" class="flex items-center gap-2">
          <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm shrink-0">Ю</span>
          <span class="sidebar-label text-gray-900 text-base tracking-tight whitespace-nowrap">ЮрКлик</span>
        </a>
      </div>

      <!-- Уведомления -->
      <div class="px-4 pt-4">
        <a href="notifications.html" class="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-yellow-300 bg-yellow-50 text-yellow-800 hover:bg-yellow-100 transition-colors">
          ${ICONS.bell}
          <span class="sidebar-label text-sm whitespace-nowrap">7 уведомлений</span>
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
          <div class="sidebar-label min-w-0">
            <p class="text-sm text-gray-900 truncate">Иван Петров</p>
            <p class="text-xs text-gray-500 truncate">Администратор</p>
          </div>
          <button type="button" class="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 shrink-0" title="Выйти">
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
