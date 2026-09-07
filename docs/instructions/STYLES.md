# Style System Guide

## CSS Architecture

All styles live under `src/styles/`. The entry point is `common.css` which `@import`s all modules in order:

```
src/styles/
├── common.css        ← @import aggregator — DO NOT edit directly
├── variables.css     ← Design tokens (colors, spacing, fonts…)
├── base.css          ← Reset, body, Google Fonts, utility classes
├── navbar.css        ← Navbar + mobile menu
├── home.css          ← All homepage sections
├── cards.css         ← Gift card grid + individual card
└── footer.css        ← Footer layout
```

> **Rule**: When adding a new page/component, create a new `src/styles/pagename.css` and add `@import "./pagename.css";` to `common.css`.

---

## CSS Custom Properties (variables.css)

All design tokens are prefixed with `--cc-`:

```css
/* Colors */
--cc-primary:        #3b1e54
--cc-primary-light:  #6b3fa0
--cc-primary-soft:   #a888b5
--cc-accent:         #efb6c8
--cc-accent-warm:    #f7d4df

/* Text */
--cc-text-dark:   #1a0a2e
--cc-text-mid:    #4a3060
--cc-text-light:  #8174a0

/* Shadows */
--cc-shadow-xs  through  --cc-shadow-lg

/* Radius */
--cc-radius-sm: 12px   --cc-radius-md: 18px
--cc-radius-lg: 28px   --cc-radius-pill: 999px

/* Fonts */
--cc-font-ui:   "Outfit", Arial, sans-serif
--cc-font-head: "Playfair Display", Georgia, serif

/* Gradients */
--cc-grad-primary:  linear-gradient(135deg, #3b1e54, #6b3fa0)
```

Always use these variables instead of raw hex values.

---

## Utility Classes (base.css)

| Class             | Purpose                                   |
|-------------------|-------------------------------------------|
| `.cc-container`   | Max-width 1280px centred wrapper          |
| `.cc-eyebrow`     | Small uppercase label pill (section tags) |
| `.cc-section-head`| Centred section header block              |

**Animations** (defined in base.css, use via `animation:` property):

| Name            | Effect                        |
|-----------------|-------------------------------|
| `cc-fade-up`    | Fade in from below            |
| `cc-float`      | Gentle vertical float loop    |
| `cc-pulse-dot`  | Pulsing dot (used in badge)   |

---

## Ant Design Overrides

Override Ant Design component styles using **BEM-like class chaining**:

```css
/* Pattern: .my-class.ant-btn { ... } */
.navbar-contact-btn.ant-btn {
  border-radius: var(--cc-radius-pill) !important;
  background: var(--cc-grad-primary) !important;
}
```

> **Important**: Always use `!important` when overriding Ant Design inline or high-specificity styles.

---

## Responsive Breakpoints

| Breakpoint | Width    | Ant Design `Col` spans       |
|------------|----------|-----------------------------|
| xs (mobile)| < 576px  | `xs={24}` (full width)       |
| sm (tablet)| ≥ 576px  | `sm={12}` (2 columns)        |
| md         | ≥ 768px  | `md={8}` (3 columns)         |
| lg (desktop)| ≥ 992px | `lg={6}` (4 columns)         |

Use Ant Design `<Row gutter={[24, 24]}>` + `<Col xs={24} sm={12} lg={8}>` for all grids.

Custom CSS breakpoints match:

```css
@media (max-width: 1024px) { /* Tablet landscape */ }
@media (max-width: 768px)  { /* Tablet portrait  */ }
@media (max-width: 480px)  { /* Mobile           */ }
```

---

## Adding Styles Checklist

- [ ] Create `src/styles/newpage.css`
- [ ] Add `@import "./newpage.css";` to `common.css`
- [ ] Import in component: `import "../styles/newpage.css";`
- [ ] Use `--cc-*` variables, not raw values
- [ ] Add responsive rules at the bottom of the file
- [ ] Test at 320px, 480px, 768px, 1024px, 1280px
