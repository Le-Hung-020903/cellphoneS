"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Categorie, {
        foreignKey: "categories_id",
        as: "categories",
      });
      Product.hasMany(models.Specification, {
        foreignKey: "product_id",
        as: "specifications",
      });
      Product.hasMany(models.Products_image, {
        foreignKey: "product_id",
        as: "Products_images",
      });
      Product.belongsTo(models.Manufacturer, {
        foreignKey: "manufacturer_id",
        as: "manufacturer",
      });
      Product.belongsToMany(models.Discount, {
        foreignKey: "product_id",
        through: "products_discounts",
        as: "discount",
      });
      Product.hasMany(models.Cart_product, {
        foreignKey: "product_id",
        as: "cart_products",
      });
      Product.hasMany(models.Order_detail, {
        foreignKey: "product_id",
        as: "order_details",
      });
      Product.belongsToMany(models.User, {
        foreignKey: "product_id",
        otherKey: "user_id",
        through: "favorite_products",
        as: "favoriteUsers",
      });
      Product.hasMany(models.Product_review, {
        foreignKey: "product_id",
        as: "product_reviews",
      });
    }
  }
  Product.init(
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
      price: {
        type: DataTypes.INTEGER,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      desc: {
        type: DataTypes.STRING,
      },
      categories_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
      },
      manufacturer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "manufacturers",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product;
};
