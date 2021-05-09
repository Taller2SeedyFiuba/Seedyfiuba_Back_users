const Sequelize = require("sequelize");
const Joi = require("joi");


const UserModel = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,

  },
  firstname: {
    type: Sequelize.CHAR(30),
    allowNull: false
  },
  lastname: {
    type: Sequelize.CHAR(30)
  },
  email: {
    type: Sequelize.CHAR(30)
  },
  birthdate: {
    type: Sequelize.DATE
  },
  signindate: {
    type: Sequelize.DATE
  },
}

function validateUser(user) {

  const JoiSchema = Joi.object({

    id: Joi.number().required(),
    firstname: Joi.string()
      .min(1)
      .max(30)
      .required()
      .messages({
        'string.base': `Tu nombre solo puede contener texto`,
        'string.empty': `No podes tener un nombre vacio`,
        'string.min': `Tu nombre debe tener una longitud minima de {#limit}`,
        'string.max': `Tu nombre debe tener una longitud maxima de {#limit}`,
        'any.required': `Necesitas proporcionar un nombre`
      }),
    lastname: Joi.string()
      .min(1)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required(),
    birthdate: Joi.date()
      .required(),
    signindate: Joi.date()
      .required()
  }).options({ abortEarly: false });//abortEarly: true, lanza excepcion apenas se detecta error

  return JoiSchema.validate(user);
}

module.exports = {
  UserModel,
  validateUser
}
