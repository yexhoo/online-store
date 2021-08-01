const camelobj = require('camelobj');

const { node: { environment, parsedEnv } } = require('../config/process');

const validateValue = (extraPath, parameter = { Value: null }) => {
  if (parameter.Value == null) {
    throw new Error(`Parameter ${extraPath} was not found for ${environment}`);
  }
};

const handleRequestLocally = (extraPath, isAJsonParameter) => {
  const localEnvFilePath = extraPath.replace(/\//g, '_');
  const value = parsedEnv[localEnvFilePath];

  validateValue(extraPath, { Value: value }, isAJsonParameter);

  return isAJsonParameter ? camelobj(JSON.parse(value)) : camelobj(value);
};

const getParameters = async (extraPath = '', isAJsonParameter = false) => handleRequestLocally(extraPath, isAJsonParameter);

module.exports = {
  getParameters,
};
