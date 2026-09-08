import React, { createContext, useCallback, useContext, useState } from "react";
import { message } from "antd";

/* ─── Types ───────────────────────────────────────────── */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  gifUrl?: string;
  qty: number;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  gifUrl?: string;
}

interface ShopContextValue {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartCount: number;
  wishlistCount: number;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (item: WishlistItem) => void;
  clearWishlist: () => void;
  isWishlisted: (id: string) => boolean;
  isInCart: (id: string) => boolean;
}

/* ─── Context ────────────────────────────────────────── */
const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const addToCart = useCallback(
    (item: Omit<CartItem, "qty">, qty: number = 1) => {
      setCart((prev) => {
        const existing = prev.find((c) => c.id === item.id);
        if (existing) {
          messageApi.info(`${item.name} quantity updated (+${qty})`);
          return prev.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + qty } : c
          );
        }
        messageApi.success(`${item.name} added to cart 🛒`);
        return [...prev, { ...item, qty }];
      });
    },
    [messageApi]
  );

  const updateQty = useCallback((id: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((c) => c.id !== id);
      }
      return prev.map((c) => (c.id === id ? { ...c, qty } : c));
    });
  }, []);

  const removeFromCart = useCallback(
    (id: string) => {
      setCart((prev) => prev.filter((c) => c.id !== id));
      messageApi.info("Item removed from cart");
    },
    [messageApi]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (item: WishlistItem) => {
      setWishlist((prev) => {
        const exists = prev.some((w) => w.id === item.id);
        if (exists) {
          messageApi.info(`${item.name} removed from wishlist`);
          return prev.filter((w) => w.id !== item.id);
        }
        messageApi.success(`${item.name} added to wishlist 💜`);
        return [...prev, item];
      });
    },
    [messageApi]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlist.some((w) => w.id === id),
    [wishlist]
  );

  const isInCart = useCallback(
    (id: string) => cart.some((c) => c.id === id),
    [cart]
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        cartCount: cart.reduce((sum, c) => sum + c.qty, 0),
        wishlistCount: wishlist.length,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        toggleWishlist,
        clearWishlist,
        isWishlisted,
        isInCart,
      }}
    >
      {contextHolder}
      {children}
    </ShopContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────── */
export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside <ShopProvider>");
  return ctx;
}
