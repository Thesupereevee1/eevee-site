async function initializeProjectPage() {
  console.log("[Project] Initializing project page...");

  // Start loading the project immediately.
  loadProjectDetails();

  // Load shared components independently.
  if (typeof loadComponents === "function") {
    try {
      await loadComponents();

      console.log("[Project] Shared components loaded.");

      if (typeof initializeTheme === "function") {
        initializeTheme();
      }

      const year = document.getElementById("current-year");

      if (year) {
        year.textContent = new Date().getFullYear();
      }
    } catch (error) {
      console.error("[Project] Component loading failed:", error);
    }
  }
}

async function loadProjectDetails() {
  const loading = document.getElementById("project-loading");
  const content = document.getElementById("project-content");
  const notFound = document.getElementById("project-not-found");

  try {
    console.log("[Project] Reading project ID...");

    const projectId = new URLSearchParams(window.location.search).get("id");

    if (!projectId) {
      throw new Error("No project ID was provided in the URL.");
    }

    console.log("[Project] Project ID:", projectId);
    console.log("[Project] Fetching projects.json...");

    const url = siteUrl("data/projects.json");

    console.log("[Project] JSON URL:", url);

    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`Failed to load projects.json: HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.projects)) {
      throw new Error("Invalid projects.json format.");
    }

    console.log("[Project] Projects loaded:", data.projects.length);

    const project = data.projects.find((item) => item.id === projectId);

    if (!project) {
      throw new Error(`Project "${projectId}" was not found.`);
    }

    console.log("[Project] Rendering:", project.name);

    renderProject(project);

    document.title = `${project.name} | TheSuperEevee`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = project.description || "";
    }

    loading.hidden = true;
    notFound.hidden = true;
    content.hidden = false;

    console.log("[Project] Project loaded successfully!");
  } catch (error) {
    console.error("[Project] Loading failed:", error);

    loading.hidden = true;
    content.hidden = true;
    notFound.hidden = false;

    const heading = notFound.querySelector("h1");
    const message = notFound.querySelector("p");

    heading.textContent = "Unable to load project";
    message.textContent = error.message;
  }
}

function renderProject(project) {
  setText("project-name", project.name);
  setText("project-description", project.description);
  setText("project-about", project.longDescription || project.description);
  setText("project-category", project.category);
  setText("project-status", project.status);

  const icon = document.getElementById("project-icon");

  if (icon) {
    icon.textContent = project.icon || "📦";
  }

  renderProjectLinks(project);
  renderTechnologies(project.technologies);
}

async function renderProjectLinks(project) {
  const container = document.getElementById("project-actions");

  container.replaceChildren();

  if (!project.links || Object.keys(project.links).length === 0) {
    showNoProjectLinks(container);
    return;
  }

  try {
    const response = await fetch(siteUrl("data/project-links.json"));

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const config = await response.json();

    if (!config.links) {
      throw new Error("Invalid project-links.json format.");
    }

    for (const [linkId, url] of Object.entries(project.links)) {
      const definition = config.links[linkId];

      if (!definition || typeof url !== "string") {
        continue;
      }

      let parsedUrl;

      try {
        parsedUrl = new URL(url);

        if (!["https:", "http:"].includes(parsedUrl.protocol)) {
          continue;
        }
      } catch {
        continue;
      }

      const link = document.createElement("a");

      link.className =
        definition.type === "primary" ? "button-primary" : "button-secondary";

      link.href = parsedUrl.href;
      link.rel = "noopener noreferrer";

      if (definition.target === "_blank") {
        link.target = "_blank";
      }

      // Create icon.
      const icon = createProjectLinkIcon(definition);

      // Create label.
      const label = document.createElement("span");
      label.textContent = definition.name || linkId;

      if (icon) {
        link.append(icon);
      }

      link.append(label);
      container.append(link);
    }

    if (container.children.length === 0) {
      showNoProjectLinks(container);
    }
    // Initialize Lucide icons.
    if (window.lucide) {
      lucide.createIcons({
        attrs: {
          class: "project-link-icon",
        },
      });
    }
  } catch (error) {
    console.error("Failed to load project links:", error);
    showNoProjectLinks(container);
  }
}

function createProjectLinkIcon(definition) {
  if (!definition.icon || !definition.iconLibrary) {
    return null;
  }

  // Lucide icons.
  if (definition.iconLibrary === "lucide") {
    const icon = document.createElement("i");

    icon.setAttribute("data-lucide", definition.icon);
    icon.className = "project-link-icon";

    return icon;
  }

  // Simple Icons.
  if (definition.iconLibrary === "simpleicons") {
    const icon = document.createElement("img");

    icon.className = "project-link-icon simple-icon";
    icon.src = `https://cdn.simpleicons.org/${encodeURIComponent(definition.icon)}`;
    icon.alt = "";
    icon.loading = "lazy";

    return icon;
  }

  console.warn(`Unknown icon library: ${definition.iconLibrary}`);

  return null;
}
function showNoProjectLinks(container) {
  const message = document.createElement("p");

  message.className = "project-no-links";
  message.textContent = "No project links available yet.";

  container.append(message);
}

function createProjectButton(text, url, className) {
  const link = document.createElement("a");

  link.className = className;
  link.href = url;
  link.textContent = text;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  return link;
}

function renderTechnologies(technologies) {
  const section = document.getElementById("technologies-section");
  const container = document.getElementById("project-technologies");

  container.replaceChildren();

  if (!Array.isArray(technologies) || technologies.length === 0) {
    section.hidden = true;
    return;
  }

  section.hidden = false;

  technologies.forEach((technology) => {
    const tag = document.createElement("span");

    tag.className = "technology-tag";
    tag.textContent = technology;

    container.append(tag);
  });
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value || "";
  }
}

// Start initialization when the document is ready.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeProjectPage, {
    once: true,
  });
} else {
  initializeProjectPage();
}
