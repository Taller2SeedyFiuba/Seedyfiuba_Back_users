const router = require("express").Router();
const uc = require("../controllers/users.controller");
const { hocError } = require('../errors/handler');

function getUsersRouter() {

/**
   * @swagger
   * components:
   *  schemas:
   *    FullUser:
   *      type: object
   *      requiered:
   *        - id
   *        - firstname
   *        - lastname
   *        - email
   *        - birthdate
   *        - signindate
   *      properties:
   *        id:
   *          type: string
   *          description: Identificador del usuario autorizado
   *        firstname:
   *          type: string
   *          description: Nombre del usuario
   *        lastname:
   *          type: string
   *          description: Apellido del usuario
   *        email:
   *          type: string
   *          description: Direccion de e-mail del usuario
   *        birthdate:
   *          type: string
   *          format: date
   *          description: Fecha de nacimiento del usuario
   *        signindate:
   *          type: string
   *          format: date-time
   *          description: Fecha de inscripcion en el sistema del usuario
   *      example:
   *        id: "uhasj31asidasdicaw"
   *        firstname: "Marcelo"
   *        lastname: "Lopez"
   *        email: "mlopez@gmail.com"
   *        birthdate: "1990-03-04"
   *        signindate: "2020-11-10T16:49:52.214Z"
   *    SendUser:
   *      type: object
   *      requiered:
   *        - id
   *        - firstname
   *        - lastname
   *        - email
   *        - birthdate
   *      properties:
   *        id:
   *          type: string
   *          description: Identificador del usuario autorizado
   *        firstname:
   *          type: string
   *          description: Nombre del usuario
   *        lastname:
   *          type: string
   *          description: Apellido del usuario
   *        email:
   *          type: string
   *          description: Direccion de e-mail del usuario
   *        birthdate:
   *          type: string
   *          format: date
   *          description: Fecha de nacimiento del usuario
   *      example:
   *        id: "uhasj31asidasdicaw"
   *        firstname: "Marcelo"
   *        lastname: "Lopez"
   *        email: "mlopez@gmail.com"
   *        birthdate: "1990-03-04"
   *
   *    UpdateUser:
   *      type: object
   *      requiered:
   *        - firstname
   *        - lastname
   *        - email
   *        - birthdate
   *      properties:
   *        firstname:
   *          type: string
   *          description: Nombre del usuario
   *        lastname:
   *          type: string
   *          description: Apellido del usuario
   *        email:
   *          type: string
   *          description: Direccion de e-mail del usuario
   *        birthdate:
   *          type: string
   *          format: date
   *          description: Fecha de nacimiento del usuario
   *      example:
   *        firstname: "Marcelo"
   *        lastname: "Lopez"
   *        email: "mlopez@gmail.com"
   *        birthdate: "1990-03-04"
   *
    * */

  //const __createUser = use(uc.createUser)  TODO: ver si podemos simplificar notacion con una anonima

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: API de manejo de usuarios
 * */

  /**
   * @swagger
   * /api:
   *  get:
   *    description: Devuelve una lista con todos los usuarios.
   *    tags: [Usuarios]
   *    responses:
   *      '200':
   *        description: Solicitud exitosa
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - status
   *                - data
   *              properties:
   *                status:
   *                  type: string
   *                  description: Estado de la petición
   *                  example: "success"
   *                data:
   *                  type: array
   *                  items:
   *                    $ref: '#components/schemas/FullUser'
   *      '500':
   *        description: Error interno del servidor
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - status
   *                - message
   *              properties:
   *                status:
   *                  type: string
   *                  description: Estado de la petición
   *                  example: "error"
   *                message:
   *                  type: object
   *                  description: Mensaje de error
   *
   * */
  router.get('/', hocError(uc.getUsers));

    /**
   * @swagger
   * /api:
   *  post:
   *    description: Crea un nuevo usuario.
   *    tags: [Usuarios]
   *    parameters:
   *      - in: body
   *        name: user
   *        schema:
   *            $ref: '#components/schemas/SendUser'
   *        required: true
   *        description: Datos del usuario a cargar
   *    responses:
   *      '201':
   *        description: Usuario creado satisfactoriamente
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - status
   *                - data
   *              properties:
   *                status:
   *                  type: string
   *                  description: Estado de la petición
   *                  example: "success"
   *                data:
   *                  $ref: '#components/schemas/FullUser'
   *
   *      '500':
   *        description: Error interno del servidor
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "Server error"
   *                data:
   *                  type: object
   *      '400':
   *        description: Error en solicitud del cliente
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "ID already in use"
   *                data:
   *                  type: object
   *
   * */
  router.post('/', hocError(uc.createUser));


  // /api/users/:userID

  router.get('/exists/:id', hocError(uc.userExists));


  /**
   * @swagger
   * /api/{id}:
   *  get:
   *    description: Devuelve al usuario segun id.
   *    tags: [Usuarios]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Identificador del usuario a obtener
   *    responses:
   *      '200':
   *        description: Solicitud exitosa
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - message
   *                - data
   *              properties:
   *                message:
   *                  type: string
   *                  description: Mensaje de exito
   *                  example: "User information retrieved"
   *                data:
   *                    $ref: '#components/schemas/FullUser'
   *      '500':
   *        description: Error interno del servidor
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "Server error"
   *                data:
   *                  type: object
   *      '404':
   *        description: No se ha encontrado al usuario
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "User not found"
   *                data:
   *                  type: object
   * */
  router.get('/:id', hocError(uc.getOneUser));

    /**
   * @swagger
   * /api/{id}:
   *  delete:
   *    description: Elimina a un usuario segun id
   *    tags: [Usuarios]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Identificador del usuario a eliminar
   *    responses:
   *      '200':
   *        description: Solicitud exitosa
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - message
   *                - data
   *              properties:
   *                message:
   *                  type: string
   *                  description: Mensaje de exito
   *                  example: "User deleted"
   *                data:
   *                    $ref: '#components/schemas/FullUser'
   *      '500':
   *        description: Error interno del servidor
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "Server error"
   *                data:
   *                  type: object
   *      '404':
   *        description: No se ha encontrado al usuario
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "User not found"
   *                data:
   *                  type: object
   * */
  router.delete('/:id', hocError(uc.deleteUser));

  /**
   * @swagger
   * /api/{id}:
   *  put:
   *    description: Modifica a un usuario existente.
   *    tags: [Usuarios]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *        required: true
   *        description: Identificador del usuario a modificar
   *      - in: body
   *        name: user
   *        schema:
   *            $ref: '#components/schemas/UpdateUser'
   *        required: true
   *        description: Nuevos datos del usuario, todos son requeridos.
   *    responses:
   *      '200':
   *        description: Usuario modificado satisfactoriamente
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - message
   *                - data
   *              properties:
   *                message:
   *                  type: string
   *                  description: Mensaje de exito
   *                  example: "User updated successfully"
   *                data:
   *                  $ref: '#components/schemas/FullUser'
   *
   *      '500':
   *        description: Error interno del servidor
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "Server error"
   *                data:
   *                  type: object
   *      '400':
   *        description: Error en solicitud del cliente
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              requiered:
   *                - error
   *                - data
   *              properties:
   *                error:
   *                  type: string
   *                  description: Mensaje de error
   *                  example: "firtstname field not found"
   *                data:
   *                  type: object
   * */

  router.put('/:id', hocError(uc.updateUser));

  return router;
}

module.exports = { getUsersRouter };
