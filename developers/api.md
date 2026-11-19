# API Reference

Reference documentation for the TheSuperEevee JavaScript API.

## Configuration

### `window.SITE_CONFIG`

Website-wide configuration object.

**Type:** `object`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Website name |
| `basePath` | `string` | Base path for URLs (e.g., `/`, `/TheSuperEevee/`) |
| `github` | `string` | GitHub repository URL |
| `description` | `string` | Website description |
| `projects` | `object` | Project-specific configuration |

**Example:**

```javascript
window.SITE_CONFIG = {
  name: "TheSuperEevee",
  basePath: "/",
  github: "https://github.com/Thesupereevee1",
  description: "Software, projects, experiments, and open-source development.",
};
```

---

### `window.siteUrl(path)`

Returns a full URL for a relative path.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `path` | `string` | Yes | Relative path (e.g., `data/projects.json`) |

**Returns:** A string containing the full URL

**Example:**

```javascript
const url = siteUrl("data/projects.json");
// Returns: "/data/projects.json" (or "/TheSuperEevee/data/projects.json")
```

---

## Project System

### `loadProjects()`

Asynchronously loads projects from `data/projects.json`.

**Returns:** `Promise<Array>` — Array of project objects or `null` on error

**Project Object Structure:**

```javascript
{
  id: string;              // Unique identifier
  name: string;            // Project name
  description: string;     // Short description
  category: string;        // Project category
  status: string;          // Development status
  featured?: boolean;      // Whether to display on homepage
  icon: string;            // Emoji icon
  technologies?: string[]; // Array of technology names
  links?: object;          // Object of link types to URLs
}
```

---

## Projects Page

### `initializeProjectsPage()`

Initializes the projects page with shared components, theme, and project data.

**No parameters.**

**Automatically called** on page load.

---

### `initializeProjectFilters()`

Sets up filter event listeners for search, category, and status.

**No parameters.**

**Automatically called** by `initializeProjectsPage()`.

---

## Project Detail

### `initializeProjectPage()`

Initializes the project detail page.

**No parameters.**

**Automatically called** on page load. Loads project ID from URL query parameter.

---

### `loadProjectDetails()`

Loads and displays the project specified in the URL.

**No parameters.**

**Automatically called** by `initializeProjectPage()`.

---

## Software Page

### `initializeSoftwarePage()`

Initializes the software page with shared components.

**No parameters.**

**Automatically called** on page load.

---

### `renderSoftware(software)`

Renders an array of software items to the DOM.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `software` | `Array` | Yes | Array of software objects |

**Software Object Structure:**

```javascript
{
  id: string;              // Unique identifier
  name: string;            // Software name
  description: string;     // Description
  version?: string;        // Version number
  category: string;        // Category
  status: string;          // Status
  icon: string;            // Emoji icon
  platforms?: string[];    // Array of platforms
  technologies?: string[]; // Array of technologies
  links?: object;          // Object of link types to URLs
}
```

---

## Code Page

### `initializeCodePage()`

Initializes the code page with shared components.

**No parameters.**

**Automatically called** on page load.

---

### `renderCode(projects)`

Renders a subset of projects as code listings.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projects` | `Array` | Yes | Array of project objects |

**Excludes:** Projects with category "Application" that are Launcher, Mod Manager, Decompiler, or Website

---

## Updates

### `loadUpdates()`

Asynchronously loads updates from `data/updates.json`.

**No parameters.**

**Returns:** `<div>` element containing the updates list

**Update Object Structure:**

```javascript
{
  id: string;              // Unique identifier
  title: string;           // Update title
  description: string;     // Update description
  date: string;            // Date in YYYY-MM-DD format
  category?: string;       // Category
  url?: string;            // External link
}
```

---

### `formatUpdateDate(date)`

Formats a date string for display.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date` | `string` | Yes | Date in YYYY-MM-DD format |

**Returns:** Formatted date string (e.g., "Nov 17, 2026")

---

## GitHub Integration

### `getGitHubRepository(url)`

Parses a GitHub repository URL and extracts owner and repo.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | GitHub repository URL |

**Returns:** Object with `owner` and `repo` properties, or `null` if invalid

---

### `fetchGitHubStats(url)`

Retrieves GitHub repository statistics via the GitHub API.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | `string` | Yes | GitHub repository URL |

**Returns:** Object with `stars`, `forks`, `language`, `updated` properties, or `null` on failure

**Caching:** Results are cached in-memory

---

### `formatNumber(number)`

Formats a number for display (e.g., "1.2k", "1.5M").

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `number` | `number` | Yes | Number to format |

**Returns:** Formatted string

---

## Shared Components

### `loadComponent(elementId, file)`

Loads an HTML component file.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `elementId` | `string` | Yes | DOM element ID to populate |
| `file` | `string` | Yes | Relative path to component file |

**No return value.**

---

### `loadComponents()`

Loads all shared components (header and footer).

**No parameters.**

**Returns:** `Promise<void>`

---

## Theme System

### `THEME_KEY`

Browser storage key for theme preference.

```
 location: window.localStorage
 key: "thesupereevee-theme"
```

---

### `getPreferredTheme()`

Determines the preferred theme based on saved preference and system settings.

**No parameters.**

**Returns:** `"light"` or `"dark"`

---

### `setTheme(theme)`

Sets the current theme and saves it to localStorage.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `theme` | `string` | Yes | `"light"` or `"dark"` |

**No parameters.**

**No return.**

---

### `initializeTheme()`

Initializes the theme system and sets up the theme toggle button.

**No parameters.**

**No return.**

---

## Helper Functions

### `createElement(tag, className, text)`

Creates a DOM element.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tag` | `string` | Yes | HTML tag name |
| `className` | `string` | No | CSS class name(s) |
| `text` | `string` | No | Text content |

**Returns:** DOM element

---

### `setText(id, value)`

Sets the text content of an element by ID.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | Element ID |
| `value` | `string` | No | Text content |

**No return.**

---

### `shuffleProjects(projects)`

Shuffles an array of projects in place.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `projects` | `Array` | Yes | Array of project objects |

**Returns:** Shuffled array

---

## System Initialization

### `initializeSite()`

Initializes the website by loading components, setting up theme, and loading homepage data.

**No parameters.**

**Automatically called** on page load.

---

## Lucide Icons

The website uses Lucide for icon rendering.

**Library URL:** `https://unpkg.com/lucide@latest`

**Initialization:**

```javascript
if (window.lucide) {
  lucide.createIcons();
}
```

**Example:**

```html
<i data-lucide="search"></i>
```

---

## Responsive Design

The website uses CSS variables defined in `css/variables.css`:

- `--content-width`: Container width (1200px)
- `--radius-small`, `--radius-medium`, `--radius-large`: Border radii
- `--transition`: Animation duration (180ms)

### Theme Variables

**Light:**

- `--background`: #f5f5f7
- `--surface`: #ffffff
- `--text`: #18181b
- `--accent`: #8256d0

**Dark:**

- `--background`: #111217
- `--surface`: #191a22
- `--text`: #f4f4f5
- `--accent`: #a78bfa