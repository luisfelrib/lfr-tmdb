const Constants = require('../utils/constants');

function generatePosterPath(path) {
  return `${process.env.TMDB_IMAGE_BASE_URL}w500${path}`;
}

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
      poster_path: generatePosterPath(el.poster_path),
      type,
    }));
    return [null, result];
  }
  const response = Constants.ERR_INTERNAL_SERVER;
  return [response, null];
};

const validateDetailRequest = (language, id) => {
  const errors = [];
  if (!language) {
    errors.push = 'Header accept-language must be valid (eg: pt-BR)';
  }
  if (!id) {
    errors.push = 'ID param must be valid';
  }
  if (errors.length > 0) {
    const response = Constants.ERR_VALIDATION;
    response.message = errors;
    return response;
  }
  return null;
};

const validateDetails = (data) => {
  if (!data.id && !data.poster_path) {
    if (data.response && data.response.status && data.message) {
      const response = {
        errCode: data.response.status,
        message: data.message,
      };
      return [response, null];
    }
    const response = Constants.ERR_INTERNAL_SERVER;
    return [response, null];
  }
  const details = data;
  details.poster_path = generatePosterPath(data.poster_path);
  return [null, details];
};

module.exports = {
  getCacheKey,
  filterAndAddFullImagePath,
  validateDetails,
  validateDetailRequest,
};
