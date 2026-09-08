# CuteCard – REST API Specification

> **Platform**: Handmade Gift Card E-Commerce (Sri Lanka)
> **Base URL**: `https://api.cutecard.lk/v1`
> **Auth**: Bearer JWT token (except public endpoints)
> **Content-Type**: `application/json`
> **Version**: 1.0.0

---

## Table of Contents

1. [Authentication Conventions](#authentication-conventions)
2. [Standard Response Envelope](#standard-response-envelope)
3. [Error Codes](#error-codes)
4. [Auth Endpoints](#auth-endpoints)
5. [User Profile Endpoints](#user-profile-endpoints)
6. [Product Endpoints](#product-endpoints)
7. [Category Endpoints](#category-endpoints)
8. [Cart Endpoints](#cart-endpoints)
9. [Wishlist Endpoints](#wishlist-endpoints)
10. [Order Endpoints](#order-endpoints)
11. [Review Endpoints](#review-endpoints)
12. [Admin Endpoints](#admin-endpoints)

---

## Authentication Conventions

| Header            | Value                          | Notes                          |
|-------------------|--------------------------------|--------------------------------|
| `Authorization`   | `Bearer <jwt_token>`           | Required on protected routes   |
| `Content-Type`    | `application/json`             | Required on POST/PUT/PATCH     |

**Roles:**

| Role    | Description                                               |
|---------|-----------------------------------------------------------|
| `guest` | Unauthenticated visitor (read-only product access)        |
| `user`  | Registered customer                                       |
| `admin` | Full platform management access                           |

---

## Standard Response Envelope

All responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Human-readable status message",
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

On error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Username is required",
    "details": [
      { "field": "username", "message": "Username must be at least 3 characters" }
    ]
  }
}
```

---

## Error Codes

| Code                  | HTTP Status | Description                                        |
|-----------------------|-------------|----------------------------------------------------|
| `VALIDATION_ERROR`    | 400         | Request body/params failed validation              |
| `UNAUTHORIZED`        | 401         | Missing or invalid JWT token                       |
| `FORBIDDEN`           | 403         | Authenticated but insufficient role                |
| `NOT_FOUND`           | 404         | Resource not found                                 |
| `CONFLICT`            | 409         | Duplicate resource (e.g. username already taken)   |
| `INTERNAL_ERROR`      | 500         | Unexpected server error                            |

---

## Auth Endpoints

### `POST /auth/login`

Authenticate a user and receive a JWT token.

- **Access**: Public (guest)

**Request:**
```json
{
  "username": "user",
  "password": "123q"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": "usr-user",
      "username": "user",
      "name": "Sanduni Perera",
      "email": "user@cutecard.lk",
      "phone": "+94 77 123 4567",
      "address": "12/4 Flower Road",
      "city": "Colombo",
      "role": "user",
      "createdAt": "2026-02-15"
    }
  },
  "message": "Welcome back, Sanduni Perera! 💖"
}
```

**Error `401`:**
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid username or password"
  }
}
```

---

### `POST /auth/register`

Create a new user account and receive a JWT token.

- **Access**: Public (guest)

**Request:**
```json
{
  "username": "sanduni",
  "password": "mySecurePass1",
  "name": "Sanduni Perera",
  "email": "sanduni@example.com",
  "phone": "+94 77 123 4567",
  "address": "12/4 Flower Road",
  "city": "Colombo"
}
```

| Field      | Type     | Required | Validation                              |
|------------|----------|----------|-----------------------------------------|
| `username` | `string` | ✅        | Min 3 chars, alphanumeric + underscore  |
| `password` | `string` | ✅        | Min 8 chars                             |
| `name`     | `string` | ✅        | Min 2 chars                             |
| `email`    | `string` | ✅        | Valid email format                      |
| `phone`    | `string` | ❌        | Optional                                |
| `address`  | `string` | ❌        | Optional                                |
| `city`     | `string` | ❌        | Optional, defaults to "Colombo"         |

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400,
    "user": {
      "id": "usr-1720000000000",
      "username": "sanduni",
      "name": "Sanduni Perera",
      "email": "sanduni@example.com",
      "phone": "+94 77 123 4567",
      "address": "12/4 Flower Road",
      "city": "Colombo",
      "role": "user",
      "createdAt": "2026-09-01"
    }
  },
  "message": "Account created successfully! Welcome to CuteCard, Sanduni ✨"
}
```

**Error `409`** (username taken):
```json
{
  "success": false,
  "error": {
    "code": "CONFLICT",
    "message": "Username is already taken. Please choose another."
  }
}
```

---

### `POST /auth/logout`

Invalidate the current JWT session (server-side token blacklist).

- **Access**: 🔒 `user`, `admin`

**Request:** _(no body)_

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "You have been signed out. See you soon! 💌"
}
```

---

## User Profile Endpoints

### `GET /users/me`

Get the current authenticated user's profile.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "usr-user",
    "username": "user",
    "name": "Sanduni Perera",
    "email": "user@cutecard.lk",
    "phone": "+94 77 123 4567",
    "address": "12/4 Flower Road",
    "city": "Colombo",
    "role": "user",
    "createdAt": "2026-02-15",
    "updatedAt": "2026-09-01"
  }
}
```

---

### `PATCH /users/me`

Update the current user's profile details.

- **Access**: 🔒 `user`, `admin`
- **Note**: `username` and `role` are immutable through this endpoint.

**Request:**
```json
{
  "name": "Sanduni K. Perera",
  "email": "new@example.com",
  "phone": "+94 71 999 8888",
  "address": "45 Lotus Lane",
  "city": "Kandy"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "usr-user",
    "username": "user",
    "name": "Sanduni K. Perera",
    "email": "new@example.com",
    "phone": "+94 71 999 8888",
    "address": "45 Lotus Lane",
    "city": "Kandy",
    "role": "user",
    "updatedAt": "2026-09-09"
  },
  "message": "Profile updated successfully! ✨"
}
```

---

### `PATCH /users/me/password`

Change the current user's password.

- **Access**: 🔒 `user`, `admin`

**Request:**
```json
{
  "currentPassword": "123q",
  "newPassword": "newSecure123",
  "confirmPassword": "newSecure123"
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Password changed successfully."
}
```

---

## Product Endpoints

### `GET /products`

List all active products with optional filtering and pagination.

- **Access**: Public (guest + user + admin)

**Query Parameters:**

| Param       | Type     | Description                                     | Example             |
|-------------|----------|-------------------------------------------------|---------------------|
| `category`  | `string` | Filter by category slug                         | `birthday`          |
| `tag`       | `string` | Filter by tag label                             | `Best Seller`       |
| `search`    | `string` | Search by product name                          | `poppy`             |
| `minPrice`  | `number` | Minimum price filter                            | `5`                 |
| `maxPrice`  | `number` | Maximum price filter                            | `20`                |
| `sortBy`    | `string` | Sort field: `price`, `name`, `createdAt`        | `price`             |
| `order`     | `string` | Sort direction: `asc`, `desc`                   | `asc`               |
| `page`      | `number` | Page number (default: `1`)                      | `2`                 |
| `limit`     | `number` | Items per page (default: `20`, max: `100`)      | `12`                |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Golden Bloom Pop-up Card",
      "category": {
        "id": "cat-birthday",
        "name": "Birthday",
        "slug": "birthday"
      },
      "material": "250gsm Linen Paper",
      "style": "Floral Pop-up",
      "dimensions": "5 x 7 inches",
      "origin": "Colombo, Sri Lanka",
      "stockQty": 12,
      "price": 15.99,
      "gifUrl": "https://media.giphy.com/media/xT9Igzo.../giphy.gif",
      "tags": ["Best Seller", "Limited Edition"],
      "images": [
        { "url": "https://cdn.cutecard.lk/products/1/main.jpg", "altText": "Golden Bloom front", "sortOrder": 0 }
      ],
      "averageRating": 4.7,
      "reviewCount": 23,
      "isActive": true,
      "createdAt": "2026-01-15T08:00:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 8
  }
}
```

---

### `GET /products/:id`

Get a single product by ID.

- **Access**: Public (guest + user + admin)

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Golden Bloom Pop-up Card",
    "category": { "id": "cat-birthday", "name": "Birthday", "slug": "birthday" },
    "material": "250gsm Linen Paper",
    "style": "Floral Pop-up",
    "dimensions": "5 x 7 inches",
    "origin": "Colombo, Sri Lanka",
    "stockQty": 12,
    "price": 15.99,
    "gifUrl": "https://media.giphy.com/...",
    "tags": ["Best Seller", "Limited Edition"],
    "images": [
      { "url": "https://cdn.cutecard.lk/products/1/main.jpg", "altText": "Golden Bloom front", "sortOrder": 0 }
    ],
    "averageRating": 4.7,
    "reviewCount": 23,
    "isActive": true,
    "createdAt": "2026-01-15T08:00:00Z",
    "updatedAt": "2026-08-01T12:00:00Z"
  }
}
```

**Error `404`:**
```json
{
  "success": false,
  "error": { "code": "NOT_FOUND", "message": "Product not found" }
}
```

---

### `POST /products` _(Admin)_

Create a new product.

- **Access**: 🔒 `admin`

**Request:**
```json
{
  "name": "Starry Night Pop-up Galaxy",
  "categoryId": "cat-popup",
  "material": "Metallic Cardstock",
  "style": "3D Light Layered",
  "dimensions": "5.5 x 7.5 inches",
  "origin": "Colombo, Sri Lanka",
  "stockQty": 14,
  "price": 19.50,
  "gifUrl": "https://media.giphy.com/...",
  "tags": ["Best Seller"],
  "images": [
    { "url": "https://cdn.cutecard.lk/products/7/main.jpg", "altText": "Galaxy card", "sortOrder": 0 }
  ]
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "data": { "id": "prod-1720000001234", "name": "Starry Night Pop-up Galaxy", "..." : "..." },
  "message": "Product created successfully."
}
```

---

### `PUT /products/:id` _(Admin)_

Replace a product's full details.

- **Access**: 🔒 `admin`

**Request:** _(same shape as POST /products)_

**Response `200 OK`:** _(updated product object)_

---

### `PATCH /products/:id` _(Admin)_

Partially update a product (e.g. toggle visibility, update stock).

- **Access**: 🔒 `admin`

**Request:**
```json
{
  "stockQty": 20,
  "isActive": false
}
```

**Response `200 OK`:** _(updated product object)_

---

### `DELETE /products/:id` _(Admin)_

Soft-delete a product (sets `is_active = false`).

- **Access**: 🔒 `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Product deactivated successfully."
}
```

---

## Category Endpoints

### `GET /categories`

List all categories.

- **Access**: Public

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    { "id": "cat-birthday", "name": "Birthday", "slug": "birthday", "sortOrder": 1 },
    { "id": "cat-love", "name": "Love & Anniversary", "slug": "love-anniversary", "sortOrder": 2 },
    { "id": "cat-wedding", "name": "Wedding", "slug": "wedding", "sortOrder": 3 },
    { "id": "cat-thankyou", "name": "Thank You", "slug": "thank-you", "sortOrder": 4 },
    { "id": "cat-popup", "name": "Pop-up 3D", "slug": "popup-3d", "sortOrder": 5 }
  ]
}
```

