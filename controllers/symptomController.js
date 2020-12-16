const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { symptomSchema } = require('../models/symptom');
const ErrorHelper = require('../helpers/ErrorHelper');
const Symptom = mongoose.model('symptoms', symptomSchema, 'symptoms');
const { SUCCESS } = require('../constants/errorCodeConstants');

const getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.send(symptoms);
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

module.exports = {
  getSymptoms
};
