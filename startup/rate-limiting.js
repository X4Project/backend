const { globalRateLimiter } = require('../helpers/RateLimitHelper');

module.exports = app => {
  app.set('trust proxy', 1);
  app.use(globalRateLimiter);
};
