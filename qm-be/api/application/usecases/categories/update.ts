import CategoriesRepository from "../../../infraestructure/repositories/categories";

export default class CategoriesUpdate {
  constructor() {}

  async execute(categoryId: number, data: any) {
    try {
      return await new CategoriesRepository().update(categoryId, data);
    } catch (error) {
      console.log(
        "🚀 ~ file: update.ts:10 ~ RestaurantsUpdate ~ execute ~ error:",
        error
      );
    }
  }
}
