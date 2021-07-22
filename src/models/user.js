const { User, sequelize, Sequelize } = require("../database");

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

const castAndCumulateMetric = function(data){
  if (!data) return null
  let sum = 0;
  return data.map(elem => {
    sum += Number(elem.metric)
    elem.metric = sum
    return elem
  })
}

const getUsersMetrics = async(params) => {
  aggDateFunction = sequelize.fn('date_trunc', params.timeinterval || 'day', sequelize.col('signindate'))

  console.log(params)

  const searchParams = {
    'group': [aggDateFunction],
    'attributes': [
      [aggDateFunction, 'timestamp'],
      [sequelize.fn('COUNT', aggDateFunction), 'metric']
    ],
    'where': {
      'signindate': {
        [Sequelize.Op.gte]: params.fromdate || '1800-01-01',
        [Sequelize.Op.lte]: params.todate || '2200-01-01'
      }
    },
    'order': [[aggDateFunction, 'ASC']],
    'raw': true
  }

  const actualadmins = await User.findOne({
    'attributes': [[sequelize.fn('COUNT', '*'), 'total']],
    'where': {'isadmin': true },
    'raw': true
  })

  const result = {
    'usershistory': castAndCumulateMetric(await User.findAll(searchParams)),
    'actualadmins': Number(actualadmins.total)
  }

  return result
}


module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  getUsersMetrics
};
