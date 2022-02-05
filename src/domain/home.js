const Constants = require('../utils/constants');

const getCacheKey = (language, type) => {
  if (!language) {
    const response = Constants.ERR_VALIDATION;
    response.message = 'Header accept-language must be valid (eg: pt-BR)';
    return [response, null];
  }
  const lang = language.split(',')[0];
  const dateKey = new Date().toISOString().split('T')[0];
  return [null, `thin_tmdb_${type}_${dateKey}_${lang}`];
};

const filterAndAddFullImagePath = (data, type) => {
  if (Array.isArray(data.results)) {
    const result = data.results.map((el) => ({
      id: el.id,
      title: type === 'movie' ? el.title : el.name,
      release_date: type === 'movie' ? el.release_date : el.first_air_date,
      poster_path: `${process.env.TMDB_IMAGE_BASE_URL}w500${el.poster_path}`,
      type,
    }));
    return result;
  }
  return null;
};

module.exports = {
  getCacheKey,
  filterAndAddFullImagePath,
};
