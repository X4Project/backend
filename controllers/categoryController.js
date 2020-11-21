const { logger } = require('../middlewares/logging');
const mongoose = require('mongoose');
const { categorySchema } = require('../models/category');
const ErrorHelper = require('../helpers/ErrorHelper');
const {
  addCategoryToDisease,
  addDiseaseToCategory
} = require('../controllers/diseaseController');
const Category = mongoose.model('categories', categorySchema, 'categories');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

const addCategory = async (req, res) => {
  const { name, description, image, parentCategoryId, diseases } = req.body;
  const category = new Category({
    name,
    description,
    image,
    parentCategoryId
  });
  try {
    const result = await category.save();
    await addDiseaseToCategory(result._id);
    res.send(result);
  } catch (ex) {
    let errorMessages = '';
    for (field in ex.errors) {
      errorMessages += ex.errors[field].message + '\n';
    }
    res.status(400).send(errorMessages);
  }
};

const getDiseasesByCategoryId = async (req, res) => {
  try {
    const diseases = await Category.findById(req.params.id).populate(
      'diseases'
    );
    res.send(diseases);
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  getDiseasesByCategoryId
};
