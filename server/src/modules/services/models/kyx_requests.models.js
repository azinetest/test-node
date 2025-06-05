const mongoose = require("mongoose");

const RequestLogsSchema = new mongoose.Schema(
  {
    request_id: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    trans_id: {
      type: String,
      required: false,
      trim: true,
      index: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    service: {
      type: String,
      required: true,
      index: true,
    },
    env_type: {
      type: String,
      enum: ["sandbox", "production"],
      required: true,
      index: true,
    },
    main_status: {
      type: String,
      required: false,
      trim: true,
    },
    sub_status: {
      type: String,
      required: false,
      trim: true,
      enum: [
        "Match",
        "No match",
        "Partial Match",
        "Failed",
        "Found",
        "Not Found",
        "Success",
        "Started",
        "Pending",
        "In Progress",
        "Expired",
        "Error",
        "Verified",
        "No Found",
        "Validation"
      ],
    },
    request_at: {
      type: Date,
      default: Date.now,
      index: true,
    },
    response_at: {
      type: Date,
      default: Date.now,
      index: false,
    },
    country_source: {
      type: String,
      trim: true,
      index: true,
      default: null,
    },
    request_type: {
      type: String,
      trim: true,
      default: null,
    },
    request: {
      type: mongoose.Schema.Types.Mixed,
      required: true,

    },
    response: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
      default: null,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Export the model
const RequestLogsModel = mongoose.model("request_logs", RequestLogsSchema);

module.exports = RequestLogsModel;