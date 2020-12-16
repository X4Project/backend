const mongoose = require('mongoose');
const normalize = require('normalize-mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { logger } = require('../middlewares/logging');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.plugin(normalize);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email
    },
    config.JWT_SECRET_KEY,
    { expiresIn: '3h' }
  );
  return token;
};

module.exports.userSchema = userSchema;
