const mongoose = require('mongoose');
const fs = require('fs');
const config = require('../config');
const { wordbookSchema } = require('../models/wordbook');
const { logger } = require('../middlewares/logging');
const { Disease } = require('./diseaseController');
const { Symptom } = require('./symptomController');
const Wordbook = mongoose.model('wordbook', wordbookSchema, 'wordbook');
const {
  Unauthorized,
  SuccessResponse,
  BadRequest,
  NotFound
} = require('../helpers/ErrorHelper');
const {
  DEFAULT_SORT_BY_DIRECTION,
  DEFAULT_SORT_BY_COLUMN
} = require('../constants/sortingConstants');
const {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} = require('../constants/paginationConstants');
const { getLanguageInfo } = require('../constants/language-constants');

const processMultiLangDiseases = async (req, res) => {
  try {
    const languageInfo = getLanguageInfo(req.body.lang);
    if (!languageInfo) {
      return NotFound(res, 'Language not found');
    }
    if (req.body.secretKey === config.X4_SECRET_KEY) {
      return SuccessResponse(res, languageInfo);
    } else {
      return Unauthorized(res, 'Invalid secret key');
    }
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

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

const getWordbook = async (req, res) => {
  try {
    const {
      keyword = '',
      lang = '',
      isProcessed = '',
      pageIndex = DEFAULT_PAGE_INDEX,
      pageSize = DEFAULT_PAGE_SIZE,
      orderByColumn = DEFAULT_SORT_BY_COLUMN,
      orderByDirection = DEFAULT_SORT_BY_DIRECTION
    } = req.query;
    const isGetAll = !(pageIndex && pageSize);
    const count = await Wordbook.find({
      name: {
        $regex: keyword
      },
      lang: {
        $regex: lang
      }
    }).count();
    const multilangDiseases = await Wordbook.find({
      name: {
        $regex: keyword,
        $options: 'i'
      },
      lang: {
        $regex: lang
      }
    })
      .select('_id name isProcessed lang')
      .sort(`${orderByDirection === 'asc' ? '' : '-'}${orderByColumn}`)
      .skip(isGetAll ? 0 : parseInt((pageIndex - 1) * pageSize))
      .limit(isGetAll ? 0 : parseInt(pageSize));
    return SuccessResponse(res, {
      pageIndex: isGetAll ? 1 : parseInt(pageIndex),
      pageSize: isGetAll ? count : parseInt(pageSize),
      count,
      data: multilangDiseases
    });
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

const getWordbookById = async (req, res) => {
  try {
    const wordbook = await Wordbook.findById(req.params.id).select('-id');
    if (!wordbook) {
      return NotFound(res, 'Not found.');
    } else {
      return SuccessResponse(res, wordbook);
    }
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

module.exports = {
  splitSymptoms,
  runLogger,
  getWordbook,
  getWordbookById,
  processMultiLangDiseases,
  Wordbook
};
