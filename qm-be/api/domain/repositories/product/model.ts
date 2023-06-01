import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import OrderProduct from "../order_product/model";
import Category from "../category/model";
import Restaurant from "../restaurant/model";

const Product = sequelize.define(
  "product",
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
      type: DataTypes.STRING(150),
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "category",
        key: "id"
      }
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
    tableName: "product",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "fk_product_category1_idx",
        using: "BTREE",
        fields: [{ name: "category_id" }]
      },
      {
        name: "fk_product_restaurant1_idx",
        using: "BTREE",
        fields: [{ name: "restaurant_id" }]
      }
    ]
  }
);

Product.belongsTo(Category, { as: "categories", foreignKey: "category_id" });
Category.hasMany(Product, { as: "products", foreignKey: "category_id" });
// Product.hasMany(OrderProduct, {
//   as: "order_products",
//   foreignKey: "product_id"
// });
// Product.belongsTo(Restaurant, {
//   as: "restaurant",
//   foreignKey: "restaurant_id"
// });

export default Product;
