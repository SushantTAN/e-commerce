'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = [
      { id: faker.string.uuid(), name: 'Electronics', createdAt: new Date(), updatedAt: new Date() },
      { id: faker.string.uuid(), name: 'Books', createdAt: new Date(), updatedAt: new Date() },
      { id: faker.string.uuid(), name: 'Clothing', createdAt: new Date(), updatedAt: new Date() },
      { id: faker.string.uuid(), name: 'Home & Kitchen', createdAt: new Date(), updatedAt: new Date() },
      { id: faker.string.uuid(), name: 'Sports & Outdoors', createdAt: new Date(), updatedAt: new Date() },
    ];
    await queryInterface.bulkInsert('Categories', categories, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};