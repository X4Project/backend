const express = require('express');
const router = express.Router();
const {
  getDiseases,
  getDiseaseById,
  addCategoriesToDisease
} = require('../controllers/diseaseController');
const validateObjectId = require('../middlewares/validateObjectId');

/**
 * @swagger
 * tags:
 *   name: Disease
 *   summary: API to manage all diseases.
 * definitions:
 *   GetDiseasesRequest:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       categoryId:
 *         type: string
 *       pageSize:
 *         type: number
 *       pageNumber:
 *         type: number
 *       orderByColumn:
 *         type: string
 *       orderByDirection:
 *         type: string
 *   AddCategoryToDiseaseRequest:
 *     type: object
 *     properties:
 *       diseaseId:
 *         type: string
 *         required: true
 *       categoryIds:
 *         type: array
 *         items:
 *           type: string
 *         required: true
 */

/**
 * @swagger
 * /disease:
 *   get:
 *     tags: [Disease]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: string
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: number
 *       - in: query
 *         name: orderByColumn
 *         schema:
 *           type: string
 *       - in: query
 *         name: orderByDirection
 *         schema:
 *           type: string
 *     summary: Get diseases
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/', getDiseases);

/**
 * @swagger
 * /disease/{id}:
 *   get:
 *     tags: [Disease]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     summary: Get disease by id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.get('/:id', validateObjectId, getDiseaseById);

/**
 * @swagger
 * /disease/add-categories:
 *   post:
 *     tags: [Disease]
 *     summary: Add category for a disease
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: addCategoryToDiseaseRequest
 *         schema:
 *           $ref: '#/definitions/AddCategoryToDiseaseRequest'
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/add-categories', auth, addCategoriesToDisease);

module.exports = router;
