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

const addToUserPlaylist = async (userId, data) => {
  const [error, itemToAdd] = UserDomain.validateAddToPlaylist(userId, data);
  if (error) {
    return error;
  }
  const response = await UserRepository.addToUserPlaylist(itemToAdd);
  const err = UserDomain.validateAddedItemDbResponse(response);
  if (err) {
    return err;
  }
  return response;
};

const getUserPlaylist = async (userId) => {
  const response = await UserRepository.getUserPlaylist(userId);
  return response;
};

module.exports = {
  createUser,
  login,
  addToUserPlaylist,
  getUserPlaylist,
};
