require('dotenv').config({
  path: './.env',
});

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const parameterStore = require('../src/database/store');
const { throwIfIsUnsafelyRunningProduction } = require('./utils');
const Logger = require('../src/database/utils/logger');

const parseCommandArgument = (argument) => {
  if (!argument) {
    throw new Error('Invalid usage.');
  }

  const [key, value] = argument.split('=');

  if (!key || !value || key !== '--command') {
    throw new Error('Invalid usage.');
  }

  return value;
};

const injectEnvironmentVariables = async () => {
  Logger.info('Retrieving DB connection information.');

  const {
    host, port, database, username, password,
  } = await parameterStore.getParameters('faas_db', true);

  Logger.info(`Injecting DB connection information for DB ${database} on ${host} (${process.env.NODE_ENV}).`);

  process.env.DB_HOST = host;
  process.env.DB_PORT = port;
  process.env.DB_DATABASE = database;
  process.env.DB_USERNAME = username;
  process.env.DB_PASSWORD = password;
};

const executeCommand = async (command) => {
  const options = { maxBuffer: 1024 * 50000 };
  Logger.info(`Executing:\n${command}\n`);
  const { stdout, stderr } = await exec(command, options);

  if (stdout) Logger.info(stdout);
  if (stderr) Logger.error(stderr);
};

const main = async () => {
  throwIfIsUnsafelyRunningProduction();
  const command = parseCommandArgument(process.argv[2]);

  await injectEnvironmentVariables();
  await executeCommand(command);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    Logger.error(error);
    process.exit(1);
  });
