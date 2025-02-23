import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import * as SecureStore from 'expo-secure-store';

import { SecureStoreKeys } from './enum';

export const getBaseQuery = (baseUrl = process.env.EXPO_PUBLIC_BASE_URL) =>
  fetchBaseQuery({
    baseUrl,

    prepareHeaders(headers) {
      const accessToken = SecureStore.getItem(SecureStoreKeys.ACCESS_TOKEN);

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  });
