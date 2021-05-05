import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'taller_2',
    'postgres',
    'root',
    {
        host: 'localhost',
        port: 5432,//5000, //Default: 5432
        dialect: 'postgres', 
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false
    }
);

//Chequeamos que se establezca la conexion con la base de datos
sequelize.authenticate().then(() => {
    console.log('La conexion con la base de datos se ha realizado satisfactoriamente.');
}).catch(err => {
    console.error('Ha fallado la conexion con la base de datos:', err);
});
