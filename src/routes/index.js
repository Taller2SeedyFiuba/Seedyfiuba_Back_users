const users = require('./users');
const { getDatabaseStatus } = require('../controllers/status');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');

const startRoutes = (app) => {

  app.use('/api/users', users);

  app.get('/api/status', getDatabaseStatus);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}

module.exports = startRoutes;
