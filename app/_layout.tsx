import { Stack } from 'expo-router';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { store } from '@/store/store';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Header } from '@/components/layout/Header';

import "@/global.css";

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  return (
    <GluestackUIProvider mode="light">
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

            <Stack.Screen
              name="auth/sign-in"
              options={{
                animation: 'slide_from_right',
              }}
            />

            <Stack.Screen
              name="auth/sign-up"
              options={{
                animation: 'slide_from_right',
              }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>
        </View>
      </Provider>
    </GluestackUIProvider>
  );
}
