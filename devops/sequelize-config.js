const { env } = process;

module.exports = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: 'postgres',
  migrationStorage: 'sequelize',
  seederStorage: 'sequelize',
  logging: console,
};
