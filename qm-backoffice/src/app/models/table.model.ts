import { RestaurantModel } from './restaurant.model';

export interface TableModel {
  id: number;
  description: string;
  deleted: number;
  restaurant_id: number;
  restaurant: RestaurantModel;
}
