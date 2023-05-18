import OrderProduct from "../../domain/repositories/order_product/model";

class OrderProductsRepository {
  constructor() {}

  async post(transaction: any, orderId: number, products: any) {
    // TODO: tipar
    products.forEach(async (product: { product_id: any }) => {
      await OrderProduct.create(
        {
          order_id: orderId,
          product_id: product.product_id
        },
        {
          transaction
        }
      );
    });
  }
  get(orderId: string) {
    return OrderProduct.findOne({
      where: {
        id: orderId
      }
    });
  }
}

export default OrderProductsRepository;
