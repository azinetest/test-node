const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      Lowercase: true,
    },
    prefix: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Number,
      enum: [0, 1],
      required: true,
      default: 1,
      comment: "0 - Inactive, 1 - Active",
    },
    mastersheet: {
      type: Array,
      default: null,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Services = mongoose.model("Services", ServiceSchema);
module.exports = Services;
