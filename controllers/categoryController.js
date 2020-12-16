const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { categorySchema } = require('../models/category');
const ErrorHelper = require('../helpers/ErrorHelper');
const {
  addCategoryToDisease,
  addDiseaseToCategory
} = require('../controllers/diseaseController');
const Category = mongoose.model('categories', categorySchema, 'categories');

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().select('-diseases');
    res.send(categories);
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

const addCategory = async (req, res) => {
  const {
    name,
    description,
    image,
    parentCategoryId,
    tag,
    diseases
  } = req.body;
  const category = new Category({
    name,
    description,
    image,
    tag,
    parentCategoryId
  });
  try {
    const result = await category.save();
    await Disease.findByIdAndUpdate(
      diseaseId,
      { $push: { categories: categoryId } },
      { new: true, useFindAndModify: false }
    );
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
    const category = await Category.find({
      _id: req.params.id
    })
      .populate('diseases', '-id')
      .select('diseases');
    res.send(category);
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
