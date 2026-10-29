/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'add'; product: Product; quantity: number }
  | { type: 'updateQuantity'; productId: number; quantity: number }
  | { type: 'remove'; productId: number };

interface CartContextType extends CartState {
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const initialCartState: CartState = { items: [] };

const CartContext = createContext<CartContextType | null>(null);

export function getUnitPrice(product: Product): number {
  return product.price * (1 - (product.discount ?? 0));
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      if (action.quantity <= 0) return state;

      const existingItem = state.items.find(
        item => item.product.productId === action.product.productId
      );
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.product.productId === action.product.productId
              ? { ...item, quantity: item.quantity + action.quantity }
              : item
          )
        };
      }

      return {
        items: [...state.items, { product: action.product, quantity: action.quantity }]
      };
    }
    case 'updateQuantity':
      if (action.quantity < 1) return state;
      return {
        items: state.items.map(item =>
          item.product.productId === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        )
      };
    case 'remove':
      return {
        items: state.items.filter(item => item.product.productId !== action.productId)
      };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = state.items.reduce(
    (total, item) => total + getUnitPrice(item.product) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        itemCount,
        subtotal,
        addToCart: (product, quantity) => dispatch({ type: 'add', product, quantity }),
        updateQuantity: (productId, quantity) =>
          dispatch({ type: 'updateQuantity', productId, quantity }),
        removeFromCart: productId => dispatch({ type: 'remove', productId })
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
