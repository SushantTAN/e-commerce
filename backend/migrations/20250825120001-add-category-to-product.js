'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add categoryId column
    await queryInterface.addColumn('Products', 'categoryId', {
      type: Sequelize.UUID,
      allowNull: true, // Temporarily allow nulls
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Or 'RESTRICT' depending on desired behavior
    });

    // Remove old category string column
    await queryInterface.removeColumn('Products', 'category');
  },

  async down(queryInterface, Sequelize) {
    // Re-add old category string column
    await queryInterface.addColumn('Products', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Remove categoryId column
    await queryInterface.removeColumn('Products', 'categoryId');
  }
};