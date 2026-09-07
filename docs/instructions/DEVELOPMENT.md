# Development Guide

## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

---

## Setup

```bash
# 1. Clone & install
git clone <repo-url>
cd cutecard
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## Available Scripts

| Command          | Description                                  |
|------------------|----------------------------------------------|
| `npm run dev`    | Start Vite dev server with HMR               |
| `npm run build`  | TypeScript compile + Vite production build   |
| `npm run lint`   | Run ESLint on all source files               |
| `npm run preview`| Build + run Wrangler preview (Cloudflare)    |
| `npm run deploy` | Build + deploy to Cloudflare Pages           |

---

## Tech Stack

| Technology        | Version  | Purpose                        |
|-------------------|----------|--------------------------------|
| React             | ^19      | UI framework                   |
| TypeScript        | ~6.0     | Type safety                    |
| Vite              | ^8       | Build tool, HMR                |
| Ant Design (antd) | ^6       | UI component library           |
| Framer Motion     | ^13      | Scroll animations              |
| React Router DOM  | ^7       | Client-side routing            |
| Axios             | ^1       | HTTP requests (future API use) |
| Cloudflare Pages  | Wrangler | Hosting & deployment           |

---

## State Management

| Context         | File                          | Purpose                              |
|-----------------|-------------------------------|--------------------------------------|
| `ShopContext`   | `src/Function/ShopContext.tsx`| Global cart + wishlist state         |

- **`useShop()`** — hook to access cart/wishlist from any component
- **Cart**: `addToCart`, `removeFromCart`, `isInCart`, `cartCount`
- **Wishlist**: `toggleWishlist`, `isWishlisted`, `wishlistCount`
- Wrapped around `<App />` in `main.tsx` via `<ShopProvider>`
- Uses Ant Design `message` for toast feedback on add/remove

---

## Environment Notes

- **No `.env` file** yet — add API keys here when backend is connected.
- **SVG imports**: Use `src` attribute (`import X from './x.svg'`) — no SVGR plugin installed.
- **CSS**: All styles in `src/styles/`. Do NOT add inline styles for layout (use CSS variables).

---

## Folder Conventions

```
src/components/       → React components (PascalCase filenames)
src/styles/           → CSS modules (one file per concern)
src/Function/         → Utility components, animations, contexts
  └── AnimationOne.tsx   Scroll-triggered fade-in
  └── ShopContext.tsx    Cart & wishlist global state
src/Images/           → Static SVGs and images
  └── Wave.svg           DO NOT modify — top background animation
  └── HeroIllustration.svg  Hero section SVG art (hidden on mobile)
src/data/             → Static data arrays, types (future: API types)
docs/instructions/    → Developer documentation
```

### Mobile Behaviour
- **Wave.svg** background uses `background-size: 100% auto` on desktop, scales wider on mobile.
- **Hero illustration** is hidden at `≤768px` — the wave background acts as the visual header.
- **Cards grid**: 1 col (mobile) → 2 col (tablet) → 4 col (desktop).

---

## Deployment (Cloudflare Pages)

```bash
npm run deploy
```

Ensure `wrangler.jsonc` has the correct `account_id` and `project_name` set.

---

## Adding a New Page

1. Create `src/components/PageName.tsx`
2. Create matching `src/styles/pagename.css`
3. Import the CSS file at the top of the component
4. Add a `<Route>` in `src/App.tsx`
5. Add a link in `src/components/Navbar.tsx`
