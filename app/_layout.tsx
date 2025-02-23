import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from '@/store/store';
import { Header } from '@/components/layout/Header';

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Provider store={store}>
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Stack
          screenOptions={{
            header: () => <Header />,
          }}
        >
          <Stack.Screen
            name="(menu)"
            options={{
              animation: 'slide_from_left',
            }}
          />

          <Stack.Screen name="/auth/sign-in" />
        </Stack>
      </View>
    </Provider>
  );
}
