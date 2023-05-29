import CategoriesRepository from "../../../infraestructure/repositories/categories";

export default class CategoriesGetAll {
  constructor() {}

  async execute(restaurantId: number) {
    try {
      return await new CategoriesRepository().getAll(restaurantId);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:11 ~ CategoriesGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
