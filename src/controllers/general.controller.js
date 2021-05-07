const { sequelize } = require("../database/database");

async function getDatabaseStatus(req, res) {
    await sequelize.authenticate();
    res.status(200).json({
        "message": "Connection with database has been established successfully."
    })
}


module.exports = { getDatabaseStatus }
