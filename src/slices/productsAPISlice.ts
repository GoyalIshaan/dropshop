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
  }),
  overrideExisting: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetProductsQuery: any = productsAPISlice.useGetProductsQuery;
