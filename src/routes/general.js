const { Router } = require('express');
const router = Router();

const {
  getDatabaseStatus
} = require("../controllers/general.controller");

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// /api/general/status

router.get('/status', use(getDatabaseStatus));

module.exports = router
