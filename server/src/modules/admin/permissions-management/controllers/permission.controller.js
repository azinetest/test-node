const slugify = require("slugify");
const PermissionService = require("../services/permission.service");
const { StatusCodes } = require("http-status-codes");
const sendResponse = require("../../../../utils/response"); // update path as needed

class PermissionController {
  async create(req, res) {
    try {
      const { name, module, description } = req.body;
      const permissionData = {
        name,
        slug: slugify(name, { lower: true }),
        module,
        description,
        created_by: req.user?.id || null,
        updated_by: null,
      };

      const newPermission = await PermissionService.createPermission(
        permissionData
      );

      return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        message: "Permission created successfully.",
        data: newPermission,
      });
    } catch (error) {
      console.error("Error in create permission controller:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while creating the permission.",
        error: error.message,
      });
    }
  }

  async getPermissions(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();

      if (!permissions || permissions.length === 0) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Permissions not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "Permissions fetched successfully.",
        data: permissions,
      });
    } catch (error) {
      console.error("Error in fetching permissions:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching permissions.",
        error: error.message,
      });
    }
  }

  async getPermissionById(req, res) {
    try {
      const { id } = req.params;
      const permission = await PermissionService.getPermissionById(id);

      if (!permission) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Permission not found.",
          data: null,
        });
      }

      return sendResponse(res, {
        message: "Permission fetched successfully.",
        data: permission,
      });
    } catch (error) {
      console.error("Error in fetching permission by ID:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while fetching the permission by ID.",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, module, description } = req.body;
      const permissionData = {
        name,
        slug: slugify(name, { lower: true }),
        module,
        description,
        updated_by: req.user?.id || null,
      };

      const updatedPermission = await PermissionService.updatePermission(
        id,
        permissionData
      );

      if (!updatedPermission) {
        return sendResponse(res, {
          statusCode: StatusCodes.NOT_FOUND,
          message: "Permission not found.",
        });
      }

      return sendResponse(res, {
        message: "Permission updated successfully.",
        data: updatedPermission,
      });
    } catch (error) {
      console.error("Error in updating permission:", error);
      return sendResponse(res, {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "An error occurred while updating the permission.",
        error: error.message,
      });
    }
  }
}

module.exports = new PermissionController();
