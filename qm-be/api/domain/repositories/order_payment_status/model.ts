import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Order from "../order/model";

const OrderPaymentStatus = sequelize.define(
  "order_payment_status",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  },
  {
    tableName: "order_payment_status",
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

// OrderPaymentStatus.hasMany(Order, {
//   as: "orders",
//   foreignKey: "order_payment_status_id"
// });

export default OrderPaymentStatus;
