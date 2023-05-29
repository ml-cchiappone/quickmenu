import RestaurantsRepository from "../../../infraestructure/repositories/restaurants";

export default class RestaurantsPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new RestaurantsRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:7 ~ RestaurantsPost ~ execute ~ error:",
        error
      );
    }
  }
}
