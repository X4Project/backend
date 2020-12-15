const express = require('express');
const router = express.Router();
const {
  getSetting,
  updateSetting
} = require('../controllers/settingController');

/**
 * @swagger
 * tags:
 *   name: Setting
 *   summary: API to manage all settings.
 * definitions:
 *   UpdateSettingRequest:
 *     type: object
 *     properties:
 *       isShowAds:
 *         type: boolean
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

/**
 * @swagger
 * /setting:
 *   put:
 *     tags: [Setting]
 *     summary: Update setting for the system
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: setting
 *         description: The setting to update
 *         schema:
 *           $ref: '#/definitions/UpdateSettingRequest'
 *     responses:
 *       201:
 *         description: Success
 */
router.put('/', updateSetting);

module.exports = router;
