const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const error = require('../middlewares/error');
const { options } = require('./swagger.config');
const swaggerSpec = swaggerJSDoc(options);
const home = require('../routes/home');
const disease = require('../routes/disease');
const category = require('../routes/category');
const setting = require('../routes/setting');
const symptom = require('../routes/symptom');
const user = require('../routes/user');
const system = require('../routes/system');

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
  app.use('/auth', user);
  app.use('/disease', disease);
  app.use('/category', category);
  app.use('/setting', setting);
  app.use('/symptom', symptom);
  app.use('/system', system);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(error);
};
