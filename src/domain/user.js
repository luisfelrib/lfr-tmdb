const validate = require('validate.js');
const { v4: uuidv4 } = require('uuid');
const Utils = require('../utils/utils');
const Constraints = require('../utils/user_constraints');
const Constants = require('../utils/constants');

const User = {
  create(data) {
    const validationResponse = validate(data, Constraints.userConstraints);
    if (validationResponse) {
      const response = Constants.ERR_Validation;
      response.message = validationResponse;
      return [response, null];
    }
    const user = data;
    user.id = uuidv4();
    user.pin = Utils.genRandomCode();
    return [null, user];
  },

  edit(data) {
    const validationResponse = validate(data, Constraints.editUserConstraints);
    if (validationResponse) {
      const response = Constants.ERR_Validation;
      response.message = validationResponse;
      return [response, null];
    }
    return [null, data];
  },

  list(data) {
    const validationResponse = validate(data, Constraints.userByTenantConstraints);
    if (validationResponse) {
      const response = Constants.ERR_Validation;
      response.message = validationResponse;
      return [response, null];
    }
    return [null, { tenantId: data.tenantId }];
  },

  delete(data) {
    const validationResponse = validate(data, Constraints.deleteUserConstraints);
    if (validationResponse) {
      const response = Constants.ERR_Validation;
      response.message = validationResponse;
      return [response, null];
    }
    const user = { email: data.email, tenantId: data.tenantId };
    return [null, user];
  },

  getUserByName(data) {
    const validationResponse = validate(data, Constraints.userByUserNameConstraints);
    if (validationResponse) {
      const response = Constants.ERR_Validation;
      response.message = validationResponse;
      return [response, null];
    }
    const user = { userName: data.userName, tenantId: data.tenantId };
    return [null, user];
  },

};

module.exports = User;
