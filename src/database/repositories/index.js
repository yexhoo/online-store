const userRepositoryFactory = require('./store/user-repository');
const orderRepositoryFactory = require('./store/order-repository');
const productRepositoryFactory = require('./store/product-repository');

const repositoryFactory = ({ models }) => {
  const userRepository = userRepositoryFactory(models);
  const orderRepository = orderRepositoryFactory(models);
  const productRepository = productRepositoryFactory(models);

  return {
    userRepository,
    orderRepository,
    productRepository,
  };
};

module.exports = repositoryFactory;
