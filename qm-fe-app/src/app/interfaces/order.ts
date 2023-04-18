import { Product } from "./restaurant";

export interface Order {
  id: number;
  products: ProductOrder[];
}

export interface ProductOrder extends Product {
  quantity: number;
}
