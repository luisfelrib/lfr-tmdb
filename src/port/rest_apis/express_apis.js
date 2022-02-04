const HomeService = require('../../application/home_service');

const moviesRoute = '/movies';
const tvShowsRoute = '/tv-shows';

module.exports = (app) => {
  app.get(`${moviesRoute}`, async (req, res) => {
    const language = req.get('accept-language').split(',')[0];
    const response = await HomeService.retrieveTrendingMovies(language);
    // res.status(Utils.responseStatus(response.error));
    res.json(response);
  });

  app.get(`${tvShowsRoute}`, async (req, res) => {
    const language = req.get('accept-language').split(',')[0];
    const response = await HomeService.retrieveTrendingTvShows(language);
    // res.status(Utils.responseStatus(response.error));
    res.json(response);
  });
};
