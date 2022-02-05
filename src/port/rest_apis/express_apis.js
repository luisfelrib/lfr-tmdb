const HomeService = require('../../application/home_service');
const UserService = require('../../application/user_service');
const Utils = require('../../utils');

const moviesRoute = '/movies';
const tvShowsRoute = '/tv-shows';
const userRoute = '/user';
const login = '/login';

module.exports = (app) => {
  app.get(`${moviesRoute}`, async (req, res) => {
    const language = req.get('accept-language');
    const response = await HomeService.retrieveTrendingMovies(language);
    res.status(Utils.responseStatus(response));
    res.json(response);
  });

  app.get(`${tvShowsRoute}`, async (req, res) => {
    const language = req.get('accept-language');
    const response = await HomeService.retrieveTrendingTvShows(language);
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
