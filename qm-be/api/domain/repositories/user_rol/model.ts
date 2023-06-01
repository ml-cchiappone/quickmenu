import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Rol from "../rol/model";
import User from "../user/model";

const UserRol = sequelize.define(
  "user_rol",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    rol_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    date_created: {
      type: DataTypes.DATE
    },
    date_modified: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "user_rol",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      }
    ]
  }
);

UserRol.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(UserRol, { as: "user_rol", foreignKey: "user_id" });

export default UserRol;
