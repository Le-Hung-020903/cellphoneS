"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Specification.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "products",
      });
    }
  }
  Specification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      info: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "Specification",
      tableName: "specifications",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Specification;
};
