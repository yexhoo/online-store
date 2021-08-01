const { isLocal } = require('../utils');
const { Schema } = require('../models/constants');
const { UUID_SUPPORT } = require('../constants');

module.exports = {
  up: async (queryInterface) => {
    if (isLocal()) {
      await queryInterface.sequelize.query(UUID_SUPPORT);
    }

    await queryInterface.createSchema(Schema.STORE);
  },

  down: async (queryInterface) => {
    await queryInterface.dropSchema(Schema.STORE);
  },
};
