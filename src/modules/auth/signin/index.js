const Factory = require('../../../database/factory');
const { BadRequest } = require('../../common/errors');

const jwt = require('../../common/utils/jwt');

module.exports.validate = async (user) => {
  const { repositories: { userRepository } } = await Factory.database();
  const { email } = user;
  const exist = await userRepository.findByEmail(email);

  if (!exist) {
    throw new BadRequest(`${email} invalid user.`);
  }

  const token = jwt.token({ email });

  return { token };
};
