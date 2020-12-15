const express = require('express');
const router = express.Router();
const { getSetting } = require('../controllers/settingController');

/**
 * @swagger
 * tags:
 *   name: Setting
 *   summary: API to manage all settings.
 */

/**
 * @swagger
 * /setting:
 *   get:
 *     tags: [Setting]
 *     summary: Get setting for the system
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', getSetting);

module.exports = router;
