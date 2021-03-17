const Joi = require("joi");
const { objectId } = require("./custom.validation");

/// Create coworking space validation request
const createCoworkingSpace = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    openTime: Joi.object().keys({
      open: Joi.string().required(),
      close: Joi.string().required(),
    }),
  }),
};

/// Get coworking spaces validation request
const getCoworkingSpaces = {
  query: Joi.object().keys({
    name: Joi.string(),
    address: Joi.string(),
    latitude: Joi.number(),
    longitude: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

/// Get coworking space validation request
const getCoworkingSpace = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

/// Update coworking space validation request
const updateCoworkingSpace = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    openTime: Joi.object().keys({
      open: Joi.string().required(),
      close: Joi.string().required(),
    }),
  }).min(1),
};

/// Delete user validation request
const deleteCoworkingSpace = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCoworkingSpace,
  getCoworkingSpaces,
  getCoworkingSpace,
  updateCoworkingSpace,
  deleteCoworkingSpace,
};
