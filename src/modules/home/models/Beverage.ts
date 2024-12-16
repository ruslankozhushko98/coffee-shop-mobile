import { BEVERAGE_TYPES, SIZES } from 'libs/utils/constants';

export interface Beverage {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  isFavorite: boolean;
  size: SIZES;
  type: BEVERAGE_TYPES;
  starsCount: number;
}
