const Joi = require("joi");

const baseSchema = {
  first_name: Joi.string().min(2).max(50),
  last_name: Joi.string().min(2).max(50),
  email: Joi.string().email().max(100),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/),
  password: Joi.string().min(6).max(128),
  status: Joi.string().valid("active", "inactive", "blocked", "other").default("active"),
  company_profile_name: Joi.string().min(2).max(100).allow(null, "").optional(),
  company_profile_email: Joi.string().email().max(100).allow(null, "").optional(),

  role_id: Joi.string().hex().length(24).allow(null, "").optional(),
  profile_pic: Joi.string().optional(),
  logo: Joi.string().optional(),
  favicon: Joi.string().optional(),
  company_profile: Joi.object().optional(),
  subscribe_services: Joi.string().allow(null, "").optional(),
  expired_at: Joi.date().iso(),
  extra_user_limit: Joi.number().integer().min(0),
};

const createUserSchema = Joi.object({
  ...baseSchema,
  first_name: baseSchema.first_name.required(),
  last_name: baseSchema.last_name.required(),
  email: baseSchema.email.required(),
  password: baseSchema.password.required(),
  status: baseSchema.status.required(),
  role_id: baseSchema.role_id.required(),
});

const updateUserSchema = Joi.object(baseSchema);

module.exports = {
  createUserSchema,
  updateUserSchema,
};