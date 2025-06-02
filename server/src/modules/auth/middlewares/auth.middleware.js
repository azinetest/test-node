const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth.services");
const sendResponse = require("../../../utils/response");

const Verify = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Authorization token is missing.",
    });
  }

  const userDetails = await AuthService.getTokenUserDetails(token);

  if (!userDetails) {
    return sendResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "Invalid or expired token. User not authenticated.",
      data: null,
    });
  }

  // Attach user details to the request if needed
  req.user = userDetails;

  next();
};

module.exports = { Verify };