import Rol from "../../domain/repositories/rol/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;
class RolesRepository {
  constructor() {}

  getAll() {
    return Rol.findAndCountAll();
  }
}

export default RolesRepository;