---

### `POST /categories` _(Admin)_

Create a new category.

- **Access**: 🔒 `admin`

**Request:**
```json
{ "name": "Christmas", "slug": "christmas", "sortOrder": 6 }
```

**Response `201 Created`:** _(new category object)_

---

## Cart Endpoints

> All cart endpoints require authentication. Guests are redirected to login.

### `GET /cart`

Get the current user's cart.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "cart-item-001",
        "product": {
          "id": "1",
          "name": "Golden Bloom Pop-up Card",
          "price": 15.99,
          "gifUrl": "https://media.giphy.com/...",
          "stockQty": 12
        },
        "qty": 2,
        "lineTotal": 31.98,
        "addedAt": "2026-09-01T10:00:00Z"
      }
    ],
    "itemCount": 2,
    "subtotal": 31.98
  }
}
```

---

### `POST /cart`

Add an item to the cart (or increment quantity if already present).

- **Access**: 🔒 `user`, `admin`

**Request:**
```json
{
  "productId": "1",
  "qty": 1
}
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "cart-item-001",
    "productId": "1",
    "qty": 2,
    "lineTotal": 31.98
  },
  "message": "Golden Bloom Pop-up Card added to cart 🛒"
}
```

---

### `PATCH /cart/:itemId`

Update the quantity of a cart item. Setting `qty` to `0` removes the item.

- **Access**: 🔒 `user`, `admin`

**Request:**
```json
{ "qty": 3 }
```

**Response `200 OK`:**
```json
{
  "success": true,
  "data": { "id": "cart-item-001", "qty": 3, "lineTotal": 47.97 },
  "message": "Cart updated."
}
```

---

### `DELETE /cart/:itemId`

Remove a specific item from the cart.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Item removed from cart."
}
```

