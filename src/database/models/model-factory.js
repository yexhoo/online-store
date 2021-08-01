const { DataTypes, Sequelize } = require('sequelize');
const { UUID_V4_GENERATE, NOW } = require('../constants');

const getBaseAttributes = (attributes) => ({
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.fn(UUID_V4_GENERATE),
  },
  ...attributes,
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn(NOW),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn(NOW),
  },
});

const noop = () => {};

const modelFactory = (sequelize, {
  schema, modelName, attributes, associate = noop,
}) => {
  const options = {
    sequelize,
    schema,
    tableName: modelName,
    modelName,
    freezeTableName: true,
  };
  const Model = sequelize.define(modelName, attributes, options);

  Model.associate = associate;

  return Model;
};

module.exports = {
  getBaseAttributes,
  modelFactory,
};
