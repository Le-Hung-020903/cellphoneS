"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorie.hasMany(models.Product, {
        foreignKey: "categories_id",
        as: "products",
      });
      Categorie.hasMany(Categorie, {
        foreignKey: "parent_id",
        as: "subcategories",
      });
      Categorie.belongsTo(Categorie, {
        foreignKey: "parent_id",
        as: "parentCategories",
      });
    }
  }
  Categorie.init(
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
      desc: {
        type: DataTypes.STRING,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
      },
      device: {
        type: DataTypes.STRING(50),
      },
    },
    {
      sequelize,
      modelName: "Categorie",
      tableName: "categories",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Categorie;
};