---

### `DELETE /cart`

Clear all items from the cart.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Cart cleared."
}
```

---

## Wishlist Endpoints

> All wishlist endpoints require authentication.

### `GET /wishlist`

Get the current user's wishlist.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "product": {
          "id": "5",
          "name": "Royal Peacock Keepsake",
          "price": 18.99,
          "gifUrl": "https://media.giphy.com/..."
        },
        "addedAt": "2026-09-01T11:00:00Z"
      }
    ],
    "count": 1
  }
}
```

---

### `POST /wishlist`

Add a product to the wishlist (idempotent — duplicate calls are safe).

- **Access**: 🔒 `user`, `admin`

**Request:**
```json
{ "productId": "5" }
```

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Royal Peacock Keepsake added to wishlist 💜"
}
```

---

### `DELETE /wishlist/:productId`

Remove a product from the wishlist.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Royal Peacock Keepsake removed from wishlist."
}
```

---

### `DELETE /wishlist`

Clear entire wishlist.

- **Access**: 🔒 `user`, `admin`

**Response `200 OK`:**
```json
{ "success": true, "message": "Wishlist cleared." }
```

---

## Order Endpoints

> Order placement and tracking require authentication.

### `GET /orders`

Get all orders for the current user (paginated).

- **Access**: 🔒 `user`, `admin`
- **Admin** sees all orders; `user` sees only their own.

