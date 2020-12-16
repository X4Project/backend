const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { logger } = require('../middlewares/logging');
const config = require('../config');
const diseaseSchema = require('../models/disease');
const symptomSchema = require('../models/symptom');
const { InternalServerError, Unauthorized } = require('../helpers/ErrorHelper');

// const Disease = mongoose.model('diseases', diseaseSchema);
// const Symptom = mongoose.model('symptoms', symptomSchema);

const splitSymptoms = async (req, res) => {
  try {
    if (req.query.secretKey === config.X4_SECRET_KEY) {
      res.send('It works');
    } else {
      return Unauthorized(res, 'Invalid secret key');
    }
  } catch (error) {
    logger.error(error.message, error);
    return InternalServerError(res);
  }
};

module.exports = {
  splitSymptoms
};
