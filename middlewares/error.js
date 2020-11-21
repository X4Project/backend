/* eslint-disable no-unused-vars */
const { logger } = require('./logging');
const ErrorHelper = require('../helpers/ErrorHelper');

module.exports = (err, req, res, next) => {
  logger.error(err);
  return ErrorHelper.InternalServerError(res);
};
