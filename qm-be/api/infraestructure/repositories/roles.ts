import { Op } from "sequelize";
import Rol from "../../domain/repositories/rol/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;
class RolesRepository {
  constructor() {}

  getAll() {
    return Rol.findAndCountAll();
  }

  getAllUsersByRol(rol_code = null) {
    return Rol.findOne({
      attributes: ["id", "code"],
      include: [
        {
          model: models.user_rol,
          as: "users_rol",
          attributes: ["id", "rol_id"],
          include: [
            {
              model: models.user,
              as: "user",
              attributes: ["id", "email"]
            }
          ]
        }
      ],
      where: {
        code: {
          [Op.eq]: rol_code
        }
      }
    });
  }
}

export default RolesRepository;
