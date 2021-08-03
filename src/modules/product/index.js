const { QueryTypes } = require('sequelize');

const Factory = require('../../database/factory');
const { report } = require('../queries');

module.exports.get = async (init = 'init', end = 'end') => {
  const { sequelize } = await Factory.database();
  const products = await sequelize.query(report(init, end), { type: QueryTypes.SELECT })
    .then((list) => list);
  return { products };
};
