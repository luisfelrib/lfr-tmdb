const axios = require('axios');

if (!process.env.TMDB_API_KEY) {
  // eslint-disable-next-line no-console
  console.log('TMDB API_KEY CANNOT BE EMPTY IN THE .env file');
  process.exit(0);
}
const params = {
  api_key: process.env.TMDB_API_KEY,
};
const axiosInstance = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
  timeout: parseInt(process.env.TMDB_BASE_URL, 10),
  params,
});

const trendingMoviesWeek = async (language) => {
  try {
    const response = await axiosInstance.get('trending/movie/week', { params: { language } });
    return response.data;
  } catch (error) {
    return error;
  }
};

const trendingTvShowsWeek = async (language) => {
  try {
    const response = await axiosInstance.get('trending/tv/week', { params: { language } });
    return response.data;
  } catch (error) {
    return error;
  }
};

const getMovieDetails = async (language, movieId) => {
  try {
    const response = await axiosInstance.get(`movie/${movieId}`, { params: { language } });
    return response.data;
  } catch (error) {
    return error;
  }
};

const getTvShowDetails = async (language, tvShowId) => {
  try {
    const response = await axiosInstance.get(`tv/${tvShowId}`, { params: { language } });
    return response.data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  trendingMoviesWeek,
  trendingTvShowsWeek,
  getMovieDetails,
  getTvShowDetails,
};
