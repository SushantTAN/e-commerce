'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      `SELECT id FROM "Categories";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const categoryIds = categories.map(cat => cat.id);

    const products = [];
    for (let i = 0; i < 100; i++) {
      products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        categoryId: faker.helpers.arrayElement(categoryIds), // Assign random categoryId
        price: faker.commerce.price(),
        stock: faker.number.int({ min: 0, max: 100 }),
        imageUrl: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};