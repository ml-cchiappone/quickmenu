import ProductsRepository from "../../../infraestructure/repositories/products";

export default class ProductsDelete {
  constructor() {}

  async execute(productId: number) {
    try {
      return await new ProductsRepository().delete(productId);
    } catch (error) {
      console.log(
        "🚀 ~ file: delete.ts:10 ~ ProductsDelete ~ execute ~ error:",
        error
      );
    }
  }
}
