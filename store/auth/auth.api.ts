import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import SecureStore from 'expo-secure-store';

import { SecureStoreKeys } from '@/libs/utils/enum';
import { AuthResponse, SignInDto, SignUpDto } from '@/libs/utils/types';
import { User } from '@/models';
import { setUser } from './auth.slice';

export const authApi = createApi({
  reducerPath: 'auth',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,

    prepareHeaders(headers) {
      const accessToken = SecureStore.getItemAsync(SecureStoreKeys.ACCESS_TOKEN);

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInDto>({
      query: (body) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),

      async onQueryStarted(_, api) {
        try {
          const { data } = await api.queryFulfilled;

          await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, data.accessToken);

          api.dispatch(setUser(data.user));
        } catch (error) {
          api.dispatch(setUser(null));
        }
      },
    }),

    signUp: builder.mutation<AuthResponse, SignUpDto>({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),

      async onQueryStarted(_, api) {
        try {
          const { data } = await api.queryFulfilled;

          await SecureStore.setItemAsync(SecureStoreKeys.ACCESS_TOKEN, data.accessToken);

          api.dispatch(setUser(data.user));
        } catch (error) {
          api.dispatch(setUser(null));
        }
      },
    }),

    fetchMe: builder.query<User, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),

      async onQueryStarted(_, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setUser(data));
        } catch (error) {
          api.dispatch(setUser(null));
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useFetchMeQuery,
} = authApi;
