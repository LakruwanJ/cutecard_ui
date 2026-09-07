# CuteCard — Project Documentation

**CuteCard** is a Sri Lankan handmade gift card e-commerce platform built with React, TypeScript, Vite, and Ant Design.

---

## 📁 Project Structure

```
cutecard/
├── docs/
│   └── instructions/         ← You are here
│       ├── README.md         ← Project overview (this file)
│       ├── DEVELOPMENT.md    ← Dev setup & commands
│       ├── COMPONENTS.md     ← Component guide
│       └── STYLES.md         ← Style system guide
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    ├── App.tsx               ← Root app, routing (user/admin layouts)
    ├── main.tsx              ← Entry point, CSS imports
    ├── index.css             ← (empty — styles are in src/styles/)
    │
    ├── components/
    │   ├── BackgroundWrapper.tsx  ← Wraps content with Wave.svg background
    │   ├── Navbar.tsx             ← Fixed top navigation (user)
    │   ├── NavbarA.tsx            ← Admin navbar
    │   ├── Home.tsx               ← Homepage (hero, cards, categories, CTA)
    │   ├── Cards.tsx              ← Card data + grid container
    │   ├── Card.tsx               ← Individual card component
    │   ├── CardIcon.tsx           ← Card icon utility
    │   ├── CardOpeA.tsx           ← Admin card operations
    │   └── Footer.tsx             ← Site footer
    │
    ├── Function/
    │   └── AnimationOne.tsx       ← Scroll-triggered fade-in wrapper
    │
    ├── Images/
    │   ├── Wave.svg               ← Top background SVG (DO NOT modify)
    │   ├── HeroIllustration.svg   ← Hero section SVG illustration
    │   └── hero_cards.jpg         ← (Legacy photo — replaced by SVG)
    │
    ├── styles/
    │   ├── common.css             ← @import aggregator (edit modules, not this)
    │   ├── variables.css          ← Design tokens (colors, spacing, etc.)
    │   ├── base.css               ← Reset, body, utility classes
    │   ├── navbar.css             ← Navbar & mobile menu
    │   ├── home.css               ← Homepage sections
    │   ├── cards.css              ← Gift card grid & card styles
    │   └── footer.css             ← Footer layout
    │
    └── data/                      ← (Future: product data, API types)
```

---

## 🛣️ Routes

| Path       | Component   | Layout       |
|------------|-------------|--------------|
| `/`        | `<Home />`  | UserLayout   |
| `/cards`   | (TBD)       | UserLayout   |
| `/order`   | (TBD)       | UserLayout   |
| `/corder`  | (TBD)       | UserLayout   |
| `/admin/*` | (TBD)       | AdminLayout  |

---

## 🎨 Brand Colors

| Token               | Value     | Usage                    |
|---------------------|-----------|--------------------------|
| `--cc-primary`      | `#3B1E54` | Main brand purple        |
| `--cc-primary-light`| `#6B3FA0` | Hover, gradients         |
| `--cc-primary-soft` | `#A888B5` | Muted purple, secondary  |
| `--cc-accent`       | `#EFB6C8` | Pink accent, tags        |
| `--cc-accent-warm`  | `#F7D4DF` | Light pink, backgrounds  |

---

## ⚡ Key Rules

1. **Never modify `Wave.svg`** — it's the top background animation.
2. **Edit individual CSS files** in `styles/`, not `common.css`.
3. **All new variables** go in `styles/variables.css`.
4. **Use Ant Design** components (`Button`, `Typography`, `Row/Col`, `Tag`, `Card`) wherever possible.
5. **Mobile-first** — every new component must work at 320px width.
6. **CSS imports** are declared in `main.tsx`, pointing to `styles/common.css`.
