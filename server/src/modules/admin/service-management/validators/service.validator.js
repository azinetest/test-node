const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  prefix: Joi.string().min(2).max(20).required(),
  status: Joi.number().valid(0, 1).required(),
  mastersheet: Joi.object(),
});

module.exports = { validationSchema };
