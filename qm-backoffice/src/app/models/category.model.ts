import { ProductModel } from './product.model';

export interface CategoryModel {
  id: number;
  name: string;
  description: string;
  deleted: number;
  restaurant_id: number;
  product: ProductModel;
}
