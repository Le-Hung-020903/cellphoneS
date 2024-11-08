"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Action.belongsToMany(models.Module, {
        foreignKey: "action_id",
        through: "module_action",
        as: "modules",
      });
    }
  }
  Action.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Action",
      tableName: "actions",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Action;
};
