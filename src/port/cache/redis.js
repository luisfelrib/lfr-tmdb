/* eslint-disable no-console */
const redis = require('redis');

const redisClient = process.env.CACHE_ENABLE === 'true' ? redis.createClient({
  url: `redis://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
}) : null;

if (redisClient) {
  redisClient.connect((err) => {
    if (err) console.error(err);
  });
  redisClient.on('error', (error) => {
    console.error(error);
  });
}

const setCache = async (key, value) => {
  if (redisClient) {
    try {
      const result = await redisClient.set(key, JSON.stringify(value));
      return result;
    } catch (error) {
      return error;
    }
  }
  return null;
};

const getCache = async (key) => {
  if (redisClient) {
    try {
      const result = await redisClient.get(key);
      if (result) return JSON.parse(result);
      return result;
    } catch (error) {
      return error;
    }
  }
  return null;
};

module.exports = {
  setCache,
  getCache,
};
