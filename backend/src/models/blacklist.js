"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part ofDataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blacklist.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING(512),
      },
      expired: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Blacklist",
      tableName: "black_lists",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Blacklist;
};
