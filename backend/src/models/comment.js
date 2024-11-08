"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      content: {
        type: DataTypes.TEXT,
      },
      parent_comment: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "comments",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Comment;
};
