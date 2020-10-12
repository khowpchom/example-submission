'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExchangeRates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      crypto_id: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
          model : 'Cryptos',
          key : 'id'
        },
      },
      tocrypto_id: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
          model : 'Cryptos',
          key : 'id'
        },
      },
      rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
        validate: {
          min: 0
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ExchangeRates');
  }
};