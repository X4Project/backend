const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const home = require('../routes/home');
const disease = require('../routes/disease');
const category = require('../routes/category');
const error = require('../middlewares/error');

module.exports = app => {
  app.use(cors({ origin: '*', credentials: true }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(morgan('tiny'));
  app.use(cookieParser());

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
    );
    next();
  });

  app.use('/', home);
  app.use('/disease', disease);
  app.use('/category', category);
  app.use(error);
};
