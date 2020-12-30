const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { categorySchema } = require('../models/category');
const { SuccessResponse, BadRequest } = require('../helpers/ErrorHelper');
const Category = mongoose.model('categories', categorySchema, 'categories');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('-diseases');
    return SuccessResponse(res, categories);
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

const addCategory = async (req, res) => {
  const category = new Category({ ...req.body });
  try {
    const result = await category.save();
    return SuccessResponse(res, result);
  } catch (ex) {
    let errorMessages = '';
    for (field in ex.errors) {
      errorMessages += ex.errors[field].message + '\n';
    }
    logger.error(errorMessages);
    return BadRequest(res, errorMessages);
  }
};

const updateCategory = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    return SuccessResponse(res, {}, 204);
  } catch (error) {
    logger.error(error.message, error);
    return BadRequest(res, error);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory
};
