const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  isShowAds: { type: Boolean, required: true },
  isShowCategories: { type: Boolean, required: true },
  hasNewData: { type: String, required: true },
  lastUpdated: Date,
  lastInformed: Date
});

settingSchema.plugin(normalize);

module.exports.settingSchema = settingSchema;
