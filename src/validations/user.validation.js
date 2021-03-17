const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

/// Create user validation request
const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid("user", "admin"),
    birth: Joi.date(),
    verified: Joi.boolean().default(false),
  }),
};

/// Get users validation request
const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    role: Joi.string(),
    verified: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

/// Get user validation request
const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

/// Update user validation request
const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    birth: Joi.date(),
    verified: Joi.boolean().default(false),
  }).min(1),
};

/// Delete user validation request
const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
