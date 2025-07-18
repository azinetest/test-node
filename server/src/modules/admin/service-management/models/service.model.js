const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    token: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const ServiceSchema = new mongoose.Schema(
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
      lowercase: true, // corrected case
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
    description: {
      type: String,
      required: false,
      trim: true,
    },
    tokens: {
      sandbox: {
        type: TokenSchema,
        required: false,
      },
      production: {
        type: TokenSchema,
        required: false,
      },
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
    versionKey: false,
  }
);

const Services = mongoose.model("Services", ServiceSchema);
module.exports = Services;
