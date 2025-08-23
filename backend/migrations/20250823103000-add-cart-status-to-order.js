'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_Orders_status" ADD VALUE 'cart';
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // This is tricky to revert, as PostgreSQL doesn't easily support
    // removing values from an enum if they are already in use.
    // For development, you might drop and recreate the enum,
    // but for production, it's usually not recommended to remove enum values.
    // For simplicity, we'll leave it as is for the 'down' migration.
  }
};
