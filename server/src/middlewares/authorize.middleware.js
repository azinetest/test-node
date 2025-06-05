const RoleModel = require("../modules/admin/role-management/models/role.model");
const sendResponse = require("../utils/response");
const { StatusCodes } = require("http-status-codes");

module.exports = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const user = req.user;

      if (!user || !user.role_id) {
        return sendResponse(res, {
          statusCode: StatusCodes.FORBIDDEN,
          success: false,
          message: "Access denied. No role found.",
        });
      }

      const role = await RoleModel.findById(user.role_id).populate(
        "permissions"
      );

      if (!role) {
        return sendResponse(res, {
          statusCode: StatusCodes.FORBIDDEN,
          success: false,
          message: "Role not found.",
        });
      }

      if (role.slug === "super-admin") {
        return next(); // Allow all for super-admin
      }

      const hasPermission = role.permissions.some(
        (perm) => perm.slug === requiredPermission
      );

      if (!hasPermission) {
        return sendResponse(res, {
          statusCode: StatusCodes.FORBIDDEN,
          success: false,
          message: "Access denied. Permission not granted.",
        });
      }

      next(); // Permission granted
    } catch (error) {
      console.error("Permission check error:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Server error while checking permissions.",
        error: error.message,
      });
    }
  };
};
