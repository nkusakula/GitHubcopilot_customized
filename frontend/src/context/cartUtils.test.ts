import { describe, expect, it } from 'vitest';
import {
  addCartItem,
  CartItem,
  getCartTotals,
  getCartItemUnitPrice,
  updateCartItemQuantity,
} from './cartUtils';

describe('cartUtils', () => {
  const baseItem: CartItem = {
    productId: 1,
    name: 'AI Keyboard',
    imgName: 'keyboard.png',
    price: 100,
    discount: 0.2,
    quantity: 1,
  };

  it('adds quantities for the same product instead of duplicating items', () => {
    const items = addCartItem([baseItem], baseItem, 2);

    expect(items).toEqual([{ ...baseItem, quantity: 3 }]);
  });

  it('removes items when quantity is updated to zero', () => {
    const items = updateCartItemQuantity([baseItem], baseItem.productId, 0);

    expect(items).toEqual([]);
  });

  it('calculates totals using discounted prices', () => {
    const totals = getCartTotals([
      { ...baseItem, quantity: 2 },
      {
        productId: 2,
        name: 'Copilot Mouse',
        imgName: 'mouse.png',
        price: 50,
        quantity: 1,
      },
    ]);

    expect(totals).toEqual({
      totalItems: 3,
      totalAmount: 210,
    });
  });

  it('returns the discounted unit price when a discount exists', () => {
    expect(getCartItemUnitPrice(baseItem)).toBe(80);
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
