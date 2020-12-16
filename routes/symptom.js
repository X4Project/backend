const express = require('express');
const router = express.Router();
const { getSymptoms } = require('../controllers/symptomController');

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

module.exports = router;
