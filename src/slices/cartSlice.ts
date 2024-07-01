import { createSlice } from '@reduxjs/toolkit';
import { CartItem, CartState } from '../types';
import { updateCart } from '../utils/cartUtils';

const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : {
      items: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem: CartItem = action.payload;
      const existingItem: CartItem | undefined = state.items.find(
        item => item._id === newItem._id,
      );
      if (existingItem) {
        existingItem.qty < existingItem.countInStock &&
          (existingItem.qty += newItem.qty);
      } else {
        state.items.push({
          ...newItem,
          qty: newItem.qty,
        });
      }
      updateCart(state);
    },
    editQuantity: (state, action) => {
      const { _id, qty } = action.payload as CartItem;
      const item = state.items.find(item => item._id === _id);
      if (item) {
        item.qty = qty;
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      const { _id } = action.payload as CartItem;
      state.items = state.items.filter(item => item._id !== _id);
      updateCart(state);
    },
  },
});

export const { addToCart, editQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
