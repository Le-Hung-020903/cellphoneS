"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_detail.belongsTo(models.Order, {
        foreignKey: "order_id", // Khóa ngoại trong order_details
        as: "orders", // Alias của mối quan hệ
      });

      Order_detail.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "products",
      });
    }
  }
  Order_detail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "orders",
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
      product_name: {
        type: DataTypes.STRING(100),
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false,
      },
      discount_amount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Order_detail",
      tableName: "order_details",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Order_detail;
};
