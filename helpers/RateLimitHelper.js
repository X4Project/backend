const rateLimit = require('express-rate-limit');
const RateLimiting = require('../constants/rateLimitingConstants');

const globalRateLimiter = rateLimit({
  windowMs: RateLimiting.TIMERANGE,
  max: RateLimiting.MAXIMUM_NUMBER_OF_REQUESTS,
  message: RateLimiting.MESSAGE
});

const createRateLimiter = (
  windowMs = RateLimiting.TIMERANGE,
  max = RateLimiting.MAXIMUM_NUMBER_OF_REQUESTS,
  message = RateLimiting.MESSAGE
) => rateLimit({ windowMs, max, message });

module.exports = {
  globalRateLimiter,
  createRateLimiter
};
