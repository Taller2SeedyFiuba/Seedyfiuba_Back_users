const Sequelize = require("sequelize");

console.log(process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false
});

//Chequeamos que se establezca la conexion con la base de datos
sequelize.authenticate().then(() => {
    console.log('La conexion con la base de datos se ha realizado satisfactoriamente.');
}).catch(err => {
    console.error('Ha fallado la conexion con la base de datos:', err);
});

module.exports = { sequelize };
