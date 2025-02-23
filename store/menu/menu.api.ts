import { createApi } from '@reduxjs/toolkit/query/react';

import { getBaseQuery } from '@/libs/utils/baseQuery';
import { Beverage } from '@/models';

export const menuApi = createApi({
  reducerPath: 'menuApi',

  baseQuery: getBaseQuery(),

  endpoints: (builder) => ({
    fetchAllBeverages: builder.query<Array<Beverage>, string>({
      query: (title) => ({
        url: '/menu/all',
        method: 'GET',
        params: { title },
      }),
    }),

    fetchFavoriteBeverages: builder.query<Array<Beverage>, string>({
      query: (title) => ({
        url: '/menu/favorites',
        method: 'GET',
        params: { title },
      }),
    }),

    fetchBeverageById: builder.query<Beverage, number>({
      query: (beverageId) => ({
        url: `/menu/beverages/${beverageId}`,
        method: 'GET',
      }),
    }),

    toggleBeverageFavorite: builder.mutation<Beverage, number>({
      query: (beverageId) => ({
        url: `/menu/${beverageId}/toggle-favorite`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useFetchAllBeveragesQuery,
  useFetchFavoriteBeveragesQuery,
  useFetchBeverageByIdQuery,
  useToggleBeverageFavoriteMutation,
} = menuApi;
