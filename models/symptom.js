const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const symptomSchema = new Schema({
  diseaseId: { type: ObjectId, required: true },
  symptoms: [{ type: String }]
});

symptomSchema.plugin(normalize);

module.exports.symptomSchema = symptomSchema;
