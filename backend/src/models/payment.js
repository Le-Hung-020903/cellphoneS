"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Thanh toán thuộc về một đơn hàng
      Payment.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "orders",
      });
    }
  }
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
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
      payment_method: {
        type: DataTypes.STRING(50),
      },
      payment_status: {
        type: DataTypes.STRING(30),
      },
      qr_code_url: {
        type: DataTypes.STRING(100),
      },
      qr_code_data: {
        type: DataTypes.STRING(200),
      },
      transaction_id: {
        type: DataTypes.STRING(100),
      },
      payment_time: {
        type: DataTypes.DATE,
      },
      payment_gateway_response: {
        type: DataTypes.STRING(200),
      },
      cod_confirmed: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payment",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Payment;
};
