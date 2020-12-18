const mongoose = require('mongoose');
const { INVALID_OBJECTID } = require('../constants/errorCodeConstants');
const { BadRequest } = require('../helpers/ErrorHelper');

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return BadRequest(res, 'Invalid ObjectId', INVALID_OBJECTID);
  }
  next();
};
