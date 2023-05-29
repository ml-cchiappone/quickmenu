import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Restaurant from "../restaurant/model";
import UserRol from "../user_rol/model";

const User = sequelize.define(
  "user",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    },
    last_connection: {
      type: DataTypes.DATE,
      allowNull: true
    },
    date_created: {
      type: DataTypes.DATE,
    },
    date_modified: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: "user",
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

User.hasMany(Restaurant, { as: "restaurants", foreignKey: "user_id" });
User.hasMany(UserRol, { as: "user_rol", foreignKey: "user_id" });

export default User;
