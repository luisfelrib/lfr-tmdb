/* eslint-disable no-param-reassign */
const UserRepository = require('../port/user/user_repository');
const UserDomain = require('../domain/user');

const UserService = {

  async createUser(data) {
    const [error, user] = UserDomain.create(data);
    if (error) {
      return error;
    }
    const response = await UserRepository.createUser(user);
    return response;
  },

  async editUser(data) {
    const [error, user] = UserDomain.edit(data);
    if (error) {
      return error;
    }
    const response = await UserRepository.editUser(user);
    return response;
  },

  async listUsers(data) {
    const [error, tenant] = UserDomain.list(data);
    if (error) {
      return error;
    }
    const response = await UserRepository.listUsers(tenant);
    return response;
  },

  async deleteUser(data) {
    const [error, user] = UserDomain.delete(data);
    if (error) {
      return error;
    }
    const response = await UserRepository.deleteUser(user);
    return response;
  },

  async getUserByUserName(data) {
    const [error, user] = UserDomain.getUserByName(data);
    if (error) {
      return error;
    }
    const response = await UserRepository.getUserByUserName(user);
    return response;
  },
};

module.exports = UserService;
