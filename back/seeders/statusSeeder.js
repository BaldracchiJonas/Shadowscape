'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('status', [
      { name: 'Open' },
      { name: 'In Progress' },
      { name: 'Done' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('status', null, {});
  }
};
