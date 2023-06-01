import OrderStatusRepository from "../../../infraestructure/repositories/order_status";

export default class OrderStatusGet {
  constructor() {}

  async execute(statusCode: string) {
    try {
      return await new OrderStatusRepository().get(statusCode);
    } catch (error) {
      console.log(
        "🚀 ~ file: get.ts:10 ~ OrderStatusGet ~ execute ~ error:",
        error
      );
    }
  }
}
