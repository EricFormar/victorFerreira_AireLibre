'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      news: {
        type: Sequelize.STRING
      },
      offers: {
        type: Sequelize.STRING
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'Categories',
          },
          key: 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName:'Brands',
          },
          key: 'id'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};