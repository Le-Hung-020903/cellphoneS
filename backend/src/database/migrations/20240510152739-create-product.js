"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      categories_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "categories",
          },
          key: "id",
        },
      },
      manufacturer: {
        type: Sequelize.STRING(100),
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
