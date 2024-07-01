/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRODUCTS_URL } from '../constants';
import { Product } from '../types';
import { apiSlice } from './apiSlice';

export const productsAPISlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => PRODUCTS_URL,
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query<Product, string>({
      query: id => `${PRODUCTS_URL}/${id}`,
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
  }),
  overrideExisting: false,
});

export const { useGetProductsQuery, useGetProductsDetailsQuery }: any =
  productsAPISlice;
