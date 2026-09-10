(() => {
  const storageKey = "tara-color-theme";
  const root = document.documentElement;

  let savedTheme = null;

  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch {
    // The site still supports an in-session theme when storage is unavailable.
  }

  if (savedTheme === "dark") {
    root.dataset.theme = "dark";
  }

  const applyTheme = (theme, persist = false) => {
    const isDark = theme === "dark";
    const toggle = document.querySelector("[data-theme-toggle]");
    const themeColor = document.querySelector('meta[name="theme-color"]');

    if (isDark) {
      root.dataset.theme = "dark";
    } else {
      delete root.dataset.theme;
    }

    if (toggle) {
      toggle.textContent = isDark ? "Light" : "Dark";
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }

    if (themeColor) {
      themeColor.setAttribute("content", isDark ? "#111012" : "#b30d65");
    }

    if (persist) {
      try {
        window.localStorage.setItem(storageKey, isDark ? "dark" : "light");
      } catch {
        // Keep the active in-session theme if storage is unavailable.
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(root.dataset.theme === "dark" ? "dark" : "light");

    const toggle = document.querySelector("[data-theme-toggle]");

    toggle?.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  });
})();
