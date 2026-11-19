# Developer Setup

This guide covers setting up a local development environment for TheSuperEevee.

## Prerequisites

- A web browser
- Python 3 (or any local HTTP server)
- A code editor

## Running Locally

The website loads JSON files and shared HTML components using `fetch()`. It must be served through a local HTTP server.

### Using Python

```bash
python -m http.server 8000
```

Then open:

```
http://localhost:8000/
```

### Using VS Code Live Server

Install the Live Server extension and open `index.html`.

## Project Structure

```text
TheSuperEevee/
├── index.html
├── projects/
│   ├── index.html
│   └── project.html
├── software/
│   └── index.html
├── code/
│   └── index.html
├── docs/
│   └── index.html
├── about/
│   └── index.html
├── components/
│   ├── header.html
│   └── footer.html
├── css/
│   ├── variables.css
│   ├── reset.css
│   ├── main.css
│   ├── components.css
│   └── pages.css
├── js/
│   ├── config.js
│   ├── components.js
│   ├── main.js
│   ├── theme.js
│   ├── projects.js
│   ├── projects-page.js
│   ├── updates.js
│   ├── github.js
│   └── project-detail.js
├── data/
│   ├── projects.json
│   ├── software.json
│   ├── updates.json
│   └── project-links.json
└── assets/
    ├── images/
    ├── icons/
    └── fonts/
```

## Configuration

Website configuration is stored in `js/config.js`.

```javascript
window.SITE_CONFIG = {
  name: "TheSuperEevee",
  basePath: "/",
  github: "https://github.com/Thesupereevee1",
  description: "Software, projects, experiments, and open-source development.",
  projects: {
    homepageMode: "all",
    pinnedCount: 4,
  },
};

window.siteUrl = function (path = "") {
  const base = window.SITE_CONFIG.basePath;
  return base + path.replace(/^\/+/, "");
};
```

For a GitHub Pages project site, configure `basePath` to match the repository path:

```javascript
basePath: "/TheSuperEevee/";
```

For a root domain or local server:

```javascript
basePath: "/";
```

## Content Management

Most website content is managed through JSON files in `data/`.

### Projects

File: `data/projects.json`

Each project can include:

- `id` — Unique identifier
- `name` — Project name
- `description` — Short description
- `category` — Project category
- `status` — Development status
- `icon` — Emoji icon
- `technologies` — Array of technology names
- `links` — Object of link types to URLs
- `pinned` — Whether to feature on the homepage

Project detail pages use the project's ID:

```
projects/project.html?id=oplojdecom
```

### Project Links

File: `data/project-links.json`

Defines available link types and their:

- `name` — Display name
- `icon` — Icon identifier
- `iconLibrary` — `lucide` or `simpleicons`
- `type` — `primary` or `secondary`
- `target` — Link target

### Software

File: `data/software.json`

Contains software listings with name, description, version, platforms, technologies, and links.

### Updates

File: `data/updates.json`

Contains development updates with title, description, date, and category.

## Development Workflow

1. Edit JSON files to add or update content
2. Edit HTML pages if layout changes are needed
3. Test locally using a HTTP server
4. Verify light and dark themes
5. Test on mobile and desktop
6. Check the browser console for errors

## GitHub Integration

The website retrieves public repository information using the GitHub API.

- No personal access token should be committed or exposed
- Unauthenticated API requests are subject to GitHub rate limits
- API errors are handled gracefully and do not break the page

## Design System

The design system is documented in `DESIGN.md`.

The long-term direction is documented in `VISION.md`.

Development instructions for AI coding agents are documented in `AGENTS.md`.