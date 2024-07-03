/* eslint-disable @typescript-eslint/no-explicit-any */
import { PRODUCTS_URL } from '../constants';
import { Product, Review } from '../types';
import { apiSlice } from './apiSlice';

export const productsAPISlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
        providesTags: ['Product'],
        keepUnusedDataFor: 5,
      }),
    }),
    getProductsDetails: builder.query<Product, string>({
      query: id => `${PRODUCTS_URL}/${id}`,
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation<void, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<void, Product>({
      query: product => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: 'PUT',
        body: { ...product },
      }),
      invalidatesTags: ['Product'],
    }),
    uploadImage: builder.mutation<{ imagePath: string }, FormData>({
      query: formData => ({
        url: '/api/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: id => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    createReview: builder.mutation<
      string,
      { id: string; rating: number; comment: string }
    >({
      query: ({ id, rating, comment }) => ({
        url: `${PRODUCTS_URL}/${id}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
    }),
    getReviews: builder.query<Review[], string>({
      query: id => ({
        url: `${PRODUCTS_URL}/${id}/reviews`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetReviewsQuery,
}: any = productsAPISlice;
