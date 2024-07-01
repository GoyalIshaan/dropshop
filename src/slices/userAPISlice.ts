/* eslint-disable @typescript-eslint/no-explicit-any */
import { USERS_URL } from '../constants';
import { IUser } from '../types';
import { apiSlice } from './apiSlice';

export const userAPISlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<IUser, void>({
      query: data => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<IUser, IUser>({
      query: data => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation }: any =
  userAPISlice;
