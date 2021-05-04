import express, { json } from 'express';
import morgan from 'morgan';

//Importamos rutas/endpoints
import userRoutes from "./routes/users";

//Importamos handlers de error
import { notDefinedHandler, errorHandler} from "./errors/error_handler"

//Iniciamos la aplicacion
const app = express();

//Middlewares

app.use(morgan('dev'));
app.use(json());

//Rutas

app.use('/api/users', userRoutes);

app.use(notDefinedHandler);
app.use(errorHandler);

export default app;