const THEME_KEY = "thesupereevee-theme";

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);

  if (saved === "light" || saved === "dark") {
    return saved;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;

  localStorage.setItem(THEME_KEY, theme);

  const button = document.getElementById("theme-toggle");

  if (button) {
    button.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );

    button.title =
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }
}

function initializeTheme() {
  setTheme(getPreferredTheme());

  const button = document.getElementById("theme-toggle");

  if (!button) return;

  button.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "dark" ? "light" : "dark");
  });
}
