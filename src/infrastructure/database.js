const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASS,
  {
    dialect: process.env.SEQUELIZE_DB,
    host: process.env.DB_HOST,
  },
);

// Model definition
const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  underscored: true,
});

const Playlist = sequelize.define('Playlist', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  tmdbId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  release_date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  poster_path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  tableName: 'playlist',
});
Playlist.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Auto-create table if not exists
function initModels() {
  User.sync();
  Playlist.sync();
}

const initDatabase = () => {
  initModels();
};

module.exports = {
  sequelize,
  initDatabase,
  User,
  Playlist,
};
