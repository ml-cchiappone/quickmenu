import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsGetOrdersByOrderStatus {
  constructor() {}

  async execute(restaurantId: string, status: string) {
    try {
      return await new RestaurantsRepository().getOrdersByOrderStatus(
        restaurantId,
        status
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: getOrdersByOrderStatus.ts:10 ~ RestaurantsGetOrder ~ execute ~ error:",
        error
      );
    }
  }
}
