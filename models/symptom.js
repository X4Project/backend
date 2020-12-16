const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const symptomSchema = new Schema({
  diseaseId: { type: ObjectId, required: true },
  list: {
    type: [{ type: String }],
    validate: {
      validator: value => value && value.length > 0,
      message: 'Array of symptom should not be null'
    }
  }
});

symptomSchema.plugin(normalize);

module.exports.symptomSchema = symptomSchema;