**Query Parameters:**

| Param    | Type     | Description                                             |
|----------|----------|---------------------------------------------------------|
| `status` | `string` | Filter by status (`pending`, `shipped`, etc.)           |
| `page`   | `number` | Page number                                             |
| `limit`  | `number` | Items per page (default: `10`)                          |

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ord-1720000111111",
      "status": "processing",
      "subtotal": 31.98,
      "shippingFee": 5.00,
      "total": 36.98,
      "shippingName": "Sanduni Perera",
      "shippingAddress": "12/4 Flower Road",
      "shippingCity": "Colombo",
      "shippingPhone": "+94 77 123 4567",
      "notes": null,
      "placedAt": "2026-09-01T14:00:00Z",
      "updatedAt": "2026-09-02T09:00:00Z",
      "items": [
        {
          "productId": "1",
          "productName": "Golden Bloom Pop-up Card",
          "unitPrice": 15.99,
          "qty": 2,
          "lineTotal": 31.98
        }
      ]
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 3 }
}
```

---

### `GET /orders/:id`

Get a single order by ID.

- **Access**: 🔒 `user` (own orders only), `admin` (any order)

**Response `200 OK`:** _(single order object as above)_

**Error `403`:** _(user tries to access another user's order)_
```json
{
  "success": false,
  "error": { "code": "FORBIDDEN", "message": "You do not have access to this order." }
}
```

---

### `POST /orders`

Place a new order (converts cart to order, reduces stock, clears cart).

- **Access**: 🔒 `user`, `admin`

**Request:**
```json
{
  "shippingName": "Sanduni Perera",
  "shippingAddress": "12/4 Flower Road",
  "shippingCity": "Colombo",
  "shippingPhone": "+94 77 123 4567",
  "notes": "Please wrap in pink paper 🎀"
}
```

> **Note**: Items are sourced from the user's active cart. An empty cart returns a `400` error.

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "id": "ord-1720000111111",
    "status": "pending",
    "subtotal": 31.98,
    "shippingFee": 5.00,
    "total": 36.98,
    "shippingName": "Sanduni Perera",
    "shippingAddress": "12/4 Flower Road",
    "shippingCity": "Colombo",
    "shippingPhone": "+94 77 123 4567",
    "notes": "Please wrap in pink paper 🎀",
    "placedAt": "2026-09-09T08:00:00Z",
    "items": [
      {
        "productId": "1",
        "productName": "Golden Bloom Pop-up Card",
        "unitPrice": 15.99,
        "qty": 2,
        "lineTotal": 31.98
      }
    ]
  },
  "message": "Order placed successfully! We'll start crafting your card with love 💌"
}
```

