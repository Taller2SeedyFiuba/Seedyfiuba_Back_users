const { ApiError } = require("../errors/ApiError");
const { validateUser } = require("../models/validators");

const {
  createUser: createUserDb,
  deleteUser: deleteUserDb,
  updateUser: updateUserDb,
  getUser,
  getAllUsers, } = require("../models/user");

const getUsers = async (req, res) => {
  const users = await getAllUsers();

  res.status(200).json({
    status: 'success',
    data: users
  });
}

const createUser = async (req, res) => {
  const { error, value } = validateUser(req.body);
  if (error) throw ApiError.badRequest(error.message);

  const userInDatabase = await getUser(req.body.id);
  if (userInDatabase) throw ApiError.badRequest("ID already in use");

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

  throw ApiError.notFound("User not found");
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
  if (!userToDelete) throw ApiError.notFound("User not found")
  const userDeleted = await deleteUserDb(id)
  if (!userDeleted) throw ApiError.serverError("Server error")

  return res.status(200).json({
    status: 'success',
    data: null
  });
}

const updateUser = async (req, res) => {
  const { id } = req.params;
  const finalUser = {
    ... req.body,
    id,
  };

  const { error } = validateUser(finalUser);

  if (error) throw ApiError.badRequest(error.message);

  const userToUpdate = await getUser(id);
  if (!userToUpdate) throw ApiError.notFound("User not found");

  const userUpdated = await updateUserDb(id, finalUser)
  if (!userUpdated) throw ApiError.serverError("Server error");

  //Me evito un query a la base haciendo esto
  for (const [key, value] of Object.entries(userToUpdate)){
    if (!finalUser[key]){
      finalUser[key] = value;
    }
  }

  return res.status(200).json({
    status: 'success',
    data: finalUser
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
