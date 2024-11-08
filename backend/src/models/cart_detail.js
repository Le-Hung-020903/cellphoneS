"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_product.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "carts",
      });
      Cart_product.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "products",
      });
    }
  }
  Cart_product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      cart_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "carts",
          },
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart_product",
      tableName: "cart_products",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Cart_product;
};
