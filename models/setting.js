const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;

const settingSchema = new Schema({
  isShowAds: { type: Boolean, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

settingSchema.plugin(normalize);

module.exports.settingSchema = settingSchema;
