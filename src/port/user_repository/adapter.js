const User = require('./user_repository');

module.exports = {
  save: User.create,
  getUser: User.readOne,
};
