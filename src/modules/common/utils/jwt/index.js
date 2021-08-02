const jwt = require('jsonwebtoken');

const expiresIn = `${1000 * 60 * 60 * 2}ms`; // 2 hours
module.exports.token = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
