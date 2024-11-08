"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("module_action", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      action_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "actions",
          },
          key: "id",
        },
      },
      module_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "modules",
          },
          key: "id",
        },
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
    await queryInterface.dropTable("module_action");
  },
};
