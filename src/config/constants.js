const POSTGRES_DIALECT = 'postgres';
const ENABLE_BENCHMARK = true;
const MAX_CONNECTIONS = 5;
const MIN_CONNECTIONS = 1;
const DISABLE_TIMESTAMPS = false;

const Environment = Object.freeze({
  LOCAL: 'local',
  DEVELOP: 'develop',
  STAGING: 'staging',
  PRODUCTION: 'production',
});

module.exports = {
  POSTGRES_DIALECT,
  ENABLE_BENCHMARK,
  MAX_CONNECTIONS,
  MIN_CONNECTIONS,
  DISABLE_TIMESTAMPS,
  Environment,
};
