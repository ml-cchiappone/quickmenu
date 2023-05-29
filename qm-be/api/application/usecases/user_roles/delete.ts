import UserRolesRepository from "../../../infraestructure/repositories/user_roles";

export default class UserRolesDelete {
  constructor() {}

  async execute(userId: number, rolId: number) {
    try {
      return await new UserRolesRepository().delete(userId, rolId);
    } catch (error) {
      console.log(
        "🚀 ~ file: delete.ts:10 ~ UserRolesDelete ~ execute ~ error:",
        error
      );
    }
  }
}
