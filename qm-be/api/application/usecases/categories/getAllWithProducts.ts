import CategoriesRepository from "../../../infraestructure/repositories/categories";

export default class CategoriesGetAllWithProducts {
  constructor() {}

  async execute(restaurantId: number) {
    try {
      const { rows } = await new CategoriesRepository().getAllWithProducts(restaurantId);

      return rows;
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:11 ~ CategoriesGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
