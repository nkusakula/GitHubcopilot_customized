import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';
import { getCartItemUnitPrice } from '../../../context/cartUtils';

export default function Cart() {
  const { items, totalAmount, totalItems, updateQuantity, removeFromCart } = useCart();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
              Cart
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>
              Review your selected items before checkout.
            </p>
          </div>
          <Link
            to="/products"
            className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-lg transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className={`${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-800'} rounded-2xl shadow-md p-10 text-center transition-colors duration-300`}>
            <p className="text-lg font-medium">Your cart is empty.</p>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 transition-colors duration-300`}>
              Add products from the catalog to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {items.map(item => {
                const unitPrice = getCartItemUnitPrice(item);

                return (
                  <div
                    key={item.productId}
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-md p-5 flex flex-col sm:flex-row gap-4 transition-colors duration-300`}
                  >
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-xl p-3 flex items-center justify-center sm:w-40 transition-colors duration-300`}>
                      <img
                        src={`/${item.imgName}`}
                        alt={item.name}
                        className="h-28 w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                            {item.name}
                          </h2>
                          <p className="text-primary font-semibold">
                            ${unitPrice.toFixed(2)} each
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'} transition-colors duration-300`}
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <span aria-hidden="true">-</span>
                          </button>
                          <span
                            className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}
                            aria-live="polite"
                            aria-atomic="true"
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <span aria-hidden="true">+</span>
                          </button>
                        </div>
                        <p className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>
                          ${(unitPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className={`${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-800'} rounded-2xl shadow-md p-6 h-fit transition-colors duration-300`}>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <span>Total</span>
                <span className="text-2xl font-bold text-primary">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg transition-colors"
                aria-label={`Proceed to checkout with ${totalItems} items`}
              >
                Checkout
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
