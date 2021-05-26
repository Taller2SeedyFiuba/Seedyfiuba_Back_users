const { User, sequelize } = require("../database");

const getStatus = async() => {
  return sequelize.authenticate();
}

const createUser = async(user) => {
  return await User.create(user);
}

const deleteUser = async(id) => {
  return await User.destroy({ where: { id } });
}

const updateUser = async(id, newData) => {
  const response = await User.update(newData, { where: { id } });
  if (!response) return 0;
  return response[0];
}

const getUser = async(id) => {
  const response = await User.findByPk(id);
  if (!response) return undefined;
  return response.dataValues;
}

const getAllUsers = async() => {
  return await User.findAll();
}

module.exports = {
  getStatus,
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
};
