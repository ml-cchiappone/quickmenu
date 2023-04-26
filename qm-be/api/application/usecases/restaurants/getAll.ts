import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsGetAll {
  constructor() {}

  async execute() {
    try {
      const { rows } = await new RestaurantsRepository().getAll();
      return rows;
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:7 ~ RestaurantsGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
