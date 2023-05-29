import ProductsRepository from "../../../infraestructure/repositories/products";

export default class ProductsUpdate {
  constructor() {}

  async execute(productId: number, data: any) {
    try {
      return await new ProductsRepository().update(productId, data);
    } catch (error) {
      console.log(
        "🚀 ~ file: update.ts:10 ~ ProductsUpdate ~ execute ~ error:",
        error
      );
    }
  }
}
