import { sequelize } from "../database/database";

export async function getDatabaseStatus(req, res) {
    await sequelize.authenticate();
    res.status(200).json({
        "message": "Connection with database has been established successfully."
    })
}