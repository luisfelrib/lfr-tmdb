const HomeDomain = require('../domain/home');
const TmdbAdapter = require('../port/tmdb_apis/adapter');
const CacheAdapter = require('../port/cache/adapter');

const retrieveTrendingMovies = async (language) => {
  const cacheKey = HomeDomain.getCacheKey(language, 'movie');
  const cache = await CacheAdapter.get(cacheKey);
  if (cache) {
    return cache;
  }
  const moviesFromTmdb = await TmdbAdapter.getMovies(language);
  const movies = HomeDomain.filterAndAddFullImagePath(moviesFromTmdb, 'movie');
  CacheAdapter.set(cacheKey, movies);
  return movies;
};

const retrieveTrendingTvShows = async (language) => {
  const cacheKey = HomeDomain.getCacheKey(language, 'tv');
  const cache = await CacheAdapter.get(cacheKey);
  if (cache) {
    return cache;
  }
  const tvShowsFromTmdb = await TmdbAdapter.getTvShows(language);
  const tvShows = HomeDomain.filterAndAddFullImagePath(tvShowsFromTmdb, 'tv');
  CacheAdapter.set(cacheKey, tvShows);
  return tvShows;
};

module.exports = {
  retrieveTrendingMovies,
  retrieveTrendingTvShows,
};
