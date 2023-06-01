import RestaurantUsersRepository from "../../../infraestructure/repositories/restaurant_users";

export default class RestaurantUsersPost {
  constructor() {}

  async execute(data: any) {
    try {
      return await new RestaurantUsersRepository().post(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: post.ts:11 ~ RestaurantUsersPost ~ execute ~ error:",
        error
      );
    }
  }
}
