const router = require("express").Router();
const { validateUser } = require("../database/models/users")
const { UsersController } = require("../controllers/users.controller");

function getUsersRouter(database) {

  const uc = new UsersController(database, validateUser);

  //Permite atrapar errores sin necesidad de try catch
  const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

  // /api/users/
  //const __createUser = use(uc.createUser.bind(uc))  TODO: ver si podemos simplificar notacion con una anonima
  router.post('/', use(uc.createUser.bind(uc)));
  router.get('/', use(uc.getUsers.bind(uc)));

  // /api/users/:userID

  router.get('/exists/:id', use(uc.userExists.bind(uc)));
  router.get('/:id', use(uc.getOneUser.bind(uc)));
  router.delete('/:id', use(uc.deleteUser.bind(uc)));
  router.put('/:id', use(uc.updateUser.bind(uc)));

  return router;
}

module.exports = { getUsersRouter };
