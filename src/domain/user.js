const validate = require('validate.js');
const Constants = require('../utils/constants');

const createUserConstraints = {
  name: {
    presence: {
      allowEmpty: false,
    },
  },
  pass: {
    presence: {
      allowEmpty: false,
    },
  },
  email: {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: '^Invalid email!',
    },
  },
};

const loginConstraints = {
  pass: {
    presence: {
      allowEmpty: false,
    },
  },
  email: {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: '^Invalid email!',
    },
  },
};

const validateCreate = (data) => {
  const validationResponse = validate(data, createUserConstraints);
  if (validationResponse) {
    const response = Constants.ERR_VALIDATION;
    response.message = validationResponse;
    return response;
  }
  return null;
};

const validateLogin = (data) => {
  const validationResponse = validate(data, loginConstraints);
  if (validationResponse) {
    const response = Constants.ERR_VALIDATION;
    response.message = validationResponse;
    return response;
  }
  return null;
};

const validateUser = (data) => {
  if (!data) {
    const response = Constants.ERR_UNAUTHORIZED;
    return [response, null];
  } if (data && !data.id) {
    const response = Constants.ERR_INTERNAL_SERVER;
    response.message = data;
    return [response, null];
  }
  const user = {
    id: data.id,
    name: data.name,
    email: data.email,
  };
  return [null, user];
};

module.exports = {
  validateCreate,
  validateLogin,
  validateUser,
};
