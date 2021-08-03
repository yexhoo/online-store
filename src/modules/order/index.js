const clone = require('lodash.clonedeep');

const Factory = require('../../database/factory');
const { BadRequest } = require('../common/errors');

module.exports.create = async (input, email) => {
  const { repositories } = await Factory.database();
  const { orderRepository, productRepository, userRepository } = repositories;
  const { id } = await userRepository.findByEmail(email);

  if (!id) { throw new BadRequest(`${email} invalid user.`); }

  const order = clone(input);
  order.userId = id;

  const persistedOrder = await orderRepository.create(order);

  const products = order.products.map((p) => {
    const product = clone(p);
    product.orderId = persistedOrder.id;
    return product;
  });

  await productRepository.create(products);

  return { order: persistedOrder };
};
