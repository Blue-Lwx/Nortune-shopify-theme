import { createContext, useContext, useState, ReactNode } from "react";

export type Variant = "blue" | "orange";

interface CartItem {
  id: string;
  variant: Variant;
  quantity: number;
  price: number;
  name: string;
  bundleLabel?: string;
  compareAtPrice?: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (variant: Variant, options?: { quantity?: number; totalPrice?: number; bundleLabel?: string; compareAtPrice?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (variant: Variant, options?: { quantity?: number; totalPrice?: number; bundleLabel?: string; compareAtPrice?: number }) => {
    const quantity = options?.quantity ?? 1;
    const linePrice = options?.totalPrice ?? 29.99 * quantity;
    const unitPrice = linePrice / quantity;
    const bundleLabel = options?.bundleLabel ?? `${quantity} Case${quantity > 1 ? "s" : ""}`;
    const id = `glow-case-${variant}-${quantity}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id,
          variant,
          quantity,
          price: unitPrice,
          name: `Nortune Glow Case - ${variant === "blue" ? "Blue" : "Orange"}`,
          bundleLabel,
          compareAtPrice: options?.compareAtPrice,
        },
      ];
    });
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id);
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, totalItems, totalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
