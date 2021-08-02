const orderRepositoryFactory = ({ Order }) => {
  const create = async (order) => Order.create(order);
  return {
    create,
  };
};

module.exports = orderRepositoryFactory;
