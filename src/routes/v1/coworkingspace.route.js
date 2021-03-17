const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const coworkingSpaceController = require("../../controllers/coworkingspace.controller");
const coworkingSpaceValidation = require("../../validations/coworkingspace.validation");

/// Define express router
const router = express.Router();

/// Router post, get for get coworking spaces, coworking space function
router.route("/")
.post(
  auth("manage"),
  validate(coworkingSpaceValidation.createCoworkingSpace),
  coworkingSpaceController.createCoworkingSpace
)
.get(
  auth("get"),
  validate(coworkingSpaceValidation.getCoworkingSpaces),
  coworkingSpaceController.getCoworkingSpaces
);

/// Router get, pacth, delete for get coworking space, 
/// update coworking space, delete coworking space function
router.route("/:userId")
.get(
  auth("get"),
  validate(coworkingSpaceValidation.getCoworkingSpace),
  coworkingSpaceController.getCoworkingSpace
)
.patch(
  auth("manage"),
  validate(coworkingSpaceValidation.updateCoworkingSpace),
  coworkingSpaceController.updateCoworkingSpace
)
.delete(
  auth("manage"),
  validate(coworkingSpaceValidation.deleteCoworkingSpace),
  coworkingSpaceController.deleteCoworkingSpace
);

module.exports = router;