const express = require('express');
const json = require('express').json;
const morgan = require('morgan');

//Importamos rutas/endpoints
const userRoutes = require("./routes/users");
const generalRoutes = require("./routes/general");

//Importamos handlers de error
const { notDefinedHandler, errorHandler} = require("./errors/errorHandler");

//Iniciamos la aplicacion
const app = express();

//Middlewares

app.use(morgan('dev')); //Escupir a archivo con una ip y timestamp.
app.use(json());

//Rutas

app.use('/api/general', generalRoutes);
app.use('/api/users', userRoutes);

app.use(notDefinedHandler);
app.use(errorHandler);


module.exports = { app };
