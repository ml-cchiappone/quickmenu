import UsersRepository from "../../../infraestructure/repositories/users";

export default class UsersPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new UsersRepository().post(data);
    } catch (error) {
      console.log("🚀 ~ file: post.ts:10 ~ UsersGet ~ execute ~ error:", error);
    }
  }
}