---

### `PATCH /orders/:id/cancel`

Cancel an order (only if status is `pending` or `confirmed`).

- **Access**: 🔒 `user` (own), `admin` (any)

**Response `200 OK`:**
```json
{
  "success": true,
  "data": { "id": "ord-1720000111111", "status": "cancelled" },
  "message": "Order cancelled successfully."
}
```

**Error `400`** (cannot cancel shipped order):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Order cannot be cancelled — it has already been shipped."
  }
}
```

---

### `PATCH /orders/:id/status` _(Admin)_

Update order status (full lifecycle management).

- **Access**: 🔒 `admin`

**Request:**
```json
{ "status": "shipped" }
```

**Valid status values**: `pending` → `confirmed` → `processing` → `shipped` → `delivered` | `cancelled`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": { "id": "ord-1720000111111", "status": "shipped", "updatedAt": "2026-09-09T10:00:00Z" },
  "message": "Order status updated to 'shipped'."
}
```

---

## Review Endpoints

### `GET /products/:id/reviews`

Get all approved reviews for a product.

- **Access**: Public

**Query Parameters:** `page`, `limit`, `sortBy` (`rating`, `createdAt`)

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "rev-001",
      "user": { "id": "usr-user", "name": "Sanduni Perera" },
      "rating": 5,
      "comment": "Absolutely stunning card! My mother loved it!",
      "createdAt": "2026-08-20T09:00:00Z"
    }
  ],
  "meta": { "page": 1, "limit": 10, "total": 23, "averageRating": 4.7 }
}
```

---

### `POST /products/:id/reviews`

Submit a review for a product (one review per user per product).

- **Access**: 🔒 `user`, `admin`

**Request:**
```json
{
  "rating": 5,
  "comment": "Absolutely stunning card! My mother loved it!"
}
```

| Field     | Type      | Required | Validation           |
|-----------|-----------|----------|----------------------|
| `rating`  | `integer` | ✅        | Between 1 and 5      |
| `comment` | `string`  | ❌        | Max 1000 chars       |

**Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "id": "rev-001",
    "productId": "1",
    "rating": 5,
    "comment": "Absolutely stunning card! My mother loved it!",
    "createdAt": "2026-09-09T08:00:00Z"
  },
  "message": "Thank you for your review! ⭐"
}
```

**Error `409`** (already reviewed):
```json
{
  "success": false,
  "error": { "code": "CONFLICT", "message": "You have already submitted a review for this product." }
}
```

---

### `DELETE /products/:productId/reviews/:reviewId`

Delete a review.

- **Access**: 🔒 `user` (own review only), `admin` (any review)

**Response `200 OK`:**
```json
{ "success": true, "message": "Review deleted." }
```

---

## Admin Endpoints

### `GET /admin/users`

List all registered users (paginated).

- **Access**: 🔒 `admin`

