const express = require('express');
const router = express.Router();
const { splitSymptoms } = require('../controllers/systemController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * tags:
 *   name: System
 *   summary: API to execute some grand tasks
 */

/**
 * @swagger
 * /system/split-symptoms:
 *   get:
 *     tags: [System]
 *     parameters:
 *       - in: query
 *         name: secretKey
 *         schema:
 *           type: string
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
 *
 */
router.get('/split-symptoms', auth, splitSymptoms);

module.exports = router;
