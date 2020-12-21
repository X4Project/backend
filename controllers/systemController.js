const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { logger } = require('../middlewares/logging');
const config = require('../config');
const fs = require('fs');
const diseaseSchema = require('../models/disease');
const symptomSchema = require('../models/symptom');
const {
  InternalServerError,
  Unauthorized,
  SuccessResponse
} = require('../helpers/ErrorHelper');

const splitSymptoms = async (req, res) => {
  try {
    if (req.query.secretKey === config.X4_SECRET_KEY) {
      //TODO: Get all diseases

      //TODO: Check if disease.symptoms doesn't include any <li></li> => don't touch them

      //TODO: Save to Symptom

      return SuccessResponse(res, 'It works');
    } else {
      return Unauthorized(res, 'Invalid secret key');
    }
  } catch (error) {
    logger.error(error.message, error);
    return InternalServerError(res, error);
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
    return InternalServerError(res, error);
  }
};

module.exports = {
  splitSymptoms,
  runLogger
};
