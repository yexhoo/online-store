const path = require('path');
const dotenv = require('dotenv');
const { Environment } = require('./constants');

const { env } = process;

const parsedEnv = dotenv.config({ path: path.join(__dirname, '../../.env') }).parsed || { ...env };

const getCurrentEnv = () => (
  Object.values(Environment).includes(parsedEnv.NODE_ENV) ? parsedEnv.NODE_ENV : Environment.LOCAL
);

module.exports = {
  node: {
    environment: getCurrentEnv(),
    parsedEnv,
  },
};
