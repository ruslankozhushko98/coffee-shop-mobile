import { createSlice } from '@reduxjs/toolkit';

import { User } from '@/models';

type AuthInitialState = {
  user: User | null;
};

const initialState: AuthInitialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: (create) => ({
    setUser: create.reducer<User | null>((state, action) => {
      state.user = action.payload;
    }),
  }),
});

export const { setUser } = authSlice.actions;
