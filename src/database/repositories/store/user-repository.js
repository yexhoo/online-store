const userRepositoryFactory = ({ User }) => {
  const create = async (user) => User.create(user);
  const findByEmail = async (email) => User.findOne({ where: { email } });
  return {
    create,
    findByEmail,
  };
};

module.exports = userRepositoryFactory;
