# AGENTS.md

# TheSuperEevee — Project Instructions

## 1. Project Overview

TheSuperEevee is a personal developer website and project portfolio.

It showcases:

- Software and applications
- Open-source projects
- Development experiments
- Programming projects
- Documentation
- Updates and announcements
- Information about the developer

The website should feel like a professional software development platform, not a generic personal blog.

The website is hosted using GitHub Pages.

## 2. Primary Goals

When developing this website, prioritize:

1. Professional visual design.
2. Consistent UI across every page.
3. Excellent usability and navigation.
4. Responsive layouts for desktop, tablet, and mobile.
5. Maintainable and reusable code.
6. Fast loading and minimal dependencies.
7. Accessibility.
8. Subtle, polished animations.
9. Dynamic content loaded from JSON.
10. A consistent light and dark theme.

## 3. Technology Stack

Use:

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- GitHub Pages

Do NOT introduce:

- React
- Vue
- Angular
- Next.js
- Node.js backend
- PHP
- Database servers
- Build systems
- Unnecessary frameworks

The website must work as a static website.

External libraries are allowed when they provide meaningful functionality.

Preferred icon libraries:

- Lucide
- Simple Icons

Avoid adding dependencies just for minor functionality.

## 4. Design Direction

The overall design should be:

- Modern
- Minimal
- Technical
- Professional
- Clean
- Developer-oriented
- Consistent
- Visually interesting without being cluttered

Take inspiration from the design quality and usability of:

- GitHub
- Linear
- Vercel
- Stripe
- Raycast
- Modern developer documentation websites

Do not directly copy their designs.

### Layout

Use a mixture of:

- Grid layouts
- Flexible card layouts
- Horizontal scrolling sections
- Content sections
- Navigation bars
- Hero sections
- Information panels

Avoid making every page look identical.

Each page should have a layout appropriate to its content while sharing the same design language.

### Spacing

Use consistent spacing throughout the website.

Prefer a spacing scale based on:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px
- 80px

Avoid arbitrary spacing values unless necessary.

### Cards

Cards should:

- Have consistent padding.
- Use the site's surface colors.
- Have subtle borders.
- Use consistent border radii.
- Have clear visual hierarchy.
- Use subtle hover effects where appropriate.
- Never feel excessively decorated.

### Buttons

Buttons should have:

- Clear labels.
- Consistent sizing.
- Appropriate hover states.
- Focus-visible states.
- Consistent border radii.

Use primary, secondary, and text-style buttons appropriately.

### Animations

Use subtle animations.

Examples:

- Slight card movement on hover.
- Smooth color transitions.
- Navigation transitions.
- Subtle loading animations.
- Small icon animations.

Avoid:

- Excessive bouncing.
- Large distracting animations.
- Unnecessary parallax.
- Animations that interfere with usability.

Respect `prefers-reduced-motion`.

## 5. Color System

Use CSS variables.

The existing website uses:

### Light Theme

- Background: #f5f5f7
- Surface: #ffffff
- Secondary surface: #eeeeF2
- Primary text: #18181b
- Secondary text: #71717a
- Border: #e4e4e7
- Accent: #8256d0

### Dark Theme

- Background: #111217
- Surface: #191a22
- Secondary surface: #22232d
- Primary text: #f4f4f5
- Secondary text: #a1a1aa
- Border: #30313c
- Accent: #a78bfa

Use the existing variables from `css/variables.css`.

Do not hardcode colors throughout individual stylesheets.

If a new color is needed, add an appropriate CSS variable.

### Theme Support

Every page must support light and dark mode.

Use the existing theme implementation.

Do not create separate theme systems for individual pages.

Do not break the theme toggle or saved theme preference.

## 6. Project Architecture

Existing structure:

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
├── doc.html
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

You may introduce additional files and folders when they improve organization.

Do not unnecessarily reorganize the existing project.

## 7. Shared Components

Shared components are located in `components/`.

Currently:

- `header.html`
- `footer.html`

They are loaded dynamically using `js/components.js`.

Use the existing component loader when adding shared components.

Do not duplicate the header or footer across individual pages.

Navigation links should use the existing `data-route` attribute.

Example:

```html
<a data-route="projects/index.html">Projects</a>
```

## 8. Routing and Base Paths

The website uses `js/config.js`.

The current configuration:

```javascript
window.SITE_CONFIG = {
  name: "TheSuperEevee",
  basePath: "/TheSuperEevee/",
  github: "https://github.com/Thesupereevee1",
  description: "Software, projects, experiments, and open-source development.",
};
```

Internal paths should use:

```javascript
siteUrl("projects/index.html");
```

Do not hardcode root-relative URLs throughout the website.

Do not introduce a `<base>` element.

Remember that GitHub Pages project sites may use `/TheSuperEevee/`, while user sites and custom domains may use `/`.

## 9. Dynamic Data

Project, software, update, and link information should be managed using JSON.

Relevant files:

- `data/projects.json`
- `data/software.json`
- `data/updates.json`
- `data/project-links.json`

Fetch JSON using JavaScript.

Example:

