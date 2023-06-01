import { ProvinceModel } from './province.model';
import { OrderModel } from './order.model';

export interface RestaurantModel {
  id: number;
  string_id: string;
  name: string;
  address: string;
  phone_number: string;
  logo: string;
  banner: string;
  lat: string;
  lon: string;
  user_id: number;
  province: ProvinceModel;
  currency_symbol: string;
  deleted: number;
}

export interface RestaurantOrders {
  id: number;
  string_id: string;
  name: string;
  orders: Array<OrderModel>;
}
