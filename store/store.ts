import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import logger from 'redux-logger';

import { authApi } from './auth/auth.api';
import { authSlice } from './auth/auth.slice';
import { menuApi } from './menu/menu.api';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      logger,
      authApi.middleware,
      menuApi.middleware,
    ),
});

export type AppState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
