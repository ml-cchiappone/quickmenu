import RestaurantUser from "../../domain/repositories/restaurant_user/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;

class RestaurantUsersRepository {
  constructor() {}

  post(data: any) {
    return RestaurantUser.create(data);
  }
}


export default RestaurantUsersRepository;
