const redis = require('redis');

const redisClient = redis.createClient({
  url: `redis://:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
redisClient.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error(error);
});
redisClient.connect((err) => {
  // eslint-disable-next-line no-console
  if (err) console.error(err);
});

const setCache = async (key, value) => {
  try {
    const result = await redisClient.set(key, JSON.stringify(value));
    return result;
  } catch (error) {
    return error;
  }
};

const getCache = async (key) => {
  try {
    const result = await redisClient.get(key);
    if (result) return JSON.parse(result);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  setCache,
  getCache,
};
