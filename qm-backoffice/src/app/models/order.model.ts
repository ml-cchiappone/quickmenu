import { TableModel } from './table.model';
import { OrderStatusModel } from './order_status.model';
import { OrderPaymentStatusModel } from './order_payment_status.model';
import { RestaurantModel } from './restaurant.model';
import { ProductModel } from './product.model';

export interface OrderModel {
  id: number;
  restaurants?: RestaurantModel;
  tables: TableModel;
  order_status: OrderStatusModel;
  order_payment_status: OrderPaymentStatusModel;
  order_products?: Array<{
    products: ProductModel;
  }>;
}
