import { useMutation } from '@tanstack/react-query';

import { Mutations } from 'libs/utils/constants';
import { AddToOrderDto } from 'modules/home/utils/types';
import { menuService } from 'modules/home/services';

export const useAddToOrder = (data: AddToOrderDto) => {
  return useMutation({
    mutationKey: [Mutations.ADD_TO_ORDER],
    mutationFn: () => menuService.addToOrder(data),
  });
};
