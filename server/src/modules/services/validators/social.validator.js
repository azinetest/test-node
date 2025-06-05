const Joi = require('joi');

const socialSchema = Joi.object({
    envType: Joi.string().valid("sandbox", "production").optional(),
    phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
    email: Joi.string().email().optional(),
    ip: Joi.string().ip().optional(),
    request_id: Joi.string().required(),
}).or('email', 'phone', 'ip');  // At least one of these is required

module.exports = {
    socialSchema
}