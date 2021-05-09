const request = require('supertest');
const { createApp } = require('../src/app');
const { jest: requiredJest } = require('@jest/globals');


//Mock de validador de usuario y base de datos

const userValidator = requiredJest.fn(function (user) {
  const value = user
  return { value }
  return user.id && user.firstname && user.lastname && user.birthdate /
    user.signindate && user.email;
});

const createUser = requiredJest.fn(async function (user) {
  return user;
});

const deleteUser = requiredJest.fn(async function (id) {
  return 1;
});

const updateUser = requiredJest.fn(async function (id, newData) {
  return {};
});

const getUser = requiredJest.fn(async function (id) {
  return {};
});

const getAllUsers = requiredJest.fn(async function () {
  return {};
});

const getUserValidator = requiredJest.fn(function () {
  return userValidator;
});

const database = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  getUserValidator
}

//Le pasamos la base de datos mockeada a la app



const app = createApp(database)



describe('POST /users', () => {
  //debugger;
  beforeEach(() => {
    createUser.mockReset()
    deleteUser.mockReset()
    updateUser.mockReset()
    getUser.mockReset()
    getAllUsers.mockReset()
    getUserValidator.mockReset()
    userValidator.mockReset()
  })

  describe('Recibiendo un nuevo usuario con campos completos', () => {
    const usuarioCompleto = {
      id: 1,
      firstname: 'Marcelo',
      lastname: 'Lopez',
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
      signindate: '2020-09-09'
    }
    test('Se valida que los campos sean correctos', async () => {
      const response = await request(app).post('/api/users').send(usuarioCompleto)
      expect(userValidator.mock.calls.length).toBe(1);
      expect(userValidator.mock.calls[0][0]).toEqual(usuarioCompleto);

    })
    /*
    test('Se valida que no exista un usuario en la base', async () => {
      const response = await request(app).post('/api/users').send(usuarioCompleto)
      //console.log(response.body)
      userValidator.mockReturnValue({ value: {}});
      expect(getUser.mock.calls.length).toBe(1);
      //expect(getUser.mock.calls[0][0]).toEqual(usuarioCompleto.id);
      //expect(getUser.mock.results[0]).toBeFalsy();
    })
    //Se crea un usuario en la base de datos
    //Retornamos codigo 201
    test('Se retorna codigo 201', async () => {
      const response = await request(app).post('/api/users').send(usuarioCompleto)
      console.log(response.error.message)
      expect(response.statusCode).toBe(200);
    })
    //Retornamos un mensaje bajo el campo 'message'
    test("Se retorna un mensaje bajo el campo 'message'", async () => {
      const response = await request(app).post('/api/users').send(usuarioCompleto)
      const passes = response.message && response.message.length > 0
      expect(passes).toBe(true);
    })
    //Retornamos info del usuario creado bajo campo 'data'.
  })

  describe('Cuando alguno de los campos falta', () => {
    const usuarioIncompleto = {
      id: 1,
      lastname: 'Lopez',
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
      signindate: '2020-09-09'
    }
    test('Se retorna codigo 400', async () => {
      const response = await request(app).post('/api/users').send(usuarioIncompleto)
      expect(response.statusCode).toBe(400);
    })
    //Se retorna un objeto vacio bajo el campo 'data'
    //Retornamos un mensaje bajo el campo 'error'
  */
  })
  
})

