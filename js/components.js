async function loadComponent(elementId, file) {
  const element = document.getElementById(elementId);

  if (!element) {
    console.warn(`Component target not found: #${elementId}`);
    return;
  }

  try {
    const response = await fetch(siteUrl(file));

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${file}`);
    }

    element.innerHTML = await response.text();

    // Resolve all shared navigation paths.
    element.querySelectorAll("[data-route]").forEach((link) => {
      link.href = siteUrl(link.dataset.route);
    });
  } catch (error) {
    console.error(`Failed to load component: ${file}`, error);
    element.innerHTML = "";
  }
}

async function loadComponents() {
  await Promise.all([
    loadComponent("site-header", "components/header.html"),
    loadComponent("site-footer", "components/footer.html"),
  ]);
}
