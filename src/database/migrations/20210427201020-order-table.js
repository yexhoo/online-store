const { DataTypes, fn } = require('sequelize');
const { Table, Schema } = require('../models/constants');
const { UUID_V4_GENERATE, NOW, ID } = require('../constants');
const { CASCADE, SET_NULL } = require('../constants');
const { fullName } = require('../utils');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      Table.Store.ORDER,
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: fn(UUID_V4_GENERATE),
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(90),
        },
        price: {
          allowNull: false,
          type: DataTypes.DECIMAL(10, 2),
        },
        userId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: Table.Store.USER,
              schema: Schema.STORE,
            },
            key: ID,
          },
          onUpdate: CASCADE,
          onDelete: SET_NULL,
          allowNull: true,
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

    await queryInterface
      .addIndex(fullName(Schema.STORE, Table.Store.ORDER), ['userId']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(
      {
        tableName: Table.Store.ORDER,
        schema: Schema.STORE,
      },
    );
  },
};
