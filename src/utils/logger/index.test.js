const Logger = require('.');

describe('utils/logger', () => {
  it('should execute info method', () => {
    Logger.info('Test Info');
  });

  it('should execute error method', () => {
    Logger.error('Test Error');
  });
});
