import UserRolesRepository from "../../../infraestructure/repositories/user_roles";

export default class UserRolesPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new UserRolesRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:11 ~ UserRolesPost ~ execute ~ error:",
        error
      );
    }
  }
}
