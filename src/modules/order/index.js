const clone = require('lodash.clonedeep');

const Factory = require('../../database/factory');

module.exports.create = async (input) => {
  const { repositories: { orderRepository, productRepository } } = await Factory.database();
  const order = clone(input);
  order.userId = '909683dd-4ca6-4842-8038-aafe948dbe1f';

  const persistedOrder = await orderRepository.create(order);

  const products = order.products.map((p) => {
    const product = clone(p);
    product.orderId = persistedOrder.id;
    return product;
  });

  await productRepository.create(products);

  return { order: persistedOrder };
};
