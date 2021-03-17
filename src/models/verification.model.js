const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("./plugins");

/// Define verification collection schema
const verificationSchema = mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
      min: 1000,
      max: 9999,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

/// Call schema plugin
verificationSchema.plugin(toJSON);

/// Check if verification code has been stored
verificationSchema.statics.isCodeTaken = async function (code, excludeVerificationId) {
  const verificationCode = await this.findOne({
    code,
    _id: { $ne: excludeVerificationId },
  });
  return !!verificationCode;
};

/// Register mongoose model for verification schema
const Verification = mongoose.model("Verification", verificationSchema);

module.exports = Verification;
