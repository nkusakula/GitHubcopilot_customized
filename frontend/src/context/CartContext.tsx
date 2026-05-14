import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import {
  addCartItem,
  CartItem,
  CartProduct,
  getCartTotals,
  updateCartItemQuantity,
} from './cartUtils';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (product: CartProduct, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const value = useMemo(() => {
    const totals = getCartTotals(items);

    return {
      items,
      totalItems: totals.totalItems,
      totalAmount: totals.totalAmount,
      addToCart: (product: CartProduct, quantity: number) => {
        setItems(currentItems => addCartItem(currentItems, product, quantity));
      },
      updateQuantity: (productId: number, quantity: number) => {
        setItems(currentItems =>
          updateCartItemQuantity(currentItems, productId, quantity)
        );
      },
      removeFromCart: (productId: number) => {
        setItems(currentItems =>
          updateCartItemQuantity(currentItems, productId, 0)
        );
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
