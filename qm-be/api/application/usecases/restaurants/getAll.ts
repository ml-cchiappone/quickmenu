import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsGetAll {
  constructor() {}

  async execute() {
    try {
      return await new RestaurantsRepository().getAll();
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:7 ~ RestaurantsGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
