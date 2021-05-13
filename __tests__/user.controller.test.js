const request = require('supertest');
const { createApp } = require('../src/app');
const { jest: requiredJest } = require('@jest/globals');
const { validateUser } = require('../src/database/models/users')

//Mock de validador de usuario y base de datos

const userValidator = requiredJest.fn(function (user) {
  return { vakue : user}
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



const app = createApp(database, log=false)



describe('POST /api', () => {

  //Usuarios utilizados

  const completeUser = {
    id: 'idusuario1',
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }

  const incompleteUser = {
    id: 'idusuario1',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }

  describe('Recibiendo un nuevo usuario con campos completos', () => {
    //Antes de cada test queremos:
    //  - Limpiar la cantidad de llamadas y argumentos de llamada.
    //  - Setear el valor de retorno de cada mock utilizado

    beforeEach(() => {
      jest.clearAllMocks();
      userValidator.mockReturnValueOnce({ value: completeUser });
      getUser.mockResolvedValueOnce(undefined);
      createUser.mockResolvedValueOnce(completeUser);
    });
    
    test('Se valida que los campos sean correctos', async () => {
      
      const response = await request(app).post('/api').send(completeUser)
      expect(userValidator.mock.calls.length).toBe(1);
      expect(userValidator.mock.calls[0][0]).toEqual(completeUser);
    })

    test('Se valida que no exista un usuario en la base', async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(getUser.mock.calls.length).toBe(1);
      expect(getUser.mock.calls[0][0]).toEqual(completeUser.id);
    })
    
    test('Se crea un usuario en la base de datos', async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(createUser.mock.calls.length).toBe(1);
      expect(createUser.mock.calls[0][0]).toEqual(completeUser);
    })
    
    test('Se retorna codigo 201', async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(response.statusCode).toBe(201);
    })
    test("Se retorna un mensaje bajo el campo 'message'", async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
    })
    test("Se retornan datos del usuario bajo el campo 'data'", async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(response.body.data).toEqual(completeUser);
    })
  })
  
  describe('Cuando alguno de los campos falta', () => {
    //Antes de cada test queremos:
    //  - Limpiar la cantidad de llamadas y argumentos de llamada.
    //  - Setear el valor de retorno de cada mock utilizado
    beforeEach(() => {
      jest.clearAllMocks();
      userValidator.mockReturnValueOnce({ error: { message: "Error de validacion"} });
    })
    test('Se validan los campos recibidos', async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(userValidator.mock.calls.length).toBe(1);
      expect(userValidator.mock.calls[0][0]).toEqual(completeUser);
    })
    test('No se intenta almacenar en la base de datos', async () => {
      const response = await request(app).post('/api').send(completeUser)
      expect(createUser.mock.calls.length).toBe(0);
    })
    test('Se retorna codigo 400', async () => {
      const response = await request(app).post('/api').send(incompleteUser)
      expect(response.statusCode).toBe(400);
    })
    test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
      const response = await request(app).post('/api').send(incompleteUser)
      expect(response.body.data).toEqual({})
    })
    test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
      const response = await request(app).post('/api').send(incompleteUser)
      expect(response.body.error).not.toBe(undefined)
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
    })
  })
})


describe('GET /api', () => {

  const users = [
    {
      id: 'idmarcelo',
      firstname: 'Marcelo',
      lastname: 'Lopez',
      email: 'mlopez@fi.uba.ar',
      birthdate: '1900-08-08',
      signindate: '2020-09-09'
    },
    {
      id: 'idjuan',
      firstname: 'Juan',
      lastname: 'Martinez',
      email: 'jmartinez@gmail.com',
      birthdate: '1900-08-08',
      signindate: '2020-09-09'
    }
  ]
  //Antes de cada test queremos:
  //  - Limpiar la cantidad de llamadas y argumentos de llamada.
  //  - Setear el valor de retorno de cada mock utilizado
  beforeEach(() => {
    jest.clearAllMocks();
    getAllUsers.mockResolvedValueOnce(users);
  });
    
  test('Se obtienen todos los usuarios de la base de datos', async () => {
    const response = await request(app).get('/api')
    expect(getAllUsers.mock.calls.length).toBe(1);
  })
  
  test('Se retorna codigo 200', async () => {
    const response = await request(app).get('/api')
    expect(response.statusCode).toBe(200);
  })
  test("Se retorna un mensaje bajo el campo 'message'", async () => {
    const response = await request(app).get('/api')
    expect(typeof response.body.message).toBe('string')
    expect(response.body.message.length > 0).toBe(true)
  })
  test("Se retorna un vector de usuarios bajo el campo 'data'", async () => {
    const response = await request(app).get('/api')
    expect(response.body.data).toEqual(users);
  })
})


