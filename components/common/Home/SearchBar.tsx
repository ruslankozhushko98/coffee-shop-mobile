import React, { FC } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export const SearchBar: FC<TextInputProps> = ({
  value,
  onChangeText,
  ...props
}) => (
  <View style={styles.container}>
    <Icon name="search" size={16} style={styles.icon} />

    <TextInput
      style={styles.input}
      {...props}
      placeholderTextColor="#000"
      inlineImageLeft="search_icon"
      inlineImagePadding={10}
      value={value}
      onChangeText={onChangeText}
      placeholder="Search..."
    />
  </View>
);
