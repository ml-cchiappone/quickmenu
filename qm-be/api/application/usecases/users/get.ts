import UsersRepository from "../../../infraestructure/repositories/users";

export default class UsersGet {
  constructor() {}

  async execute(userId: number) {
    try {
      return await new UsersRepository().get(userId);
    } catch (error) {
      console.log("🚀 ~ file: get.ts:10 ~ UsersGet ~ execute ~ error:", error);
    }
  }
}
