const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const config = require('../config');
const fs = require('fs');
const { Disease } = require('./diseaseController');
const { Symptom } = require('./symptomController');
const {
  Unauthorized,
  SuccessResponse,
  BadRequest
} = require('../helpers/ErrorHelper');

const splitSymptoms = async (req, res) => {
  try {
    if (req.body.secretKey === config.X4_SECRET_KEY) {
      const queriedDiseases = await Disease.find().select('symptoms');
      const diseases = queriedDiseases.map(disease => ({
        diseaseId: disease._id,
        symptoms: disease.symptoms
      }));
      const diseasesWithSymptomArray = diseases.map(disease => {
        let symptomsArray =
          disease.symptoms && disease.symptoms.match(/<li>.*?<\/li>/g);
        symptomsArray =
          symptomsArray &&
          symptomsArray.map(symptom =>
            symptom
              .slice(4, -5)
              .replace(/<.+>/g, '')
              .replace(/[ \t]+$/, '')
          );
        return {
          diseaseId: disease.diseaseId,
          symptoms: symptomsArray
        };
      });

      diseasesWithSymptomArray.forEach(async disease => {
        disease.symptoms &&
          (await Symptom.create({
            diseaseId: disease.diseaseId,
            list: disease.symptoms
          }));
      });
      return SuccessResponse(res, null, 204);
    } else {
      return Unauthorized(res, 'Invalid secret key');
    }
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

const runLogger = async (req, res) => {
  try {
    let result = '';
    const readLogStream = fs.createReadStream('error.log', 'utf8');
    readLogStream
      .on('data', chunk => {
        result += `${chunk}
      `;
      })
      .on('end', () => {
        return SuccessResponse(res, result.replace(/^\uFEFF/, ''));
      });
  } catch (error) {
    logger.error(error, error.message);
    return BadRequest(res, error);
  }
};

module.exports = {
  splitSymptoms,
  runLogger
};
