import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsGetAll {
  constructor() {}

  async execute(restaurantId: string) {
    try {
      return await new RestaurantsRepository().get(restaurantId);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:7 ~ RestaurantsGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
