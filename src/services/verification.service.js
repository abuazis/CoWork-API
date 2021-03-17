const httpStatus = require("http-status");
const moment = require("moment");
const faker = require("faker");
const ApiError = require("../utils/ApiError");
const config = require("../config/config");
const { Verification, User } = require("../models");
const { userService } = require(".");

/// Create verification registered user account
const createVerification = async (userId) => {
  const user = await User.findOne({
    _id: userId,
    verified: false,
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User has been verified");
  }
  const randomCode = faker.random.number({
    min: 1000,
    max: 9999,
  });
  if (await Verification.isCodeTaken(randomCode)) {
    createVerification(userId);
  }
  const verificationCodeExpires = moment().add(
    config.verification.codeExpirationMinutes,
    "minutes"
  );
  const code = await Verification.create({
    user: userId,
    code: randomCode,
    expires: verificationCodeExpires,
  });
  return code;
};

/// Check verification request user account
const checkVerification = async (verificationBody) => {
  const { userId, code } = verificationBody;
  const verificationDoc = await Verification.findOne({
    user: userId,
    code: code,
  });
  if (!verificationDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Verification code is wrong");
  }
  await verificationDoc.remove();
  await userService.updateUserById(userId, {
    verified: true,
  });
  return !!verificationDoc;
};

module.exports = { createVerification, checkVerification };
