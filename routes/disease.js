const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { diseaseSchema } = require('../models/disease');
const {
  getDiseases,
  getDiseaseById
} = require('../controllers/diseaseController');
const Disease = mongoose.model('diseases', diseaseSchema, 'diseases');

router.get('/', getDiseases);

router.get('/:id', getDiseaseById);

module.exports = router;
