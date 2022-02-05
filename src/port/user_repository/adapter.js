const User = require('./user_repository');
const Playlist = require('./palylist_repository');

module.exports = {
  save: User.create,
  getUser: User.readOne,
  addToUserPlaylist: Playlist.create,
  getUserPlaylist: Playlist.findAll,
};
