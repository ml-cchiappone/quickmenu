import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Restaurant from "../restaurant/model";
import Product from "../product/model";

const Category = sequelize.define(
  "category",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "restaurant",
        key: "id"
      }
    }
  },
  {
    tableName: "category",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "fk_category_restaurant1_idx",
        using: "BTREE",
        fields: [{ name: "restaurant_id" }]
      }
    ]
  }
);

// Category.belongsTo(Restaurant, {
//   as: "restaurant",
//   foreignKey: "restaurant_id"
// });

export default Category;
