/* eslint-disable @typescript-eslint/no-explicit-any */
import { ORDERS_URL } from '../constants';
import { OrderItemsElement } from '../types';
import { apiSlice } from './apiSlice';

export const ordersAPISlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createOrder: builder.mutation<OrderItemsElement, OrderItemsElement>({
      query: order => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation }: any = ordersAPISlice;