describe('GET /api/{id}', () => {

  //Usuarios utilizados

  const user = {
    id: 'iduser',
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }

  describe('Recibiendo un id perteneciente a un usuario almacenado', () => {
    //Antes de cada test queremos:
    //  - Limpiar la cantidad de llamadas y argumentos de llamada.
    //  - Setear el valor de retorno de cada mock utilizado

    beforeEach(() => {
      jest.clearAllMocks();
      getUser.mockResolvedValueOnce(user);
    });
  
    test('Se obtiene el usuario de la base de datos', async () => {
      const response = await request(app).get('/api/iduser')
      expect(getUser.mock.calls.length).toBe(1);
      expect(getUser.mock.calls[0][0]).toBe('iduser')
    })

    test('Se retorna codigo 200', async () => {
      const response = await request(app).get('/api/iduser')
      expect(response.statusCode).toBe(200);
    })
    test("Se retorna un mensaje bajo el campo 'message'", async () => {
      const response = await request(app).get('/api/iduser')
      expect(typeof response.body.message).toBe('string')
      expect(response.body.message.length > 0).toBe(true)
    })
    test("Se retornan datos del usuario bajo el campo 'data'", async () => {
      const response = await request(app).get('/api/iduser')
      expect(response.body.data).toEqual(user);
    })
  })
  describe('Cuando el id no referencia a ningun usuario de la base', () => {
    //Antes de cada test queremos:
    //  - Limpiar la cantidad de llamadas y argumentos de llamada.
    //  - Setear el valor de retorno de cada mock utilizado
    beforeEach(() => {
      jest.clearAllMocks();
      getUser.mockResolvedValueOnce(undefined)
    })
    test('Se consulta a la base de datos', async () => {
      const response = await request(app).get('/api/nada')
      expect(getUser.mock.calls.length).toBe(1);
      expect(getUser.mock.calls[0][0] == 'nada').toBe(true)
    })
    test('Se retorna codigo 404', async () => {
      const response = await request(app).get('/api/nada')
      expect(response.statusCode).toBe(404);
    })
    test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
      const response = await request(app).get('/api/nada')
      expect(response.body.data).toEqual({})
    })
    test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
      const response = await request(app).get('/api/nada')
      expect(response.body.error).not.toBe(undefined)
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
    })
  })
})



