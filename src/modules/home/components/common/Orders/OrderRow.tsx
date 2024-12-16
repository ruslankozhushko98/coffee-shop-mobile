import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import { Order } from 'modules/home/models';

import { styles } from 'modules/home/components/common/styles';

export const OrderRow: FC<Order> = ({ beverages }) => {
  return (
    <TouchableOpacity style={styles.rowItem}>
      {beverages.map(beverage => (
        <Text key={beverage.id}>{beverage.title}, </Text>
      ))}
    </TouchableOpacity>
  );
};
