const TmdbService = require('../../application/tmdb_service');
const UserService = require('../../application/user_service');
const Utils = require('../../utils');

const moviesRoute = '/movie';
const tvShowsRoute = '/tv-show';
const userRoute = '/user';
const login = '/login';

module.exports = (app) => {
  app.get(`${moviesRoute}`, async (req, res) => {
    const language = req.get('accept-language');
    const response = await TmdbService.retrieveTrendingMovies(language);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  app.get(`${tvShowsRoute}`, async (req, res) => {
    const language = req.get('accept-language');
    const response = await TmdbService.retrieveTrendingTvShows(language);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  app.get(`${moviesRoute}/:id`, async (req, res) => {
    const language = req.get('accept-language');
    const { id } = req.params;
    const response = await TmdbService.getMovieDetails(language, id);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  app.get(`${tvShowsRoute}/:id`, async (req, res) => {
    const language = req.get('accept-language');
    const { id } = req.params;
    const response = await TmdbService.getTvShowDetails(language, id);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  // Create User
  app.post(`${userRoute}`, async (req, res) => {
    const { body } = req;
    const response = await UserService.createUser(body);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  app.post(`${login}`, async (req, res) => {
    const { body } = req;
    const response = await UserService.login(body);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });
};
