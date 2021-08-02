const { DataTypes } = require('sequelize');

const { Table, Schema, ID } = require('../constants');
const { CASCADE, SET_NULL } = require('../constants');
const { getBaseAttributes } = require('../model-factory');

const modelName = Table.Store.ORDER;

const attributes = getBaseAttributes({
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
});

const associate = ({
  Order, User, Product,
}) => {
  Order.belongsTo(User, { foreignKey: 'userId' });
  Order.hasMany(Product, { foreignKey: 'orderId' });
};

module.exports = {
  modelName,
  attributes,
  associate,
};
