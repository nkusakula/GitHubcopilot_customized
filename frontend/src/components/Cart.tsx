import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const { darkMode } = useTheme();

  const bg = darkMode ? 'bg-dark' : 'bg-gray-100';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textMain = darkMode ? 'text-light' : 'text-gray-800';
  const textSub = darkMode ? 'text-gray-400' : 'text-gray-600';
  const divider = darkMode ? 'border-gray-700' : 'border-gray-200';
  const controlBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <div className={`min-h-screen ${bg} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-3xl font-bold ${textMain} mb-6 transition-colors duration-300`}>Shopping Cart</h1>

        {items.length === 0 ? (
          <div className={`${cardBg} rounded-lg p-12 text-center shadow-lg transition-colors duration-300`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-16 w-16 mx-auto mb-4 ${textSub}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11" />
              <circle cx="9" cy="21" r="1" fill="currentColor" />
              <circle cx="19" cy="21" r="1" fill="currentColor" />
            </svg>
            <p className={`text-xl ${textSub} mb-6`}>Your cart is empty</p>
            <Link
              to="/products"
              className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={`${cardBg} rounded-lg shadow-lg overflow-hidden transition-colors duration-300`}>
              {items.map((item, index) => {
                const effectivePrice = item.discount
                  ? item.price * (1 - item.discount)
                  : item.price;
                const lineTotal = effectivePrice * item.quantity;

                return (
                  <div
                    key={item.productId}
                    className={`flex items-center gap-4 p-4 ${index < items.length - 1 ? `border-b ${divider}` : ''}`}
                  >
                    <img
                      src={`/${item.imgName}`}
                      alt={item.name}
                      className="h-20 w-20 object-contain rounded-lg flex-shrink-0"
                    />

                    <div className="flex-grow min-w-0">
                      <h3 className={`font-semibold ${textMain} truncate transition-colors duration-300`}>{item.name}</h3>
                      <p className={`text-sm ${textSub} transition-colors duration-300`}>SKU: {item.sku}</p>
                      <div className="mt-1">
                        {item.discount ? (
                          <span className="text-primary font-bold">
                            ${effectivePrice.toFixed(2)}{' '}
                            <span className={`text-sm line-through ${textSub}`}>${item.price.toFixed(2)}</span>
                          </span>
                        ) : (
                          <span className="text-primary font-bold">${effectivePrice.toFixed(2)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className={`flex items-center space-x-2 ${controlBg} rounded-lg p-1 transition-colors duration-300`}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className={`w-7 h-7 flex items-center justify-center ${textMain} hover:text-primary transition-colors duration-300`}
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <span aria-hidden="true">−</span>
                        </button>
                        <span className={`${textMain} min-w-[2rem] text-center text-sm font-medium`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className={`w-7 h-7 flex items-center justify-center ${textMain} hover:text-primary transition-colors duration-300`}
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <span aria-hidden="true">+</span>
                        </button>
                      </div>

                      <span className={`font-semibold ${textMain} text-sm`}>${lineTotal.toFixed(2)}</span>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-red-400 hover:text-red-600 transition-colors text-sm"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={`${cardBg} rounded-lg p-6 shadow-lg transition-colors duration-300`}>
              <div className={`flex justify-between items-center text-xl font-bold ${textMain} mb-6 transition-colors duration-300`}>
                <span>Total</span>
                <span className="text-primary">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={clearCart}
                  className={`flex-1 px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-600 text-light hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-colors`}
                >
                  Clear Cart
                </button>
                <button
                  className="flex-1 bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  onClick={() => alert('Checkout coming soon!')}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
