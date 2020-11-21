const { logger } = require('../middlewares/logging');
const mongoose = require('mongoose');
const queryString = require('querystring');
const { diseaseSchema } = require('../models/disease');
const { categorySchema } = require('../models/category');
const ErrorHelper = require('../helpers/ErrorHelper');
const Disease = mongoose.model('diseases', diseaseSchema, 'diseases');
const Category = mongoose.model('categories', categorySchema, 'categories');
const {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} = require('../constants/paginationConstants');
const { DEFAULT_SORT_BY_DIRECTION } = require('../constants/sortingConstants');

const addCategoryToDisease = (diseaseId, category) => {
  return Disease.findByIdAndUpdate(
    diseaseId,
    { $push: { categories: category._id } },
    { new: true, useFindAndModify: false }
  );
};

const addDiseaseToCategory = (categoryId, disease) => {
  return Category.findByIdAndUpdate(
    categoryId,
    { $push: { diseases: disease._id } },
    { new: true, useFindAndModify: false }
  );
};

const getDiseases = async (req, res) => {
  try {
    const {
      name = '',
      categoryId,
      pageIndex = DEFAULT_PAGE_INDEX,
      pageSize = DEFAULT_PAGE_SIZE,
      orderByColumn,
      orderByDirection = DEFAULT_SORT_BY_DIRECTION
    } = req.body;
    const diseases = await Disease.find({
      name: {
        $regex: name
      },
      'categories._id': {
        $in: [categoryId]
      }
    })
      .populate('categories')
      .select('id _id name categories overview')
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);
    const count = await Disease.count();
    res.send({ pageIndex, pageSize, count, diseases });
  } catch (error) {
    logger.error(error.message, error);
    res
      .status(400)
      .json({ errorCode: 1, errorMessage: 'Something went wrong.' });
  }
};

const getDiseaseById = async (req, res) => {
  try {
    let disease = await Disease.findById(req.params.id).populate('categories');
    if (!disease) {
      return ErrorHelper.NotFound(res);
    } else {
      res.send(disease);
    }
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

module.exports = {
  getDiseases,
  getDiseaseById
};
