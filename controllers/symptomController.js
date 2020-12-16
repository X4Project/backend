const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { symptomSchema } = require('../models/symptom');
const { diseaseSchema } = require('../models/disease');
const ErrorHelper = require('../helpers/ErrorHelper');
const Symptom = mongoose.model('symptoms', symptomSchema, 'symptoms');
const Disease = mongoose.model('diseases', diseaseSchema, 'diseases');
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

const addSymptom = async (req, res) => {
  try {
    const disease = await Disease.findById(req.body.diseaseId);
    if (!disease) return ErrorHelper.NotFound(res);
    const symptom = new Symptom(req.body);
    const result = symptom.save();
    res.send(result);
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

module.exports = {
  getSymptoms,
  addSymptom
};
