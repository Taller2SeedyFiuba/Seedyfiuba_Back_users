const Joi = require("joi");

const model = {}
model['id'] = Joi.string().max(255)
model['firstname'] = Joi.string().min(1).max(50)
model['lastname'] = Joi.string().min(1).max(50)
model['email'] = Joi.string().email().min(1).max(100)
model['birthdate'] = Joi.date(),
model['isadmin'] = Joi.boolean()

function validateNewUser(user) {
  const JoiSchema = Joi.object({
    id: model.id.required(),
    firstname: model.firstname.required(),
    lastname: model.lastname.required(),
    email: model.email.required(),
    birthdate: model.birthdate.required()
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

function validateUserUpdate(user) {
  const JoiSchema = Joi.object({
    firstname: model.firstname,
    lastname: model.lastname,
    isadmin: model.isadmin
  }).options({ abortEarly: false });

  return JoiSchema.validate(user);
}

function validateSearch(data) {
  const JoiSchema = Joi.object({
    page: Joi.number().positive(),
    limit: Joi.number().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(data);
}

function validateMetrics(data) {
  const JoiSchema = Joi.object({
    timeinterval: Joi.string().equal(...['month', 'week', 'day', 'hour', 'minute', 'second']),
    fromdate: Joi.date(),
    todate: Joi.date(),
    limit: Joi.number().positive()
  }).options({ abortEarly: false });

  return JoiSchema.validate(data);
}


module.exports = {
  validateNewUser,
  validateUserUpdate,
  validateSearch,
  validateMetrics
};
