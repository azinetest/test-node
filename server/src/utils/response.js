const { StatusCodes } = require("http-status-codes");

const sendResponse = (
  res,
  {
    statusCode = StatusCodes.OK,
    success = true,
    message,
    data = null,
    error = null,
  }
) => {
  const response = {
    status: success,
    message,
  };

  if (data !== undefined) response.data = data;
  if (error) response.error = error;

  return res.status(statusCode).json(response);
};

module.exports = sendResponse;
