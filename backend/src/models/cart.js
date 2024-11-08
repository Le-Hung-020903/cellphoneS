"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.Cart_product, {
        foreignKey: "cart_id",
        as: "cart_products",
      });
      Cart.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "carts",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Cart;
};
