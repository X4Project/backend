const express = require('express');
const router = express.Router();
const {
  getSetting,
  updateSetting
} = require('../../controllers/settingController');
const auth = require('../../middlewares/auth');

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
 *       isShowCategories:
 *         type: boolean
 *       hasNewData:
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
 *   patch:
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
router.patch('/', auth, updateSetting);

module.exports = router;
