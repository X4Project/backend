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
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/shawn29/image/upload/v1610334985/Categories/placeholder_uhonq7.png'
    },
    overview: {
      type: String,
      get: function (value) {
        return (
          value &&
          filterSpecialCharacters(value).slice(0, MAX_DISPLAY_OVERVIEW_LENGTH)
        );
      }
    },
    definition: {
      type: String,
      get: function (value) {
        return (
          value &&
          filterSpecialCharacters(value).slice(0, MAX_DISPLAY_OVERVIEW_LENGTH)
        );
      }
    },
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
    lang: {
      type: String,
      default: 'english'
    },
    langCode: { type: String, default: '0' },
    categories: [
      {
        type: ObjectId,
        ref: 'categories'
      }
    ]
  },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true, getters: true }
  }
);

// diseaseSchema.virtual('keyword').get(function () {
//   if (this.overview === null) {
//     this.overview = this.description ? this.description : '';
//   }
//   return generateDiseaseKeyword(this.name + this.overview);
// });

diseaseSchema.plugin(normalize);

module.exports.diseaseSchema = diseaseSchema;
