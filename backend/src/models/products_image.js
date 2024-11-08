"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products_image.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "products",
      });
    }
  }
  Products_image.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      url_image: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "products",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Products_image",
      tableName: "products_images",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Products_image;
};
