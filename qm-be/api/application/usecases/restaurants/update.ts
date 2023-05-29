import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsUpdate {
  constructor() {}

  async execute(restaurantId: number, data: any) {
    try {
      return await new RestaurantsRepository().update(restaurantId, data);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:7 ~ RestaurantsUpdate ~ execute ~ error:",
        error
      );
    }
  }
}
