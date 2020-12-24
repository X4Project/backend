const mongoose = require('mongoose');
const { INVALID_OBJECTID } = require('../constants/errorCodeConstants');
const { BadRequest } = require('../helpers/ErrorHelper');

module.exports = (req, res, next) => {
  const id = req.params.id || req.params.diseaseId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return BadRequest(res, 'Invalid ObjectId', INVALID_OBJECTID);
  }
  next();
};
