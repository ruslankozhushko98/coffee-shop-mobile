import { httpClient } from 'libs/config/httpClient';
import { Beverage } from 'modules/home/models';
import {
  AddToOrderDto,
  BeverageOpts,
  FavoriteBeverageOpts,
  ToggleBeverageFavoriteDto,
} from 'modules/home/utils/types';

class MenuService {
  private static _instance: MenuService;

  constructor() {
    if (MenuService._instance) {
      throw new Error('MenuService instance does already exist!');
    }
  }

  public static getInstance(): MenuService {
    if (!MenuService._instance) {
      MenuService._instance = new MenuService();
    }

    return MenuService._instance;
  }

  public async fetchBeverages(title?: string): Promise<Array<BeverageOpts>> {
    const { data } = await httpClient.get('/menu/all', { params: { title } });
    return data;
  }

  public async fetchFavoriteBeverages(): Promise<Array<FavoriteBeverageOpts>> {
    const { data } = await httpClient.get('/menu/favorites');
    return data;
  }

  public async fetchBeverageById(beverageId: number): Promise<Beverage> {
    const { data } = await httpClient.get(`/menu/${beverageId}`);
    return data;
  }

  public async toggleBeverageFavorite(
    dto: ToggleBeverageFavoriteDto,
  ): Promise<ToggleBeverageFavoriteDto> {
    const { data } = await httpClient.put('/menu/toggle-favorite', dto);
    return data;
  }

  public async fetchOrders(): Promise<any> {
    const { data } = await httpClient.get('/orders');
    return data;
  }

  public async addToOrder(dto: AddToOrderDto): Promise<any> {
    const { data } = await httpClient.post('/orders/create', dto);
    return data;
  }
}

export const menuService = MenuService.getInstance();
