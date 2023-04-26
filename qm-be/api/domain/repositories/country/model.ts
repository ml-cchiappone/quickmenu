import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Restaurant from "../restaurant/model";
import Province from "../province/model";

const Country = sequelize.define(
  "country",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    country_code: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  },
  {
    tableName: "country",
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

Country.hasMany(Province, { as: "provinces", foreignKey: "country_id" });
// Country.hasMany(Restaurant, { as: "restaurants", foreignKey: "country_id" });

export default Country;
