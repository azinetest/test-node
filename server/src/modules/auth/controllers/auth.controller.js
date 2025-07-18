const { StatusCodes } = require("http-status-codes");
const AuthService = require("../services/auth.services");
const sendResponse = require("../../../utils/response"); // Adjust path as needed

function pickUserFields(user) {
  return {
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    status: user.status,
    role_id: user.role_id,
    parent_id: user.parent_id,
    profile_pic: user.profile_pic,
    company_profile: user.company_profile,
    subscribe_services: user.subscribe_services,
    expired_at: user.expired_at,
    extra_user_limit: user.extra_user_limit,
    created_by: user.created_by,
    updated_by: user.updated_by,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    username: user.username,
  };
}

class LoginController {
  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await AuthService.findUserByUsername(username);
      if (!user) {
        return sendResponse(res, {
          statusCode: StatusCodes.UNAUTHORIZED,
          success: false,
          message: "Invalid username or password.",
          data: null,
        });
      }

      const isPasswordValid = await AuthService.checkPassword(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return sendResponse(res, {
          statusCode: StatusCodes.UNAUTHORIZED,
          success: false,
          message: "Invalid username or password.",
          data: null,
        });
      }

      const token = await AuthService.generateToken(user._id);
      const userData = pickUserFields(user);
      userData.token = token;

      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logged in successfully.",
        data: userData,
      });
    } catch (error) {
      console.error("Error during login:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Something went wrong while logging in.",
        error: error.message,
      });
    }
  }

  async logout(req, res) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return sendResponse(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          success: false,
          message: "Authorization token is required.",
          data: null,
        });
      }

      const userDetails = await AuthService.getTokenUserDetails(token);

      if (!userDetails) {
        return sendResponse(res, {
          statusCode: StatusCodes.UNAUTHORIZED,
          success: false,
          message: "Session expired or invalid token.",
          data: null,
        });
      }
      await AuthService.deleteToken(userDetails.id);

      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Logout Successfully.",
        data: null,
      });
    } catch (error) {
      console.error("Error during session destruction:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred during logout",
        error: error.message,
      });
    }
  }

  async me(req, res) {
    try {
      const token = req.headers["authorization"];
      if (!token) {
        return sendResponse(res, {
          statusCode: StatusCodes.BAD_REQUEST,
          success: false,
          message: "Authorization token is required.",
          data: null,
        });
      }

      const userDetails = await AuthService.getTokenUserDetails(token);
      if (!userDetails) {
        return sendResponse(res, {
          statusCode: StatusCodes.UNAUTHORIZED,
          success: false,
          message: "Session expired or invalid token.",
          data: null,
        });
      }

      const userData = pickUserFields(userDetails);
      const subUserCount = await AuthService.getSubUserCount(userDetails._id);
      userData["sub_user_count"] = subUserCount;
      return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User information retrieved successfully.",
        data: userData,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Something went wrong while fetching user details.",
        error: error.message,
      });
    }
  }
}

module.exports = new LoginController();
