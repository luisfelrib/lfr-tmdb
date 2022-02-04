const HomeDomain = require('../domain/home');
const TmdbAdapter = require('../port/tmdb_apis/adapter');

const retrieveTrendingMovies = async (language) => {
//   const cacheKey = HomeDomain.getCacheKey();
  const moviesFromTmdb = await TmdbAdapter.getMovies(language);
  const movies = HomeDomain.filterAndAddFullImagePath(moviesFromTmdb, 'movie');
  return movies;
};

const retrieveTrendingTvShows = async (language) => {
  //   const cacheKey = HomeDomain.getCacheKey();
  const tvShowsFromTmdb = await TmdbAdapter.getTvShows(language);
  const tvShows = HomeDomain.filterAndAddFullImagePath(tvShowsFromTmdb, 'tv');
  return tvShows;
};

module.exports = {
  retrieveTrendingMovies,
  retrieveTrendingTvShows,
};
