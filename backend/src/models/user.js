"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Role, {
        foreignKey: "user_id", // Khoá ngoại trong bảng users_roles trỏ đến User
        otherKey: "role_id",
        through: "users_roles",
        as: "roles",
      });
      User.hasOne(models.Cart, {
        foreignKey: "user_id",
        as: "cart",
      });
      User.hasMany(models.Order, {
        // một user có nhiều order
        foreignKey: "user_id",
        as: "orders",
      });
      User.belongsToMany(models.Product, {
        foreignKey: "user_id",
        otherKey: "product_id",
        through: "favorite_products",
        as: "favoriteProducts",
      });
      User.hasMany(models.Product_review, {
        foreignKey: "user_id",
        as: "product_reviews",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return User;
};
