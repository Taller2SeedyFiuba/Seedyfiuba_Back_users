const {
  getOneUser,
  getUsers,
  createUser,
  updateUser } = require('./users');
const { ApiError } = require('../errors/ApiError')
const errMsg = require('../errors/messages')
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


test('/getOneUser error response', async () => {
  const req = {
    params: {
      id: "badID"
    }
  }

  const expectedThrow = new ApiError(404, errMsg.USER_NOT_FOUND);

  const res = mockResponse();

  expect.assertions(2);

  try{
    await getOneUser(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedThrow)
  }
});

test('/getUsers successful response', async () => {
  const req = {
    query: {}
  };

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

test('/createUser error id in use', async () => {
  const req = {
    body: {
      id: "testUser",
      firstname: 'Marcelo',
      lastname: 'Lopez',
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
    }
  }

  const res = mockResponse();
  const expectedThrow = new ApiError(400, errMsg.ID_IN_USE);
  expect.assertions(2);

  try{
    await createUser(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedThrow)
  }
});


test('/createUser error wrong body', async () => {
  const req = {
    body: {
      id: "goodID",
      firstname: 'Marcelo',
      lastname: 5,//A number instead of a string
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
    }
  }

  const res = mockResponse();
  expect.assertions(2);

  try{
    await createUser(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400)
  }
});


test('/updateUser successful response', async () => {
  const req = {
    params: {
      id: "testUser",
    },
    body: {
      firstname: 'Marcelito',
      lastname: 'Lopez'
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


test('/updateUser error response, user not found', async () => {
  const req = {
    params: {
      id: "badID"
    }
  }

  const expectedThrow = new ApiError(400, errMsg.USER_NOT_FOUND);
  const res = mockResponse();
  expect.assertions(2);

  try{
    await updateUser(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toEqual(expectedThrow)
  }
});

test('/updateUser error response, bad body', async () => {
  const req = {
    params: {
      id: "badID"
    },
    body: {
      'firstname': 5,
      'lastname': 'Sanchez'
    }
  }

  const res = mockResponse();
  expect.assertions(2);

  try{
    await updateUser(req, res);
  } catch(err){
    expect(err).toBeInstanceOf(ApiError);
    expect(err).toHaveProperty('code', 400)
  }
});
