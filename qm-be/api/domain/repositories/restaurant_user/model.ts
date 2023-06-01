import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Rol from "../rol/model";
import User from "../user/model";

const RestaurantUser = sequelize.define(
  "restaurant_user",
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
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  },
  {
    tableName: "restaurant_user",
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

RestaurantUser.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(RestaurantUser, { as: "restaurant_user", foreignKey: "user_id" });

export default RestaurantUser;
