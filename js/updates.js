async function loadUpdates() {
  const container = document.getElementById("latest-updates");

  if (!container) return;

  try {
    const response = await fetch(siteUrl("data/updates.json"));

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data.updates)) {
      throw new Error("Invalid updates.json format");
    }

    container.replaceChildren();

    const updates = data.updates
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4);

    if (updates.length === 0) {
      container.append(createElement("p", "empty-state", "No updates yet."));
      return;
    }

    const list = createElement("div", "updates-list");

    updates.forEach((update) => {
      const item = createElement("article", "update-item");

      const marker = createElement("div", "update-marker");

      const content = createElement("div", "update-content");

      const metadata = createElement("div", "update-metadata");

      const date = createElement(
        "time",
        "update-date",
        formatUpdateDate(update.date),
      );

      const category = createElement(
        "span",
        "update-category",
        update.category || "Update",
      );

      metadata.append(date, category);

      const title = createElement("h3", "update-title", update.title);

      const description = createElement(
        "p",
        "update-description",
        update.description,
      );

      content.append(metadata, title, description);

      item.append(marker, content);

      if (update.url) {
        const link = createElement("a", "update-link", "Read more ↗");

        link.href = update.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        content.append(link);
      }

      list.append(item);
    });

    container.append(list);
  } catch (error) {
    console.error("Could not load updates:", error);

    container.replaceChildren(
      createElement("p", "load-error", "Updates couldn't be loaded."),
    );
  }
}

function formatUpdateDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const parsed = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}
