const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const diseaseSchema = new Schema({
  id: Number,
  name: String,
  image: String,
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
  categories: [
    {
      type: ObjectId,
      ref: 'categories'
    }
  ]
});

diseaseSchema.plugin(normalize);

module.exports.diseaseSchema = diseaseSchema;
