import OrderProductsRepository from "../../../infraestructure/repositories/order_products";

export default class OrderProductsPost {
  constructor() {}

  async execute(transaction: any, orderId: number, data: any) {
    try {
      return await new OrderProductsRepository().post(
        transaction,
        orderId,
        data
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:10 ~ OrderProductsPost ~ execute ~ error:",
        error
      );
    }
  }
}
