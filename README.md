# TheSuperEevee

A personal developer platform showcasing software, open-source projects, programming experiments, and development work.

TheSuperEevee is designed to be a central place to discover projects, explore software, access documentation, and follow development updates.

## Features

- Modern developer-focused design
- Light and dark themes
- Responsive layouts
- Dynamic project listings
- Individual project detail pages
- JSON-driven content
- Project categories and filtering
- GitHub integration using the public API
- Shared navigation and footer components
- Lucide and Simple Icons support
- Static hosting through GitHub Pages

## Technology

Built with:

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- GitHub API

No frontend framework or backend server is required.

## Project Structure

```text
TheSuperEevee/
├── AGENTS.md
├── DESIGN.md
├── README.md
├── VISION.md
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

The structure may evolve as the website grows.

## Running Locally

Because the website loads JSON files and shared HTML components using `fetch()`, it should be served through a local HTTP server.

### Python

```bash
python -m http.server 8000
```

Then open:

http://localhost:8000/

Alternatively, use the Live Server extension in Visual Studio Code.

Do not open `index.html` directly using `file://`.

## Configuration

Website configuration is stored in:

`js/config.js`

Example:

```javascript
window.SITE_CONFIG = {
  name: "TheSuperEevee",
  basePath: "/",
  github: "https://github.com/Thesupereevee1",
  description: "Software, projects, experiments, and open-source development.",
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

Most website content is managed through JSON.

### Projects

File: `data/projects.json`

Contains project information such as:

- ID
- Name
- Description
- Category
- Status
- Icon
- Technologies
- Links
- Pinned status

Individual project pages use the project's ID.

Example URL:

```text
/projects/project.html?id=oplo-decompiler
```

### Project Links

File: `data/project-links.json`

Defines available link types and their:

- Names
- Icons
- Icon libraries
- Button styles
- Link targets

### Software

File: `data/software.json`

Contains software listings and related information.

### Updates

File: `data/updates.json`

Contains development updates and announcements.

## GitHub Integration

The website can retrieve public repository information using the GitHub API.

No personal access token should be committed or exposed.

Unauthenticated API requests are subject to GitHub rate limits.

## Design

The website supports light and dark themes.

Its design system is documented in:

`DESIGN.md`

The long-term direction is documented in:

`VISION.md`

Development instructions for AI coding agents are documented in:

`AGENTS.md`

## Hosting

The website is designed for GitHub Pages.

It does not require:

- A backend
- A database server
- A Node.js runtime
- A server-side application

## Development

When contributing:

1. Inspect the existing architecture.
2. Follow `AGENTS.md`.
3. Follow `DESIGN.md`.
4. Preserve existing functionality.
5. Test light and dark themes.
6. Test desktop and mobile layouts.
7. Check the browser console for errors.

## License

Add the project's chosen license here before distributing or accepting contributions.
