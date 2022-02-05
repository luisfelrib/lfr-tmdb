/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const createJWT = (data) => {
  try {
    const token = jwt.sign(
      {
        userId: data.id,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.USR_TKN_EXPIRATION,
      },
    );
    return token;
  } catch (e) {
    return e;
  }
};

const checkJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.id = decoded.id;
    next();
  });
};
const responseStatus = ({ errCode }) => {
  if (errCode) {
    return errCode;
  }
  return 200;
};

module.exports = {
  createJWT,
  checkJWT,
  responseStatus,
};
