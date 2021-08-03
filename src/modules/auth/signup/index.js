const Factory = require('../../../database/factory');
const { BadRequest } = require('../../common/errors');

module.exports.create = async (user) => {
  const { repositories: { userRepository } } = await Factory.database();
  const { email } = user;

  const exist = await userRepository.findByEmail(email);
  if (exist) {
    throw new BadRequest(`User ${email} already exists.`);
  }
  const persisted = await userRepository.create(user);
  return { user: persisted };
};
