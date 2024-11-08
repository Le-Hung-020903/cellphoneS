"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manufacturer.hasMany(models.Product, {
        foreignKey: "manufacturer_id",
        as: "products",
      });
    }
  }
  Manufacturer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
      },
    },
    {
      sequelize,
      modelName: "Manufacturer",
      tableName: "manufacturers",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Manufacturer;
};
