const hasProductionFlag = () => process.argv.length > 2 && process.argv.includes('--production');
const Logger = require('../src/database/utils/logger');

const throwIfIsUnsafelyRunningProduction = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isRunningProductionSafely = hasProductionFlag();

  if (isProduction) {
    Logger.warn('Running script on production environment');
  }

  if (isProduction && !isRunningProductionSafely) {
    throw new Error('Fatal: environment is production and did not specify --production flag, aborting.');
  }
};

module.exports = {
  throwIfIsUnsafelyRunningProduction,
};
