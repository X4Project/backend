const jwt = require('jsonwebtoken');
const config = require('../config');
const { Unauthorized, BadRequest } = require('../helpers/ErrorHelper');

module.exports = (req, res, next) => {
  const token =
    req.cookies['token'] || req.headers['x-auth-token'] || req.headers['token'];
  if (!token) return Unauthorized(res, 'Access denied. No token provided.');
  try {
    const decodedPayload = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decodedPayload;
    next();
  } catch (ex) {
    return BadRequest(res, 'Invalid Token.');
  }
};
