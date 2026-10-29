import { useContext, useMemo, useState, type ReactNode } from 'react';
import { CartContext, type CartItem } from './cartContextUtils';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) return;

    setItems(currentItems => {
      const existingItem = currentItems.find(current => current.productId === item.productId);
      if (!existingItem) return [...currentItems, item];

      return currentItems.map(current => current.productId === item.productId
        ? { ...current, unitPrice: item.unitPrice, quantity: current.quantity + item.quantity }
        : current);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (!Number.isInteger(quantity) || quantity < 1) return;

    setItems(currentItems => currentItems.map(item => item.productId === productId
      ? { ...item, quantity }
      : item));
  };

  const removeItem = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.productId !== productId));
  };

  const clearCart = () => setItems([]);
  const itemCount = useMemo(() => items.reduce((total, item) => total + item.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, itemCount, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
