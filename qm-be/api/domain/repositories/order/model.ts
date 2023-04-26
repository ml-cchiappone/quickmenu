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
    tables_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "tables",
        key: "id"
      }
    },
    order_status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "order_status",
        key: "id"
      }
    },
    order_payment_status_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
        name: "fk_order_tables1_idx",
        using: "BTREE",
        fields: [{ name: "tables_id" }]
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
// Order.belongsTo(Restaurant, { as: "restaurant", foreignKey: "restaurant_id" });
Order.belongsTo(Table, { as: "table", foreignKey: "tables_id" });

export default Order;
