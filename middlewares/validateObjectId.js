const mongoose = require('mongoose');
const ErrorHelper = require('../helpers/ErrorHelper');

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    logger.error(error.message, error);
    return ErrorHelper.BadRequest(res, 'Invalid Object Id');
  } else {
    next();
  }
};
