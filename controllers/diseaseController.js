const { logger } = require('../middlewares/logging');
const mongoose = require('mongoose');
const { diseaseSchema } = require('../models/disease');
const { categorySchema } = require('../models/category');
const ErrorHelper = require('../helpers/ErrorHelper');
const Disease = mongoose.model('diseases', diseaseSchema, 'diseases');
const Category = mongoose.model('categories', categorySchema, 'categories');
const {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE
} = require('../constants/paginationConstants');
const {
  DEFAULT_SORT_BY_DIRECTION,
  DEFAULT_SORT_BY_COLUMN
} = require('../constants/sortingConstants');

const addCategoryToDisease = async (diseaseId, categoryId) => {
  return await Disease.findByIdAndUpdate(
    diseaseId,
    { $push: { categories: categoryId } },
    { new: true, useFindAndModify: false }
  );
};

const addDiseaseToCategory = async (categoryId, diseaseId) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    { $push: { diseases: diseaseId } },
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
      orderByColumn = DEFAULT_SORT_BY_COLUMN,
      orderByDirection = DEFAULT_SORT_BY_DIRECTION
    } = req.body;

    const count = await Disease.find({
      name: {
        $regex: name
      },
      'categories._id': {
        $in: [categoryId]
      }
    }).count();

    const diseases = await Disease.find({
      name: {
        $regex: name
      },
      'categories._id': {
        $in: [categoryId]
      }
    })
      .populate('categories', '_id name tag')
      .select('name categories overview')
      .sort(`${orderByDirection === 'asc' ? '' : '-'}${orderByColumn}`)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);

    res.send({ pageIndex, pageSize, count, data: diseases });
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

const getDiseaseById = async (req, res) => {
  try {
    let disease = await Disease.findById(req.params.id)
      .populate('categories', 'id name tag')
      .select('-id');
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
  getDiseaseById,
  addCategoryToDisease,
  addDiseaseToCategory
};
