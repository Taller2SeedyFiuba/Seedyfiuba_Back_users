const { ApiError } = require("../errors/ApiError");
const validator = require("../models/validators");
const err = require("../errors/messages")

const {
  createUser: createUserDb,
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
  if (userInDatabase) throw ApiError.badRequest(err.ID_IN_USE);

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

  throw ApiError.notFound(err.USER_NOT_FOUND);
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const { error } = validator.validateUserUpdate(newData);

  if (error) throw ApiError.badRequest(error.message);

  const userToUpdate = await getUser(id);
  if (!userToUpdate) throw ApiError.badRequest(err.USER_NOT_FOUND);

  const userUpdated = await updateUserDb(id, newData)
  if (!userUpdated) throw ApiError.serverError(err.INTERNAL_ERROR);

  return res.status(200).json({
    status: 'success',
    data: userUpdated
  });
}

module.exports = {
  getUsers,
  createUser,
  getOneUser,
  updateUser
}
