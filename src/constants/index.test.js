const { HTTP, MESSAGES} = require('.');

describe('constants', () => {

  it('should return string values for constants.MESSAGES', () => {
    const keys = Object.keys(MESSAGES);
    let k = 0;
    while (k < keys.length) { expect(typeof MESSAGES[keys[k]] === 'string').toBeTruthy(); k += 1; }
  });

  it('should return number values for constants.HTTP', () => {
    const keys = Object.keys(HTTP);
    let k = 0;
    while (k < keys.length) { expect(typeof HTTP[keys[k]] === 'number').toBeTruthy(); k += 1; }
  });
});
