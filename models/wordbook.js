const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;

const wordbookSchema = new Schema({
  id: String,
  name: String,
  definition: String,
  lang: String,
  isProcessed: { type: Boolean, default: false }
});

wordbookSchema.plugin(normalize);

module.exports.wordbookSchema = wordbookSchema;
