const slugify = require("slugify");
const PermissionService = require("../services/permission.service");
const { StatusCodes } = require("http-status-codes");

class PermissionController {
  // Method to create a new permission
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
      return res.status(StatusCodes.CREATED).json({
        message: "Permission created successfully.",
        data: newPermission,
      });
    } catch (error) {
      console.error("Error in create permission controller:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while creating the permission.",
        error: error.message,
      });
    }
  }

  // Method to fetch all permissions
  async getPermissions(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      if (!permissions || permissions.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Permissions not found.",
          data: [],
        });
      }
      return res.status(StatusCodes.OK).json({
        message: "Permissions fetched successfully.",
        data: permissions,
      });
    } catch (error) {
      console.error("Error in fetching permissions:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching permissions.",
        error: error.message,
      });
    }
  }

  // Method to get a permission by ID
  async getPermissionById(req, res) {
    try {
      const { id } = req.params; // Use req.params for route parameters
      const permission = await PermissionService.getPermissionById(id);
      if (!permission) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Permission not found.",
          data: null,
        });
      }
      return res.status(StatusCodes.OK).json({
        message: "Permission fetched successfully.",
        data: permission,
      });
    } catch (error) {
      console.error("Error in fetching permission by ID:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching the permission by ID.",
        error: error.message,
      });
    }
  }

  // Method to update a permission
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
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Permission not found.",
        });
      }
      return res.status(StatusCodes.OK).json({
        message: "Permission updated successfully.",
        data: updatedPermission,
      });
    } catch (error) {
      console.error("Error in updating permission:", error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while updating the permission.",
        error: error.message,
      });
    }
  }
}

module.exports = new PermissionController();
