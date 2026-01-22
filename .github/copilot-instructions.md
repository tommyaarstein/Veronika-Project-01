# Veronika-Project-01 AI Coding Instructions

## Project Overview
This is a **Norwegian school project website** built with vanilla HTML, CSS, and JavaScript. It showcases animals with images and audio. The site is designed for **responsive mobile-first layouts** and deploys to GitHub Pages.

## Architecture & Key Patterns

### Component-Based HTML with Dynamic Header/Footer
- **Dynamic partials**: Header and footer are stored in `partials/` and injected at runtime via `headerInclude.js` and `footerInclude.js`
- These scripts fetch HTML and mount to `#site-header` and `#site-footer` elements
- **Always include both scripts** in `<head defer>` on every page
- Navigation links use `data-route` attributes instead of hardcoded paths—this allows the injector to calculate correct relative paths dynamically

**Example**: In `partials/header.html`, links are defined as:
```html
<a href="#" data-route="/">Hjem</a>
<a href="#" data-route="/pages/about.html">Om oss</a>
```

### Responsive CSS with Page Layout Constraints
- Main content pages centered with `max-width: 640px` for comfortable reading on mobile
- CSS is split into modules: `_cards.css`, `_header.css`, `_footer.css`, `_showcase.css`
- **Mobile-first breakpoints**: `768px` (tablet), `1024px` (desktop)
- See `src/css/style.css` for the flex layout strategy (header/footer stick to edges, main content flows)

### GitHub Pages Path Handling
The `getBasePath()` function in `footerInclude.js` detects deployment context:
- **GitHub Pages** (`*.github.io`): Returns `/<repo-name>` from URL
- **Localhost**: Returns empty string (root is `/`)

This single function enables repository-agnostic deployment. All dynamic navigation must use this pattern.

## Interactive Behaviors

### Image Zoom (touchImage.js)
- Click image button opens full-screen overlay with pinch-to-zoom and pan support
- Handles multi-touch gestures (distance calculation for pinch scaling)
- Close on any overlay tap; auto-reset zoom state

### Audio Playback (audioPlay.js)
- Play/Pause button controls audio element
- Volume hardcoded to `0.5`
- Button text toggles: "Spill av" ↔ "Pause" on state changes

### Mobile Navigation (headerInclude.js)
- Hamburger menu in header toggles `.is-open` class on nav
- Clicking nav links auto-closes menu
- Uses `aria-expanded` for accessibility

## File Organization

```
index.html                  # Home page with category cards
pages/
  animals/
    polar-bear.html        # Example animal detail page
  categories/
    animals.html           # Category grid
partials/
  header.html             # Navigation + breadcrumbs (injected)
  footer.html             # Footer content (injected)
scripts/
  headerInclude.js        # Header injector + nav handlers
  footerInclude.js        # Footer injector + path helper
  audioPlay.js            # Audio control logic
  touchImage.js           # Image zoom/pan gesture handler
src/css/
  style.css               # Main + imports other modules
  _header.css             # Header/nav styling
  _cards.css              # Category card grid styling
  _showcase.css           # Animal detail page styling
  _footer.css             # Footer styling
assets/
  images/animals/         # Category images (webp preferred)
  mp3/animals/           # Animal sound files
```

## Adding New Animal Pages

1. Create `pages/animals/{name}.html` based on `polar-bear.html` template
2. Update relative paths for scripts and assets (use `../../` from `pages/animals/`)
3. Ensure element IDs match: `#detail-image-button`, `#sound`, `#audio-play-button`, `#image-overlay`, `#image-zoom-container`, `#image-zoom`
4. Always include both header and footer include scripts in `<head defer>`
5. Add category card link in appropriate category file (e.g., `pages/categories/animals.html`)

## CSS Conventions

- **Reset at top**: All margins/padding reset on `html, body`
- **Box-sizing**: `border-box` applied globally
- **Flexbox layout**: Body uses `flex-direction: column` with `min-height: 100vh` for footer pinning
- **Centering**: Use `margin: 0 auto` with fixed/max widths, not pseudo-elements
- **Responsive images**: Use `object-fit: cover` for fixed-aspect cards, `min()` for scaling detail images

## Language & Localization

Norwegian UI text is inline in HTML. Currently single-language; any multi-language support would require template changes or i18n library.

## Common Mistakes to Avoid

- ❌ Hardcoding absolute paths (must use `data-route` in partials)
- ❌ Forgetting `defer` on script tags (header/footer injection happens too early)
- ❌ Adding styles to global `style.css` instead of modular `_*.css` files
- ❌ Modifying breadcrumb/menu generation logic without testing both mobile and desktop
- ❌ Image paths that don't account for page nesting depth (always calculate relative paths)
