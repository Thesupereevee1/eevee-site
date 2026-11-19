# Developer Guidelines

Guidelines for developing and contributing to TheSuperEevee.

## Principles

### Keep It Lightweight

The website should remain fast and efficient.

- Prefer native browser functionality
- Avoid adding large frameworks when simple HTML, CSS, and JavaScript are sufficient
- Minimize dependencies

### Static First

The website should work without requiring a custom backend.

- GitHub Pages should remain a viable hosting option
- Public APIs can provide additional functionality where appropriate
- All content should load via standard HTTP requests

### Data-Driven

Project and software information should be stored separately from presentation.

- JSON should be the primary content source for structured listings
- This makes content easier to update and allows the same data to be reused across multiple pages

### Modular

- Shared components should be reused
- Individual pages should remain independent where possible
- Avoid unnecessary code duplication

### Maintainable

The codebase should be understandable and easy to extend.

- New features should fit into the existing architecture
- Avoid introducing unnecessary complexity
- Write clean, readable JavaScript

---

## Code Style

### JavaScript

Prefer:

- `const` by default
- `let` when reassignment is needed
- `async` / `await`
- Small reusable functions
- Descriptive variable names
- Explicit error handling
- DOM APIs for dynamically created elements

Avoid:

- Unnecessary global variables
- Duplicate functions
- Excessively complicated abstractions
- Unnecessary dependencies
- Silent failures
- Unnecessary `innerHTML` with untrusted content

### HTML

Use semantic HTML.

Prefer:

- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<a>`

Every page should have:

- A meaningful title
- A meta description
- A responsive viewport
- Appropriate heading hierarchy
- Accessible labels for controls

### CSS

Organize CSS by responsibility:

- `variables.css`: Design tokens and theme variables
- `reset.css`: Browser resets and global defaults
- `components.css`: Shared UI components
- `pages.css`: Page-specific styling
- `main.css`: Imports the other stylesheets

Use reusable classes, avoid excessive selector specificity, and avoid inline styles unless there is a strong reason.

---

## JSON Structure

### Guidelines

- Validate data before rendering
- Handle missing fields gracefully
- Never allow invalid or missing JSON to break an entire page
- Use meaningful keys with proper capitalization

### projects.json

Each project should have:

```json
{
  "id": "unique-identifier",
  "name": "Project Name",
  "description": "Short description",
  "category": "Category Name",
  "status": "Status",
  "icon": "📦",
  "technologies": ["Technology 1", "Technology 2"],
  "links": {
    "github": "https://github.com/user/repo",
    "website": "https://example.com"
  },
  "pinned": false
}
```

---

## Development Workflow

### Before Modifying Files

1. Inspect the existing implementation
2. Understand how the relevant page works
3. Reuse existing functionality
4. Check whether a shared component already exists

### Implementing a Feature

1. Make the feature fully functional
2. Maintain existing functionality
3. Follow the established design system
4. Handle loading and error states
5. Make it responsive
6. Check for console errors
7. Check for broken internal links

### Testing Checklist

Before considering work complete:

- [ ] No JavaScript errors
- [ ] No broken internal links
- [ ] No missing assets
- [ ] Light theme works
- [ ] Dark theme works
- [ ] Mobile layout works
- [ ] Desktop layout works
- [ ] Loading states work
- [ ] Error states work
- [ ] Existing functionality remains intact

---

## Common Tasks

### Adding a New Project

1. Add the project to `data/projects.json`
2. If the project has external links, add them to `data/project-links.json` (if needed)
3. Ensure the project has a meaningful `id` for the URL
4. Test the project detail page: `projects/project.html?id=project-id`

### Adding a New Page

1. Create the HTML file in the appropriate folder (e.g., `newpage/index.html`)
2. Include shared components: `<script src="../js/components.js"></script>`
3. Include the theme initialization script
4. Load data using `siteUrl()` for paths
5. Render content dynamically using JavaScript

### Styling a Page

1. Add page-specific styles to `css/pages.css`
2. Use CSS variables from `css/variables.css`
3. Follow the spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 80px, 96px)
4. Test both light and dark themes
5. Ensure responsive design works at multiple screen sizes

### Loading Data

Use `fetch()` with `siteUrl()`:

```javascript
async function loadData() {
  const response = await fetch(siteUrl("data/projects.json"));

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  // Use the data
}
```

---

## GitHub Integration

### Information Retrieval

The website retrieves public repository information using the GitHub API.

### Security Practices

- Never authenticate or use personal access tokens
- Never expose credentials in the codebase
- Never commit secrets or tokens
- Handle API rate limits and errors gracefully

### Rate Limits

Unauthenticated API requests are subject to GitHub rate limits. The website caches results in-memory to reduce API calls.

---

## Design System

The design system is documented in `DESIGN.md`.

Design principles:

- Clarity over decoration
- Consistency over unnecessary variety
- Functionality over visual gimmicks
- Subtle animations over distracting effects
- Strong typography and spacing
- Clear visual hierarchy

---

## Architecture Overview

### Entry Points

- `index.html` — Homepage
- `projects/index.html` — Projects catalog
- `projects/project.html?id=` — Project details
- `software/index.html` — Software listings
- `code/index.html` — Code and libraries
- `docs/index.html` — Documentation
- `about/index.html` — About page

### Data Sources

- `data/projects.json` — Project catalog
- `data/software.json` — Software listings
- `data/updates.json` — Development updates
- `data/project-links.json` — Link type definitions

### Core JavaScript Files

- `js/config.js` — Website configuration
- `js/components.js` — Component loader
- `js/theme.js` — Theme management
- `js/projects.js` — Project-related functions
- `js/projects-page.js` — Projects page logic
- `js/project-detail.js` — Project detail page logic
- `js/software.js` — Software page logic
- `js/code.js` — Code page logic (if exists)
- `js/updates.js` — Updates feed logic
- `js/github.js` — GitHub API integration

### CSS Organization

- `css/variables.css` — Theme variables and design tokens
- `css/reset.css` — Browser resets
- `css/components.css` — Shared UI components
- `css/pages.css` — Page-specific styles
- `css/main.css` — Imports all stylesheets

---

## Linting and Formatting

While there's no automated linter configured yet, follow these practices:

- Use consistent indentation (2 or 4 spaces)
- Avoid mixed tabs and spaces
- Keep lines under 100 characters when possible
- Use descriptive, camelCase for variables and functions
- Use PascalCase for component names
- Use UPPER_CASE for constants

---

## Additional Resources

- `README.md` — Complete project documentation
- `DESIGN.md` — Detailed design system
- `VISION.md` — Long-term vision and roadmap
- `AGENTS.md` — Instructions for AI coding agents

---

## Getting Help

For questions, issues, or contributions:

1. Check this guide first
2. Review the existing code for patterns
3. Examine the design system documentation
4. Visit the [GitHub repository](https://github.com/Thesupereevee1)