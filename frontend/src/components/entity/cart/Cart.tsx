import { useCart } from '../../../context/CartContext';
import { useTheme } from '../../../context/ThemeContext';
import { useState } from 'react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { darkMode } = useTheme();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = appliedCoupon ? 0.05 : 0;
  const discountAmount = subtotal * discountRate;
  const shipping = 10;
  const grandTotal = subtotal - discountAmount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(true);
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-dark' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
            Shopping Cart
          </h1>
          <div className={`${darkMode ? 'bg-dark-secondary' : 'bg-white'} rounded-lg shadow-lg p-12 text-center`}>
            <svg 
              className={`mx-auto h-24 w-24 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-4`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            <h2 className={`text-2xl font-semibold ${darkMode ? 'text-light' : 'text-gray-700'} mb-2`}>
              Your cart is empty
            </h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6`}>
              Add some products to get started!
            </p>
            <a 
              href="/products"
              className="inline-block bg-primary hover:bg-accent text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-24 pb-12 ${darkMode ? 'bg-dark' : 'bg-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
          Shopping Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Table */}
          <div className="lg:col-span-2">
            <div className={`${darkMode ? 'bg-dark-secondary' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-dark' : 'bg-gray-50'}`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        S. No.
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        Product Image
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        Product Name
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        Unit Price
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        Quantity
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        Total
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <tr key={item.productId} className={darkMode ? 'border-gray-700' : ''}>
                        <td className={`px-6 py-4 ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                          {index + 1}
                        </td>
                        <td className="px-6 py-4">
                          <img 
                            src={`/images/${item.imgName}`}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded"
                          />
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-light' : 'text-gray-900'} font-medium`}>
                          {item.name}
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                          ${item.price}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                            className={`w-20 px-3 py-2 border rounded-lg text-center ${
                              darkMode 
                                ? 'bg-dark border-gray-700 text-light' 
                                : 'bg-white border-gray-300 text-gray-900'
                            }`}
                          />
                        </td>
                        <td className={`px-6 py-4 ${darkMode ? 'text-light' : 'text-gray-900'} font-semibold`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Remove item"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-6 w-6" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Coupon Code Section */}
              <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex gap-4 max-w-md">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className={`flex-1 px-4 py-2 border rounded-lg ${
                      darkMode 
                        ? 'bg-dark border-gray-700 text-light placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Apply Coupon
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-green-500 text-sm mt-2">✓ Coupon applied successfully!</p>
                )}
              </div>

              {/* Update Cart Button */}
              <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex justify-end`}>
                <button className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Update Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className={`${darkMode ? 'bg-dark-secondary' : 'bg-white'} rounded-lg shadow-lg p-6`}>
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
                  <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Discount (5%)
                    </span>
                    <span className="font-semibold text-green-500">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
                  <span className={`font-semibold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                
                <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between">
                    <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                      Grand Total
                    </span>
                    <span className={`text-lg font-bold ${darkMode ? 'text-light' : 'text-gray-900'}`}>
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-primary hover:bg-accent text-white py-3 rounded-lg font-semibold text-lg transition-colors">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
