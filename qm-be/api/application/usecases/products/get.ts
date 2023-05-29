import ProductsRepository from "../../../infraestructure/repositories/products";

export default class ProductsGet {
  constructor() {}

  async execute(productId: string) {
    try {
      return await new ProductsRepository().get(productId);
    } catch (error) {
      console.log(
        "🚀 ~ file: get.ts:10 ~ ProductsGet ~ execute ~ error:",
        error
      );
    }
  }
}
