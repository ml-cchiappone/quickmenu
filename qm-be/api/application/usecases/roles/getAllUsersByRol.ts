import RolesRepository from "../../../infraestructure/repositories/roles";

export default class RolesGetAllUsersByRol {
  constructor() {}

  async execute(rolCode: any) {
    try {
      return await new RolesRepository().getAllUsersByRol(rolCode);
    } catch (error) {
      console.log(
        "🚀 ~ file: getAllByRol.ts:10 ~ RolesGetAllUsersByRol ~ execute ~ error:",
        error
      );
    }
  }
}
