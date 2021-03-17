const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const {
  userService,
  tokenService,
  authService,
  emailService,
  verificationService,
} = require("../services");

/// Register new user account and generate auth tokens
const register = catchAsync(async (req, res) => {
  if (req.file) {
    req.body.photo = req.file.path.split(/\\/g).join("/");
  }
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

/// Login received user account and generate auth tokens
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

/// Push out logged user account
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/// Check existence specific user data by email
const checkEmail = catchAsync(async (req, res) => {
  console.log(req.body.email);
  const user = await userService.getUserByEmail(req.body.email);
  if (user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  res.status(httpStatus.NO_CONTENT).send();
});

/// Send verification code to user account
const sendVerification = catchAsync(async (req, res) => {
  const { id, email } = req.body;
  const verification = await verificationService.createVerification(id);
  await emailService.sendVerificationCode(email, verification.code);
  res.status(httpStatus.NO_CONTENT).send();
});

/// Check requested verification code
const checkVerification = catchAsync(async (req, res) => {
  await verificationService.checkVerification(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

/// Re-generate logged user refresh tokens
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

/// Generate reset token and request new password link
const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/// Set new password user account
const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  checkEmail,
  sendVerification,
  checkVerification,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
