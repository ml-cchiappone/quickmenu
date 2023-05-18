import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Category from "../category/model";
import Country from "../country/model";
import Order from "../order/model";
import Product from "../product/model";
import Table from "../table/model";
import User from "../user/mode";

const Restaurant = sequelize.define(
  "restaurant",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    string_id: {
      type: DataTypes.STRING(60),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    phone_number: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    logo: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    banner: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    lat: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    lon: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    country_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "country",
        key: "id"
      }
    },
    currency_symbol: {
      type: DataTypes.STRING(8),
      allowNull: true,
      defaultValue: "$"
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    tableName: "restaurant",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }, { name: "string_id" }]
      },
      {
        name: "fk_restaurant_user_idx",
        using: "BTREE",
        fields: [{ name: "user_id" }]
      },
      {
        name: "fk_restaurant_country1_idx",
        using: "BTREE",
        fields: [{ name: "country_id" }]
      }
    ]
  }
);

Restaurant.belongsTo(Country, { as: "country", foreignKey: "country_id" });
Restaurant.hasMany(Category, { as: "categories", foreignKey: "restaurant_id" });
// Restaurant.hasMany(Order, { as: "orders", foreignKey: "restaurant_id" });
Restaurant.hasMany(Product, { as: "products", foreignKey: "restaurant_id" });
Restaurant.hasMany(Table, { as: "tables", foreignKey: "restaurant_id" });
Restaurant.belongsTo(User, { as: "user", foreignKey: "user_id" });

export default Restaurant;
