const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  addCategory,
  updateCategory
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

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     tags: [Category]
 *     summary: Update a category
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: category
 *         description: The category to update
 *         schema:
 *           $ref: '#/definitions/AddCategoryRequest'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.patch('/:id', auth, updateCategory);

module.exports = router;
