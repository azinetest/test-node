const { StatusCodes } = require("http-status-codes");

// middlewares/validate.js
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

      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: false,
        statusCode: 422,
        message: "Validation failed.",
        errors,
      });
    }

    req.body = value;
    next();
  };
};
