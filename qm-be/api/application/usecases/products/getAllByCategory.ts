import ProductsRepository from "../../../infraestructure/repositories/products";

export default class ProductsGetAllByCategory {
  constructor() {}

  async execute(categoryId: number) {
    try {
      return await new ProductsRepository().getAllByCategory(categoryId);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAllByCategory.ts:10 ~ ProductsGetAllByCategory ~ execute ~ error:",
        error
      );
    }
  }
}
