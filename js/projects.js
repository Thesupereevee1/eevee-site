async function loadProjects() {
  try {
    const response = await fetch(siteUrl("data/projects.json"));

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.projects)) {
      throw new Error("Invalid projects.json format");
    }

    return data.projects;
  } catch (error) {
    console.error("Could not load projects:", error);
    return null;
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined && text !== null) {
    element.textContent = text;
  }

  return element;
}

function createProjectCard(project) {
  const card = createElement("a", "project-card");

  card.href = siteUrl(
    `projects/project.html?id=${encodeURIComponent(project.id)}`,
  );

  card.dataset.category = project.category || "";
  card.dataset.status = project.status || "";

  // Card header
  const header = createElement("div", "project-card-header");

  const icon = createElement("div", "project-icon", project.icon || "📦");

  const status = createElement(
    "span",
    `project-status status-${(project.status || "unknown")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
    project.status || "Unknown",
  );

  header.append(icon, status);

  // Project information
  const content = createElement("div", "project-card-content");

  const category = createElement(
    "div",
    "project-category",
    project.category || "Project",
  );

  const title = createElement("h3", "project-title", project.name);

  const description = createElement(
    "p",
    "project-description",
    project.description,
  );

  content.append(category, title, description);

  // Technology tags
  const technologies = createElement("div", "project-technologies");

  if (Array.isArray(project.technologies)) {
    project.technologies.forEach((technology) => {
      technologies.append(createElement("span", "technology-tag", technology));
    });
  }

  // Footer
  const footer = createElement("div", "project-card-footer");

  const githubInfo = createElement("span", "project-github-info");

  if (project.github) {
    githubInfo.textContent = "GitHub repository";
    githubInfo.dataset.github = project.github;
  } else {
    githubInfo.textContent = "Independent project";
  }

  const link = project.website || project.github;

  if (link) {
    const action = createElement("a", "project-link", "View project ↗");

    action.href = link;
    action.target = "_blank";
    action.rel = "noopener noreferrer";

    footer.append(githubInfo, action);
  } else {
    footer.append(githubInfo);
  }

  card.append(header, content, technologies, footer);

  return card;
}

function shuffleProjects(projects) {
  const shuffled = [...projects];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function shuffleProjects(projects) {
  const shuffled = [...projects];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function createProjectCarousel(container, projects) {
  container.replaceChildren();
  container.classList.add("project-carousel");

  const track = document.createElement("div");
  track.className = "project-carousel-track";

  const group = document.createElement("div");
  group.className = "project-carousel-group";

  // Create the original project cards.
  projects.forEach((project) => {
    group.append(createProjectCard(project));
  });

  track.append(group);
  container.append(track);

  let lastWidth = 0;

  function buildCarousel() {
    const containerWidth = container.clientWidth;

    if (!containerWidth) return;

    // Avoid rebuilding when the size hasn't meaningfully changed.
    if (Math.abs(containerWidth - lastWidth) < 40) return;
    lastWidth = containerWidth;

    // Remove old duplicated cards.
    group.replaceChildren();

    const originalCards = projects.map((project) => createProjectCard(project));

    originalCards.forEach((card) => group.append(card));

    // Repeat projects until the scrolling row is wider than the screen.
    let copies = 0;

    while (group.scrollWidth < containerWidth + 100 && copies < 100) {
      originalCards.forEach((card) => {
        group.append(card.cloneNode(true));
      });

      copies++;
    }

    // Create an identical second group for seamless looping.
    track.replaceChildren(group);

    const duplicate = group.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    duplicate.inert = true;

    track.append(duplicate);

    // Keep the scrolling speed consistent across different widths.
    const duration = Math.max(18, group.scrollWidth / 45);
    track.style.setProperty("--carousel-duration", `${duration}s`);
  }

  buildCarousel();

  // Rebuild the row when the browser is resized.
  if (container._projectCarouselObserver) {
    container._projectCarouselObserver.disconnect();
  }

  container._projectCarouselObserver = new ResizeObserver(buildCarousel);
  container._projectCarouselObserver.observe(container);
}

async function loadFeaturedProjects() {
  const container = document.getElementById("featured-projects");

  if (!container) return;

  const projects = await loadProjects();

  container.replaceChildren();

  if (!projects) {
    container.textContent = "Unable to load projects.";
    return;
  }

  const mode = SITE_CONFIG.projects.homepageMode;

  let displayedProjects;

  if (mode === "pinned") {
    displayedProjects = shuffleProjects(
      projects.filter((project) => project.pinned === true),
    ).slice(0, SITE_CONFIG.projects.pinnedCount);

    const grid = document.createElement("div");
    grid.className = "projects-grid";

    displayedProjects.forEach((project) => {
      grid.append(createProjectCard(project));
    });

    container.append(grid);
  } else if (mode === "all") {
    displayedProjects = projects;

    if (displayedProjects.length === 0) {
      container.textContent = "No projects available yet.";
      return;
    }

    createProjectCarousel(container, displayedProjects);
  } else {
    console.error("Unknown homepage project mode:", mode);
    return;
  }

  if (displayedProjects.length === 0) {
    container.textContent = "No pinned projects available.";
    return;
  }

  loadProjectGitHubStats(displayedProjects);
}

async function loadProjectGitHubStats(projects) {
  const requests = projects
    .filter((project) => project.github)
    .map(async (project) => {
      const stats = await fetchGitHubStats(project.github);

      if (!stats) return;

      const card = document.querySelector(
        `[data-github="${CSS.escape(project.github)}"]`,
      );

      if (!card) return;

      card.textContent = `★ ${formatNumber(stats.stars)} stars`;
    });

  await Promise.all(requests);
}
