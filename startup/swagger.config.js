module.exports = {
  options: {
    explorer: true,
    swaggerOptions: {
      validatorUrl: null
    },
    customCssUrl: '/swagger.css',
    swaggerDefinition: {
      info: {
        title: 'Diseases - REST API',
        version: '1.0',
        description: 'REST API for managing diseases, categories'
      }
    },
    apis: ['./routes/*.js']
  }
};
