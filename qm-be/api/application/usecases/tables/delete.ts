import TablesRepository from "../../../infraestructure/repositories/tables";

export default class TablesDelete {
  constructor() {}

  async execute(tableId: number) {
    try {
      return await new TablesRepository().delete(tableId);
    } catch (error) {
      console.log(
        "🚀 ~ file: delete.ts:10 ~ TablesDelete ~ execute ~ error:",
        error
      );
    }
  }
}