describe('PUT /api/{id}', () => {

  //Usuarios utilizados

  const user = {
    id: 'userid',
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }

  const  newDataForUser = {
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'marcelo.lopez@gmail.com',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }

  const resultingUser = newDataForUser
  resultingUser['id'] = user.id

  describe('Se envia un id perteneciente a un usuario almacenado', () => {


    describe('Se reciben parametros correctos y no ocurren errores internos', () => {
      //Antes de cada test queremos:
      //  - Limpiar la cantidad de llamadas y argumentos de llamada.
      //  - Setear el valor de retorno de cada mock utilizado

      beforeEach(() => {
        jest.clearAllMocks();
        getUser.mockResolvedValueOnce(user);
        userValidator.mockReturnValueOnce({ value: user });
        updateUser.mockResolvedValueOnce(1)
      }); 
      test('Se validan nuevos datos a ingresar a la base', async () => {
        const response = await request(app).put('/api/' + user.id).send(newDataForUser);
        expect(userValidator.mock.calls.length).toBe(1);
        expect(userValidator.mock.calls[0][0]).toEqual(resultingUser)
      })

      test('Se obtiene el usuario de la base de datos', async () => {
        const response = await request(app).put('/api/' + user.id).send(newDataForUser);
        expect(getUser.mock.calls.length).toBe(1);
        expect(getUser.mock.calls[0][0]).toBe(user.id)
      })

      test('Se actualiza el usuario en la base de datos', async () => {
        const response = await request(app).put('/api/' + user.id).send(newDataForUser);
        expect(updateUser.mock.calls.length).toBe(1);
        expect(updateUser.mock.calls[0][0]).toEqual(user.id)
        expect(updateUser.mock.calls[0][1]).toEqual(newDataForUser)
      })

      test('Se retorna codigo 200', async () => {
        const response = await request(app).put('/api/' + user.id).send(newDataForUser);
        expect(response.statusCode).toBe(200);
      })
      test("Se retorna un mensaje bajo el campo 'message'", async () => {
        const response = await request(app).put('/api/' + user.id).send(newDataForUser);
        expect(typeof response.body.message).toBe('string')
        expect(response.body.message.length > 0).toBe(true)
      })
      test("Se retornan datos del usuario actualizado bajo el campo 'data'", async () => {
        const response = await request(app).put('/api/' + user.id).send(newDataForUser);
        expect(response.body.data).toEqual(resultingUser);
      })
    })
    describe('Se reciben parametros correctos y ocurre error interno', () => {
      //Antes de cada test queremos:
      //  - Limpiar la cantidad de llamadas y argumentos de llamada.
      //  - Setear el valor de retorno de cada mock utilizado

      beforeEach(() => {
        jest.clearAllMocks();
        getUser.mockResolvedValueOnce(user);
        userValidator.mockReturnValueOnce({ value: user });
        updateUser.mockResolvedValueOnce(undefined)
      }); 
      test('Se validan nuevos datos a ingresar a la base', async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(userValidator.mock.calls.length).toBe(1);
        expect(userValidator.mock.calls[0][0]).toEqual(resultingUser)
      })

      test('Se obtiene el usuario de la base de datos', async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(getUser.mock.calls.length).toBe(1);
        expect(getUser.mock.calls[0][0]).toBe(user.id)
      })

      test('Se intenta actualizar el usuario en la base de datos', async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(updateUser.mock.calls.length).toBe(1);
        expect(updateUser.mock.calls[0][0]).toEqual(user.id)
        expect(updateUser.mock.calls[0][1]).toEqual(newDataForUser)
      })

      test('Se retorna codigo 500', async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(response.statusCode).toBe(500);
      })
      test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(response.body.data).toEqual({})
      })
      test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(response.body.error).not.toBe(undefined)
        expect(typeof response.body.error).toBe('string')
        expect(response.body.error.length > 0).toBe(true)
      });
    })
    describe('Se envia campo invalido por body', () => {
      //Antes de cada test queremos:
      //  - Limpiar la cantidad de llamadas y argumentos de llamada.
      //  - Setear el valor de retorno de cada mock utilizado

      beforeEach(() => {
        jest.clearAllMocks();
        userValidator.mockReturnValueOnce({ error: { message: "Error de validacion"} });
      }); 
      test('Se validan nuevos datos a ingresar a la base', async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(userValidator.mock.calls.length).toBe(1);
        expect(userValidator.mock.calls[0][0]).toEqual(resultingUser)
      })
      test('Se retorna codigo 400', async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(response.statusCode).toBe(400);
      })
      test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(response.body.data).toEqual({})
      })
      test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
        const response = await request(app).put('/api/'+user.id).send(newDataForUser);
        expect(response.body.error).not.toBe(undefined)
        expect(typeof response.body.error).toBe('string')
        expect(response.body.error.length > 0).toBe(true)
      });
    })
  })
  describe('Se envia un id que no coincide con un usuario almacenado', () => {
    //Antes de cada test queremos:
    //  - Limpiar la cantidad de llamadas y argumentos de llamada.
    //  - Setear el valor de retorno de cada mock utilizado

    beforeEach(() => {
      jest.clearAllMocks();
      userValidator.mockReturnValueOnce({ value : resultingUser})
      getUser.mockResolvedValueOnce(undefined)
    }); 
    test('Se validan nuevos datos a ingresar a la base', async () => {
      const response = await request(app).put('/api/'+user.id).send(newDataForUser);
      expect(userValidator.mock.calls.length).toBe(1);
      expect(userValidator.mock.calls[0][0]).toEqual(resultingUser)
    })
    test('Se obtiene el usuario de la base de datos', async () => {
      const response = await request(app).put('/api/'+user.id).send(newDataForUser);
      expect(getUser.mock.calls.length).toBe(1);
      expect(getUser.mock.calls[0][0]).toBe(user.id)
    })
    test('Se retorna codigo 404', async () => {
      const response = await request(app).put('/api/'+user.id).send(newDataForUser);
      expect(response.statusCode).toBe(404);
    })
    test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
      const response = await request(app).put('/api/'+user.id).send(newDataForUser);
      expect(response.body.data).toEqual({})
    })
    test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
      const response = await request(app).put('/api/'+user.id).send(newDataForUser);
      expect(response.body.error).not.toBe(undefined)
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
    });
  })
})


