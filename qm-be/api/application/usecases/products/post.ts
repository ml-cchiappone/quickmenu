import ProductsRepository from "../../../infraestructure/repositories/products";

export default class ProductsPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new ProductsRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:10 ~ ProductsPost ~ execute ~ error:",
        error
      );
    }
  }
}
