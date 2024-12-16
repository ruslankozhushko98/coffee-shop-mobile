import React from 'react';
import { useTranslation } from 'react-i18next';
import { createStackNavigator } from '@react-navigation/stack';

import { Screens } from 'libs/utils/constants';
import { SignInScreen } from 'modules/auth/components/screens/SignInScreen';
import { SignUpLink } from 'modules/auth/components/layout/SignUpLink';
import { BackLink } from 'modules/auth/components/layout/BackLink';
import { SignUpScreen } from 'modules/auth/components/screens/SignUpScreen';
import { SignInLink } from 'modules/auth/components/layout/SignInLink';
import { AccountActivationScreen } from 'modules/account/components/screens/AccountActivationScreen';
import { HomeStack } from 'modules/home/navigation/HomeStack';
import { ForgotPasswordStack } from 'modules/forgot-password/navigation/ForgotPasswordStack';

const RootNavigationStack = createStackNavigator();

export const RootNavStack = () => {
  const { t } = useTranslation();

  return (
    <RootNavigationStack.Navigator initialRouteName={Screens.HOME_STACK}>
      <RootNavigationStack.Screen
        name={Screens.SIGN_IN_SCREEN}
        component={SignInScreen}
        options={{
          title: t('auth:signInScreen:header:title'),
          headerRight: () => <SignUpLink />,
          headerLeft: () => <BackLink />,
        }}
      />

      <RootNavigationStack.Screen
        name={Screens.SIGN_UP_SCREEN}
        component={SignUpScreen}
        options={{
          title: t('auth:signUpScreen:header:title'),
          headerLeft: () => <SignInLink />,
        }}
      />

      <RootNavigationStack.Screen
        name={Screens.ACCOUNT_ACTIVATION}
        component={AccountActivationScreen}
        options={{
          title: t('accountActivationScreen:header:title'),
        }}
      />

      <RootNavigationStack.Screen
        name={Screens.HOME_STACK}
        component={HomeStack}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />

      <RootNavigationStack.Screen
        name={Screens.FORGOT_PASSWORD_STACK}
        component={ForgotPasswordStack}
        options={{
          headerShown: false,
        }}
      />
    </RootNavigationStack.Navigator>
  );
};
