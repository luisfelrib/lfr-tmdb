/* eslint-disable no-useless-escape */
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

const addToPlaylistConstraints = {
  tmdbId: {
    type: 'integer',
    presence: {
      allowEmpty: false,
    },
  },
  title: {
    presence: {
      allowEmpty: false,
    },
  },
  release_date: {
    presence: {
      allowEmpty: false,
    },
    format: {
      pattern: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
      message: '^Invalid date!',
    },
  },
  poster_path: {
    presence: {
      allowEmpty: false,
    },
  },
  type: {
    presence: {
      allowEmpty: false,
    },
    inclusion: ['movie', 'tv'],
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
    response.message = data.name ? data.name : data;
    return [response, null];
  }
  const user = {
    id: data.id,
    name: data.name,
    email: data.email,
  };
  return [null, user];
};

const validateAddToPlaylist = (userId, data) => {
  const validationResponse = validate(data, addToPlaylistConstraints);
  if (validationResponse) {
    const response = Constants.ERR_VALIDATION;
    response.message = validationResponse;
    return [response, null];
  }
  const item = {
    id: `${userId}-${data.type}-${data.tmdbId}`,
    userId,
    ...data,
  };
  return [null, item];
};

const validateAddedItemDbResponse = (data) => {
  if (data && !data.id) {
    const response = Constants.ERR_INTERNAL_SERVER;
    response.message = data.name ? data.name : data;
    return response;
  }
  return null;
};

module.exports = {
  validateCreate,
  validateLogin,
  validateUser,
  validateAddToPlaylist,
  validateAddedItemDbResponse,
};
