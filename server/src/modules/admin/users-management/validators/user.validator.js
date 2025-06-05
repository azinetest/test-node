const Joi = require("joi");

const baseSchema = {
  first_name: Joi.string().min(2).max(50),
  last_name: Joi.string().min(2).max(50),
  email: Joi.string().email().max(100),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/),
  password: Joi.string().min(6).max(128),
  status: Joi.boolean(),
  role_id: Joi.string().hex().length(24),
  profile_pic: Joi.string().uri(),
  company_profile: Joi.object().optional(),
  subscribe_services: Joi.array().items(Joi.string()),
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