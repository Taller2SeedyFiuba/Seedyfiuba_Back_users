const users = require('./users');
const { getDatabaseStatus } = require('../controllers/status');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/openapi.json');
const { getMetrics } = require('../controllers/metrics');
const { hocError } = require('../errors/handler');

const startRoutes = (app) => {

  app.use('/api/users', users);

  app.get('/api/metrics', hocError(getMetrics))

  app.get('/api/status', hocError(getDatabaseStatus));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}

module.exports = startRoutes;
