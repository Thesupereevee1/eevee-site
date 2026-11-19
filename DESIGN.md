# TheSuperEevee — Design System

## 1. Design Philosophy

TheSuperEevee should look and feel like a modern software development platform.

The design should communicate:

- Technical expertise
- Creativity
- Reliability
- Simplicity
- Attention to detail
- Open-source development

The website should feel like a combination of a developer portfolio, software platform, and project hub.

It should not look like a generic portfolio template.

### Design Principles

1. Clarity over decoration.
2. Consistency over unnecessary variety.
3. Functionality over visual gimmicks.
4. Subtle animations over distracting effects.
5. Strong typography and spacing.
6. Clear visual hierarchy.
7. Responsive layouts everywhere.

## 2. Visual Inspiration

Use the following websites as design-quality references:

- Linear — clean layouts, typography, and subtle interactions.
- Vercel — modern developer-oriented presentation.
- GitHub — project organization and information density.
- Raycast — polished interfaces and attention to detail.
- Stripe — typography, layout, and visual hierarchy.

These are references, not templates to copy.

TheSuperEevee must have its own recognizable visual identity.

## 3. Color Palette

Use CSS variables defined in `css/variables.css`.

### Light Theme

| Variable       | Color     | Purpose                |
| -------------- | --------- | ---------------------- |
| Background     | `#f5f5f7` | Main page background   |
| Surface        | `#ffffff` | Cards and panels       |
| Secondary      | `#eeeeF2` | Secondary surfaces     |
| Text           | `#18181b` | Main text              |
| Text Secondary | `#71717a` | Muted text             |
| Border         | `#e4e4e7` | Borders and separators |
| Accent         | `#8256d0` | Interactive highlights |

### Dark Theme

| Variable       | Color     | Purpose                |
| -------------- | --------- | ---------------------- |
| Background     | `#111217` | Main page background   |
| Surface        | `#191a22` | Cards and panels       |
| Secondary      | `#22232d` | Secondary surfaces     |
| Text           | `#f4f4f5` | Main text              |
| Text Secondary | `#a1a1aa` | Muted text             |
| Border         | `#30313c` | Borders and separators |
| Accent         | `#a78bfa` | Interactive highlights |

### Color Rules

- Use the accent color sparingly.
- Avoid excessive gradients.
- Avoid using many unrelated accent colors.
- Use semantic colors for success, warning, and error states.
- Maintain sufficient contrast.
- Never hardcode theme-specific colors in page styles.

## 4. Typography

Typography should be clean, modern, and highly readable.

Preferred font stack:

```css
font-family:
  Inter,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Use a clear hierarchy:

| Element         | Suggested Size |
| --------------- | -------------- |
| Hero heading    | 48–72px        |
| Page heading    | 40–56px        |
| Section heading | 24–32px        |
| Card heading    | 16–20px        |
| Body text       | 14–17px        |
| Small metadata  | 12–14px        |

Use font weight intentionally.

Avoid excessively thin text and unnecessarily heavy headings.

Use `clamp()` for responsive headings.

## 5. Layout System

Use a consistent content width.

Suggested maximum content width:

```css
--content-width: 1200px;
```

Use centered content containers.

Prefer CSS Grid for:

- Project cards
- Software listings
- Documentation layouts
- Dashboard-like sections

Prefer Flexbox for:

- Navigation
- Button groups
- Toolbars
- Small horizontal layouts

Avoid fixed widths when they can cause overflow.

### Spacing Scale

Use multiples of 4px:

- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px
- 80px
- 96px

Larger sections should have more breathing room.

## 6. Components

### Navigation

The navigation should be:

- Clean
- Compact
- Easy to understand
- Consistent across pages

Use clear active states.

Avoid excessive navigation items.

The header should work on mobile.

### Cards

Cards should have:

- Surface backgrounds
- Subtle borders
- Consistent padding
- Moderate corner radii
- Clear content hierarchy

Recommended radius:

- Small elements: 6–8px
- Inputs and buttons: 8–10px
- Cards: 12–16px
- Large panels: 16–20px

Hover states should be subtle.

Cards should not have excessive shadows.

### Buttons

Support:

- Primary
- Secondary
- Outline
- Text

Buttons should have:

- Consistent height
- Clear labels
- Keyboard focus states
- Hover states
- Disabled states

### Inputs

Inputs should:

- Have clear labels or accessible names.
- Use consistent borders and backgrounds.
- Provide visible focus states.
- Have readable placeholder text.
- Fit the surrounding layout.

### Badges

Use badges for:

- Project status
- Categories
- Version information
- Small metadata

Do not overuse badges.

## 7. Icons

Use:

### Lucide

For general interface icons:

- Search
- Settings
- Arrow icons
- Navigation
- External links
- Documentation
- UI controls

### Simple Icons

For brand and platform icons:

- GitHub
- Discord
- Modrinth
- CurseForge
- Other recognizable services

Icons should:

- Have consistent dimensions.
- Align with text.
- Use appropriate accessible labels.
- Never replace important text labels.

## 8. Motion and Interactions

Animations should be subtle and purposeful.

Suggested transition duration:

- Fast: 120ms
- Normal: 180ms
- Slow: 250ms

Use transitions for:

- Color changes
- Borders
- Opacity
- Small position changes
- Interactive controls

Avoid excessive animations.

Always respect:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## 9. Page Design Guidelines

### Homepage

The homepage should introduce TheSuperEevee and provide access to important areas.

Possible sections:

- Hero
- Featured projects
- Recent updates
- Software
- GitHub activity
- Quick navigation

Avoid making the homepage excessively long.

### Projects

The projects page should provide:

- Project search
- Category filtering
- Status filtering
- Responsive project grid
- Project descriptions
- Technologies
- Links to project details

Project details should use a dedicated dynamic page.

### Software

The software page should focus on applications and tools.

Show useful information:

- Name
- Description
- Version
- Platform compatibility
- Download links
- Documentation
- Source code

### Code

The code page should showcase:

- Libraries
- Code examples
- Repositories
- Programming experiments
- Development resources

### Documentation

Documentation should prioritize readability.

Use:

- Clear headings
- Navigation
- Code blocks
- Tables where useful
- Consistent content width

### About

The About page should communicate the developer's interests, work, and goals without feeling overly formal.

## 10. Responsive Design

Design for:

- 320px mobile
- 375px mobile
- 430px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop
- 1920px wide desktop

Mobile layouts should be intentionally designed.

Do not simply shrink desktop layouts.

Ensure:

- Navigation remains usable.
- Cards fit the screen.
- Text does not overflow.
- Buttons remain accessible.
- No horizontal page scrolling occurs unintentionally.

## 11. Accessibility

Maintain:

- Semantic HTML
- Keyboard navigation
- Visible focus indicators
- Accessible labels
- Sufficient contrast
- Appropriate alt text
- Reduced-motion support

Do not communicate information using color alone.

## 12. Design Quality Standard

Every new page or component should look like it belongs to the same product.

Before finishing a design, check:

- Does it match the existing design system?
- Is the hierarchy clear?
- Is spacing consistent?
- Is the layout responsive?
- Does it work in both themes?
- Are interactions understandable?
- Is anything visually unnecessary?

The goal is a polished, cohesive developer platform.
