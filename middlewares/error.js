/* eslint-disable no-unused-vars */
const { logger } = require('./logging');
const { InternalServerError } = require('../helpers/ErrorHelper');

module.exports = (err, req, res, next) => {
  logger.error(err);
  console.log(err);
  return InternalServerError(res, err);
};
