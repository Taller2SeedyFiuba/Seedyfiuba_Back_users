const express = require('express');
const json = require('express').json;
const morgan = require('morgan');

//Importamos rutas/endpoints
const { getUsersRouter } = require("./routes/users");
const { getGeneralRouter } = require("./routes/general");

//Importamos handlers de error
const { notDefinedHandler, errorHandler} = require("./errors/errorHandler");

function createApp(database){

    //Iniciamos la aplicacion
    const app = express();

    //Middlewares
    app.use(morgan('dev')); //Escupir a archivo con una ip y timestamp.
    app.use(json());

    //Rutas

    app.use('/api/general', getGeneralRouter(database));
    app.use('/api/users', getUsersRouter(database));

    app.use(notDefinedHandler);
    app.use(errorHandler);

    return app;
}

module.exports = { createApp };
