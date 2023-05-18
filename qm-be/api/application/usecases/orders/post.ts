import OrdersRepository from "../../../infraestructure/repositories/orders";

export default class OrderPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new OrdersRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:10 ~ OrderPost ~ execute ~ error:",
        error
      );
    }
  }
}
