import TablesRepository from "../../../infraestructure/repositories/tables";

export default class TablesUpdate {
  constructor() {}

  async execute(tableId: number, data: any) {
    try {
      return await new TablesRepository().update(tableId, data);
    } catch (error) {
      console.log(
        "🚀 ~ file: update.ts:10 ~ TablesUpdate ~ execute ~ error:",
        error
      );
    }
  }
}
