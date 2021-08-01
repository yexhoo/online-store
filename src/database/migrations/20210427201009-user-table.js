const { DataTypes, fn } = require('sequelize');
const { Table, Schema } = require('../models/constants');
const { UUID_V4_GENERATE, NOW } = require('../constants');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      Table.Store.USER,
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: fn(UUID_V4_GENERATE),
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING(320),
          unique: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(90),
        },
        createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: fn(NOW),
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          defaultValue: fn(NOW),
        },
      },
      {
        schema: Schema.STORE,
      },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(
      {
        tableName: Table.Store.USER,
        schema: Schema.STORE,
      },
    );
  },
};
