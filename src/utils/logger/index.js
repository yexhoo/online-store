/* eslint-disable no-console */
module.exports.info = (...args) => {
  console.log.apply(this, args);
};

module.exports.error = (...args) => {
  console.log.apply(this, args);
};
