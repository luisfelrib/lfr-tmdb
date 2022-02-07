const TmdbDomain = require('../domain/tmdb');
const TmdbAdapter = require('../port/tmdb_apis/adapter');
const CacheAdapter = require('../port/cache/adapter');

const retrieveTrendingMovies = async (language) => {
  const [error, cacheKey] = TmdbDomain.getCacheKey(language, 'movie');
  if (error) {
    return error;
  }
  const cache = await CacheAdapter.get(cacheKey);
  if (cache) {
    return cache;
  }
  const moviesFromTmdb = await TmdbAdapter.getMovies(language);
  const [err, movies] = TmdbDomain.filterAndAddFullImagePath(moviesFromTmdb, 'movie');
  if (err) {
    return err;
  }
  CacheAdapter.set(cacheKey, movies);
  return movies;
};

const retrieveTrendingTvShows = async (language) => {
  const [error, cacheKey] = TmdbDomain.getCacheKey(language, 'tv');
  if (error) {
    return error;
  }
  const cache = await CacheAdapter.get(cacheKey);
  if (cache) {
    return cache;
  }
  const tvShowsFromTmdb = await TmdbAdapter.getTvShows(language);
  const [err, tvShows] = TmdbDomain.filterAndAddFullImagePath(tvShowsFromTmdb, 'tv');
  if (err) {
    return err;
  }
  CacheAdapter.set(cacheKey, tvShows);
  return tvShows;
};

const getMovieDetails = async (language, movieId) => {
  const error = TmdbDomain.validateDetailRequest(language, movieId);
  if (error) {
    return error;
  }
  const movieDetails = await TmdbAdapter.getMovieDetails(language, movieId);
  const [err, details] = TmdbDomain.validateDetails(movieDetails);
  if (err) {
    return err;
  }
  return details;
};

const getTvShowDetails = async (language, tvShowId) => {
  const error = TmdbDomain.validateDetailRequest(language, tvShowId);
  if (error) {
    return error;
  }
  const tvShowDetails = await TmdbAdapter.getTvShowDetails(language, tvShowId);
  const [err, details] = TmdbDomain.validateDetails(tvShowDetails);
  if (err) {
    return err;
  }
  return details;
};

module.exports = {
  retrieveTrendingMovies,
  retrieveTrendingTvShows,
  getMovieDetails,
  getTvShowDetails,
};
