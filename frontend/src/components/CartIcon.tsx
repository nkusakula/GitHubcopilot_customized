import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function CartIcon() {
  const { totalItems } = useCart();
  const { darkMode } = useTheme();

  return (
    <Link
      to="/cart"
      className={`relative p-2 rounded-full focus:outline-none transition-colors ${darkMode ? 'text-light hover:text-primary' : 'text-gray-700 hover:text-primary'}`}
      aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11"
        />
        <circle cx="9" cy="21" r="1" fill="currentColor" />
        <circle cx="19" cy="21" r="1" fill="currentColor" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center leading-none">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  );
}
