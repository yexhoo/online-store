const { DataTypes } = require('sequelize');

const { Table } = require('../constants');
const { getBaseAttributes } = require('../model-factory');

const modelName = Table.Store.USER;

const attributes = getBaseAttributes({
  email: {
    allowNull: false,
    type: DataTypes.STRING(320),
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING(90),
  },
});

module.exports = {
  modelName,
  attributes,
};
