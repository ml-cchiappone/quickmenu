import UsersRepository from "../../../infraestructure/repositories/users";

export default class UsersAuth {
  constructor() {}

  async execute(email: string, password: string) {
    try {
      return await new UsersRepository().auth(email);
    } catch (error) {
      console.log("🚀 ~ file: get.ts:10 ~ UsersAuth ~ execute ~ error:", error);
    }
  }
}
