import RolesRepository from "../../../infraestructure/repositories/roles";

export default class RolesGetAll {
  constructor() {}

  async execute() {
    try {
      return await new RolesRepository().getAll();
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:10 ~ RolesGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
