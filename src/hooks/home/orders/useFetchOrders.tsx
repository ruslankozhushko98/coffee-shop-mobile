import { useQuery } from '@tanstack/react-query';

import { Queries } from 'libs/utils/constants';
import { menuService } from 'modules/home/services';

export const useFetchOrders = () => {
  return useQuery({
    queryKey: [Queries.FETCH_ORDERS],
    queryFn: menuService.fetchOrders,
  });
};
