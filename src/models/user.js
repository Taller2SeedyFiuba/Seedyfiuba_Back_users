const { User } = require("../database");

const createUser = async(user) => {
  return await User.create(user);
}

const deleteUser = async(id) => {
  return await User.destroy({ where: { id } });
}

const updateUser = async(id, newData) => {
  const response = await User.update(newData, { where: { id } });
  if (!response) return 0;
  return response[0] ? getUser(id) : 0;
}

const getUser = async(id) => {
  const response = await User.findByPk(id);
  if (!response) return undefined;
  return response.dataValues;
}

const getAllUsers = async(params) => {
  const searchParams = {
    'limit': params.limit || 10,
    'offset': (params.page - 1) * params.limit || 0,
    //'raw': true
  }
  return await User.findAll(searchParams);
}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
};
