import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { darkMode } = useTheme();

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
        <div className="max-w-5xl mx-auto">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6 transition-colors duration-300`}>Cart</h1>
          <div className={`${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} rounded-lg p-6 shadow-md transition-colors duration-300`}>
            Your cart is empty.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 px-4 transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-6 transition-colors duration-300`}>Cart</h1>

        <div className="space-y-4">
          {cartItems.map(item => {
            const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
            return (
              <div
                key={item.productId}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md flex gap-4 items-center transition-colors duration-300`}
              >
                <img src={`/${item.imgName}`} alt={item.name} className="w-20 h-20 object-contain rounded bg-gray-50" />
                <div className="flex-grow">
                  <h2 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}>{item.name}</h2>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm transition-colors duration-300`}>
                    ${(itemPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className={`flex items-center space-x-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1 transition-colors duration-300`}>
                  <button
                    onClick={() => updateItemQuantity(item.productId, item.quantity - 1)}
                    className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <span aria-hidden="true">-</span>
                  </button>
                  <span className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-[2rem] text-center transition-colors duration-300`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateItemQuantity(item.productId, item.quantity + 1)}
                    className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-sm text-red-500 hover:text-red-600"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} mt-6 rounded-lg p-6 shadow-md transition-colors duration-300`}>
          <div className="flex justify-between items-center">
            <span className={`${darkMode ? 'text-light' : 'text-gray-800'} text-xl font-semibold transition-colors duration-300`}>Total</span>
            <span className="text-primary text-2xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCart}
              className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-md transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
