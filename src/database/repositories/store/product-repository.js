const productRepositoryFactory = ({ Product }) => {
  const create = async (products) => Product.bulkCreate(products);
  return {
    create,
  };
};

module.exports = productRepositoryFactory;
