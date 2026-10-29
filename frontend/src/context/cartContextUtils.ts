import { createContext } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  imgName: string;
  unitPrice: number;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);
