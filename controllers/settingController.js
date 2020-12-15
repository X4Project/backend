const mongoose = require('mongoose');
const { logger } = require('../middlewares/logging');
const { settingSchema } = require('../models/setting');
const ErrorHelper = require('../helpers/ErrorHelper');
const Setting = mongoose.model('settings', settingSchema, 'settings');

const getSetting = async (req, res) => {
  try {
    const setting = await Setting.find().limit(1);
    res.send({ isShowAds: setting.length > 0 ? setting[0].isShowAds : null });
  } catch (error) {
    logger.error(error.message, error);
    return ErrorHelper.InternalServerError(res);
  }
};

module.exports = {
  getSetting
};
