import { ORDER_STATUS } from 'libs/utils/constants';

import { Beverage } from './Beverage';

export interface Order {
  id: number;
  userId: number;
  price: number;
  starsCount: number;
  status: ORDER_STATUS;
  additionally?: string;
  beverages: Array<Beverage>;
}
