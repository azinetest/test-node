const Joi = require("joi"); // Make sure this matches the variable you're using below

const validationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  module: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").optional(),
});

module.exports = { validationSchema };
