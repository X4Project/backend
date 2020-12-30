const express = require('express');
const router = express.Router();
const {
  splitSymptoms,
  runLogger,
  getWordbook,
  getWordbookById
} = require('../controllers/systemController');
const auth = require('../middlewares/auth');
const validateObjectId = require('../middlewares/validateObjectId');

/**
 * @swagger
 * tags:
 *   name: System
 *   summary: API to execute some grand tasks
 * definitions:
 *   SecretKeyRequest:
 *     type: object
 *     properties:
 *       secretKey:
 *         type: string
 */

/**
 * @swagger
 * /system/split-symptoms:
 *   post:
 *     tags: [System]
 *     parameters:
 *       - in: body
 *         name: SecretKeyRequest
 *         schema:
 *           $ref: '#/definitions/SecretKeyRequest'
 *     summary: Split symptoms string to array of all diseases in system
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/split-symptoms', auth, splitSymptoms);

/**
 * @swagger
 * /system/run-logger:
 *   get:
 *     tags: [System]
 *     summary: Get recent log file content
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get('/run-logger', runLogger);

/**
 * @swagger
 * /system/get-wordbook:
 *   get:
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *       - in: query
 *         name: isProcessed
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: number
 *       - in: query
 *         name: pageIndex
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
 *     summary: Get multi-lang diseases in system, used later for admin web page
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.get('/get-wordbook', getWordbook);

/**
 * @swagger
 * /system/get-wordbook/{id}:
 *   get:
 *     tags: [System]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     summary: Get multi-lang disease by id
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 */
router.get('/get-wordbook/:id', validateObjectId, getWordbookById);

module.exports = router;
