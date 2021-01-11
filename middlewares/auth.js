const jwt = require('jsonwebtoken');
const config = require('../config');
const { Unauthorized, BadRequest } = require('../helpers/ErrorHelper');

module.exports = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader && bearerHeader.split(' ');
  const bearerToken = bearer && bearer.length > 0 && bearer[1];
  const token = bearerToken || req.headers['token'];
  if (!token) return Unauthorized(res, 'Access denied. No token provided.');
  try {
    const decodedPayload = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decodedPayload;
    next();
  } catch (ex) {
    return BadRequest(res, 'Invalid Token.');
  }
};
