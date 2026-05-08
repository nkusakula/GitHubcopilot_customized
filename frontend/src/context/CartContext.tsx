import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  description: string;
  price: number;
  imgName: string;
  // Supports decimal (0.15) or percentage (15). Values are clamped to [0, 1] after normalization.
  discount?: number;
  quantity: number;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getDiscountedPrice = (price: number, discount?: number) => {
  if (discount === undefined) return price;
  const normalizedDiscount = discount > 1 ? discount / 100 : discount;
  const safeDiscount = Math.min(Math.max(normalizedDiscount, 0), 1);
  return price * (1 - safeDiscount);
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.productId === item.productId);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateItemQuantity = (productId: number, quantity: number) => {
    setCartItems(prev =>
      prev
        .map(item => (item.productId === productId ? { ...item, quantity } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((sum, item) => {
        return sum + getDiscountedPrice(item.price, item.discount) * item.quantity;
      }, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateItemQuantity, removeFromCart, clearCart, totalItems, totalPrice }}
    >
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
