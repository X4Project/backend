const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const error = require('../middlewares/error');
const { v1Options, v2Options } = require('./swagger.config');
const swaggerSpecV1 = swaggerJSDoc(v1Options);
const swaggerSpecV2 = swaggerJSDoc(v2Options);
const home = require('../routes/v1/home');
const disease = require('../routes/v1/disease');
const category = require('../routes/v1/category');
const setting = require('../routes/v1/setting');
const symptom = require('../routes/v1/symptom');
const user = require('../routes/v1/user');
const system = require('../routes/v1/system');
const diseaseV2 = require('../routes/v2/disease');

const swaggerHtmlV1 = swaggerUi.generateHTML(swaggerSpecV1, v1Options);
const swaggerHtmlV2 = swaggerUi.generateHTML(swaggerSpecV2, v2Options);

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
  app.use('/api-docs', swaggerUi.serveFiles(swaggerSpecV1, v1Options));
  app.get('/api-docs', (req, res) => res.send(swaggerHtmlV1));

  app.use('/v2/disease', diseaseV2);
  app.use('/v2/api-docs', swaggerUi.serveFiles(swaggerSpecV2, v2Options));
  app.get('/v2/api-docs', (req, res) => res.send(swaggerHtmlV2));

  app.use(error);
};