**Query Parameters:** `page`, `limit`, `search` (name/email/username), `role`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "usr-user",
      "username": "user",
      "name": "Sanduni Perera",
      "email": "user@cutecard.lk",
      "role": "user",
      "isActive": true,
      "createdAt": "2026-02-15"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 42 }
}
```

---

### `GET /admin/users/:id`

Get a specific user's full profile.

- **Access**: 🔒 `admin`

**Response `200 OK`:** _(full user object including orderCount, wishlistCount)_

---

### `PATCH /admin/users/:id`

Update a user's role or active status.

- **Access**: 🔒 `admin`

**Request:**
```json
{ "role": "admin", "isActive": false }
```

**Response `200 OK`:** _(updated user object)_

---

### `GET /admin/orders`

List all orders across all users.

- **Access**: 🔒 `admin`

**Query Parameters:** `status`, `userId`, `dateFrom`, `dateTo`, `page`, `limit`

**Response `200 OK`:** _(paginated order list with user info embedded)_

---

### `GET /admin/dashboard`

Aggregate stats for the admin dashboard.

- **Access**: 🔒 `admin`

**Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "totalUsers": 42,
    "totalProducts": 8,
    "totalOrders": 127,
    "totalRevenue": 2543.87,
    "pendingOrders": 5,
    "lowStockProducts": [
      { "id": "2", "name": "Vintage Botanical Love", "stockQty": 2 }
    ],
    "recentOrders": [ "..." ],
    "topProducts": [
      { "id": "1", "name": "Golden Bloom Pop-up Card", "soldQty": 43 }
    ]
  }
}
```

---

## Endpoint Summary Table

| Method   | Endpoint                          | Auth     | Description                        |
|----------|-----------------------------------|----------|------------------------------------|
| `POST`   | `/auth/login`                     | Public   | Login and get JWT                  |
| `POST`   | `/auth/register`                  | Public   | Register new account               |
| `POST`   | `/auth/logout`                    | User     | Logout / invalidate token          |
| `GET`    | `/users/me`                       | User     | Get own profile                    |
| `PATCH`  | `/users/me`                       | User     | Update own profile                 |
| `PATCH`  | `/users/me/password`              | User     | Change password                    |
| `GET`    | `/products`                       | Public   | List products (filter + paginate)  |
| `GET`    | `/products/:id`                   | Public   | Get product detail                 |
| `POST`   | `/products`                       | Admin    | Create product                     |
| `PUT`    | `/products/:id`                   | Admin    | Replace product                    |
| `PATCH`  | `/products/:id`                   | Admin    | Partial update product             |
| `DELETE` | `/products/:id`                   | Admin    | Soft-delete product                |
| `GET`    | `/categories`                     | Public   | List all categories                |
| `POST`   | `/categories`                     | Admin    | Create category                    |
| `GET`    | `/cart`                           | User     | Get cart                           |
| `POST`   | `/cart`                           | User     | Add item to cart                   |
| `PATCH`  | `/cart/:itemId`                   | User     | Update cart item qty               |
| `DELETE` | `/cart/:itemId`                   | User     | Remove cart item                   |
| `DELETE` | `/cart`                           | User     | Clear cart                         |
| `GET`    | `/wishlist`                       | User     | Get wishlist                       |
| `POST`   | `/wishlist`                       | User     | Add to wishlist                    |
| `DELETE` | `/wishlist/:productId`            | User     | Remove from wishlist               |
| `DELETE` | `/wishlist`                       | User     | Clear wishlist                     |
| `GET`    | `/orders`                         | User     | List own orders                    |
| `GET`    | `/orders/:id`                     | User     | Get order detail                   |
| `POST`   | `/orders`                         | User     | Place order from cart              |
| `PATCH`  | `/orders/:id/cancel`              | User     | Cancel order                       |
| `PATCH`  | `/orders/:id/status`              | Admin    | Update order status                |
| `GET`    | `/products/:id/reviews`           | Public   | List product reviews               |
| `POST`   | `/products/:id/reviews`           | User     | Submit review                      |
| `DELETE` | `/products/:id/reviews/:reviewId` | User/Admin | Delete review                   |
| `GET`    | `/admin/users`                    | Admin    | List all users                     |
| `GET`    | `/admin/users/:id`                | Admin    | Get user detail                    |
| `PATCH`  | `/admin/users/:id`                | Admin    | Update user role/status            |
| `GET`    | `/admin/orders`                   | Admin    | List all orders                    |
| `GET`    | `/admin/dashboard`                | Admin    | Dashboard aggregate stats          |
