"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_review.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "products",
      });
      Product_review.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "orders",
      });
      Product_review.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
    }
  }
  Product_review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
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
        allowNull: false,
      },
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "orders",
          },
          key: "id",
        },
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      review_content: {
        type: DataTypes.TEXT,
      },
      url_image: {
        type: DataTypes.TEXT,
      },
      verified_purchase: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Product_review",
      tableName: "product_reviews",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product_review;
};
