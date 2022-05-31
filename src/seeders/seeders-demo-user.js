"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "dao",
        lastName: "hung",
        email: "admin@example.com",
        password: "123456",
        address: "tp hcm",
        gender: 1,
        typeRole: "",
        keyRole: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete('Users', null, {});
  },
};
