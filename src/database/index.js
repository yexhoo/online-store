const configFactory = require('./config/sequelize');
const sequelizeFactory = require('./sequelize');
const { POSTGRES } = require('./constants');
const { Schema } = require('./models/constants');

const repositoryFactory = require('./repositories');

const validate = (connectionInfo, logger) => {
  if (!connectionInfo) {
    throw new Error('Invalid connection information.');
  }

  if (!logger) {
    throw new Error('Invalid logger.');
  }
};

module.exports.databaseFactory = (connectionInfo, logger = console) => {
  validate(connectionInfo, logger);
  const config = configFactory(connectionInfo, logger);
  const sequelize = sequelizeFactory(config.options);
  const { database } = connectionInfo;

  const connect = async () => {
    await sequelize.authenticate();
    logger.debug('Connected to Postgres DB', database, [POSTGRES]);

    if (config.forceSync) {
      const schemaPromises = [];
      for (const schemaName of Object.values(Schema)) {
        logger.debug(`Creating schema ${schemaName}`);
        const createSchemaPromise = sequelize.createSchema(schemaName);

        schemaPromises.push(createSchemaPromise);
      }

      await Promise.all(schemaPromises);

      logger.debug('Dropping all tables and creating them again', database, [POSTGRES]);
      await sequelize.sync({ force: true });
      logger.debug('Done re-creating database', database, [POSTGRES]);
    }
  };

  const disconnect = async () => {
    await sequelize.close();

    logger.debug('Disconnected from Postgres DB', database, [POSTGRES]);
  };

  const getModels = () => sequelize.models;

  const repositories = repositoryFactory(sequelize);

  return {
    connect,
    disconnect,
    getModels,
    repositories,
  };
};
