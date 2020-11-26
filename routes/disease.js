const express = require('express');
const router = express.Router();
const {
  getDiseases,
  getDiseaseById
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
 *         required: true
 *         name: id
 *     summary: Get all diseases
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', validateObjectId, getDiseaseById);

module.exports = router;
