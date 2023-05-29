import sequelize from "../persistence/mysql.config";
import UserRol from "../../domain/repositories/user_rol/model";
const models = sequelize.models;

class UserRolesRepository {
  constructor() {}

  post(data: any) {
    return UserRol.create(data);
  }

  delete(userId: number, rolId: number) {
    return UserRol.destroy({
      where: {
        user_id: userId,
        rol_id: rolId
      }
    });
  }
}

export default UserRolesRepository;