describe('DELETE /api/{id}', () => {

  //Usuarios utilizados

  const user = {
    id: 'userid',
    firstname: 'Marcelo',
    lastname: 'Lopez',
    email: 'mlopez@fi.uba.ar',
    birthdate: '1900-08-08',
    signindate: '2020-09-09'
  }

  describe('Se envia un id perteneciente a un usuario almacenado', () => {


    describe('Si no ocurren errores internos', () => {
      //Antes de cada test queremos:
      //  - Limpiar la cantidad de llamadas y argumentos de llamada.
      //  - Setear el valor de retorno de cada mock utilizado

      beforeEach(() => {
        jest.clearAllMocks();
        getUser.mockResolvedValueOnce(user);
        deleteUser.mockResolvedValueOnce(1)
      }); 

      test('Se consulta la existencia del usuario en la base de datos', async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(getUser.mock.calls.length).toBe(1);
        expect(getUser.mock.calls[0][0]).toBe(user.id)
      })

      test('Se elimina al usuario en la base de datos', async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(deleteUser.mock.calls.length).toBe(1);
        expect(deleteUser.mock.calls[0][0]).toEqual(user.id)
      })

      test('Se retorna codigo 200', async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(response.statusCode).toBe(200);
      })
      test("Se retorna un mensaje bajo el campo 'message'", async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(typeof response.body.message).toBe('string')
        expect(response.body.message.length > 0).toBe(true)
      })
      test("Se retornan datos del usuario borrado bajo el campo 'data'", async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(response.body.data).toEqual(user);
      })
    })
    describe('Si ocurre un error interno', () => {
      //Antes de cada test queremos:
      //  - Limpiar la cantidad de llamadas y argumentos de llamada.
      //  - Setear el valor de retorno de cada mock utilizado

      beforeEach(() => {
        jest.clearAllMocks();
        getUser.mockResolvedValueOnce(user);
        deleteUser.mockResolvedValueOnce(undefined)
      }); 

      test('Se consulta la existencia del usuario en la base de datos', async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(getUser.mock.calls.length).toBe(1);
        expect(getUser.mock.calls[0][0]).toBe(user.id)
      })

      test('Se intenta eliminar al usuario en la base de datos', async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(deleteUser.mock.calls.length).toBe(1);
        expect(deleteUser.mock.calls[0][0]).toEqual(user.id)
      })

      test('Se retorna codigo 500', async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(response.statusCode).toBe(500);
      })
      test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(response.body.data).toEqual({})
      })
      test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
        const response = await request(app).delete('/api/'+user.id)
        expect(response.body.error).not.toBe(undefined)
        expect(typeof response.body.error).toBe('string')
        expect(response.body.error.length > 0).toBe(true)
      });
    })
  })

  describe('Se envia un id que no coincide con un usuario almacenado', () => {
    //Antes de cada test queremos:
    //  - Limpiar la cantidad de llamadas y argumentos de llamada.
    //  - Setear el valor de retorno de cada mock utilizado

    beforeEach(() => {
      jest.clearAllMocks();
      getUser.mockResolvedValueOnce(undefined);
    }); 
    test('Se consulta la existencia del usuario en la base de datos', async () => {
      const response = await request(app).delete('/api/'+user.id)
      expect(getUser.mock.calls.length).toBe(1);
      expect(getUser.mock.calls[0][0]).toBe(user.id)
    })
    test('Se retorna codigo 404', async () => {
      const response = await request(app).delete('/api/'+user.id)
      expect(response.statusCode).toBe(404);
    })
    test("Se retorna un objeto vacio bajo el campo 'data'", async () => {
      const response = await request(app).delete('/api/'+user.id)
      expect(response.body.data).toEqual({})
    })
    test("Se retorna un mensaje de error bajo el campo 'error'", async () => {
      const response = await request(app).delete('/api/'+user.id)
      expect(response.body.error).not.toBe(undefined)
      expect(typeof response.body.error).toBe('string')
      expect(response.body.error.length > 0).toBe(true)
    });
  })
})

