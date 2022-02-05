const { User } = require('../../infrastructure/database');

const create = async (data) => {
  try {
    const result = await User.create(data);
    return result;
  } catch (e) {
    return e;
  }
};

const readOne = async (where) => {
  try {
    const result = await User.findOne({
      where,
    });
    return result;
  } catch (e) {
    return e;
  }
};

module.exports = {
  create,
  readOne,
};
