const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

/// Create new user document
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const user = await User.findOneAndUpdate(
    { email: userBody.email },
    userBody,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return user;
};

/// Get all user documents
const getAllUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/// Get user document by id
const getUserById = async (id) => {
  return User.findById(id);
};

/// Get user document by email
const getUserByEmail = async (email) => {
  return User.findOne({ email, verified: true });
};

/// Update user document by id
const updateUserById = async (id, updateBody) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/// Delete user document by id
const deleteUserById = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
