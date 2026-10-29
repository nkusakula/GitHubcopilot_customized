import { describe, expect, it } from 'vitest';
import { cartReducer, getUnitPrice } from './CartContext';
import { Product } from '../types/Product';

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

describe('cartReducer', () => {
  it('adds products and combines quantities for the same product', () => {
    const firstAdd = cartReducer({ items: [] }, { type: 'add', product, quantity: 1 });
    const secondAdd = cartReducer(firstAdd, { type: 'add', product, quantity: 2 });

    expect(secondAdd.items).toEqual([{ product, quantity: 3 }]);
  });

  it('updates quantity and removes an item', () => {
    const state = { items: [{ product, quantity: 2 }] };
    const updated = cartReducer(state, {
      type: 'updateQuantity',
      productId: product.productId,
      quantity: 4
    });
    const removed = cartReducer(updated, { type: 'remove', productId: product.productId });

    expect(updated.items[0].quantity).toBe(4);
    expect(removed.items).toEqual([]);
  });

  it('uses the discounted unit price when calculating cart totals', () => {
    expect(getUnitPrice(product)).toBe(75);
  });
});
