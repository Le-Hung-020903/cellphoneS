"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("users", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "avatarUrl", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("users", "avatarUrl", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "address", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
