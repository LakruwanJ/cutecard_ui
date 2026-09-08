# Component Guide

## Component Principles

1. **One CSS file per component** — import it at the top of the component file.
2. **Ant Design first** — use `Button`, `Typography`, `Row/Col`, `Tag`, `Card`, `Divider`, `Space`, `Modal`, `Form`, `Select` before writing custom HTML elements.
3. **Props over inline styles** — use CSS classes and variables, not `style={{ }}` for layout.
4. **Mobile-responsive** — every component must work at 320px width.
5. **Accessibility** — add `aria-label`, `role`, `alt` attributes on all interactive/image elements.
6. **Action Gating** — actions that modify user state (Add to Cart, Wishlist, Checkout) must check authentication via `useAuth().requireAuth()`.

---

## Component Reference

### `<Navbar />`
**File**: `src/components/Navbar.tsx`  
**CSS**: `src/styles/navbar.css`

- Fixed at top, frosted glass backdrop
- CuteCard heart logo + brand text
- **Order Tab Visibility**: The `Order` nav link is rendered **only** for authenticated users (`currentUser`).
- Cart & Wishlist icon buttons with live counts.
- **Guest State**: Displays a stylish **"Sign In"** button that opens `<AuthModal />`.
- **Logged-in State**: Displays a circular user avatar with initial; clicking opens a dropdown with:
  - Header with user name and handle (`@username`)
  - "My Profile" (`/profile`)
  - "My Orders" (`/order`)
  - "Admin Dashboard" (`/admin`) for admin accounts
  - "Sign Out"
- Mobile menu with responsive links and quick auth trigger.

---

### `<AuthModal />`
**File**: `src/components/AuthModal.tsx`  
**CSS**: `src/styles/authmodal.css`

Global modal mounted in `<App />` and controlled via `AuthContext`.

- **Banner / Trigger Reason**: When triggered by a guest action (e.g. clicking Add to Cart), displays a highlighted alert pill (e.g. *"Please sign in to add items to your shopping bag 🛍️"*).
- **Tab 1: Sign In**:
  - Username / Email and Password fields.
  - **1-Click Demo Login Chips**: Fast testing buttons for `user` (`123q`) and `admin` (`123q`).
  - Auto-resumes queued action (e.g., adding to cart) immediately after sign in.
- **Tab 2: Create Account**:
  - Full Name, Username, Email, Sri Lankan Mobile Phone, Delivery Address, District/City select, and Password with confirmation validator.
  - Auto-logs in upon registration.

---

### `<ProfilePage />`
**File**: `src/components/ProfilePage.tsx`  
**CSS**: `src/styles/profilepage.css`

User profile management page available at `/profile`.

- **Access**: Registered customers only; guests see a friendly sign-in gateway.
- **Left Column**:
  - User avatar with initial badge
  - Name, username handle, and role tag (`Customer` or `Administrator`)
  - Quick summary counters (Items in bag, Saved items, Total orders)
  - "Edit Profile" and "Sign Out" buttons
- **Right Column**:
  - Delivery details: Full Name, Username, Email, Phone, and Shipping Address / District.
  - Quick navigation cards to Orders, Wishlist, Shopping Bag, and Card Catalog.
- **Edit Modal**:
  - Allows editing Name, Email, Phone, Delivery Address, and City.
  - Saves changes to `localStorage` and updates application state instantly.

---

### `<Card />`
**File**: `src/components/Card.tsx`  
**CSS**: `src/styles/cards.css`

Renders responsive gift cards grid. Integrated with both `ShopContext` and `AuthContext`.

**Props**:
| Prop               | Type        | Default | Description                                    |
|--------------------|-------------|---------|------------------------------------------------|
| `cards`            | `GiftCard[]`| —       | Array of card objects to display               |
| `showAdminActions` | `boolean`   | `false` | Shows Delete/Edit buttons (admin view only)    |
| `colsDesktop`      | `number`    | `4`     | Desktop columns (4=span 6, 3=span 8, 2=span12)|

**Action Gating**:
- **Wishlist**: Toggling wishlist is gated by `requireAuth()`. Guests see the login modal with a reason prompt.
- **Add to Cart**: Gated by `requireAuth()`. Guests are prompted to sign in before adding cards.

---

### `<CartPage />`
**File**: `src/components/CartPage.tsx`  
**CSS**: `src/styles/cartpage.css`

Shopping bag with promo codes, shipping progress, and checkout modal.

- **Checkout Protection**: Clicking "Proceed to Checkout" requires authentication.
- **Profile Auto-Fill**: When logged in, checkout fields (Name, Phone, Address, District) auto-fill with the user's saved profile data.

---

### `<OrderPage />`
**File**: `src/components/OrderPage.tsx`  
**CSS**: `src/styles/orderpage.css`

Order tracking and invoice receipts.

- **Access Restriction**: Only registered customers can view orders.
- **Guest State**: If a guest accesses `/order` directly, a styled "Sign In to Track Orders" card is shown.

---

### `<WishlistPage />`
**File**: `src/components/WishlistPage.tsx`  
**CSS**: `src/styles/wishlist.css`

Saved cards collection. "Move All to Bag" and per-item "Add to Bag" buttons are protected with `requireAuth()`.

---

### `AuthContext` + `useAuth()`
**File**: `src/Function/AuthContext.tsx`

Global authentication and user session state wrapped in `main.tsx`.

```tsx
import { useAuth } from "../Function/AuthContext";

const {
  currentUser,      // User | null
  isAuthenticated,  // boolean
  isAdmin,          // boolean
  login,            // (username, password) => Promise<{success, message}>
  register,         // (data) => Promise<{success, message}>
  logout,           // () => void
  updateProfile,    // (fields) => Promise<{success, message}>
  requireAuth,      // (action, reason?) => boolean
  openAuthModal,    // (tab?, reason?) => void
  closeAuthModal,   // () => void
} = useAuth();
```

---

### `ShopContext` + `useShop()`
**File**: `src/Function/ShopContext.tsx`

Global cart and wishlist state using React Context. Wrapped around `<App />` in `main.tsx`.

```tsx
const { addToCart, toggleWishlist, cartCount, isWishlisted } = useShop();
```
