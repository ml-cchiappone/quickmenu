import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Order from "../order/model";

const OrderStatus = sequelize.define(
  "order_status",
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
    },
    status_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  },
  {
    tableName: "order_status",
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

// OrderStatus.hasMany(Order, { as: "orders", foreignKey: "order_status_id" });

export default OrderStatus;
