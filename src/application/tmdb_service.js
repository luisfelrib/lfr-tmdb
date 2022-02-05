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
  const movies = TmdbDomain.filterAndAddFullImagePath(moviesFromTmdb, 'movie');
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
  const tvShows = TmdbDomain.filterAndAddFullImagePath(tvShowsFromTmdb, 'tv');
  CacheAdapter.set(cacheKey, tvShows);
  return tvShows;
};

module.exports = {
  retrieveTrendingMovies,
  retrieveTrendingTvShows,
};
