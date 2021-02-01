const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

/// Define express router
const router = express.Router();

/// Router post for register function
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

/// Router post for login function
router.post(
  "/login",
  validate(authValidation.login),
  authController.login
);

/// Router post for logout function
router.post(
  "/logout",
  validate(authValidation.logout),
  authController.logout
);

/// Router post for send verification function
router.post(
  "/send-verification",
  validate(authValidation.sendVerification),
  authController.sendVerification,
);

/// Router post for check verification function
router.post(
  "/check-verification",
  validate(authValidation.checkVerification),
  authController.checkVerification,
);

/// Router post for refresh function
router.post(
  "/refresh-token",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

/// Router post for forgot password function
router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

/// Router post for reset password function
router.post(
  "/reset-password",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

module.exports = router;