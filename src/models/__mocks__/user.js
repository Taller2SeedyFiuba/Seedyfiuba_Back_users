const testUsr =  {
  id: 'testUser',
  firstname: 'Marcelo',
  lastname: 'Lopez',
  email: 'mlopez@fi.uba.ar',
  birthdate: '1900-08-08',
  signindate: '2020-09-09'
};

const getAllUsers = async() => {
  return [testUsr];
}

const createUser = async(user) => {
  return  {
    id: '1',
    signindate: "2020-09-09",
    ... user
  }
}

const getUser = async(id) => {
  return (id === 'testUser') ? testUsr : null;
}

const updateUser = async(id, newData) => {
  return {
    ... testUsr,
    ... newData,
    id,
  };
}

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser
};
