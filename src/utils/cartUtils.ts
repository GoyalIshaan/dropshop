import { CartState, CartItem } from '../types';

const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};
export const updateCart = (state: CartState) => {
  state.itemsPrice = addDecimals(
    state.items.reduce(
      (acc: number, item: CartItem) => acc + item.price * item.qty,
      0,
    ),
  );

  //calculating shipping price
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 100);

  //tax price
  state.taxPrice = addDecimals(
    Number((0.15 * Number(state.itemsPrice)).toFixed(2)),
  );

  //total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice),
  );
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
