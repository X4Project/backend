const express = require('express');
const router = express.Router();
const {
  getDiseaseByIdV2,
  getDiseasesV2
} = require('../../controllers/diseaseController');
const validateObjectId = require('../../middlewares/validateObjectId');
const {
  TIMERANGE_GET_DISEASE_BY_ID,
  MAXIMUM_NUMBER_OF_REQUESTS_GET_DISEASE_BY_ID
} = require('../../constants/rateLimitingConstants');
const { createRateLimiter } = require('../../helpers/RateLimitHelper');

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
 *     produces:
 *       - application/json
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
 *         name: langCode
 *         schema:
 *           type: string
 *     summary: Get diseases
 *     responses:
 *       200:
 *         description: Success
 *
 */
router.get('/', getDiseasesV2);

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
const getDiseaseByIdRateLimiter = createRateLimiter(
  TIMERANGE_GET_DISEASE_BY_ID,
  MAXIMUM_NUMBER_OF_REQUESTS_GET_DISEASE_BY_ID
);
router.get(
  '/:id',
  validateObjectId,
  getDiseaseByIdRateLimiter,
  getDiseaseByIdV2
);

module.exports = router;
