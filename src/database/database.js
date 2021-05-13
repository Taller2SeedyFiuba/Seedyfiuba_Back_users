const Sequelize = require("sequelize");
const { UserModel, validateUser } = require("./models/users")

class DataBase {

  constructor() {
    //Establecemos la conexion
    console.log("Conectando con base de datos: \n\t" + process.env.DATABASE_URL + "\n")
    const options = { logging: false }
    //Cambiar por chequeo de produccion o desarrollo
    if (process.env.NODE_ENV == 'production') {
      options['logging'] = console.log
      options['dialectOptions'] = { ssl: { require: true, rejectUnauthorized: false } }
    }

    this.sequelize = new Sequelize(process.env.DATABASE_URL, options);
    //Chequeamos que la conexion se haya realizado
    this.sequelize.authenticate().then(() => {
      console.log('La conexion con la base de datos se ha realizado satisfactoriamente.');
    }).catch(error => {
      console.error('Ha fallado la conexion con la base de datos: \n' + error.message);
    });

    //Creamos el modelado de usuarios
    this.users = this.sequelize.define('users', UserModel, { timestamps: false });
  }
  async getStatus() {
    return this.sequelize.authenticate();
  }
  async createUser(user) {
      return await this.users.create(user);
  }

  async deleteUser(id) {
    return await this.users.destroy({ where: { id } });
  }

  async updateUser(id, newData) {
    const response = await this.users.update(newData, { where: { id } });
    if (!response) return 0;
    return response[0];
  }

  async getUser(id) {
    const response = await this.users.findByPk(id);
    if (!response) return undefined;
    return response.dataValues;
  }

  async getAllUsers() {
    return await this.users.findAll();
  }

  getUserValidator() {
    return validateUser;
  }
}


module.exports = { DataBase };
