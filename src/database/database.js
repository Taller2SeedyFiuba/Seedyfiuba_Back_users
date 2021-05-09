const Sequelize = require("sequelize");
const { UserModel, validateUser } = require("./models/users")

class DataBase{

    constructor(){
        //Establecemos la conexion
        this.sequelize = new Sequelize(process.env.DATABASE_URL, {
            logging: false
        });
        
        //Chequeamos que la conexion se haya realizado
        this.sequelize.authenticate().then(() => {
            console.log('La conexion con la base de datos se ha realizado satisfactoriamente.');
        }).catch(error => {
            throw Error('Ha fallado la conexion con la base de datos: \n' + error.message);
        });

        //Creamos el modelado de usuarios
        this.users = this.sequelize.define('users', UserModel, { timestamps: false });
    }

    async createUser(user){
        //TODO: Intentar eliminar el argumento 'fields' o al menos no hardcodearlo.
        return await this.users.create(
            user, 
            {
                fields: ['id', 
                         'firstname', 
                         'lastname', 
                         'email', 
                         'birthdate', 
                         'signindate']
        });
    }

    async deleteUser(id){
        return await this.users.destroy({ where: { id } });
    }

    async updateUser(id, newData){
        return await this.users.update( newData, { where: { id } });
    }

    async getUser(id){
        return await this.users.findByPk(id);
    }

    async getAllUsers(){
        return await this.users.findAll();
    }

    getUserValidator(){
        return validateUser;
    }
}


module.exports = { DataBase };
