import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Restaurant from "../restaurant/model";
import OrderStatus from "../order_status/model";
import OrderProduct from "../order_product/model";
import OrderPaymentStatus from "../order_payment_status/model";
import Table from "../table/model";

const Order = sequelize.define(
  "order",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "restaurant",
        key: "id"
      }
    },
    table_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "table",
        key: "id"
      }
    },
    order_status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "order_status",
        key: "id"
      }
    },
    order_payment_status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "order_payment_status",
        key: "id"
      }
    }
  },
  {
    tableName: "order",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "fk_order_restaurant1_idx",
        using: "BTREE",
        fields: [{ name: "restaurant_id" }]
      },
      {
        name: "fk_order_table1_idx",
        using: "BTREE",
        fields: [{ name: "table_id" }]
      },
      {
        name: "fk_order_order_status1_idx",
        using: "BTREE",
        fields: [{ name: "order_status_id" }]
      },
      {
        name: "fk_order_order_payment_status1_idx",
        using: "BTREE",
        fields: [{ name: "order_payment_status_id" }]
      }
    ]
  }
);

Order.hasMany(OrderProduct, { as: "order_products", foreignKey: "order_id" });
Order.belongsTo(OrderPaymentStatus, {
  as: "order_payment_status",
  foreignKey: "order_payment_status_id"
});
Order.belongsTo(OrderStatus, {
  as: "order_status",
  foreignKey: "order_status_id"
});
Order.belongsTo(Restaurant, { as: "restaurants", foreignKey: "restaurant_id" });
Order.belongsTo(Table, { as: "tables", foreignKey: "table_id" });
Restaurant.hasMany(Order, { as: "orders", foreignKey: "restaurant_id" });

export default Order;
