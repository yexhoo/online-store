const { databaseFactory } = require('../index');
const parameterStore = require('../store');

let database = null;

module.exports.database = async () => {
  if (!database) {
    const connection = await parameterStore.getParameters('faas_db', true);
    database = databaseFactory(connection);
    await database.connect();
  }

  return database;
};

module.exports.close = async () => {
  if (database) {
    await database.disconnect();
  }
};
