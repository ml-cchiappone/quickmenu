import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsDelete {
  constructor() {}

  async execute(restaurantId: number) {
    try {
      return await new RestaurantsRepository().delete(restaurantId);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:7 ~ RestaurantsDelete ~ execute ~ error:",
        error
      );
    }
  }
}
