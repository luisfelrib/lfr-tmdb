const TmdbAxiosClient = require('./tmdb_axios_client');

module.exports = {
  getMovies: TmdbAxiosClient.trendingMoviesWeek,
  getTvShows: TmdbAxiosClient.trendingTvShowsWeek,
  getMovieDetails: TmdbAxiosClient.getMovieDetails,
  getTvShowDetails: TmdbAxiosClient.getTvShowDetails,
};
