"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Module.belongsToMany(models.Action, {
        foreignKey: "module_id",
        through: "module_action",
        as: "actions",
      });
    }
  }
  Module.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Module",
      tableName: "modules",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Module;
};
