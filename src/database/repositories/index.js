const Logger = require('../utils/logger');

const repositoryFactory = ({ models }) => {
  Logger.info(models);
  return {};
};

module.exports = repositoryFactory;
