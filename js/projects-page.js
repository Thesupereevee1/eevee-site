let allProjects = [];

async function initializeProjectsPage() {
  console.log("[Projects] Initializing projects page...");

  if (typeof loadComponents === "function") {
    await loadComponents();
  }

  if (typeof initializeTheme === "function") {
    initializeTheme();
  }

  const year = document.getElementById("current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  initializeProjectFilters();
  await loadProjects();
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  const count = document.getElementById("project-count");

  try {
    console.log("[Projects] Fetching projects.json...");

    const response = await fetch(siteUrl("data/projects.json"));

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.projects)) {
      throw new Error("Invalid projects.json format.");
    }

    allProjects = data.projects;

    console.log(`[Projects] Loaded ${allProjects.length} projects.`);

    populateProjectFilters();
    renderProjects();
  } catch (error) {
    console.error("[Projects] Failed to load projects:", error);

    grid.innerHTML = `
            <div class="projects-error">
                <h3>Unable to load projects</h3>
                <p>Something went wrong while loading the project list.</p>
            </div>
        `;

    count.textContent = "Error loading projects";
  }
}

function initializeProjectFilters() {
  const search = document.getElementById("project-search");
  const category = document.getElementById("project-category");
  const status = document.getElementById("project-status");
  const clear = document.getElementById("clear-project-filters");

  search.addEventListener("input", renderProjects);
  category.addEventListener("change", renderProjects);
  status.addEventListener("change", renderProjects);

  clear.addEventListener("click", () => {
    search.value = "";
    category.value = "all";
    status.value = "all";

    renderProjects();
  });
}

function populateProjectFilters() {
  const categorySelect = document.getElementById("project-category");
  const statusSelect = document.getElementById("project-status");

  const categories = [
    ...new Set(allProjects.map((project) => project.category).filter(Boolean)),
  ].sort();

  const statuses = [
    ...new Set(allProjects.map((project) => project.status).filter(Boolean)),
  ].sort();

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;
    option.textContent = category;

    categorySelect.appendChild(option);
  });

  statuses.forEach((status) => {
    const option = document.createElement("option");

    option.value = status;
    option.textContent = status;

    statusSelect.appendChild(option);
  });
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const count = document.getElementById("project-count");
  const empty = document.getElementById("projects-empty");

  const search = document
    .getElementById("project-search")
    .value.trim()
    .toLowerCase();

  const category = document.getElementById("project-category").value;
  const status = document.getElementById("project-status").value;

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      !search ||
      project.name?.toLowerCase().includes(search) ||
      project.description?.toLowerCase().includes(search) ||
      project.category?.toLowerCase().includes(search) ||
      project.technologies?.some((technology) =>
        technology.toLowerCase().includes(search),
      );

    const matchesCategory = category === "all" || project.category === category;

    const matchesStatus = status === "all" || project.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  grid.innerHTML = "";

  count.textContent = `${filteredProjects.length} of ${allProjects.length} projects`;

  empty.hidden = filteredProjects.length !== 0;
  grid.hidden = filteredProjects.length === 0;

  filteredProjects.forEach((project) => {
    grid.appendChild(createProjectCard(project));
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function createProjectCard(project) {
  const card = document.createElement("a");

  card.className = "project-card";
  card.href = siteUrl(
    `projects/project.html?id=${encodeURIComponent(project.id)}`,
  );

  const icon = document.createElement("div");
  icon.className = "project-card-icon";
  icon.textContent = project.icon || "📦";

  const content = document.createElement("div");
  content.className = "project-card-content";

  const heading = document.createElement("div");
  heading.className = "project-card-heading";

  const name = document.createElement("h3");
  name.textContent = project.name || "Untitled Project";

  const status = document.createElement("span");
  status.className = "project-status";
  status.textContent = project.status || "Unknown";

  heading.append(name, status);

  const description = document.createElement("p");
  description.className = "project-card-description";
  description.textContent = project.description || "No description available.";

  content.append(heading, description);

  if (project.technologies?.length) {
    const technologies = document.createElement("div");
    technologies.className = "project-card-technologies";

    project.technologies.slice(0, 4).forEach((technology) => {
      const tag = document.createElement("span");

      tag.className = "technology-tag";
      tag.textContent = technology;

      technologies.appendChild(tag);
    });

    content.appendChild(technologies);
  }

  const arrow = document.createElement("i");
  arrow.dataset.lucide = "arrow-up-right";
  arrow.className = "project-card-arrow";

  card.append(icon, content, arrow);

  return card;
}

document.addEventListener("DOMContentLoaded", initializeProjectsPage);
