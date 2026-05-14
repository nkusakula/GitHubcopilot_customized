import { describe, expect, it } from 'vitest';
import {
  addCartItem,
  CartItem,
  getCartTotals,
  getCartItemUnitPrice,
  updateCartItemQuantity,
} from './cartUtils';

describe('cartUtils', () => {
  const baseCartItem: CartItem = {
    productId: 1,
    name: 'AI Keyboard',
    imgName: 'keyboard.png',
    price: 100,
    discount: 0.2,
    quantity: 1,
  };

  it('adds quantities for the same product instead of duplicating items', () => {
    const items = addCartItem([baseCartItem], baseCartItem, 2);

    expect(items).toEqual([{ ...baseCartItem, quantity: 3 }]);
  });

  it('adds a new item to an empty cart', () => {
    expect(addCartItem([], baseCartItem, 1)).toEqual([baseCartItem]);
  });

  it('adds a different product without mutating existing items', () => {
    const newItem = {
      productId: 2,
      name: 'Copilot Mouse',
      imgName: 'mouse.png',
      price: 50,
      quantity: 1,
    };

    expect(addCartItem([baseCartItem], newItem, 1)).toEqual([baseCartItem, newItem]);
  });

  it('removes items when quantity is updated to zero', () => {
    const items = updateCartItemQuantity([baseCartItem], baseCartItem.productId, 0);

    expect(items).toEqual([]);
  });

  it('removes items when quantity is updated to a negative number', () => {
    const items = updateCartItemQuantity([baseCartItem], baseCartItem.productId, -1);

    expect(items).toEqual([]);
  });

  it('leaves the cart unchanged when updating a non-existent product', () => {
    const items = updateCartItemQuantity([baseCartItem], 999, 3);

    expect(items).toEqual([baseCartItem]);
  });

  it('calculates totals using discounted prices', () => {
    const totals = getCartTotals([
      { ...baseCartItem, quantity: 2 },
      {
        productId: 2,
        name: 'Copilot Mouse',
        imgName: 'mouse.png',
        price: 50,
        quantity: 1,
      },
    ]);

    expect(totals.totalItems).toBe(3);
    expect(totals.totalAmount).toBe((100 * 0.8 * 2) + (50 * 1));
  });

  it('returns the discounted unit price when a discount exists', () => {
    expect(getCartItemUnitPrice(baseCartItem)).toBe(80);
    expect(
      getCartItemUnitPrice({
        productId: 2,
        name: 'Copilot Mouse',
        imgName: 'mouse.png',
        price: 50,
      })
    ).toBe(50);
  });
});
