const request = require('supertest');
const { createApp } = require('../src/app');
//const { jest: requiredJest } = require('@jest/globals');
const { validateUser } = require('../src/database/models/users')

var db = {}

const createUser = async function (user) {
  if (db[user.id]) return undefined
  db[user.id] = user;
  return user;
};

const deleteUser = async function (id) {
  if (!db[id]) return undefined
  delete db[id];
  return 1;
};

const updateUser = async function (id, newData) {
  if (!db[id]) return undefined
  newData['id'] = id;
  db[id] = newData;
  return user;
};

const getUser = async function (id) {
  if (!db[id]) return undefined
  return db[id]
};

const getAllUsers = async function () {
  return Object.values(db);
};


const getUserValidator = function () {
  return validateUser;
};

const database = {
  createUser,
  deleteUser,
  updateUser,
  getUser,
  getAllUsers,
  getUserValidator
}

const app = createApp(database, log=false)

describe('Pruebas sobre una base de datos vacia', () => {

  const user1 = {
    id: 1,
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }
  db = {};
  const initialDb = db;

  beforeEach(() => {
    db = {};
  })
    describe('GET /api', () => {
    
    test('La base de datos no se ve alterada', async () => {
      const response = await request(app).get('/api')
      expect(db).toEqual(initialDb);
    })
    
    test('Se retorna codigo 200, mensaje informativo y un array vacio', async () => {
      const response = await request(app).get('/api')
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
      expect(response.body.data).toEqual(new Array());
    })
  })
  
  describe('POST /api', () => {
    const expectedDb = {}
    expectedDb[user1.id] = user1;
    test('La base de datos recibe una nueva entrada', async () => {  
      const response = await request(app).post('/api').send(user1)
      expect(db).toEqual(expectedDb);
    })
    
    test('Se retorna codigo 201, mensaje informativo y el usuario ingresado', async () => {
      const response = await request(app).post('/api').send(user1)
      expect(response.statusCode).toBe(201);
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
      expect(response.body.data).toEqual(user1);
    })
  })

  describe('PUT /api{id}', () => {  
    test('La base de datos no se ve modificada', async () => {  
      const response = await request(app).post('/api/1').send(user1)
      expect(db).toEqual(initialDb);
    })
    
    test('Se retorna codigo 404, error y campo vacio', async () => {
      const response = await request(app).post('/api/1').send(user1)
      expect(response.statusCode).toBe(404);
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
      expect(response.body.data).toEqual({});
    })
  })
  describe('GET /api{id}', () => {  

    test('Se retorna codigo 404, error y campo vacio', async () => {
      const response = await request(app).get('/api/1')
      expect(response.statusCode).toBe(404);
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
      expect(response.body.data).toEqual({});
    })
  })
  describe('DELETE /api{id}', () => {

    test('La base de datos no se ve modificada', async () => {  
      const response = await request(app).delete('/api/1')
      expect(db).toEqual(initialDb);
    })

    test('Se retorna codigo 404, error y campo vacio', async () => {
      const response = await request(app).delete('/api/1')
      expect(response.statusCode).toBe(404);
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
      expect(response.body.data).toEqual({});
    })
  })
})


describe('Pruebas de registro, y consulta encadenadas', () => {

  const users = [{
    id: 1,
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  },
  {
    id: 2,
    firstname: 'Leopoldo',
    lastname: 'Gomez',
    email: 'lgomez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  },
  {
    id: 3,
    firstname: 'Camila',
    lastname: 'Bravio',
    email: 'cbravio@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }]

  const newUsers = [{
    id: 1,
    firstname: 'Cristian',
    lastname: 'Castro',
    email: 'cc@cristian.castro.com',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  },
  {
    id: 2,
    firstname: 'Gustavo',
    lastname: 'Mirador',
    email: 'gmirador@gmail.com',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  },
  {
    id: 3,
    firstname: 'Elon',
    lastname: 'Musk',
    email: 'muskelon@tesla.com',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }]

  db = {};
  //const initialDb = db;
  debugger
  describe('Si se ingresan 3 usuarios a la base', () => {  
    test("La base de datos se encuentra inicialmente vacia", async () => {  
      const response = await request(app).get('/api')
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
      expect(response.body.data).toEqual(new Array());
    })
    
    test("Se ingresan los usuarios y se reciben las respuestas apropiadas", async () => {
      for (user of users ){
        const response = await request(app).post('/api').send(user)
        expect(response.statusCode).toBe(201);
        expect(typeof response.body.message).toBe('string')
        expect(response.body.message.length > 0).toBe(true)
        expect(response.body.data).toEqual(user);
      }
    })
    test('Se consulta por todos los usuarios', async () => {
      const response = await request(app).get('/api')
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
      expect(response.body.data).toEqual(users);
    })
    test('Se consulta individualmente por cada usuario', async () => {
      //Recorremos al reves el arreglo solo para demostrar que no es necesario hacerlo en orden
      reverseUsers = users.slice();
      for (user of reverseUsers.reverse()){
        const response = await request(app).get('/api/' + user.id)
        expect(response.statusCode).toBe(200);
        expect(typeof response.body.message).toBe('string')
        expect(response.body.message.length > 0).toBe(true)
        expect(response.body.data).toEqual(user);
      }
    })
    test('Se modifica individualmente a cada usuario', async () => {
      for (var i=0; i < users.length; i++){
        const response = await request(app).put('/api/' + users[i].id).send(newUsers[i])
        expect(response.statusCode).toBe(200);
        expect(typeof response.body.message).toBe('string')
        expect(response.body.message.length > 0).toBe(true)
        expect(response.body.data).toEqual(newUsers[i]);
      }
    })
    test('Se consulta individualmente por cada usuario modificado', async () => {
      for (user of newUsers){
        const response = await request(app).get('/api/' + user.id)
        expect(response.statusCode).toBe(200);
        expect(typeof response.body.message).toBe('string')
        expect(response.body.message.length > 0).toBe(true)
        expect(response.body.data).toEqual(user);
      }
    })
    test('Se elimina al usuario de id 1', async () => {
      const response = await request(app).delete('/api/1')
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
      expect(response.body.data).toEqual(newUsers[0]);
    })
    //Eliminamos al usuario de id 1 de nuestro array local de usuarios
    slicedUsers = newUsers.slice(1, undefined);
    test('Se consulta por la totalidad de usuarios', async () => {
      const response = await request(app).get('/api')
      expect(response.statusCode).toBe(200);
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
      expect(response.body.data).toEqual(slicedUsers);
    })
  })
})