/* eslint-disable no-param-reassign */
// const UserRepository = require('../port/user/user_repository');
const UserDomain = require('../domain/user');
const UserRepository = require('../port/user_repository/adapter');
const Utils = require('../utils');

const createUser = async (data) => {
  const error = UserDomain.validateCreate(data);
  if (error) {
    return error;
  }
  const response = await UserRepository.save(data);
  const [errorGetUser, user] = UserDomain.validateUser(response);
  if (errorGetUser) {
    return errorGetUser;
  }
  return user;
};

const login = async (data) => {
  const error = UserDomain.validateLogin(data);
  if (error) {
    return error;
  }
  const response = await UserRepository.getUser(data);
  const [errorGetUser, user] = UserDomain.validateUser(response);
  if (errorGetUser) {
    return errorGetUser;
  }
  const accessToken = Utils.createJWT(user);
  return { accessToken, user };
};

module.exports = {
  createUser,
  login,
};
