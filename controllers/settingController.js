const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { settingSchema } = require('../models/setting');
const Setting = mongoose.model('settings', settingSchema, 'settings');
const { generateUUID } = require('../helpers/UUIDHelper');
const {
  SuccessResponse,
  InternalServerError
} = require('../helpers/ErrorHelper');

const getSetting = async (req, res) => {
  try {
    const setting = await Setting.find().limit(1);
    return SuccessResponse(res, {
      isShowAds: setting.length > 0 ? setting[0].isShowAds : null,
      isShowCategories: setting.length > 0 ? setting[0].isShowCategories : null,
      hasNewData:
        setting.length > 0 && setting[0].hasNewData
          ? setting[0].hasNewData
          : null,
      lastUpdated: setting.length > 0 && setting[0].lastUpdated,
      lastInformed: setting.length > 0 && setting[0].lastInformed
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
    const updatedTiming = new Date();
    let update = {
      isShowAds: req.body.isShowAds,
      isShowCategories: req.body.isShowCategories,
      lastUpdated: updatedTiming
    };
    if (req.body.hasNewData === true) {
      update['hasNewData'] = generateUUID();
      update['lastInformed'] = updatedTiming;
    }
    await Setting.findOneAndUpdate(filter, update);
    return SuccessResponse(res, null, 204);
  } catch (error) {
    logger.error(error.message, error);
    return InternalServerError(res, error);
  }
};

module.exports = {
  getSetting,
  updateSetting
};
