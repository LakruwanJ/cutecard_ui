# CuteCard – Database Design

> **Platform**: Handmade Gift Card E-Commerce (Sri Lanka)
> **Database Type**: Relational (PostgreSQL recommended)
> **Version**: 1.0.0

---

## Table of Contents

1. [Entity Overview](#entity-overview)
2. [Entity-Relationship Summary](#entity-relationship-summary)
3. [Table Definitions](#table-definitions)
4. [Relationships Summary](#relationships-summary)
5. [Indexes](#indexes)
6. [Seed / Demo Data](#seed--demo-data)

---

## Entity Overview

| Entity           | Description                                              |
|------------------|----------------------------------------------------------|
| `users`          | Registered customers and admin accounts                  |
| `categories`     | Product category master list                             |
| `products`       | Handmade gift cards listed in the shop                   |
| `product_images` | Image URLs per product (supports multiple images)        |
| `product_tags`   | Tags per product (e.g. "Best Seller", "Eco-Friendly")    |
| `cart_items`     | Active shopping cart items per user                      |
| `wishlist_items` | Saved wishlist items per user                            |
| `orders`         | Customer order records                                   |
| `order_items`    | Line items within each order                             |
| `reviews`        | Product ratings and comments by users                    |

---

## Entity-Relationship Summary

```
categories ──< products ──< product_images
                        ──< product_tags
users ──< cart_items >── products
users ──< wishlist_items >── products
users ──< orders ──< order_items >── products
users ──< reviews >── products
```

---

## Table Definitions

---

### 1. `users`

Stores both customer and admin accounts.

| Column       | Type                   | Constraints                | Description                          |
|--------------|------------------------|----------------------------|--------------------------------------|
| `id`         | `VARCHAR(36)`          | PRIMARY KEY                | UUID (e.g. `usr-1720000000000`)      |
| `username`   | `VARCHAR(50)`          | UNIQUE, NOT NULL           | Login handle (immutable post-create) |
| `password`   | `VARCHAR(255)`         | NOT NULL                   | Bcrypt-hashed password               |
| `name`       | `VARCHAR(100)`         | NOT NULL                   | Display / full name                  |
| `email`      | `VARCHAR(150)`         | UNIQUE, NOT NULL           | Email address                        |
| `phone`      | `VARCHAR(20)`          | NULLABLE                   | Contact phone number                 |
| `address`    | `TEXT`                 | NULLABLE                   | Street / house address               |
| `city`       | `VARCHAR(80)`          | DEFAULT `'Colombo'`        | City                                 |
| `role`       | `ENUM('user','admin')` | NOT NULL, DEFAULT `'user'` | Access role                          |
| `is_active`  | `BOOLEAN`              | NOT NULL, DEFAULT `TRUE`   | Soft-delete / ban flag               |
| `created_at` | `TIMESTAMP`            | NOT NULL, DEFAULT `NOW()`  | Account creation date                |
| `updated_at` | `TIMESTAMP`            | NOT NULL, DEFAULT `NOW()`  | Last profile update                  |

```sql
CREATE TABLE users (
  id          VARCHAR(36)              PRIMARY KEY,
  username    VARCHAR(50)              UNIQUE NOT NULL,
  password    VARCHAR(255)             NOT NULL,
  name        VARCHAR(100)             NOT NULL,
  email       VARCHAR(150)             UNIQUE NOT NULL,
  phone       VARCHAR(20),
  address     TEXT,
  city        VARCHAR(80)              DEFAULT 'Colombo',
  role        ENUM('user','admin')     NOT NULL DEFAULT 'user',
  is_active   BOOLEAN                  NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMP                NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP                NOT NULL DEFAULT NOW()
);
```

---

### 2. `categories`

Product category master list (drives shop filter tabs).

| Column       | Type          | Constraints           | Description            |
|--------------|---------------|-----------------------|------------------------|
| `id`         | `VARCHAR(36)` | PRIMARY KEY           | UUID                   |
| `name`       | `VARCHAR(80)` | UNIQUE, NOT NULL      | Category display name  |
| `slug`       | `VARCHAR(80)` | UNIQUE, NOT NULL      | URL-friendly slug      |
| `sort_order` | `INT`         | NOT NULL, DEFAULT `0` | Display ordering       |

```sql
CREATE TABLE categories (
  id          VARCHAR(36)  PRIMARY KEY,
  name        VARCHAR(80)  UNIQUE NOT NULL,
  slug        VARCHAR(80)  UNIQUE NOT NULL,
  sort_order  INT          NOT NULL DEFAULT 0
);
```

---

### 3. `products`

Master catalog of handmade gift cards.

| Column        | Type            | Constraints                  | Description                                |
|---------------|-----------------|------------------------------|--------------------------------------------|
| `id`          | `VARCHAR(36)`   | PRIMARY KEY                  | UUID                                       |
| `name`        | `VARCHAR(200)`  | NOT NULL                     | Product display name                       |
| `category_id` | `VARCHAR(36)`   | FK → `categories.id`         | Category reference                         |
| `material`    | `VARCHAR(150)`  | NULLABLE                     | Card material (e.g. "250gsm Linen Paper")  |
| `style`       | `VARCHAR(150)`  | NULLABLE                     | Design style (e.g. "Floral Pop-up")        |
| `dimensions`  | `VARCHAR(80)`   | NULLABLE                     | Size string (e.g. "5 x 7 inches")         |
| `origin`      | `VARCHAR(100)`  | NULLABLE                     | Production origin city (Sri Lanka)         |
| `stock_qty`   | `INT`           | NOT NULL, DEFAULT `0`        | Available stock count                      |
| `price`       | `DECIMAL(10,2)` | NOT NULL                     | Unit price (USD)                           |
| `gif_url`     | `TEXT`          | NULLABLE                     | Preview GIF animation URL                  |
| `is_active`   | `BOOLEAN`       | NOT NULL, DEFAULT `TRUE`     | Visibility toggle (admin can deactivate)   |
| `created_at`  | `TIMESTAMP`     | NOT NULL, DEFAULT `NOW()`    | Listing creation date                      |
| `updated_at`  | `TIMESTAMP`     | NOT NULL, DEFAULT `NOW()`    | Last modified date                         |

```sql
CREATE TABLE products (
  id           VARCHAR(36)    PRIMARY KEY,
  name         VARCHAR(200)   NOT NULL,
  category_id  VARCHAR(36)    REFERENCES categories(id) ON DELETE SET NULL,
  material     VARCHAR(150),
  style        VARCHAR(150),
  dimensions   VARCHAR(80),
  origin       VARCHAR(100),
  stock_qty    INT            NOT NULL DEFAULT 0,
  price        DECIMAL(10,2)  NOT NULL,
  gif_url      TEXT,
  is_active    BOOLEAN        NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMP      NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMP      NOT NULL DEFAULT NOW()
);
```

---

### 4. `product_images`

Supports multiple images per product.

| Column       | Type          | Constraints                              | Description                     |
|--------------|---------------|------------------------------------------|---------------------------------|
| `id`         | `VARCHAR(36)` | PRIMARY KEY                              | UUID                            |
| `product_id` | `VARCHAR(36)` | FK → `products.id` ON DELETE CASCADE     | Owning product                  |
| `url`        | `TEXT`        | NOT NULL                                 | Image URL (CDN / storage path)  |
| `alt_text`   | `VARCHAR(200)`| NULLABLE                                 | Accessibility alt text          |
| `sort_order` | `INT`         | NOT NULL, DEFAULT `0`                    | Display ordering (0 = primary)  |

```sql
CREATE TABLE product_images (
  id          VARCHAR(36)  PRIMARY KEY,
  product_id  VARCHAR(36)  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT         NOT NULL,
  alt_text    VARCHAR(200),
  sort_order  INT          NOT NULL DEFAULT 0
);
```

---

### 5. `product_tags`

Tag assignments per product (composite primary key).

| Column       | Type          | Constraints                          | Description                         |
|--------------|---------------|--------------------------------------|-------------------------------------|
| `product_id` | `VARCHAR(36)` | PK + FK → `products.id`              | Owning product                      |
| `tag`        | `VARCHAR(80)` | PK                                   | Tag label (e.g. "Best Seller")      |

```sql
CREATE TABLE product_tags (
  product_id  VARCHAR(36)  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tag         VARCHAR(80)  NOT NULL,
  PRIMARY KEY (product_id, tag)
);
```

---

### 6. `cart_items`

Per-user shopping cart. Cleared on checkout or manual clear.

| Column       | Type          | Constraints                           | Description                |
|--------------|---------------|---------------------------------------|----------------------------|
| `id`         | `VARCHAR(36)` | PRIMARY KEY                           | UUID                       |
| `user_id`    | `VARCHAR(36)` | FK → `users.id` ON DELETE CASCADE     | Cart owner                 |
| `product_id` | `VARCHAR(36)` | FK → `products.id` ON DELETE CASCADE  | Product in cart            |
| `qty`        | `INT`         | NOT NULL, DEFAULT `1`, CHECK `>= 1`   | Quantity selected          |
| `added_at`   | `TIMESTAMP`   | NOT NULL, DEFAULT `NOW()`             | When item was added        |

> **Unique constraint**: `(user_id, product_id)` — one row per product per user.

```sql
CREATE TABLE cart_items (
  id          VARCHAR(36)  PRIMARY KEY,
  user_id     VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id  VARCHAR(36)  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  qty         INT          NOT NULL DEFAULT 1 CHECK (qty >= 1),
  added_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);
```

---

### 7. `wishlist_items`

Saved wishlist per user (composite primary key — no duplicates).

| Column       | Type          | Constraints                           | Description               |
|--------------|---------------|---------------------------------------|---------------------------|
| `user_id`    | `VARCHAR(36)` | PK + FK → `users.id`                  | Wishlist owner            |
| `product_id` | `VARCHAR(36)` | PK + FK → `products.id`               | Wishlisted product        |
| `added_at`   | `TIMESTAMP`   | NOT NULL, DEFAULT `NOW()`             | When item was wishlisted  |

```sql
CREATE TABLE wishlist_items (
  user_id     VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id  VARCHAR(36)  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  added_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, product_id)
);
```

---

### 8. `orders`

Completed customer orders (created on checkout).

| Column              | Type            | Constraints                         | Description                         |
|---------------------|-----------------|-------------------------------------|-------------------------------------|
| `id`                | `VARCHAR(36)`   | PRIMARY KEY                         | UUID / order reference              |
| `user_id`           | `VARCHAR(36)`   | FK → `users.id`                     | Ordering customer                   |
| `status`            | `ENUM`          | NOT NULL, DEFAULT `'pending'`       | Order lifecycle status (see below)  |
| `subtotal`          | `DECIMAL(10,2)` | NOT NULL                            | Items total before shipping         |
| `shipping_fee`      | `DECIMAL(10,2)` | NOT NULL, DEFAULT `0.00`            | Shipping charge applied             |
| `total`             | `DECIMAL(10,2)` | NOT NULL                            | Grand total (subtotal + shipping)   |
| `shipping_name`     | `VARCHAR(150)`  | NOT NULL                            | Delivery recipient name             |
| `shipping_address`  | `TEXT`          | NOT NULL                            | Delivery street address             |
| `shipping_city`     | `VARCHAR(80)`   | NOT NULL                            | Delivery city                       |
| `shipping_phone`    | `VARCHAR(20)`   | NOT NULL                            | Delivery contact number             |
| `notes`             | `TEXT`          | NULLABLE                            | Optional order notes                |
| `placed_at`         | `TIMESTAMP`     | NOT NULL, DEFAULT `NOW()`           | Order submission time               |
| `updated_at`        | `TIMESTAMP`     | NOT NULL, DEFAULT `NOW()`           | Last status update time             |

**Order Status Values:**

| Status       | Description                                     |
|--------------|-------------------------------------------------|
| `pending`    | Placed, awaiting admin confirmation             |
| `confirmed`  | Admin confirmed / payment verified              |
| `processing` | Being handcrafted / prepared                   |
| `shipped`    | Dispatched to courier                           |
| `delivered`  | Confirmed received by customer                  |
| `cancelled`  | Cancelled by user or admin                      |

```sql
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
);

CREATE TABLE orders (
  id               VARCHAR(36)     PRIMARY KEY,
  user_id          VARCHAR(36)     NOT NULL REFERENCES users(id),
  status           order_status    NOT NULL DEFAULT 'pending',
  subtotal         DECIMAL(10,2)   NOT NULL,
  shipping_fee     DECIMAL(10,2)   NOT NULL DEFAULT 0.00,
  total            DECIMAL(10,2)   NOT NULL,
  shipping_name    VARCHAR(150)    NOT NULL,
  shipping_address TEXT            NOT NULL,
  shipping_city    VARCHAR(80)     NOT NULL,
  shipping_phone   VARCHAR(20)     NOT NULL,
  notes            TEXT,
  placed_at        TIMESTAMP       NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMP       NOT NULL DEFAULT NOW()
);
```

---

### 9. `order_items`

Individual line items within an order (snapshot of product at time of purchase).

| Column         | Type            | Constraints                              | Description                          |
|----------------|-----------------|------------------------------------------|--------------------------------------|
| `id`           | `VARCHAR(36)`   | PRIMARY KEY                              | UUID                                 |
| `order_id`     | `VARCHAR(36)`   | FK → `orders.id` ON DELETE CASCADE       | Parent order                         |
| `product_id`   | `VARCHAR(36)`   | FK → `products.id` ON DELETE SET NULL    | Product reference (nullable if deleted)|
| `product_name` | `VARCHAR(200)`  | NOT NULL                                 | Snapshot of name at order time       |
| `unit_price`   | `DECIMAL(10,2)` | NOT NULL                                 | Price per item at time of purchase   |
| `qty`          | `INT`           | NOT NULL, CHECK `>= 1`                   | Quantity ordered                     |
| `line_total`   | `DECIMAL(10,2)` | NOT NULL                                 | `unit_price × qty`                   |

```sql
CREATE TABLE order_items (
  id            VARCHAR(36)    PRIMARY KEY,
  order_id      VARCHAR(36)    NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id    VARCHAR(36)    REFERENCES products(id) ON DELETE SET NULL,
  product_name  VARCHAR(200)   NOT NULL,
  unit_price    DECIMAL(10,2)  NOT NULL,
  qty           INT            NOT NULL CHECK (qty >= 1),
  line_total    DECIMAL(10,2)  NOT NULL
);
```

---

### 10. `reviews`

Product ratings and comments by authenticated users.

| Column       | Type          | Constraints                              | Description                |
|--------------|---------------|------------------------------------------|----------------------------|
| `id`         | `VARCHAR(36)` | PRIMARY KEY                              | UUID                       |
| `product_id` | `VARCHAR(36)` | FK → `products.id` ON DELETE CASCADE     | Reviewed product           |
| `user_id`    | `VARCHAR(36)` | FK → `users.id` ON DELETE CASCADE        | Reviewer                   |
| `rating`     | `TINYINT`     | NOT NULL, CHECK `BETWEEN 1 AND 5`        | Star rating (1–5)          |
| `comment`    | `TEXT`        | NULLABLE                                 | Review text                |
| `created_at` | `TIMESTAMP`   | NOT NULL, DEFAULT `NOW()`               | Submission date            |

> **Unique constraint**: `(product_id, user_id)` — one review per user per product.

```sql
CREATE TABLE reviews (
  id          VARCHAR(36)  PRIMARY KEY,
  product_id  VARCHAR(36)  NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id     VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating      TINYINT      NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, user_id)
);
```

---

## Relationships Summary

| Relationship                          | Type        | Notes                                            |
|---------------------------------------|-------------|--------------------------------------------------|
| `users` → `orders`                    | 1 : Many    | A user can place many orders                     |
| `orders` → `order_items`              | 1 : Many    | Each order contains multiple line items          |
| `order_items` → `products`            | Many : 1    | Each line item references a product              |
| `users` ↔ `products` (via cart)      | Many : Many | Through `cart_items` join table                  |
| `users` ↔ `products` (via wishlist)  | Many : Many | Through `wishlist_items` join table              |
| `products` → `product_images`         | 1 : Many    | A product can have multiple images               |
| `products` → `product_tags`           | 1 : Many    | A product can have multiple tags                 |
| `products` → `categories`             | Many : 1    | Each product belongs to one category            |
| `users` ↔ `products` (via reviews)   | Many : Many | One review per user per product                  |

---

## Indexes

```sql
CREATE INDEX idx_products_category   ON products(category_id);
CREATE INDEX idx_products_is_active  ON products(is_active);
CREATE INDEX idx_cart_user           ON cart_items(user_id);
CREATE INDEX idx_wishlist_user       ON wishlist_items(user_id);
CREATE INDEX idx_orders_user         ON orders(user_id);
CREATE INDEX idx_orders_status       ON orders(status);
CREATE INDEX idx_order_items_order   ON order_items(order_id);
CREATE INDEX idx_reviews_product     ON reviews(product_id);
CREATE INDEX idx_users_email         ON users(email);
CREATE INDEX idx_users_username      ON users(username);
```

---

## Seed / Demo Data

```sql
-- Categories
INSERT INTO categories (id, name, slug, sort_order) VALUES
  ('cat-birthday',   'Birthday',          'birthday',        1),
  ('cat-love',       'Love & Anniversary','love-anniversary', 2),
  ('cat-wedding',    'Wedding',           'wedding',         3),
  ('cat-thankyou',   'Thank You',         'thank-you',       4),
  ('cat-popup',      'Pop-up 3D',         'popup-3d',        5);

-- Admin user (password: 123q — store as bcrypt hash in production)
INSERT INTO users (id, username, password, name, email, phone, address, city, role) VALUES
  ('usr-admin', 'admin', '$2b$10$REPLACE_WITH_HASH',
   'Admin CuteCard', 'admin@cutecard.lk',
   '+94 71 987 6543', 'CuteCard HQ, Galle Road', 'Colombo', 'admin');

-- Regular demo user (password: 123q)
INSERT INTO users (id, username, password, name, email, phone, address, city, role) VALUES
  ('usr-user', 'user', '$2b$10$REPLACE_WITH_HASH',
   'Sanduni Perera', 'user@cutecard.lk',
   '+94 77 123 4567', '12/4 Flower Road', 'Colombo', 'user');
```

> **Security Note**: The current frontend prototype stores plain-text passwords in `localStorage` for demo purposes only. In production, always hash passwords with **bcrypt** (cost factor ≥ 12) or **Argon2** before storing.
