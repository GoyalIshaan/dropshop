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
    profile: builder.mutation<void, IUser>({
      query: data => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `${USERS_URL}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUserById: builder.query<IUser, string>({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        method: 'GET',
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: id => ({
        url: `${USERS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<void, { id: string; data: Partial<IUser> }>({
      query: ({ id, data }) => ({
        url: `${USERS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
}: any = userAPISlice;
