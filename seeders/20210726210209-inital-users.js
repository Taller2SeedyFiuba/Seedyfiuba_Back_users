'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [{
      id: '3ozxgItXE5cZFGtYMhNAs4dvqSA2',
      firstname: 'root',
      lastname: 'root',
      email: 'root@seedyfiuba.com',
      birthdate: '1990-01-01',
      isadmin: true
    }, {
      id: 'f8MPMhialjZCCB2yUMZjCPG5yTs1',
      firstname: 'entrepreneur',
      lastname: 'entrepreneur',
      email: 'entrepreneur@test.com',
      birthdate: '1990-01-01',
      isadmin: false
    }, {
      id: 'qDzHIJjwNqSm8HEN308LeQXHnbq2',
      firstname: 'sponsor',
      lastname: 'sponsor',
      email: 'sponsor@test.com',
      birthdate: '1990-01-01',
      isadmin: false
    }, {
      id: 'C5Jeg8M5HKaIKOqXt5bZX7IdWFk2',
      firstname: 'seer1',
      lastname: 'seer1',
      email: 'seer1@test.com',
      birthdate: '1990-01-01',
      isadmin: false
    }, {
      id: 'pvs2jwbOFiZN4WOtQBYmr5LzLU53',
      firstname: 'seer2',
      lastname: 'seer2',
      email: 'seer2@test.com',
      birthdate: '1990-01-01',
      isadmin: false
    }, {
      id: 'sSbHAjsWp8X3mNJ6rd1JtQB4vtU2',
      firstname: 'seer3',
      lastname: 'seer3',
      email: 'seer3@test.com',
      birthdate: '1990-01-01',
      isadmin: false
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('users',
      { id: {[Op.in]: ['3ozxgItXE5cZFGtYMhNAs4dvqSA2','f8MPMhialjZCCB2yUMZjCPG5yTs1','qDzHIJjwNqSm8HEN308LeQXHnbq2','C5Jeg8M5HKaIKOqXt5bZX7IdWFk2','pvs2jwbOFiZN4WOtQBYmr5LzLU53','sSbHAjsWp8X3mNJ6rd1JtQB4vtU2']} }
    );
  }
};



