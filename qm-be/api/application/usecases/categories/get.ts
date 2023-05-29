import CategoriesRepository from "../../../infraestructure/repositories/categories";

export default class CategoriesGet {
  constructor() {}

  async execute(categoryId: string) {
    try {
      return await new CategoriesRepository().get(categoryId);
    } catch (error) {
    console.log("🚀 ~ file: get.ts:10 ~ CategoriesGet ~ execute ~ error:", error)
    }
  }
}
