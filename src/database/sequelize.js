const Sequelize = require('sequelize');

const init = require('./models');

module.exports = (options) => {
  const sequelize = new Sequelize(options);

  init(sequelize);

  return sequelize;
};
