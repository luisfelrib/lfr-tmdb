const RedisCache = require('./redis');

module.exports = {
  set: RedisCache.setCache,
  get: RedisCache.getCache,
};
