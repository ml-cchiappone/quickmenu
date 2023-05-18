import OrdersRepository from "../../../infraestructure/repositories/orders";

export default class OrderPost {
  constructor() {}

  async execute(orderId: number) {
    try {
      return await new OrdersRepository().get(orderId);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:10 ~ OrderPost ~ execute ~ error:",
        error
      );
    }
  }
}
