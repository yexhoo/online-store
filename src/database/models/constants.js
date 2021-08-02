const Schema = Object.freeze({
  STORE: 'store',
});

const Store = Object.freeze({
  USER: 'User',
  ORDER: 'Order',
  PRODUCT: 'Product',
});

const Table = Object.freeze({
  Store,
});

module.exports = {
  Schema,
  Table,
};
