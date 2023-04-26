import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Product from "../product/model";

const OrderProduct = sequelize.define(
  "order_product",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "order",
        key: "id"
      }
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "product",
        key: "id"
      }
    }
  },
  {
    tableName: "order_product",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "fk_order_item_order1_idx",
        using: "BTREE",
        fields: [{ name: "order_id" }]
      },
      {
        name: "fk_order_item_product1_idx",
        using: "BTREE",
        fields: [{ name: "product_id" }]
      }
    ]
  }
);

// OrderProduct.belongsTo(Product, { as: "product", foreignKey: "product_id" });

export default OrderProduct;
