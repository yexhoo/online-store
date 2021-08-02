const { DataTypes } = require('sequelize');

const { Table, Schema, ID } = require('../constants');
const { CASCADE, SET_NULL } = require('../constants');
const { getBaseAttributes } = require('../model-factory');

const modelName = Table.Store.PRODUCT;

const attributes = getBaseAttributes({
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
});

const associate = ({
  Product, Order,
}) => {
  Product.belongsTo(Order, { foreignKey: 'orderId' });
};

module.exports = {
  modelName,
  attributes,
  associate,
};
