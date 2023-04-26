import { DataTypes } from "sequelize";
import sequelize from "../../../infraestructure/persistence/mysql.config";
import Country from "../country/model";

const Province = sequelize.define(
  "province",
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
    code: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "country",
        key: "id"
      }
    }
  },
  {
    tableName: "province",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }]
      },
      {
        name: "fk_province_country1_idx",
        using: "BTREE",
        fields: [{ name: "country_id" }]
      }
    ]
  }
);

// Province.belongsTo(Country, { as: "country", foreignKey: "country_id" });

export default Province;
