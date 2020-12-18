const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { settingSchema } = require('../models/setting');
const ErrorHelper = require('../helpers/ErrorHelper');
const Setting = mongoose.model('settings', settingSchema, 'settings');
const { SUCCESS } = require('../constants/errorCodeConstants');
const {
  SuccessResponse,
  InternalServerError
} = require('../helpers/ErrorHelper');

const getSetting = async (req, res) => {
  try {
    const setting = await Setting.find().limit(1);
    return SuccessResponse(res, {
      isShowAds: setting.length > 0 ? setting[0].isShowAds : null
    });
  } catch (error) {
    logger.error(error.message, error);
    return InternalServerError(res, error);
  }
};

const updateSetting = async (req, res) => {
  try {
    const latestSetting = await Setting.find().limit(1);
    const filter = { _id: latestSetting[0]._id };
    const update = { isShowAds: req.body.isShowAds, updatedDate: new Date() };
    await Setting.findOneAndUpdate(filter, update);
    return SuccessResponse(res, { statusCode: 200, responseCode: SUCCESS });
  } catch (error) {
    logger.error(error.message, error);
    return InternalServerError(res, error);
  }
};

module.exports = {
  getSetting,
  updateSetting
};
