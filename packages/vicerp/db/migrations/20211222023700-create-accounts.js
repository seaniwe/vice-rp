'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      socialClub: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      socialClubId: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      regDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      lastDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      regIp: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lastIp: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};