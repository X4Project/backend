const express = require('express');
const router = express.Router();
const {
  getSymptoms,
  addSymptom,
  getSymptomsByDiseaseId
} = require('../controllers/symptomController');
const auth = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

/**
 * @swagger
 * tags:
 *   name: Symptom
 *   summary: API to manage all symptom
 * definitions:
 *   AddSymptomRequest:
 *     type: object
 *     properties:
 *       diseaseId:
 *         type: string
 *       list:
 *         type: array
 *         items:
 *           type: string
 */

/**
 * @swagger
 * /symptom:
 *   get:
 *     tags: [Symptom]
 *     summary: Get symptoms in the system
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getSymptoms);

/**
 * @swagger
 * /symptom/{diseaseId}:
 *   get:
 *     tags: [Symptom]
 *     summary: Get symptom list of a disease
 *     parameters:
 *       - in: path
 *         name: diseaseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/:diseaseId', validateObjectId, getSymptomsByDiseaseId);

/**
 * @swagger
 * /symptom:
 *   post:
 *     tags: [Symptom]
 *     summary: Add symptoms for a disease
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: symptom
 *         description: The symptom to create
 *         schema:
 *           $ref: '#/definitions/AddSymptomRequest'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.post('/', auth, addSymptom);

module.exports = router;
