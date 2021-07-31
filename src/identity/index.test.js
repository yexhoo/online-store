const identity = require('.');

describe('identity', () => {
  it('should return same message', () => {
    const input = 'Hello World!!';
    expect(identity.echo(input)).toEqual(input);
  });
});
