'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('task', [
      { description: 'Task 1 for Alice', user_id: 1, status_id: 1 },
      { description: 'Task 2 for Alice', user_id: 1, status_id: 2 },
      { description: 'Task 1 for Bob', user_id: 2, status_id: 3 },
      { description: 'Task 1 for Charlie', user_id: 3, status_id: 1 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('task', null, {});
  }
};
