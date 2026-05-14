export interface CartProduct {
  productId: number;
  name: string;
  price: number;
  imgName: string;
  discount?: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

export const getCartItemUnitPrice = (product: CartProduct) =>
  product.discount ? product.price * (1 - product.discount) : product.price;

export const addCartItem = (
  items: CartItem[],
  product: CartProduct,
  quantity: number
) => {
  if (quantity <= 0) {
    return items;
  }

  const existingItem = items.find(item => item.productId === product.productId);

  if (!existingItem) {
    return [...items, { ...product, quantity }];
  }

  return items.map(item =>
    item.productId === product.productId
      ? { ...item, quantity: item.quantity + quantity }
      : item
  );
};

export const updateCartItemQuantity = (
  items: CartItem[],
  productId: number,
  quantity: number
) => {
  if (quantity <= 0) {
    return items.filter(item => item.productId !== productId);
  }

  return items.map(item =>
    item.productId === productId ? { ...item, quantity } : item
  );
};

export const getCartTotals = (items: CartItem[]) =>
  items.reduce(
    (totals, item) => ({
      totalItems: totals.totalItems + item.quantity,
      totalAmount: totals.totalAmount + getCartItemUnitPrice(item) * item.quantity,
    }),
    { totalItems: 0, totalAmount: 0 }
  );
