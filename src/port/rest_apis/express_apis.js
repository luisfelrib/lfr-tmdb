const TmdbService = require('../../application/tmdb_service');
const UserService = require('../../application/user_service');
const Utils = require('../../utils');

const moviesRoute = '/api/movie';
const tvShowsRoute = '/api/tv-show';
const userRoute = '/api/user';
const login = '/api/login';

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

  app.post(`${userRoute}/mylist`, Utils.checkJWT, async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const response = await UserService.addToUserPlaylist(id, body);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  app.get(`${userRoute}/mylist`, Utils.checkJWT, async (req, res) => {
    const { id } = req.params;
    const response = await UserService.getUserPlaylist(id);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });
};
