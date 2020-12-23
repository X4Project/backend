const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addCategory
} = require('../controllers/categoryController');
const validateObjectId = require('../middlewares/validateObjectId');
const auth = require('../middlewares/auth');

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
router.post('/', auth, addCategory);

module.exports = router;
