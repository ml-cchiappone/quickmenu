import OrdersRepository from "../../../infraestructure/repositories/orders";

export default class OrderUpdate {
  constructor() {}

  async execute(orderId: number, data: any) {
    try {
      return await new OrdersRepository().update(orderId, data);
    } catch (error) {
      console.log("🚀 ~ file: put.ts:10 ~ OrderPost ~ execute ~ error:", error);
    }
  }
}
