'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert('Users', [{
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // example UUID
      firstName: 'Admin',
      lastName: 'User',
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: process.env.ADMIN_EMAIL }, {});
  }
};