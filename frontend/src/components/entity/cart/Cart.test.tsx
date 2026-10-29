// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';
import { CartProvider, useCart } from '../../../context/CartContext';
import { ThemeProvider } from '../../../context/ThemeContext';
import { Product } from '../../../types/Product';

const product: Product = {
  productId: 1,
  supplierId: 1,
  name: 'SmartFeeder One',
  description: 'Automatic cat feeder',
  price: 100,
  sku: 'CAT-FEED-001',
  unit: 'piece',
  imgName: 'feeder.png',
  discount: 0.25
};

function CartTestHarness() {
  const { addToCart } = useCart();

  return (
    <>
      <button onClick={() => addToCart(product, 2)}>Add test item</button>
      <Cart />
    </>
  );
}

describe('Cart page', () => {
  it('displays the empty state and supports quantity changes and removal', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <CartProvider>
            <CartTestHarness />
          </CartProvider>
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Your cart is empty.')).toBeTruthy();
    fireEvent.click(screen.getByText('Add test item'));

    expect(screen.getByText('2 items')).toBeTruthy();
    expect(screen.getAllByText('$150.00')).toHaveLength(2);

    fireEvent.click(screen.getByLabelText('Increase quantity of SmartFeeder One'));
    expect(screen.getByLabelText('Quantity of SmartFeeder One').textContent).toBe('3');
    expect(screen.getAllByText('$225.00')).toHaveLength(2);

    fireEvent.click(screen.getByLabelText('Remove SmartFeeder One from cart'));
    expect(screen.getByText('Your cart is empty.')).toBeTruthy();
  });
});
