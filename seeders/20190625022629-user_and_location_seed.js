'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Locations', [{
      city: 'golden',
      state: 'co',
      latitude: 39.7555,
      longitude: -105.2211,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Users', [{
      email: 'user@email.com',
      password: 'password',
      apiKey: 'abc123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
  }
};
