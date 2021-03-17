const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

/// Define express router
const router = express.Router();

/// Router post, get for get users, create users function
router.route("/")
.post(
  auth("manage"),
  validate(userValidation.createUser),
  userController.createUser
)
.get(
  auth("get"),
  validate(userValidation.getUsers),
  userController.getUsers
);

/// Router get, pacth, delete for get user, update user, delete user function
router.route("/:userId")
.get(
  auth("get"),
  validate(userValidation.getUser),
  userController.getUser
)
.patch(
  auth("manage"),
  validate(userValidation.updateUser),
  userController.updateUser
)
.delete(
  auth("manage"),
  validate(userValidation.deleteUser),
  userController.deleteUser
);

module.exports = router;