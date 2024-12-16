import React, { FC } from 'react';
import { ListRenderItem } from 'react-native';
import { FlatList, Text } from 'native-base';
import { useTranslation } from 'react-i18next';

import { useFetchOrders } from 'hooks/home/orders/useFetchOrders';
import { Loading } from 'libs/components/layout/Loading';
import { Order } from 'modules/home/models';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';
import { OrderRow } from 'modules/home/components/common/Orders/OrderRow';

export const OrdersScreen: FC = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useFetchOrders();

  const renderItem: ListRenderItem<Order> = ({ item }) => (
    <OrderRow key={item.id} {...item} />
  );

  return (
    <HomeLayout>
      <FlatList
        px={3}
        pt={2}
        h="full"
        data={data}
        ListEmptyComponent={
          isLoading ? (
            <Loading backgroundColor="transparent" />
          ) : (
            <Text fontWeight="bold" fontSize="xl" color="tertiary.600">
              {t('home:noOrdersMessage')}
            </Text>
          )
        }
        refreshing={isLoading}
        renderItem={renderItem}
      />
    </HomeLayout>
  );
};
