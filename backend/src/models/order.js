"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // mỗi đơn hàng có một phương thức thanh toán
      Order.hasOne(models.Payment, {
        foreignKey: "order_id",
        as: "payments",
      });
      Order.hasMany(models.Order_detail, {
        foreignKey: "order_id",
        as: "order_details",
      });
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
      });
      Order.hasMany(models.Product_review, {
        foreignKey: "order_id",
        as: "product_reviews",
      });
    }
  }
  Order.init(
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
      },
      order_status: {
        type: DataTypes.STRING(50),
      },
      total_price: {
        type: DataTypes.NUMERIC,
      },
      notes: {
        type: DataTypes.TEXT,
      },
      shipping_address: {
        type: DataTypes.STRING(255),
      },
      recipient_name: {
        type: DataTypes.STRING(20),
      },
      recipient_phone: {
        type: DataTypes.STRING(12),
      },
      recipient_email: {
        type: DataTypes.STRING(30),
      },
      shipping_fee: {
        type: DataTypes.NUMERIC,
      },
      payment_method: {
        type: DataTypes.STRING(50),
      },
      order_code: {
        type: DataTypes.STRING(20),
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Order;
};
