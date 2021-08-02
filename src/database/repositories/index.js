const userRepositoryFactory = require('./store/user-repository');

const repositoryFactory = ({ models }) => {
  const userRepository = userRepositoryFactory(models);
  return {
    userRepository,
  };
};

module.exports = repositoryFactory;
