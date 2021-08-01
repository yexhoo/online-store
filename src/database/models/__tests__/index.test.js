const Sequelize = require('sequelize');

const configFactory = require('../../config/sequelize');
const init = require('..');
const { Table } = require('../constants');

let sequelize;

const getExpectedModels = () => {
  const tablesBySchema = Object
    .keys(Table)
    .map((schema) => Object.values(Table[schema]));

  return tablesBySchema
    .flat()
    .reduce((expextedModels, table) => {
      Object.assign(expextedModels, {
        [table]: expect.any(Function),
      });

      return expextedModels;
    }, {});
};

describe('Models', () => {
  beforeAll(() => {
    const config = configFactory({}, console);
    sequelize = new Sequelize(config.options);
  });

  it('Should initialize all models', () => {
    expect(sequelize.models).toMatchObject({});
    const models = init(sequelize);
    const expectedModels = getExpectedModels();

    expect(models).toMatchObject(expectedModels);
  });
});
