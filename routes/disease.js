const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { diseaseSchema } = require('../models/disease');

const Disease = mongoose.model('diseases', diseaseSchema, 'diseases');

router.get('/', async (req, res) => {
  const diseases = await Disease.find().limit(5).sort('-title');
  res.send({ diseases });
});

router.get('/:id', async (req, res) => {
  const diseases = await Disease.find({ _id: req.params.id });
  res.send({ diseases });
});

module.exports = router;
