import CategoriesRepository from "../../../infraestructure/repositories/categories";

export default class CategoriesDelete {
  constructor() {}

  async execute(categoryId: number) {
    try {
      return await new CategoriesRepository().delete(categoryId);
    } catch (error) {
      console.log(
        "🚀 ~ file: delete.ts:10 ~ CategoriesDelete ~ execute ~ error:",
        error
      );
    }
  }
}
