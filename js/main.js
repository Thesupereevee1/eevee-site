async function initializeSite() {
  // Load shared components first.
  await loadComponents();

  // Initialize functionality.
  initializeTheme();

  // Update copyright year.
  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Load homepage data.
  await Promise.all([loadFeaturedProjects(), loadUpdates()]);

  document.body.classList.add("site-loaded");
}

document.addEventListener("DOMContentLoaded", initializeSite);
