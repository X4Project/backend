const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { symptomSchema } = require('../models/symptom');
const { diseaseSchema } = require('../models/disease');
const {
  SuccessResponse,
  NotFound,
  BadRequest
} = require('../helpers/ErrorHelper');
const Symptom = mongoose.model('symptoms', symptomSchema, 'symptoms');
const Disease = mongoose.model('diseases', diseaseSchema, 'diseases');

const getSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    return SuccessResponse(res, symptoms);
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

const addSymptom = async (req, res) => {
  try {
    const disease = await Disease.findById(req.body.diseaseId);
    if (!disease) return NotFound(res, 'Not Found');
    const symptom = new Symptom(req.body);
    const result = symptom.save();
    return SuccessResponse(res, result, 201);
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

const getSymptomsByDiseaseId = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({
      diseaseId: req.params.id
    });
    if (!symptom) {
      return NotFound(res, 'Not Found.');
    } else {
      return SuccessResponse(res, symptom.list);
    }
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

module.exports = {
  getSymptoms,
  getSymptomsByDiseaseId,
  addSymptom,
  Symptom
};
