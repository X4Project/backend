const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addCategory,
  getDiseasesByCategoryId
} = require('../controllers/categoryController');
const validateObjectId = require('../middlewares/validateObjectId');

/**
 * @swagger
 * tags:
 *   name: Category
 *   summary: API to manage all categories.
 * definitions:
 *   AddCategoryRequest:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       image:
 *         type: string
 *       tag:
 *         type: string
 *       description:
 *         type: string
 *       parentCategoryId:
 *         type: number
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
 *         required: true
 *     tags: [Category]
 *     summary: Get diseases by category
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/diseases/:id', validateObjectId, getDiseasesByCategoryId);

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: category
 *         description: The category to create
 *         schema:
 *           $ref: '#/definitions/AddCategoryRequest'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', addCategory);

module.exports = router;
