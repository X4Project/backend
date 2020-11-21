const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addCategory,
  getDiseasesByCategoryId
} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/diseases/:id', getDiseasesByCategoryId);
router.post('/', addCategory);

module.exports = router;
