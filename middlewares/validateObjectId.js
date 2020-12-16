const mongoose = require('mongoose');
const { INVALID_OBJECTID } = require('../constants/errorCodeConstants');

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res
      .status(400)
      .send({ statusCode: 400, responseCode: INVALID_OBJECTID });
  }
  next();
};
