import UsersRepository from "../../../infraestructure/repositories/users";

export default class UsersGetAll {
  constructor() {}

  async execute() {
    try {
      return await new UsersRepository().getAll();
    } catch (error) {
      console.log(
        "🚀 ~ file: getAll.ts:10 ~ UsersGetAll ~ execute ~ error:",
        error
      );
    }
  }
}
