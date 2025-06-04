const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../utils/response");

module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = {};
      error.details.forEach((err) => {
        const key = err.path[0];
        if (!errors[key]) {
          errors[key] = err.message.replace(/["]/g, "");
        }
      });

      return sendResponse(res, {
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY, // 422
        message: "Validation failed.",
        data: null,
        errors,
      });
    }

    req.body = value;
    next();
  };
};