import React from 'react';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function SignInScreen() {
  return (
    <View>
      <Text>Sign In Screen</Text>

      <Text>
        Don't have an account?{' '}
        <Link href="/auth/sign-up" style={{ color: '#00f' }}>
          Sign Up
        </Link>
      </Text>
    </View>
  );
};
