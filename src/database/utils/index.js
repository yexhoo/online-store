const { Environment } = require('../config/constants');
const { node: { environment } } = require('../config/process');

const DOT = '.';
module.exports.isLocal = () => environment === Environment.LOCAL;
module.exports.fullName = (schema, table) => [schema, DOT, table].join('');
