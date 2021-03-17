const { CoworkingSpace } = require("../models");

/// Create new coworking space document
const createCoworkingSpace = async (reqBody) => {
  const coworkingSpace = await CoworkingSpace.create(reqBody);
  return coworkingSpace;
};

/// Get all coworking space documents
const getAllCoworkingSpaces = async (filter, options) => {
  const coworkingSpaces = await CoworkingSpace.paginate(filter, options);
  return coworkingSpaces;
};

/// Get coworking space document by id
const getCoworkingSpaceById = async (id) => {
  return CoworkingSpace.findById(id);
};

/// Update coworking space document by id
const updateCoworkingSpaceById = async (coworkingSpaceId, updateBody) => {
  const coworkingSpace = await getCoworkingSpaceById(coworkingSpaceId);
  if (!coworkingSpace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Coworking Space not found");
  }
  Object.assign(coworkingSpace, updateBody);
  await coworkingSpace.save();
  return coworkingSpace;
};

/// Delete coworking space document by id
const deleteCoworkingSpaceById = async (coworkingSpaceId) => {
  const coworkingSpace = await getCoworkingSpaceById(coworkingSpaceId);
  if (!coworkingSpace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Coworking Space not found");
  }
  await coworkingSpace.remove();
  return coworkingSpace;
};

module.exports = {
  createCoworkingSpace,
  getAllCoworkingSpaces,
  getCoworkingSpaceById,
  updateCoworkingSpaceById,
  deleteCoworkingSpaceById,
};
