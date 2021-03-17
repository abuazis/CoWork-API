const httpStatus = require("http-status");
const multer = require("multer");
const ApiError = require("../utils/ApiError");

/// Set multer upload destination and renaming file
const multerStorage = multer.diskStorage({
  destination: (req, file, call) => {
    call(null, "public/uploads");
  },
  filename: (req, file, call) => {
    let timestamp = new Date();
    call(null, timestamp.getMilliseconds() * 9999 + "-" + file.originalname);
  },
});

/// Filter uploaded file extensions
const multerFilter = (req, file, call) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    call(null, true);
  } else {
    call(
      ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, "Image type is not allowed"),
      false
    );
  }
};

module.exports = { multerStorage, multerFilter };
