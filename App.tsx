import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';

import { GlobalContextProvider } from 'contexts/globalContext';
import i18n from 'libs/localization/i18n';
import { queryClient } from 'libs/config/queryClient';
import { LANGS } from 'libs/utils/constants';
import { RootNavStack } from 'modules/navigation/RootNavigationStack';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const style = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={style}>
      <I18nextProvider i18n={i18n} defaultNS={LANGS.EN}>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={style.backgroundColor}
          />

          <NativeBaseProvider>
            <NavigationContainer>
              <GlobalContextProvider>
                <RootNavStack />
              </GlobalContextProvider>
            </NavigationContainer>
          </NativeBaseProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </SafeAreaView>
  );
}

export default App;
