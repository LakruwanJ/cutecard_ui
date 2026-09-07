# Component Guide

## Component Principles

1. **One CSS file per component** — import it at the top of the component file.
2. **Ant Design first** — use `Button`, `Typography`, `Row/Col`, `Tag`, `Card`, `Divider`, `Space` before writing custom HTML elements.
3. **Props over inline styles** — use CSS classes and variables, not `style={{ }}` for layout.
4. **Mobile-responsive** — every component must work at 320px width.
5. **Accessibility** — add `aria-label`, `role`, `alt` attributes on all interactive/image elements.

---

## Component Reference

### `<Navbar />`
**File**: `src/components/Navbar.tsx`  
**CSS**: `src/styles/navbar.css`

- Fixed at top, frosted glass backdrop
- CuteCard heart logo + brand text
- Nav links with active route highlighting
- Cart icon button with badge
- **Contact Us** — Ant Design `<Button type="primary">` with gradient
- Mobile hamburger menu (hidden below 768px)

**Props**: None (reads `useLocation` internally)

---

### `<BackgroundWrapper />`
**File**: `src/components/BackgroundWrapper.tsx`  
**CSS**: `src/styles/base.css` (`.background-wrapper`)

Wraps page content with the top animated `Wave.svg` background.

> ⚠️ **Do not modify `Wave.svg`** — it contains the animated gradient waves that define the page header aesthetic.

**Props**:
| Prop       | Type          | Required | Description               |
|------------|---------------|----------|---------------------------|
| `children` | `ReactNode`   | ✅       | Page content to wrap      |

---

### `<Home />`
**File**: `src/components/Home.tsx`  
**CSS**: `src/styles/home.css`

**Page sections (in order)**:
1. **Hero** — SVG illustration + headline + stats + CTAs
2. **Featured Cards** — immediately visible after hero
3. **Categories** — emoji pill grid for browsing by occasion
4. **Why CuteCard** — 6 feature cards (Ant Design Row/Col)
5. **CTA Banner** — gradient banner with action buttons

---

### `<Cards />`
**File**: `src/components/Cards.tsx`

Simple data holder — defines `cardData[]` array and renders `<Card cards={cardData} />`.

> When the backend is connected, replace the static array with an API call here.

---

### `<Card />`
**File**: `src/components/Card.tsx`  
**CSS**: `src/styles/cards.css`

Renders a responsive grid of gift cards using Ant Design `Row/Col`.
Connected to `ShopContext` for cart & wishlist.

**Props**:
| Prop               | Type        | Default | Description                                    |
|--------------------|-------------|---------|------------------------------------------------|
| `cards`            | `GiftCard[]`| —       | Array of card objects to display               |
| `showAdminActions` | `boolean`   | `false` | Shows Delete/Edit buttons (admin view only)    |
| `colsDesktop`      | `number`    | `4`     | Desktop columns (4=span 6, 3=span 8, 2=span12)|

**Responsive grid** (Ant Design Col breakpoints):
| Viewport     | Columns | `Col` span |
|--------------|---------|------------|
| xs (<576px)  | 1       | 24         |
| sm (≥576px)  | 2       | 12         |
| md (≥768px)  | 2       | 12         |
| lg (≥992px)  | 4       | 6          |

**GiftCard interface** (exported for reuse):
```ts
export interface GiftCard {
  id: string;
  name: string;
  details: { [key: string]: string };
  size: number;
  price: number;
  tags: string[];
  gifUrl?: string;
}
```

**Per-card actions**:
- **Wishlist** — heart icon (top-right of image). Toggles. Filled heart = wishlisted.
- **Add to Cart** — primary gradient button. Shows "In Cart" muted state when already added.
- **View** — secondary outline button. Navigates to `/cards/:id`.


---

### `<Footer />`
**File**: `src/components/Footer.tsx`  
**CSS**: `src/styles/footer.css`

Dark gradient footer with 4 Ant Design `Col` columns:
- Brand description
- Quick links
- Contact info
- Social media icons

---

### `ShopContext` + `useShop()`
**File**: `src/Function/ShopContext.tsx`

Global cart and wishlist state using React Context. Wrapped around `<App />` in `main.tsx`.

```tsx
// Access in any component:
const { addToCart, toggleWishlist, cartCount, isWishlisted } = useShop();
```

**Context value**:
| Property         | Type              | Description                        |
|------------------|-------------------|------------------------------------|
| `cart`           | `CartItem[]`      | Current cart items                 |
| `wishlist`       | `WishlistItem[]`  | Current wishlist items             |
| `cartCount`      | `number`          | Total item quantity in cart        |
| `wishlistCount`  | `number`          | Number of wishlisted items         |
| `addToCart`      | `(item) => void`  | Add or increment item in cart      |
| `removeFromCart` | `(id) => void`    | Remove item from cart              |
| `toggleWishlist` | `(item) => void`  | Add or remove from wishlist        |
| `isInCart`       | `(id) => boolean` | Check if item is already in cart   |
| `isWishlisted`   | `(id) => boolean` | Check if item is in wishlist       |

---

**File**: `src/Function/AnimationOne.tsx`

Scroll-triggered entrance animation using Framer Motion `useInView`.  
Wraps children in a slide-from-left fade-in effect.

```tsx
<AnimationOne>
  <section>Your content here</section>
</AnimationOne>
```

---

## Adding a New Component

```tsx
// src/components/MyComponent.tsx
import { Button, Typography } from "antd";
import "../styles/mycomponent.css";     // ← create this file

const { Title } = Typography;

export default function MyComponent() {
  return (
    <div className="my-component">
      <Title level={2}>Hello</Title>
      <Button type="primary" className="my-btn">Click me</Button>
    </div>
  );
}
```

Then in `src/styles/mycomponent.css`:
```css
/* ===================================================
   mycomponent.css  —  MyComponent Styles
   CuteCard
   =================================================== */

.my-component { /* ... */ }

.my-btn.ant-btn { /* Ant Design override */ }
```

And add `@import "./mycomponent.css";` to `common.css`.
