const { DataTypes, fn } = require('sequelize');
const { Table, Schema } = require('../models/constants');
const { UUID_V4_GENERATE, NOW, ID } = require('../constants');
const { CASCADE, SET_NULL } = require('../constants');
const { fullName } = require('../utils');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(
      Table.Store.PRODUCT,
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
        quantity: {
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        orderId: {
          type: DataTypes.UUID,
          references: {
            model: {
              tableName: Table.Store.ORDER,
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
      .addIndex(fullName(Schema.STORE, Table.Store.PRODUCT), ['orderId']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(
      {
        tableName: Table.Store.PRODUCT,
        schema: Schema.STORE,
      },
    );
  },
};
