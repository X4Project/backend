const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addCategory,
  getDiseasesByCategoryId
} = require('../controllers/categoryController');

/**
 * @swagger
 * tags:
 *   name: Category
 *   summary: API to manage all categories.
 */

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Category]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /category/diseases/{categoryId}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: categoryId
 *     tags: [Category]
 *     summary: Get diseases by category
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/diseases/:id', getDiseasesByCategoryId);

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 */
router.post('/', addCategory);

module.exports = router;
