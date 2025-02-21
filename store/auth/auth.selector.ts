import { useSelector } from 'react-redux';

import { AppState } from '@/store/store';

export const useUserSelector = () =>
  useSelector((appState: AppState) => appState.authSlice.user);
