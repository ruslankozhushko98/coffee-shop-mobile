import { createApi } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

import { SecureStoreKeys } from '@/libs/utils/enum';
import { AuthResponse, SignInDto, SignUpDto } from '@/libs/utils/types';
import { getBaseQuery } from '@/libs/utils/baseQuery';
import { User } from '@/models';
import { setUser } from './auth.slice';

export const authApi = createApi({
  reducerPath: 'auth',

  baseQuery: getBaseQuery(),

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
