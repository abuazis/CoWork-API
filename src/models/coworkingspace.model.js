const mongoose = require("mongoose");

const coworkingSpaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openTime: {
      type: Map,
      of: String,
      required: true,
    },
    latidude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CoworkingSpace = mongoose.model("CoworkingSpace", coworkingSpaceSchema);

module.exports = CoworkingSpace;
