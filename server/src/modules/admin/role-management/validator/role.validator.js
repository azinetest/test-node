const Joi = require("joi"); // Make sure this matches the variable you're using below

const validationSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  permissions: Joi.array().required(),
  description: Joi.string().allow("").optional(),
});

module.exports = { validationSchema };
