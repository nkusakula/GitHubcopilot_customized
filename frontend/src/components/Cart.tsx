import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, CartItem } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const getEffectivePrice = (item: CartItem): number =>
  item.discount ? item.price * (1 - item.discount) : item.price;

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount } = useCart();
  const { darkMode } = useTheme();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className="text-primary mb-6">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>Order Placed!</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 text-lg`}>
            Thank you for your order. We'll process it shortly.
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (itemCount === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
        <div className="max-w-2xl mx-auto text-center py-20">
          <div className={`${darkMode ? 'text-gray-500' : 'text-gray-400'} mb-6`}>
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>Your cart is empty</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 text-lg`}>
            Add some products to get started!
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
            Shopping Cart
            <span className={`ml-3 text-lg font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </span>
          </h1>
          <button
            onClick={clearCart}
            className={`text-sm ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors`}
            aria-label="Clear cart"
          >
            Clear all
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cartItems.map((item: CartItem) => {
            const effectivePrice = getEffectivePrice(item);
            const lineTotal = effectivePrice * item.quantity;

            return (
              <div
                key={item.productId}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow flex gap-4 transition-colors duration-300`}
              >
                <div className={`w-24 h-24 flex-shrink-0 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg overflow-hidden`}>
                  <img
                    src={`/${item.imgName}`}
                    alt={item.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <h3 className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} truncate`}>{item.name}</h3>
                  <div className="mt-1">
                    {item.discount ? (
                      <span className="text-primary font-medium">
                        ${effectivePrice.toFixed(2)}{' '}
                        <span className="text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                      </span>
                    ) : (
                      <span className="text-primary font-medium">${item.price.toFixed(2)}</span>
                    )}
                    <span className={`text-xs ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>each</span>
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1`}>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className={`w-7 h-7 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <span aria-hidden="true">-</span>
                      </button>
                      <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[1.5rem] text-center`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className={`w-7 h-7 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <span aria-hidden="true">+</span>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className={`text-sm ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors`}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 text-right">
                  <p className={`font-bold text-lg ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                    ${lineTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow transition-colors duration-300`}>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>Order Summary</h2>
          <div className="space-y-2 mb-4">
            {cartItems.map((item: CartItem) => {
              const effectivePrice = getEffectivePrice(item);
              return (
                <div key={item.productId} className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} truncate max-w-xs`}>
                    {item.name} × {item.quantity}
                  </span>
                  <span className={darkMode ? 'text-light' : 'text-gray-800'}>
                    ${(effectivePrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} pt-4 flex justify-between items-center`}>
            <span className={`text-xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>Total</span>
            <span className="text-2xl font-bold text-primary">${cartTotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-medium transition-colors"
            aria-label="Place order"
          >
            Place Order
          </button>
          <Link
            to="/products"
            className={`mt-3 block text-center text-sm ${darkMode ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'} transition-colors`}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
