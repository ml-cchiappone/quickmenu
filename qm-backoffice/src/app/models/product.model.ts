import { CategoryModel } from "./category.model";

export interface ProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  deleted: number;
  category_id: number;
  restaurant_id: number;
  categories: CategoryModel;
}
