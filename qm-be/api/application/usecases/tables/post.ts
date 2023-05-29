import TablesRepository from "../../../infraestructure/repositories/tables";

export default class TablesPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new TablesRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:10 ~ TablesPost ~ execute ~ error:",
        error
      );
    }
  }
}
