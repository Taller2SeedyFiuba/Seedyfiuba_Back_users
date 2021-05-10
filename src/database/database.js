const Sequelize = require("sequelize");
const { UserModel, validateUser } = require("./models/users")

class DataBase {

  constructor() {
    //Establecemos la conexion
    console.log("Conectando con base de datos: \n\t" + process.env.DATABASE_URL + "\n")
    const options = { logging: false }
    //Cambiar por chequeo de produccion o desarrollo
    if (process.env.SSL){
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
    const userToDelete = await this.getUser(id)
    if (!userToDelete) return undefined
    await this.users.destroy({ where: { id } });
    return userToDelete
  }

  async updateUser(id, newData) {
    const userToUpdate = await this.getUser(id);
    if (!userToUpdate) return undefined;
    return await this.users.update(newData, { where: { id } });
  }

  async getUser(id) {
    return await this.users.findByPk(id);
  }

  async getAllUsers() {
    return await this.users.findAll();
  }

  getUserValidator() {
    return validateUser;
  }
}


module.exports = { DataBase };
