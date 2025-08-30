'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const enumName = 'enum_Orders_status';
    try {
      await queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE 'processing'`);
    } catch (e) {
      if (e.message.includes('already exists')) { console.log('Value "processing" already exists in enum, skipping.'); } else { throw e; }
    }
    try {
      await queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE 'shipped'`);
    } catch (e) {
      if (e.message.includes('already exists')) { console.log('Value "shipped" already exists in enum, skipping.'); } else { throw e; }
    }
    try {
      await queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE 'delivered'`);
    } catch (e) {
      if (e.message.includes('already exists')) { console.log('Value "delivered" already exists in enum, skipping.'); } else { throw e; }
    }
    try {
      await queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE 'cart'`);
    } catch (e) {
      if (e.message.includes('already exists')) { console.log('Value "cart" already exists in enum, skipping.'); } else { throw e; }
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Do nothing. It's hard to remove enum values.
  }
};
