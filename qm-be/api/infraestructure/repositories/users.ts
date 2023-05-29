import { col } from "sequelize";
import User from "../../domain/repositories/user/model";
import sequelize from "../persistence/mysql.config";
const models = sequelize.models;
class UsersRepository {
  constructor() {}

  get(userId: number) {
    return User.findOne({
      attributes: [
        "id",
        "email",
        "date_created",
        "date_modified",
        "last_connection",
        "deleted"
      ],
      include: [
        {
          model: models.user_rol,
          as: "user_rol",
          attributes: ["id", "date_created"],
          include: [
            {
              model: models.rol,
              as: "rol",
              attributes: ["id", "description", "code", "icon"]
            }
          ]
        },
        {
          model: models.restaurant,
          as: "restaurants",
          attributes: ["id", "string_id", "name"]
        }
      ],
      where: {
        id: userId
      },
      order: [col("user_rol.rol.id")]
    });
  }

  auth(email: string) {
    return User.findOne({
      attributes: [
        "id",
        "email",
        "date_created",
        "date_modified",
        "last_connection",
        "deleted",
        "password"
      ],
      include: [
        {
          model: models.user_rol,
          as: "user_rol",
          attributes: ["id", "date_created"],
          include: [
            {
              model: models.rol,
              as: "rol",
              attributes: ["id", "description", "code", "icon"]
            }
          ]
        },
        {
          model: models.restaurant,
          as: "restaurants",
          attributes: ["id", "string_id", "name"]
        }
      ],
      where: {
        email: email
      }
    });
  }
}

export default UsersRepository;
