"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: string | number;
  slug?: string | null;
  name: string;
  price: number | null;
  mainImage: string | null;
  qty: number;
  color?: string | null;
  size?: string | null;
};

type AddItemInput = {
  id: string | number;
  slug?: string | null;
  name: string;
  price: number | null;
  mainImage: string | null;
  color?: string | null;
  size?: string | null;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: AddItemInput, qty?: number) => void;
  removeItem: (id: string | number, color?: string | null, size?: string | null) => void;
  clear: () => void;
  updateQty: (
    id: string | number,
    qty: number,
    color?: string | null,
    size?: string | null
  ) => void;
  count: number;
  subtotal: number;
  lastAdded: CartItem | null;
  toastVisible: boolean;
  hideToast: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "lenshub-cart-v1";

function isSameVariant(
  a: Pick<CartItem, "id" | "color" | "size">,
  b: Pick<CartItem, "id" | "color" | "size">
) {
  return a.id === b.id && a.color === b.color && a.size === b.size;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

      if (!raw) return;

      const parsed = JSON.parse(raw) as CartItem[];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: AddItemInput, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) =>
        isSameVariant(p, {
          id: item.id,
          color: item.color ?? null,
          size: item.size ?? null,
        })
      );

      let next: CartItem[];

      if (existing) {
        next = prev.map((p) =>
          isSameVariant(p, {
            id: item.id,
            color: item.color ?? null,
            size: item.size ?? null,
          })
            ? { ...p, qty: p.qty + qty }
            : p
        );
      } else {
        next = [
          ...prev,
          {
            ...item,
            color: item.color ?? null,
            size: item.size ?? null,
            qty,
          },
        ];
      }

      const added =
        next.find((p) =>
          isSameVariant(p, {
            id: item.id,
            color: item.color ?? null,
            size: item.size ?? null,
          })
        ) ?? {
          ...item,
          color: item.color ?? null,
          size: item.size ?? null,
          qty,
        };

      setLastAdded(added);
      setToastVisible(true);

      return next;
    });
  };

  const removeItem = (
    id: string | number,
    color?: string | null,
    size?: string | null
  ) => {
    setItems((prev) =>
      prev.filter(
        (p) =>
          !isSameVariant(p, {
            id,
            color: color ?? null,
            size: size ?? null,
          })
      )
    );
  };

  const clear = () => setItems([]);

  const updateQty = (
    id: string | number,
    qty: number,
    color?: string | null,
    size?: string | null
  ) => {
    const safeQty = Math.max(1, Math.floor(qty) || 1);

    setItems((prev) =>
      prev.map((p) =>
        isSameVariant(p, {
          id,
          color: color ?? null,
          size: size ?? null,
        })
          ? { ...p, qty: safeQty }
          : p
      )
    );
  };

  const hideToast = () => setToastVisible(false);

  const count = useMemo(
    () => items.reduce((acc, item) => acc + item.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((acc, item) => acc + (item.price ?? 0) * item.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clear,
        updateQty,
        count,
        subtotal,
        lastAdded,
        toastVisible,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return ctx;
}