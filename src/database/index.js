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

const databaseFactory = (connectionInfo, logger = console) => {
  validate(connectionInfo, logger);
  const config = configFactory(connectionInfo, logger);
  const sequelize = sequelizeFactory(config.options);

  const connect = async () => {
    await sequelize.authenticate();
    logger.debug('Connected to Postgres DB', null, [POSTGRES]);

    if (config.forceSync) {
      const schemaPromises = [];
      for (const schemaName of Object.values(Schema)) {
        logger.debug(`Creating schema ${schemaName}`);
        const createSchemaPromise = sequelize.createSchema(schemaName);

        schemaPromises.push(createSchemaPromise);
      }

      await Promise.all(schemaPromises);

      logger.debug('Dropping all tables and creating them again', null, [POSTGRES]);
      await sequelize.sync({ force: true });
      logger.debug('Done re-creating database', null, [POSTGRES]);
    }
  };

  const disconnect = async () => {
    await sequelize.close();

    logger.debug('Disconnected from Postgres DB', null, [POSTGRES]);
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

module.exports = databaseFactory;
