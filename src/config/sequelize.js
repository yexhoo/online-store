const {
  POSTGRES_DIALECT,
  ENABLE_BENCHMARK,
  MAX_CONNECTIONS,
  MIN_CONNECTIONS,
  DISABLE_TIMESTAMPS,
  Environment,
} = require('./constants');
const { POSTGRES } = require('../constants');
const { node: { environment } } = require('./process');

const { env } = process;

const isTrue = (obj) => (obj || '').toString().toLowerCase() === 'true';
const isLocal = () => environment === Environment.LOCAL;

const configFactory = (connectionInfo, logger) => {
  const enableDebugging = isTrue(env.DATABASE_DEBUG);
  const proxyLog = (executed, v, data) => {
    const { sequelize, ...otherData } = data;

    logger.debug(executed, otherData, [POSTGRES]);
  };
  const config = {
    forceSync: isLocal() && isTrue(env.DATABASE_LOCAL_FORCE_SYNC),
    options: {
      dialect: POSTGRES_DIALECT,
      ...connectionInfo,
      define: {
        timestamps: DISABLE_TIMESTAMPS,
      },
      logging: enableDebugging ? proxyLog : false,
      benchmark: ENABLE_BENCHMARK,
      pool: {
        max: MAX_CONNECTIONS,
        min: MIN_CONNECTIONS,
      },
    },
  };

  return config;
};

module.exports = configFactory;
