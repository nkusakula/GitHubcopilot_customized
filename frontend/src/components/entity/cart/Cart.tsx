import { Link } from 'react-router-dom';
import { getUnitPrice, useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';

export default function Cart() {
  const { items, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();
  const { darkMode } = useTheme();

  return (
    <section className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2`}>
          Your Cart
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>

        {items.length === 0 ? (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-8 text-center`}>
            <p className={`${darkMode ? 'text-light' : 'text-gray-700'} text-lg mb-4`}>
              Your cart is empty.
            </p>
            <Link
              to="/products"
              className="inline-flex px-5 py-2 bg-primary hover:bg-accent text-white rounded-lg transition-colors"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-6 items-start">
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <article
                  key={product.productId}
                  className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4`}
                >
                  <img
                    src={`/images/${product.imgName}`}
                    alt={product.name}
                    className="w-24 h-24 object-contain self-center sm:self-auto"
                  />
                  <div className="flex-grow min-w-0">
                    <h2 className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                      {product.name}
                    </h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                      ${getUnitPrice(product).toFixed(2)} each
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.productId, quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className={`w-8 h-8 rounded border ${darkMode ? 'border-gray-600 text-light' : 'border-gray-300 text-gray-700'} disabled:opacity-40`}
                      >
                        -
                      </button>
                      <span
                        aria-label={`Quantity of ${product.name}`}
                        className={`${darkMode ? 'text-light' : 'text-gray-800'} min-w-6 text-center`}
                      >
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.productId, quantity + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className={`w-8 h-8 rounded border ${darkMode ? 'border-gray-600 text-light' : 'border-gray-300 text-gray-700'}`}
                      >
                        +
                      </button>
                    </div>
                    <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} min-w-20 text-right`}>
                      ${(getUnitPrice(product) * quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.productId)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-light' : 'text-gray-800'} mb-4`}>
                Order Summary
              </h2>
              <div className={`flex justify-between border-t ${darkMode ? 'border-gray-700 text-light' : 'border-gray-200 text-gray-700'} pt-4`}>
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
