import CategoriesRepository from "../../../infraestructure/repositories/categories";

export default class CategoriesPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new CategoriesRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:10 ~ CategoriesPost ~ execute ~ error:",
        error
      );
    }
  }
}
