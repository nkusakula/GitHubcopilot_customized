import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { darkMode } = useTheme();
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'}`}>Your Cart</h1>

        {items.length === 0 ? (
          <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-8 text-center`}>
            <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your cart is empty.</p>
            <Link to="/products" className="inline-block bg-primary hover:bg-accent text-white px-5 py-2 rounded-lg transition-colors">
              Browse Products
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-6 items-start">
            <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[42rem] text-left">
                  <thead className={`${darkMode ? 'bg-gray-700 text-light' : 'bg-gray-200 text-gray-700'}`}>
                    <tr>
                      <th scope="col" className="px-4 py-3">Product</th>
                      <th scope="col" className="px-4 py-3">Unit price</th>
                      <th scope="col" className="px-4 py-3">Quantity</th>
                      <th scope="col" className="px-4 py-3">Total</th>
                      <th scope="col" className="px-4 py-3"><span className="sr-only">Remove</span></th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-gray-700 text-light' : 'divide-gray-200 text-gray-800'}`}>
                    {items.map(item => (
                      <tr key={item.productId}>
                        <th scope="row" className="px-4 py-4 font-medium">
                          <div className="flex items-center gap-3">
                            <img src={`/${item.imgName}`} alt="" className="w-16 h-16 object-contain rounded" />
                            <span>{item.name}</span>
                          </div>
                        </th>
                        <td className="px-4 py-4">${item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label={`Decrease ${item.name} quantity`}
                              className={`w-8 h-8 rounded border disabled:opacity-40 ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
                            >
                              -
                            </button>
                            <span className="min-w-6 text-center" aria-label={`${item.quantity} ${item.name} in cart`}>{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              aria-label={`Increase ${item.name} quantity`}
                              className={`w-8 h-8 rounded border ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'}`}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4">${(item.unitPrice * item.quantity).toFixed(2)}</td>
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.9 12.1A2 2 0 0116.1 21H7.9a2 2 0 01-2-1.9L5 7m4 0V4a1 1 0 011-1h4a1 1 0 011 1v3M3 7h18m-11 4v6m4-6v6" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className={`${darkMode ? 'bg-gray-800 text-light' : 'bg-white text-gray-800'} rounded-lg shadow p-6`}>
              <h2 className="text-xl font-bold mb-5">Order Summary</h2>
              <div className={`flex justify-between border-t py-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between border-t py-3 font-semibold ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                type="button"
                disabled
                className="w-full mt-4 bg-primary text-white py-3 rounded-lg opacity-60 cursor-not-allowed"
              >
                Checkout coming soon
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
