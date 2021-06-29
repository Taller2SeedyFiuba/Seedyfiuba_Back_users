const Joi = require("joi");

const model = {}
model['id'] = Joi.string().max(255)
model['firstname'] = Joi.string().min(1).max(30)
model['lastname'] = Joi.string().min(1).max(30)
model['email'] = Joi.string().email().min(5).max(30)
model['birthdate'] = Joi.date()

function validateNewUser(user) {
  const JoiSchema = Joi.object({
    id: model.id.required(),
    firstname: model.firstname.required(),
    lastname: model.lastname.required(),
    email: model.email.required(),
    birthdate: model.birthdate.required(),
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

function validateUserUpdate(user) {
  const JoiSchema = Joi.object({
    firstname: model.firstname,
    lastname: model.lastname
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}


module.exports = { 
  validateNewUser,
  validateUserUpdate 
};