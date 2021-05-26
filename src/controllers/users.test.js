const {
  getOneUser,
  getUsers,
  createUser,
  deleteUser,
  updateUser } = require('./users.controller');

jest.mock('../models/user');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

test('/getOneUser successful response', async () => {
  const req = {
    params: {
      id: "testUser"
    }
  }
  const resObj = {
    data: {
      status: 'success',
      data: {
        id: 'testUser',
        firstname: 'Marcelo',
        lastname: 'Lopez',
        email: 'mlopez@fi.uba.ar',
        birthdate: '1900-08-08',
        signindate: '2020-09-09'
      }
    }
  };

  const res = mockResponse();

  await getOneUser(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/getUsers successful response', async () => {
  const req = {};

  const resObj = {
    data: {
      status: 'success',
      data: [
        {
          id: 'testUser',
          firstname: 'Marcelo',
          lastname: 'Lopez',
          email: 'mlopez@fi.uba.ar',
          birthdate: '1900-08-08',
          signindate: '2020-09-09'
        }
      ]
    }
  };

  const res = mockResponse();

  await getUsers(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/createUser successful response', async () => {
  const req = {
    body: {
      id: "1",
      firstname: 'Marcelo',
      lastname: 'Lopez',
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
    }
  }

  const resObj = {
    data: {
      status: 'success',
      data: {
        id: "1",
        firstname: 'Marcelo',
        lastname: 'Lopez',
        email: 'mlopez@fi.uba.ar',
        birthdate: '1900-08-08',
        signindate: '2020-09-09'
      }
    }
  };

  const res = mockResponse();

  await createUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/deleteUser successful response', async () => {
  const req = {
    params: {
      id: "testUser",
    }
  }

  const resObj = {
    data: {
      status: 'success',
      data: null
    }
  };

  const res = mockResponse();

  await deleteUser(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});

test('/updateUser successful response', async () => {
  const req = {
    params: {
      id: "testUser",
    },
    body: {
      firstname: 'Marcelito',
      lastname: 'Lopez',
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
    }
  }

  const resObj = {
    data: {
      status: 'success',
      data: {
        id: "testUser",
        firstname: 'Marcelito',
        lastname: 'Lopez',
        email: 'mlopez@fi.uba.ar',
        birthdate: '1900-08-08',
        signindate: '2020-09-09',
      }
    }
  };

  const res = mockResponse();

  await updateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(resObj.data);
});