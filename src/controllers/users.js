const { ApiError } = require("../errors/ApiError");
const validator = require("../models/validators");

const {
  createUser: createUserDb,
  deleteUser: deleteUserDb,
  updateUser: updateUserDb,
  getUser,
  getAllUsers, } = require("../models/user");

const getUsers = async (req, res) => {
  const dbParams = {
    limit: req.query.limit,
    page: req.query.page
  }

  const { error } = validator.validateSearch(dbParams);
  if (error) throw ApiError.badRequest(error.message);

  const users = await getAllUsers(dbParams);

  res.status(200).json({
    status: 'success',
    data: users
  });
}

const createUser = async (req, res) => {
  const { error, value } = validator.validateNewUser(req.body);
  if (error) throw ApiError.badRequest(error.message);

  const userInDatabase = await getUser(req.body.id);
  if (userInDatabase) throw ApiError.badRequest("id-in-use");

  const newUser = await createUserDb(req.body);

  return res.status(201).json({
    status: 'success',
    data: newUser
  });
}

const getOneUser = async(req, res) => {
  const { id } = req.params;
  const user = await getUser(id);

  if (user) return res.status(200).json({
    status: "success",
    data: user,
  });

  throw ApiError.notFound("user-not-found");
}

const userExists = async(req, res) => {
  const { id } = req.params;
  const user = await getUser(id)
  if (user) return res.status(200).json({ response: true });
  return res.status(200).json({ response: false });
}

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const userToDelete = await getUser(id)
  if (!userToDelete) throw ApiError.notFound("user-not-found")
  const userDeleted = await deleteUserDb(id)
  if (!userDeleted) throw ApiError.serverError("internal-server-error")

  return res.status(200).json({
    status: 'success',
    data: null
  });
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const { error } = validator.validateUserUpdate(newData);

  if (error) throw ApiError.badRequest(error.message);

  const userToUpdate = await getUser(id);
  if (!userToUpdate) throw ApiError.notFound("user-not-found");

  const userUpdated = await updateUserDb(id, newData)
  if (!userUpdated) throw ApiError.serverError("internal-server-error");

  return res.status(200).json({
    status: 'success',
    data: userUpdated
  });
}

module.exports = {
  getUsers,
  userExists,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
}
