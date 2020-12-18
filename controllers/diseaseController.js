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
const { SUCCESS } = require('../constants/errorCodeConstants');

const addCategoriesToDisease = async (req, res) => {
  try {
    const { categoryIds, diseaseId } = req.body;
    categoryIds &&
      categoryIds.length > 0 &&
      categoryIds.forEach(async categoryId => {
        await Category.findByIdAndUpdate(
          categoryId,
          { $push: { diseases: diseaseId } },
          { new: true, useFindAndModify: false }
        );
        await Disease.findByIdAndUpdate(
          diseaseId,
          { $push: { categories: categoryId } },
          { new: true, useFindAndModify: false }
        );
      });
    res.send({ statusCode: 201, responseCode: SUCCESS });
  } catch (error) {
    let errorMessages = '';
    for (field in ex.errors) {
      errorMessages += ex.errors[field].message + '\n';
    }
    logger.error(errorMessages, error);
    return ErrorHelper.InternalServerError(res);
  }
};

const getDiseases = async (req, res) => {
  try {
    const {
      keyword = '',
      categoryId,
      pageIndex,
      pageSize,
      orderByColumn = DEFAULT_SORT_BY_COLUMN,
      orderByDirection = DEFAULT_SORT_BY_DIRECTION
    } = req.query;

    const isGetAll = !(pageIndex && pageSize);

    const count = await Disease.find({
      $or: [
        {
          name: {
            $regex: keyword
          }
        },
        {
          overview: {
            $regex: keyword
          }
        }
      ],
      categories: {
        $in: [categoryId]
      }
    }).count();

    const diseases = await Disease.find({
      $or: [
        {
          name: {
            $regex: keyword,
            $options: 'i'
          }
        },
        {
          overview: {
            $regex: keyword,
            $options: 'i'
          }
        }
      ],
      categories: {
        $in: [categoryId]
      }
    })
      // .populate('categories', 'id name tag')
      .select('name image overview')
      .sort(`${orderByDirection === 'asc' ? '' : '-'}${orderByColumn}`)
      .skip(isGetAll ? 0 : (pageIndex - 1) * pageSize)
      .limit(isGetAll ? 0 : parseInt(pageSize));

    res.send({
      pageIndex: isGetAll ? 1 : pageIndex,
      pageSize: isGetAll ? count : parseInt(pageSize),
      count,
      data: diseases
    });
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
  addCategoriesToDisease
};
