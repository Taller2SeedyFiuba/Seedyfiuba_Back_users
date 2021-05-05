import express, { json } from 'express';
import morgan from 'morgan';

//Importamos rutas/endpoints
import userRoutes from "./routes/users";
import generalRoutes from "./routes/general"

//Importamos handlers de error
import { notDefinedHandler, errorHandler} from "./errors/errorHandler"

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

export default app;