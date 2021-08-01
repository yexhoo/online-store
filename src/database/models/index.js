const fs = require('fs');
const path = require('path');

const { Schema } = require('./constants');
const { modelFactory } = require('./model-factory');

const defineModel = (sequelize, directory, fileName) => {
  const modelPath = path.join(__dirname, directory, fileName);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const modelDefinition = require(modelPath);

  return modelFactory(sequelize, { schema: directory, ...modelDefinition });
};

const directoriesReducer = (files, directory) => {
  const directoryPath = path.join(__dirname, directory);
  const directoryFiles = fs
    .readdirSync(directoryPath)
    .map((fileName) => ({ directory, fileName }));

  files.push(...directoryFiles);
  return files;
};

const defineModels = (sequelize) => {
  Object
    .values(Schema)
    .reduce(directoriesReducer, [])
    .forEach(({ directory, fileName }) => defineModel(sequelize, directory, fileName));
};

const associateModels = (sequelize) => {
  Object
    .values(sequelize.models)
    .forEach((Model) => {
      Model.associate(sequelize.models);
    });
};

const init = (sequelize) => {
  defineModels(sequelize);
  associateModels(sequelize);

  return sequelize.models;
};

module.exports = init;
