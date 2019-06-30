'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Locations', [
      {
        id: 1,
        city: 'golden',
        state: 'co',
        latitude: 39.7555,
        longitude: -105.2211,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        city: 'jackson',
        state: 'wy',
        latitude: 43.4799291,
        longitude: -110.7624282,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        email: 'user@email.com',
        password: 'password',
        apiKey: 'abc123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Favorites', [
      {
        UserId: 1,
        LocationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        LocationId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Locations', null, {});
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
