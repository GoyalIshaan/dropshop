/* eslint-disable @typescript-eslint/no-explicit-any */
import { ORDERS_URL, PAYPAL_URL } from '../constants';
import { OrderItemsElement, OrderState } from '../types';
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
    getOrderByID: builder.query<OrderItemsElement, string>({
      query: id => ({
        url: `${ORDERS_URL}/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation<void, { orderId: string; details: OrderState }>({
      query: args => ({
        url: `${ORDERS_URL}/${args.orderId}/pay`,
        method: 'PUT',
        body: { ...args.details },
      }),
    }),
    getPayPalClientId: builder.query<string, void>({
      query: () => ({
        url: PAYPAL_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query<OrderItemsElement[], void>({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query<OrderItemsElement[], void>({
      query: () => ({
        url: ORDERS_URL,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<void, string>({
      query: orderId => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIDQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
}: any = ordersAPISlice;
