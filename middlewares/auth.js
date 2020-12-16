const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  const token =
    req.cookies['token'] || req.headers['x-auth-token'] || req.headers['token'];
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decodedPayload = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = decodedPayload;
    next();
  } catch (ex) {
    res.status(400).send('Invalid Token.');
  }
};
