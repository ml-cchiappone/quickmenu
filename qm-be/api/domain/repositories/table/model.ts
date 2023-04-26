import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Restaurant from "../restaurant/model";
import Order from "../order/model";

const Table = sequelize.define(
  "table",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    tableName: "table",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "fk_table_restaurant1_idx",
        using: "BTREE",
        fields: [{ name: "restaurant_id" }]
      }
    ]
  }
);

// Table.belongsTo(Restaurant, { as: "restaurant", foreignKey: "restaurant_id" });
// Table.hasMany(Order, { as: "orders", foreignKey: "tables_id" });

export default Table;