```javascript
const response = await fetch(siteUrl("data/projects.json"));

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

Do not hardcode project information into HTML or JavaScript.

When adding functionality, prefer extending the existing JSON structures.

Always validate data before rendering it.

Handle missing fields gracefully.

Do not allow invalid or missing JSON to break an entire page.

## 10. Project System

Projects are stored in `data/projects.json`.

Project detail pages use:

```text
projects/project.html?id=PROJECT_ID
```

The project detail page dynamically loads the requested project.

Project links are defined through:

`data/project-links.json`

Each project should be able to provide links such as:

- GitHub
- Website
- Documentation
- Download
- Modrinth
- CurseForge
- Discord

Link definitions should control:

- Display name
- Icon
- Icon library
- Button type
- Link target

Support Lucide and Simple Icons.

Do not hardcode project-specific link definitions in the rendering code.

## 11. JavaScript Standards

Write clean, readable JavaScript.

Prefer:

- `const` by default.
- `let` when reassignment is needed.
- `async` / `await`.
- Small reusable functions.
- Descriptive variable names.
- Explicit error handling.
- DOM APIs for dynamically created elements.

Avoid:

- Unnecessary global variables.
- Duplicate functions.
- Excessively complicated abstractions.
- Unnecessary dependencies.
- Silent failures.
- Unnecessary `innerHTML` with untrusted content.

Use `textContent` when inserting plain text.

Check whether DOM elements exist before accessing them when appropriate.

Avoid initializing the same event listeners multiple times.

## 12. HTML Standards

Use semantic HTML.

Prefer:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`
- `<button>`
- `<a>`

Every page should have:

- A meaningful title.
- A meta description.
- A responsive viewport.
- Appropriate heading hierarchy.
- Accessible labels for controls.

Do not use clickable `<div>` elements when a button or link is appropriate.

## 13. CSS Standards

Organize CSS by responsibility.

- `variables.css`: Design tokens and theme variables.
- `reset.css`: Browser resets and global defaults.
- `components.css`: Shared UI components.
- `pages.css`: Page-specific styling.
- `main.css`: Imports the other stylesheets.

Use reusable classes.

Avoid excessive selector specificity.

Avoid inline styles unless there is a strong reason.

Use responsive CSS rather than creating separate mobile pages.

Use CSS Grid and Flexbox appropriately.

## 14. Accessibility

Always consider:

- Keyboard navigation.
- Visible focus indicators.
- Sufficient text contrast.
- Descriptive link labels.
- Accessible form labels.
- Appropriate image alt text.
- Reduced-motion preferences.
- Semantic HTML.

Do not rely exclusively on color to communicate information.

## 15. Responsive Design

The website must work at:

- Small mobile screens.
- Large mobile screens.
- Tablets.
- Laptops.
- Desktop monitors.
- Wide monitors.

Avoid fixed-width layouts that overflow smaller screens.

Use:

- `minmax()`
- `clamp()`
- `min()`
- `max()`
- `max-width`
- Responsive grid layouts

Test layouts at multiple screen sizes.

## 16. GitHub Integration

The website may retrieve public GitHub information using the GitHub API.

Use unauthenticated public API access.

Do not:

- Add personal access tokens.
- Expose credentials.
- Commit secrets.
- Assume every repository exists.
- Assume every API request succeeds.

Handle rate limits and API errors gracefully.

The GitHub URL is:

https://github.com/Thesupereevee1

## 17. Development Rules

Before modifying files:

1. Inspect the existing implementation.
2. Understand how the relevant page works.
3. Reuse existing functionality.
4. Avoid replacing working systems unnecessarily.
5. Check whether a shared component already exists.

When implementing a feature:

1. Make the feature fully functional.
2. Maintain existing functionality.
3. Follow the established design system.
4. Handle loading and error states.
5. Make it responsive.
6. Check for console errors.
7. Check for broken internal links.

Do not create placeholder functionality and claim it works.

Do not remove existing features without a reason.

Do not invent project information, URLs, or repository names.

## 18. OpenCode Instructions

Act as an experienced frontend developer and UI/UX designer.

When asked to build a page:

- Design the page before implementing it.
- Consider its purpose and content hierarchy.
- Use the existing design system.
- Make it visually polished.
- Ensure it works on mobile and desktop.
- Integrate it with existing shared components.

When asked to improve a design:

- Inspect the current design first.
- Identify inconsistencies.
- Improve spacing, hierarchy, typography, and layout.
- Avoid unnecessary redesigns of unrelated pages.

When asked to fix a bug:

- Find the actual cause.
- Fix the underlying issue.
- Avoid unrelated changes.
- Explain what was changed.

When asked to add a feature:

- Integrate it into the existing architecture.
- Reuse existing code when possible.
- Update JSON structures if necessary.
- Update documentation when appropriate.

Do not stop at a visual mockup when functional implementation is requested.

## 19. Final Quality Checklist

Before considering work complete, verify:

- [ ] No JavaScript errors.
- [ ] No broken internal links.
- [ ] No missing assets.
- [ ] Light theme works.
- [ ] Dark theme works.
- [ ] Mobile layout works.
- [ ] Desktop layout works.
- [ ] Loading states work.
- [ ] Error states work.
- [ ] Existing functionality remains intact.
- [ ] JSON data is handled safely.
- [ ] No secrets or credentials are exposed.

The goal is to make TheSuperEevee feel like a cohesive, polished developer platform.
