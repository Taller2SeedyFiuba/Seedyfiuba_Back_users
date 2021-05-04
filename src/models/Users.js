import Sequelize from "sequelize";
import { sequelize } from "../database/database";

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,

    },
    firstname: {
        type: Sequelize.CHAR(30),
        allowNull: false,
        validate: {
            len: {
                args: [1, 29],
                msg: "Please, enter a non empty and valid first name of 29 characters max length"
            }
        }
    },
    lastname: {
        type: Sequelize.CHAR(30)
    },
    email: {
        type: Sequelize.CHAR(30)
    },
    birthdate: {
        type: Sequelize.DATE
    },
    signindate: {
        type: Sequelize.DATE
    },
}, {
    timestamps: false
});


export default Users;