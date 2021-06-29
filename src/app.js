const express = require('express');
const json = require('express').json;
const morgan = require('morgan');
const cors = require('cors');

//Importamos rutas/endpoints
const startRoutes = require("./routes/index");

//Importamos handlers de error
const { 
  notDefinedHandler, 
  errorHandler 
} = require("./errors/handler");

function createApp(log=true){

    //Iniciamos la aplicacion
    const app = express();

    //Middlewares
    if(log) app.use(morgan('dev')); //Escupir a archivo con una ip y timestamp.
    app.use(cors());
    app.use(json());

    //Rutas
    startRoutes(app)

    app.use(notDefinedHandler);
    app.use(errorHandler);

    return app;
}

module.exports = { createApp };
