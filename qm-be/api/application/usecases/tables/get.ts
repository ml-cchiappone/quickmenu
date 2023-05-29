import TablesRepository from "../../../infraestructure/repositories/tables";

export default class TablesGet {
  constructor() {}

  async execute(tableId: string) {
    try {
      return await new TablesRepository().get(tableId);
    } catch (error) {
      console.log("🚀 ~ file: get.ts:10 ~ TablesGet ~ execute ~ error:", error);
    }
  }
}
