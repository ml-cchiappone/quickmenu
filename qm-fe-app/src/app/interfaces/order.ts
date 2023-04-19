import { Product } from "./restaurant";

export interface Order {
  id?: number;
  products: Product[];
}
