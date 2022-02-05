const Constants = {
  ERR_VALIDATION: {
    errCode: 400,
    message: 'Invalid parameters',
  },
  ERR_UNAUTHORIZED: {
    errCode: 401,
    message: 'Unauthorized',
  },
  ERR_NOT_FOUND: {
    errCode: 404,
    message: 'Not found',
  },
  ERR_INTERNAL_SERVER: {
    errCode: 500,
    message: 'Internal server error',
  },
};

module.exports = Constants;
