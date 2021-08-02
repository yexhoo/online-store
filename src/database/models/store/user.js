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

const associate = ({
  User, Order,
}) => {
  User.hasMany(Order, { foreignKey: 'userId' });
};

module.exports = {
  modelName,
  attributes,
  associate,
};
