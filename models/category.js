const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  image: {
    type: String,
    default:
      'https://images.vexels.com/media/users/3/151981/isolated/preview/f8863741dba8034b3e1d4809a01c782a-stethoscope-icon-medical-icons-by-vexels.png'
  },
  parentCategoryId: ObjectId,
  tag: String,
  diseases: [{ type: Object, ref: 'diseases', select: false }]
});

categorySchema.plugin(normalize);

module.exports.categorySchema = categorySchema;
