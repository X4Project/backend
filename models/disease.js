const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const {
  generateDiseaseKeyword,
  filterSpecialCharacters
} = require('../helpers/StringHelper');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const MAX_DISPLAY_OVERVIEW_LENGTH = 200;

const diseaseSchema = new Schema(
  {
    id: Number,
    name: String,
    image: String,
    overview: {
      type: String,
      get: function (value) {
        return (
          value &&
          filterSpecialCharacters(value).slice(0, MAX_DISPLAY_OVERVIEW_LENGTH)
        );
      }
    },
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
  },
  { toJSON: { virtuals: true, getters: true }, toObject: { virtuals: true } }
);

diseaseSchema.virtual('keyword').get(function () {
  if (this.overview === null) {
    this.overview = '';
  }
  return generateDiseaseKeyword(this._id + this.name + this.overview);
});

diseaseSchema.plugin(normalize);

module.exports.diseaseSchema = diseaseSchema;
