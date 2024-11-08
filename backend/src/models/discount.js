"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Discount.belongsToMany(models.Product, {
        foreignKey: "discount_id",
        through: "products_discounts",
        as: "products",
      });
    }
  }
  Discount.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
      },
      discount_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start_day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Discount",
      tableName: "discounts",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Discount;
};
