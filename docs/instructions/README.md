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
    ├── main.tsx              ← Entry point, Context providers, CSS imports
    ├── index.css             ← (empty — styles are in src/styles/)
    │
    ├── components/
    │   ├── BackgroundWrapper.tsx  ← Wraps content with Wave.svg background
    │   ├── Navbar.tsx             ← Top navigation (role-aware order tab & profile dropdown)
    │   ├── NavbarA.tsx            ← Admin navbar with sign-out
    │   ├── AuthModal.tsx          ← Sign-in, user registration & demo logins modal
    │   ├── ProfilePage.tsx        ← Customer profile management & edit modal
    │   ├── Home.tsx               ← Homepage (hero, cards, categories, CTA)
    │   ├── CardsPage.tsx          ← Browse cards with category & search filter
    │   ├── Cards.tsx              ← Card data + grid container
    │   ├── Card.tsx               ← Individual card (auth-gated wishlist & bag actions)
    │   ├── CartPage.tsx           ← Shopping bag & delivery checkout (auth-gated)
    │   ├── WishlistPage.tsx       ← Saved keepsakes & move-to-bag (auth-gated)
    │   ├── OrderPage.tsx          ← Live courier tracking (registered users only)
    │   ├── CustomOrderPage.tsx    ← Personalized card builder
    │   ├── ContactPage.tsx        ← Contact form & studio inquiries
    │   └── Footer.tsx             ← Site footer
    │
    ├── Function/
    │   ├── AnimationOne.tsx       ← Scroll-triggered fade-in wrapper
    │   ├── AuthContext.tsx        ← Global authentication, session, registration & profile state
    │   └── ShopContext.tsx        ← Global cart & wishlist state
    │
    ├── Images/
    │   ├── Wave.svg               ← Top background SVG (DO NOT modify)
    │   ├── HeroIllustration.svg   ← Hero section SVG illustration
    │   └── hero_cards.jpg         ← (Legacy photo)
    │
    ├── styles/
    │   ├── common.css             ← @import aggregator (edit modules, not this)
    │   ├── variables.css          ← Design tokens (colors, spacing, etc.)
    │   ├── base.css               ← Reset, body, utility classes
    │   ├── navbar.css             ← Navbar, mobile menu & user avatar
    │   ├── authmodal.css          ← Sign-in, registration & guest prompt styling
    │   ├── profilepage.css        ← Profile cards, statistics & edit modal
    │   ├── home.css               ← Homepage sections
    │   ├── cards.css              ← Gift card grid & card styles
    │   ├── cardspage.css          ← Card catalogue page
    │   ├── cartpage.css           ← Bag & checkout drawer
    │   ├── orderpage.css          ← Order tracking steps & receipts
    │   ├── wishlist.css           ← Wishlist grid
    │   ├── customorder.css        ← Custom order form & live preview
    │   ├── contactpage.css        ← Inquiries form
    │   └── footer.css             ← Footer layout
    │
    └── data/
        ├── CarouselData.tsx       ← Hero & banner carousel data
        └── cardProducts.ts        ← Catalog card products data
```

---

## 🛣️ Routes

| Path         | Component           | Layout      | Access Rule                                            |
|--------------|---------------------|-------------|--------------------------------------------------------|
| `/`          | `<Home />`          | UserLayout  | Public                                                 |
| `/cards`     | `<CardsPage />`     | UserLayout  | Public (Add to Cart / Wishlist require login)          |
| `/cards/:id` | `<CardsPage />`     | UserLayout  | Public (Quick View & custom order redirect)            |
| `/cart`      | `<CartPage />`      | UserLayout  | Public view (Proceed to Checkout requires login)       |
| `/wishlist`  | `<WishlistPage />`  | UserLayout  | Public view (Move to Bag requires login)               |
| `/order`     | `<OrderPage />`     | UserLayout  | **Registered Users Only** (Hidden in nav for guests)  |
| `/profile`   | `<ProfilePage />`   | UserLayout  | **Registered Users Only** (Edit contact & delivery info)|
| `/customorder`| `<CustomOrderPage />`| UserLayout | Public                                                 |
| `/corder`    | `<CustomOrderPage />`| UserLayout | Public                                                 |
| `/contact`   | `<ContactPage />`   | UserLayout  | Public                                                 |
| `/admin/*`   | `<AdminLayout />`   | AdminLayout | Admin Role                                             |

---

## 🔐 Authentication & Demo Credentials

CuteCard includes simulated backend authentication with localStorage persistence and quick 1-click login buttons in `<AuthModal />`:

| Role          | Username | Password | Full Name       | Pre-configured City |
|---------------|----------|----------|-----------------|---------------------|
| **Customer**  | `user`   | `123q`   | Sanduni Perera  | Colombo 07          |
| **Admin**     | `admin`  | `123q`   | Admin CuteCard  | Colombo Headquarters|

New customers can also create accounts anytime via the **"Create Account"** tab in the auth modal.

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
4. **Use Ant Design** components (`Button`, `Typography`, `Row/Col`, `Tag`, `Card`, `Modal`, `Form`, `Select`) wherever possible.
5. **Mobile-first** — every component must adapt gracefully down to 320px width.
6. **Action Gating**: Wrap privileged actions (e.g. Add to Cart, Wishlist, Checkout) with `requireAuth(action, reason)` from `useAuth()`.
