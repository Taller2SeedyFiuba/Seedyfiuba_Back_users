const { getStatus: getDBStatus } = require("../models/user");

async function getStatus(req, res) {
  await getDBStatus();

  res.status(200).json({
    status: 'success',
    data: null,
  })
}


module.exports = { getStatus }
