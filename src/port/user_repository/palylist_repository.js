const { Playlist } = require('../../infrastructure/database');

const create = async (data) => {
  try {
    const result = await Playlist.create(data);
    return result;
  } catch (e) {
    return e;
  }
};

const findAll = async (userId) => {
  try {
    const result = await Playlist.findAll({
      where: {
        userId,
      },
    });
    return result;
  } catch (e) {
    return e;
  }
};

module.exports = {
  create,
  findAll,
};
