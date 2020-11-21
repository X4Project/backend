const { string } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const diseaseSchema = new Schema({
  id: Number,
  name: String,
  overview: String,
  definition: String,
  symptoms: String,
  causes: String,
  risk: String,
  complications: String,
  preparing: String,
  tests: String,
  treatment: String,
  lifeStyle: String,
  alternative: String,
  coping: String,
  prevention: String,
  symptomsArray: String,
  causesArray: String,
  riskArray: String,
  complicationsArray: String,
  preparingArray: String,
  testsArray: String,
  treatmentArray: String,
  lifeStyleArray: String,
  alternativeArray: String,
  copingArray: String,
  preventionArray: String,
  bookmark: String,
  note: String,
  categoryIds: String
});

module.exports.diseaseSchema = diseaseSchema;
