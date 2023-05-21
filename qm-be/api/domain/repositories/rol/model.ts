import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import UserRol from "../user_rol/model";

const Rol = sequelize.define(
  "rol",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  },
  {
    tableName: "rol",
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

// Rol.hasMany(UserRol, { as: "users_rol", foreignKey: "rol_id" });

export default Rol;
