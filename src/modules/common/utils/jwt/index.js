const jwt = require('jsonwebtoken');

const expiresIn = `${1000 * 60 * 60 * 2}ms`; // 2 hours

module.exports.token = (payload) => jwt
  .sign(payload, process.env.JWT_SECRET, { expiresIn });

module.exports.unauthenticated = (res, code) => {
  res.status(code).send({ error: 'Invalid user' });
};

module.exports.getTokenFromHeaders = (auth) => {
  let token = null;
  if (auth) {
    token = auth.replace('Bearer ', '');
  }
  return token;
};

module.exports.verify = async (payload) => new Promise((resolve) => {
  jwt.verify(payload, process.env.JWT_SECRET, (err, decoded) => {
    if (err) { resolve(null); }
    resolve(decoded);
  });
});
