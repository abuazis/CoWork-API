const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { coworkingSpaceService } = require("../services");

/// Create new coworking space data
const createCoworkingSpace = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Photo file must be upload");
  }
  req.body.photo = req.file.path.split(/\\/g).join("/");
  const coworkingSpace = await coworkingSpaceService.createCoworkingSpace(
    req.body
  );
  res.status(httpStatus.CREATED).send(coworkingSpace);
});

/// Get all coworking space data
const getCoworkingSpaces = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "address", "latitude", "longitude"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await coworkingSpaceService.getAllCoworkingSpaces(
    filter,
    options
  );
  res.send(result);
});

/// Get specific coworking space data
const getCoworkingSpace = catchAsync(async (req, res) => {
  const coworkingSpace = await coworkingSpaceService.getCoworkingSpaceById(
    req.params.id
  );
  if (!coworkingSpace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Coworking Space not found");
  }
  res.send(coworkingSpace);
});

/// Update exists coworking space data
const updateCoworkingSpace = catchAsync(async (req, res) => {
  const coworkingSpace = await coworkingSpaceService.updateCoworkingSpaceById(
    req.params.id,
    req.body
  );
  res.send(coworkingSpace);
});

/// Delete coworking space data
const deleteCoworkingSpace = catchAsync(async (req, res) => {
  const coworkingSpace = await coworkingSpaceService.deleteCoworkingSpaceById(
    req.params.id
  );
  res.send(coworkingSpace);
});

module.exports = {
  createCoworkingSpace,
  getCoworkingSpaces,
  getCoworkingSpace,
  updateCoworkingSpace,
  deleteCoworkingSpace,
};
