module.exports = {
  v1Options: {
    explorer: true,
    swaggerDefinition: {
      openapi: '3.0.3',
      info: {
        title: '3-Di API',
        version: '1.0',
        description: 'REST API for managing diseases, categories',
        license: {
          name: 'MIT',
          url: 'https://choosealicense.com/licenses/mit/'
        }
      },
      basePath: '/',
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ['./routes/v1/*.js']
  },
  v2Options: {
    explorer: true,
    swaggerDefinition: {
      openapi: '3.0.3',
      info: {
        title: '3-Di API',
        version: '2.0',
        description: 'REST API for managing diseases, categories',
        license: {
          name: 'MIT',
          url: 'https://choosealicense.com/licenses/mit/'
        }
      },
      basePath: '/',
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ['./routes/*/*.js']
  }
};
