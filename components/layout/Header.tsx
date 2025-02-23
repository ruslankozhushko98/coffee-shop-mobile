import { Link } from 'expo-router';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#00f',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  link: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
});

export const Header: FC = () => {
  return (
    <View style={styles.header}>
      <Link href="/(menu)" style={styles.link}>
        Header
      </Link>

      <Link href="/auth/sign-in" style={styles.link}>
        Sign In
      </Link>
    </View>
  );
};
